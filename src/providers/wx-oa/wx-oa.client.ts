import { createHash, randomBytes } from 'node:crypto';
import { createReadStream, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import FormData from 'form-data';

import { CredentialMissingError, HttpClient, ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import type { WxApiError, NewsArticle, SnsScope, WxLang } from './types';
import { checkSignature, checkMsgSignature, decryptMessage } from './notify-decoder';

const BASE_URL = 'https://api.weixin.qq.com';

export interface WxOaClientDeps {
  credential: DecryptedCredential;
  http: HttpClient;
  /**
   * Fetches and writes the access_token, gated through the redlock-managed
   * mutex shared by all concurrent callers in the cluster.
   */
  refreshAccessToken: () => Promise<string>;
  readAccessToken: () => Promise<string | null>;
  /**
   * Cached JS-SDK ticket TTL is the same as the access_token (~7200s) and
   * the WeChat docs explicitly say it's safe to share. We cache in-process
   * only since ticket refresh is cheap and instance count is low.
   */
}

interface JsTicketCache {
  ticket: string;
  expires_at: number;
}

/**
 * Canonical replacement for `@easy-front-core-sdk/wx`'s `WXCore` + API
 * helpers. Tenant-aware: every method calls into a per-instance HttpClient
 * that already has the credential context baked in.
 *
 * Construct via WxOaProvider.getClient(tenantId, appId); never `new` one
 * directly from outside the provider.
 */
export class WxOaClient {
  private jsTicket?: JsTicketCache;

  constructor(private readonly deps: WxOaClientDeps) {}

  get appId(): string {
    return this.deps.credential.app_id;
  }

  get tenantId(): number {
    return this.deps.credential.tenant_id;
  }

  // ─── Basic ────────────────────────────────────────────────────────────

  async getAccessToken(): Promise<string> {
    const cached = await this.deps.readAccessToken();
    if (cached) return cached;
    return this.deps.refreshAccessToken();
  }

  async getApiDomainIp(): Promise<string[]> {
    const data = await this.authedGet<{ ip_list: string[] } & WxApiError>(
      '/cgi-bin/get_api_domain_ip',
    );
    return data.ip_list;
  }

  async getCallbackIp(): Promise<string[]> {
    const data = await this.authedGet<{ ip_list: string[] } & WxApiError>('/cgi-bin/getcallbackip');
    return data.ip_list;
  }

  async netCheck(action: string, operator: string): Promise<unknown> {
    return this.authedPost('/cgi-bin/callback/check', { action, check_operator: operator });
  }

  async clearQuota(): Promise<unknown> {
    return this.authedPost('/cgi-bin/clear_quota', { appid: this.appId });
  }

  async getAutoReplyRules(): Promise<unknown> {
    return this.authedGet('/cgi-bin/get_current_autoreply_info');
  }

  // ─── Material (temporary + permanent) ────────────────────────────────

  async uploadTempMedia(filePath: string, type: 'image' | 'voice' | 'video' | 'thumb') {
    return this.uploadFile<{ type: string; media_id: string; created_at: number } & WxApiError>(
      `/cgi-bin/media/upload?type=${type}`,
      filePath,
      'media',
    );
  }

  async getTempMedia(mediaId: string): Promise<{ buffer: Buffer; contentType?: string }> {
    const token = await this.getAccessToken();
    const res = await this.deps.http.request<Buffer>({
      method: 'GET',
      url: '/cgi-bin/media/get',
      params: { access_token: token, media_id: mediaId },
      responseType: 'arraybuffer',
    });
    const contentType = res.headers['content-type'] as string | undefined;
    if (contentType?.includes('application/json')) {
      this.assertOk(JSON.parse(res.data.toString('utf8')) as WxApiError);
    }
    return { buffer: res.data, contentType };
  }

  async getJssdkMedia(mediaId: string): Promise<{ buffer: Buffer; contentType?: string }> {
    const token = await this.getAccessToken();
    const res = await this.deps.http.request<Buffer>({
      method: 'GET',
      url: '/cgi-bin/media/get/jssdk',
      params: { access_token: token, media_id: mediaId },
      responseType: 'arraybuffer',
    });
    return { buffer: res.data, contentType: res.headers['content-type'] as string | undefined };
  }

  async addNews(articles: NewsArticle[]): Promise<{ media_id: string }> {
    const data = await this.authedPost<{ media_id: string } & WxApiError>(
      '/cgi-bin/material/add_news',
      { articles },
    );
    return { media_id: data.media_id };
  }

  async updateNews(mediaId: string, index: number, articles: NewsArticle): Promise<unknown> {
    return this.authedPost('/cgi-bin/material/update_news', {
      media_id: mediaId,
      index,
      articles,
    });
  }

  async uploadImg(filePath: string): Promise<{ url: string }> {
    return this.uploadFile<{ url: string } & WxApiError>(
      '/cgi-bin/media/uploadimg',
      filePath,
      'media',
    );
  }

  async addMaterial(filePath: string, type: 'image' | 'voice' | 'thumb') {
    return this.uploadFile<{ media_id: string; url: string } & WxApiError>(
      `/cgi-bin/material/add_material?type=${type}`,
      filePath,
      'media',
    );
  }

  async addVideoMaterial(filePath: string, title: string, introduction: string) {
    const form = new FormData();
    form.append('media', createReadStream(assertSafeUploadPath(filePath)));
    form.append('description', JSON.stringify({ title, introduction }), {
      contentType: 'application/json',
    });
    return this.uploadForm<{ media_id: string } & WxApiError>(
      '/cgi-bin/material/add_material?type=video',
      form,
    );
  }

  async getMaterial(mediaId: string): Promise<unknown> {
    return this.authedPost('/cgi-bin/material/get_material', { media_id: mediaId });
  }

  async deleteMaterial(mediaId: string): Promise<unknown> {
    return this.authedPost('/cgi-bin/material/del_material', { media_id: mediaId });
  }

  async getMaterialCount(): Promise<{
    voice_count: number;
    video_count: number;
    image_count: number;
    news_count: number;
  }> {
    const data = await this.authedGet<
      {
        voice_count: number;
        video_count: number;
        image_count: number;
        news_count: number;
      } & WxApiError
    >('/cgi-bin/material/get_materialcount');
    return data;
  }

  async batchGetMaterial(
    type: 'image' | 'video' | 'voice' | 'news',
    offset: number,
    count: number,
  ): Promise<unknown> {
    return this.authedPost('/cgi-bin/material/batchget_material', { type, offset, count });
  }

  // ─── JS-SDK ──────────────────────────────────────────────────────────

  async getJsApiTicket(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    if (this.jsTicket && this.jsTicket.expires_at > now + 300) return this.jsTicket.ticket;

    const data = await this.authedGet<{ ticket: string; expires_in: number } & WxApiError>(
      '/cgi-bin/ticket/getticket',
      { type: 'jsapi' },
    );
    this.jsTicket = {
      ticket: data.ticket,
      expires_at: now + data.expires_in,
    };
    return data.ticket;
  }

  async signJsApi(url: string): Promise<{
    appId: string;
    nonceStr: string;
    timestamp: number;
    signature: string;
  }> {
    const ticket = await this.getJsApiTicket();
    const nonceStr = randomBytes(8).toString('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    const raw = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const signature = createHash('sha1').update(raw, 'utf8').digest('hex');
    return { appId: this.appId, nonceStr, timestamp, signature };
  }

  // ─── Notify (server message push) ────────────────────────────────────

  verifyHandshake(signature: string, timestamp: string, nonce: string): boolean {
    const token = this.notifyToken();
    return checkSignature(token, signature, timestamp, nonce);
  }

  verifyAndDecrypt(
    msgSignature: string,
    timestamp: string,
    nonce: string,
    encrypt: string,
  ): string {
    const token = this.notifyToken();
    if (!checkMsgSignature(token, msgSignature, timestamp, nonce, encrypt)) {
      throw new ProviderError({
        provider: 'wx_oa',
        message: 'Invalid msg_signature',
        retryable: false,
      });
    }
    const aesKey = (this.deps.credential.metadata as { encoding_aes_key?: string } | undefined)
      ?.encoding_aes_key;
    if (!aesKey) {
      throw new ProviderError({
        provider: 'wx_oa',
        message: 'encoding_aes_key not configured for tenant credential',
        retryable: false,
      });
    }
    return decryptMessage(aesKey, this.appId, encrypt);
  }

  // ─── SNS OAuth (web login flow) ──────────────────────────────────────

  buildAuthorizeUrl(redirectUri: string, scope: SnsScope, state?: string): string {
    const params = new URLSearchParams({
      appid: this.appId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope,
      ...(state ? { state } : {}),
    });
    return `https://open.weixin.qq.com/connect/oauth2/authorize?${params}#wechat_redirect`;
  }

  async getSnsAccessToken(code: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    openid: string;
    scope: string;
  }> {
    const data = await this.publicGet<
      {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        openid: string;
        scope: string;
      } & WxApiError
    >('/sns/oauth2/access_token', {
      appid: this.appId,
      secret: this.deps.credential.secret,
      code,
      grant_type: 'authorization_code',
    });
    return data;
  }

  async refreshSnsAccessToken(refreshToken: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    openid: string;
    scope: string;
  }> {
    return this.publicGet<
      {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        openid: string;
        scope: string;
      } & WxApiError
    >('/sns/oauth2/refresh_token', {
      appid: this.appId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
  }

  async checkSnsAccessToken(accessToken: string, openid: string): Promise<WxApiError> {
    return this.publicGet('/sns/auth', { access_token: accessToken, openid });
  }

  async getSnsUserInfo(
    accessToken: string,
    openid: string,
    lang: WxLang = 'zh_CN',
  ): Promise<unknown> {
    return this.publicGet('/sns/userinfo', { access_token: accessToken, openid, lang });
  }

  // ─── Internals ───────────────────────────────────────────────────────

  private notifyToken(): string {
    const meta = this.deps.credential.metadata as { notify_token?: string } | undefined;
    if (!meta?.notify_token) {
      throw new ProviderError({
        provider: 'wx_oa',
        message: 'notify_token not configured for tenant credential',
        retryable: false,
      });
    }
    return meta.notify_token;
  }

  private async authedGet<T extends WxApiError>(
    path: string,
    extraParams: Record<string, string | number> = {},
  ): Promise<T> {
    const access_token = await this.getAccessToken();
    const res = await this.deps.http.request<T>({
      method: 'GET',
      url: path,
      params: { access_token, ...extraParams },
    });
    this.assertOk(res.data);
    return res.data;
  }

  private async authedPost<T extends WxApiError = WxApiError>(
    path: string,
    body: unknown,
  ): Promise<T> {
    const access_token = await this.getAccessToken();
    const res = await this.deps.http.request<T>({
      method: 'POST',
      url: path,
      params: { access_token },
      data: body,
      headers: { 'content-type': 'application/json' },
    });
    this.assertOk(res.data);
    return res.data;
  }

  private async publicGet<T extends WxApiError = WxApiError>(
    path: string,
    params: Record<string, string | number>,
  ): Promise<T> {
    const res = await this.deps.http.request<T>({ method: 'GET', url: path, params });
    this.assertOk(res.data);
    return res.data;
  }

  private async uploadFile<T extends WxApiError>(
    path: string,
    filePath: string,
    fieldName: string,
  ): Promise<T> {
    const form = new FormData();
    form.append(fieldName, createReadStream(assertSafeUploadPath(filePath)));
    return this.uploadForm<T>(path, form);
  }

  private async uploadForm<T extends WxApiError>(path: string, form: FormData): Promise<T> {
    const access_token = await this.getAccessToken();
    const res = await this.deps.http.request<T>({
      method: 'POST',
      url: path,
      params: { access_token },
      data: form,
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    this.assertOk(res.data);
    return res.data;
  }

  private assertOk(data: WxApiError | { errcode?: number; errmsg?: string } | unknown): void {
    const err = data as Partial<WxApiError>;
    if (typeof err.errcode === 'number' && err.errcode !== 0) {
      throw new ProviderError({
        provider: 'wx_oa',
        message: err.errmsg ?? 'WeChat API error',
        upstreamCode: err.errcode,
        retryable: TRANSIENT_ERR_CODES.has(err.errcode),
      });
    }
  }
}

/**
 * Defense-in-depth: refuse to open a file outside `os.tmpdir()`. Callers
 * stage uploads through the controller's withTempFile() helper which
 * already builds paths from server-side randomness, but enforcing the
 * allowlist here closes the door on any future caller that accidentally
 * passes user-controlled data through.
 */
function assertSafeUploadPath(filePath: string): string {
  const resolved = realpathSync(resolve(filePath));
  const root = realpathSync(tmpdir());
  if (!resolved.startsWith(root + '/')) {
    throw new Error(`Refusing to upload file outside tmpdir: ${resolved}`);
  }
  return resolved;
}

const TRANSIENT_ERR_CODES = new Set([
  -1, // system busy
  40001, // access_token expired/invalid (recover via refresh)
  41001, // missing access_token
  42001, // access_token timed out
]);

export { CredentialMissingError };
export const WX_OA_BASE_URL = BASE_URL;
