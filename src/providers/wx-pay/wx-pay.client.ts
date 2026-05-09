import type { KeyObject } from 'node:crypto';

import { HttpClient, ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import { decryptNotify } from './notify-decoder';
import type { PlatformCertCache } from './platform-cert';
import { buildAuthorizationHeader, verifyV3Signature, type AuthorizationParams } from './signer';
import type {
  AppOrderRequest,
  H5OrderRequest,
  JsApiOrderRequest,
  NativeOrderRequest,
  RefundRequest,
  WxPayApiError,
  WxPayCredentialMetadata,
  WxPayNotifyEnvelope,
  WxPayOrderState,
} from './types';

export const WX_PAY_BASE_URL = 'https://api.mch.weixin.qq.com';

export interface WxPayClientDeps {
  credential: DecryptedCredential;
  http: HttpClient;
  privateKey: KeyObject;
  platformCerts: PlatformCertCache;
}

export class WxPayClient {
  private readonly auth: AuthorizationParams;
  private readonly mchId: string;
  private readonly apiV3Key: string;
  private readonly defaultAppId?: string;

  constructor(private readonly deps: WxPayClientDeps) {
    const meta = deps.credential.metadata as unknown as WxPayCredentialMetadata | undefined;
    if (!meta?.api_v3_key) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: 'api_v3_key missing from credential metadata',
        retryable: false,
      });
    }
    this.mchId = deps.credential.app_id; // app_id stores mch_id for wx_pay
    this.apiV3Key = meta.api_v3_key;
    this.defaultAppId = meta.appid;
    if (!deps.credential.cert_serial_no) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: 'cert_serial_no missing on credential',
        retryable: false,
      });
    }
    this.auth = {
      mchId: this.mchId,
      serialNo: deps.credential.cert_serial_no,
      privateKey: deps.privateKey,
    };
  }

  // ─── Order creation ──────────────────────────────────────────────────

  /** Native (扫码支付). Returns the QR code URL to render. */
  async createNativeOrder(req: NativeOrderRequest): Promise<{ code_url: string }> {
    return this.signedPost('/v3/pay/transactions/native', this.withAppId(req));
  }

  /** JSAPI (公众号 / 小程序内支付). Returns prepay_id. */
  async createJsApiOrder(req: JsApiOrderRequest): Promise<{ prepay_id: string }> {
    return this.signedPost('/v3/pay/transactions/jsapi', this.withAppId(req));
  }

  /** H5 wap. Returns h5_url to redirect to. */
  async createH5Order(req: H5OrderRequest): Promise<{ h5_url: string }> {
    return this.signedPost('/v3/pay/transactions/h5', this.withAppId(req));
  }

  /** APP. Returns prepay_id. */
  async createAppOrder(req: AppOrderRequest): Promise<{ prepay_id: string }> {
    return this.signedPost('/v3/pay/transactions/app', this.withAppId(req));
  }

  // ─── Order management ────────────────────────────────────────────────

  async queryOrder(outTradeNo: string): Promise<WxPayOrderState> {
    return this.signedGet(
      `/v3/pay/transactions/out-trade-no/${encodeURIComponent(outTradeNo)}?mchid=${this.mchId}`,
    );
  }

  async closeOrder(outTradeNo: string): Promise<void> {
    await this.signedPost(
      `/v3/pay/transactions/out-trade-no/${encodeURIComponent(outTradeNo)}/close`,
      { mchid: this.mchId },
      { expectEmpty: true },
    );
  }

  // ─── Refunds ─────────────────────────────────────────────────────────

  async refund(req: RefundRequest): Promise<unknown> {
    return this.signedPost('/v3/refund/domestic/refunds', req);
  }

  async queryRefund(outRefundNo: string): Promise<unknown> {
    return this.signedGet(`/v3/refund/domestic/refunds/${encodeURIComponent(outRefundNo)}`);
  }

  // ─── Notify (async webhook) ──────────────────────────────────────────

  /**
   * Verify a v3 webhook callback against a cached platform cert and
   * decrypt the AEAD `resource` block. Returns the inner JSON
   * payload as a parsed object.
   *
   * The caller (controller) is responsible for forwarding the parsed
   * notify into a queue / business handler. Always responds with 200
   * (per WeChat docs) unless verification fails.
   */
  async verifyAndDecryptNotify(
    body: string,
    headers: { signature: string; serial: string; timestamp: string; nonce: string },
  ): Promise<{ envelope: WxPayNotifyEnvelope; resource: Record<string, unknown> }> {
    const certs = await this.deps.platformCerts.get(
      this.deps.credential.tenant_id,
      this.mchId,
      this.auth,
      this.apiV3Key,
    );
    const cert = certs.get(headers.serial);
    if (!cert) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: `No platform cert found for serial ${headers.serial}`,
        retryable: false,
      });
    }
    const ok = verifyV3Signature(
      {
        body,
        timestamp: headers.timestamp,
        nonce: headers.nonce,
        signature: headers.signature,
      },
      cert.publicKey,
    );
    if (!ok) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: 'Notify signature verification failed',
        retryable: false,
      });
    }
    const envelope = JSON.parse(body) as WxPayNotifyEnvelope;
    const inner = decryptNotify(
      {
        associated_data: envelope.resource.associated_data,
        nonce: envelope.resource.nonce,
        ciphertext: envelope.resource.ciphertext,
      },
      this.apiV3Key,
    );
    return { envelope, resource: JSON.parse(inner) as Record<string, unknown> };
  }

  // ─── Internals ────────────────────────────────────────────────────────

  private withAppId<T extends object>(req: T): T & { appid: string; mchid: string } {
    const mergedAppId = (req as Record<string, unknown>).appid;
    const appid =
      typeof mergedAppId === 'string' && mergedAppId.length > 0 ? mergedAppId : this.defaultAppId;
    if (!appid) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: 'appid required (set via metadata.appid or request body)',
        retryable: false,
      });
    }
    return { ...req, appid, mchid: this.mchId } as T & { appid: string; mchid: string };
  }

  private async signedPost<T>(
    path: string,
    body: unknown,
    opts: { expectEmpty?: boolean } = {},
  ): Promise<T> {
    const stringifiedBody = JSON.stringify(body);
    const authorization = buildAuthorizationHeader(
      { method: 'POST', pathWithQuery: path, body: stringifiedBody },
      this.auth,
    );
    const res = await this.deps.http.request<T & WxPayApiError>({
      method: 'POST',
      url: path,
      data: stringifiedBody,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    });
    this.assertOk(res.status, res.data);
    return opts.expectEmpty ? (undefined as unknown as T) : (res.data as T);
  }

  private async signedGet<T>(pathWithQuery: string): Promise<T> {
    const authorization = buildAuthorizationHeader(
      { method: 'GET', pathWithQuery, body: '' },
      this.auth,
    );
    const res = await this.deps.http.request<T & WxPayApiError>({
      method: 'GET',
      url: pathWithQuery,
      headers: { Authorization: authorization, Accept: 'application/json' },
    });
    this.assertOk(res.status, res.data);
    return res.data as T;
  }

  private assertOk(status: number, data: WxPayApiError | unknown): void {
    if (status >= 400) {
      const err = data as Partial<WxPayApiError> | undefined;
      throw new ProviderError({
        provider: 'wx_pay',
        message: err?.message ?? 'WeChat Pay v3 error',
        statusCode: status,
        upstreamCode: err?.code,
        retryable: status >= 500,
      });
    }
  }
}
