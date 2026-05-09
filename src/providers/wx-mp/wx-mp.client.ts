import { createDecipheriv } from 'node:crypto';

import { HttpClient, ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import type {
  WxApiError,
  WxMpCode2SessionResult,
  WxMpQrCodeOptions,
  WxMpUnlimitedQrCodeOptions,
  WxMpUrlLinkOptions,
  WxMpUrlSchemeOptions,
} from './types';

const BASE_URL = 'https://api.weixin.qq.com';

export interface WxMpClientDeps {
  credential: DecryptedCredential;
  http: HttpClient;
  refreshAccessToken: () => Promise<string>;
  readAccessToken: () => Promise<string | null>;
}

export class WxMpClient {
  constructor(private readonly deps: WxMpClientDeps) {}

  get appId(): string {
    return this.deps.credential.app_id;
  }

  get tenantId(): number {
    return this.deps.credential.tenant_id;
  }

  // ─── Login flow ───────────────────────────────────────────────────────

  async getAccessToken(): Promise<string> {
    const cached = await this.deps.readAccessToken();
    return cached ?? (await this.deps.refreshAccessToken());
  }

  /**
   * Exchange a wx.login() js_code for openid + session_key. The session_key
   * is sensitive — never echo it back to the client; pass it to
   * decryptUserData() inside the same request to read user-encrypted data.
   */
  async code2Session(jsCode: string): Promise<WxMpCode2SessionResult> {
    const res = await this.deps.http.request<WxMpCode2SessionResult & WxApiError>({
      method: 'GET',
      url: '/sns/jscode2session',
      params: {
        appid: this.appId,
        secret: this.deps.credential.secret,
        js_code: jsCode,
        grant_type: 'authorization_code',
      },
    });
    this.assertOk(res.data);
    return {
      openid: res.data.openid,
      session_key: res.data.session_key,
      unionid: res.data.unionid,
    };
  }

  /**
   * Decrypts the encryptedData blob returned by wx.getUserInfo /
   * wx.getPhoneNumber. Returns the parsed JSON payload or throws a
   * ProviderError if the watermark.appid does not match this credential.
   */
  decryptUserData<T extends Record<string, unknown> = Record<string, unknown>>(
    sessionKey: string,
    encryptedData: string,
    iv: string,
  ): T {
    const key = Buffer.from(sessionKey, 'base64');
    const ivBuf = Buffer.from(iv, 'base64');
    const dataBuf = Buffer.from(encryptedData, 'base64');
    if (key.length !== 16 || ivBuf.length !== 16) {
      throw new ProviderError({
        provider: 'wx_mp',
        message: 'Invalid session_key or iv length',
        retryable: false,
      });
    }
    const decipher = createDecipheriv('aes-128-cbc', key, ivBuf);
    decipher.setAutoPadding(true);
    const decoded = Buffer.concat([decipher.update(dataBuf), decipher.final()]).toString('utf8');
    const parsed = JSON.parse(decoded) as T & { watermark?: { appid?: string } };
    if (parsed.watermark?.appid && parsed.watermark.appid !== this.appId) {
      throw new ProviderError({
        provider: 'wx_mp',
        message: 'AppId mismatch in decrypted user data watermark',
        retryable: false,
      });
    }
    return parsed;
  }

  // ─── QR codes ─────────────────────────────────────────────────────────

  /**
   * `/cgi-bin/qrcode/create` style — permanent code, ≤100,000 codes per
   * appId. Returns the raw image bytes.
   */
  async createQrCode(options: WxMpQrCodeOptions): Promise<Buffer> {
    return this.binaryPost('/wxa/getwxacode', options);
  }

  /**
   * `/wxa/getwxacode` — limited variant; permanent, with quota.
   */
  async getWxaCode(options: WxMpQrCodeOptions): Promise<Buffer> {
    return this.binaryPost('/wxa/getwxacode', options);
  }

  /**
   * `/wxa/getwxacodeunlimit` — unlimited variant. `scene` ≤ 32 bytes;
   * the page is enforced server-side when check_path = true.
   */
  async getUnlimitedQrCode(options: WxMpUnlimitedQrCodeOptions): Promise<Buffer> {
    return this.binaryPost('/wxa/getwxacodeunlimit', options);
  }

  // ─── URL Scheme / URL Link ────────────────────────────────────────────

  async generateUrlScheme(options: WxMpUrlSchemeOptions): Promise<{ openlink: string }> {
    const data = await this.authedPost<{ openlink: string } & WxApiError>(
      '/wxa/generatescheme',
      options,
    );
    return { openlink: data.openlink };
  }

  async generateUrlLink(options: WxMpUrlLinkOptions): Promise<{ url_link: string }> {
    const data = await this.authedPost<{ url_link: string } & WxApiError>(
      '/wxa/generate_urllink',
      options,
    );
    return { url_link: data.url_link };
  }

  // ─── Internals ────────────────────────────────────────────────────────

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

  /**
   * QR-code endpoints return the binary image directly on success and a
   * JSON error object on failure. We sniff the content-type to disambiguate.
   */
  private async binaryPost(path: string, body: unknown): Promise<Buffer> {
    const access_token = await this.getAccessToken();
    const res = await this.deps.http.request<Buffer>({
      method: 'POST',
      url: path,
      params: { access_token },
      data: body,
      headers: { 'content-type': 'application/json' },
      responseType: 'arraybuffer',
    });
    const contentType = res.headers['content-type'] as string | undefined;
    if (contentType?.includes('application/json')) {
      const err = JSON.parse(res.data.toString('utf8')) as WxApiError;
      this.assertOk(err);
    }
    return res.data;
  }

  private assertOk(data: WxApiError | unknown): void {
    const err = data as WxApiError;
    if (typeof err.errcode === 'number' && err.errcode !== 0) {
      throw new ProviderError({
        provider: 'wx_mp',
        message: err.errmsg ?? 'WeChat MP API error',
        upstreamCode: err.errcode,
        retryable: TRANSIENT_ERR_CODES.has(err.errcode),
      });
    }
  }
}

const TRANSIENT_ERR_CODES = new Set([-1, 40001, 41001, 42001]);

export const WX_MP_BASE_URL = BASE_URL;
