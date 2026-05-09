import type { AlipaySdk, AlipaySdkCommonResult } from 'alipay-sdk';

import { ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import type {
  AlipayCredentialMetadata,
  AlipayNotifyDecoded,
  AlipayNotifyPayload,
  AppOrderRequest,
  FaceToFaceRequest,
  PageOrderRequest,
  PrecreateRequest,
  RefundQueryRequest,
  RefundRequest,
  WapOrderRequest,
} from './types';

export interface AlipayClientDeps {
  sdk: AlipaySdk;
  credential: DecryptedCredential;
}

const M = {
  precreate: 'alipay.trade.precreate',
  pay: 'alipay.trade.pay',
  pagePay: 'alipay.trade.page.pay',
  wapPay: 'alipay.trade.wap.pay',
  appPay: 'alipay.trade.app.pay',
  query: 'alipay.trade.query',
  close: 'alipay.trade.close',
  refund: 'alipay.trade.refund',
  refundQuery: 'alipay.trade.fastpay.refund.query',
} as const;

export class AlipayClient {
  private readonly meta: AlipayCredentialMetadata;

  constructor(private readonly deps: AlipayClientDeps) {
    this.meta = (deps.credential.metadata ?? {}) as AlipayCredentialMetadata;
  }

  // ─── Order creation ──────────────────────────────────────────────────

  async precreate(req: PrecreateRequest): Promise<{ qr_code: string; raw: AlipaySdkCommonResult }> {
    const result = await this.exec(M.precreate, this.bizContent(req), {
      notifyUrl: req.notify_url,
    });
    const qrCode =
      (result as { qr_code?: string; qrCode?: string }).qr_code ??
      (result as { qrCode?: string }).qrCode;
    if (!qrCode) {
      throw new ProviderError({
        provider: 'alipay',
        message: 'precreate response missing qr_code',
        upstreamCode: result.code,
        retryable: false,
      });
    }
    return { qr_code: qrCode, raw: result };
  }

  async faceToFace(req: FaceToFaceRequest): Promise<AlipaySdkCommonResult> {
    const { auth_code, ...rest } = req;
    return this.exec(
      M.pay,
      { ...this.bizContent(rest), scene: 'bar_code', auth_code },
      { notifyUrl: req.notify_url },
    );
  }

  /**
   * 网页支付. Returns either a redirect URL (httpMethod=GET) or a raw HTML
   * form the browser POSTs to alipay (httpMethod=POST, default).
   */
  pagePay(req: PageOrderRequest, httpMethod: 'GET' | 'POST' = 'POST'): string {
    return this.deps.sdk.pageExec(M.pagePay, httpMethod, {
      bizContent: {
        ...this.bizContent(req),
        product_code: req.product_code ?? 'FAST_INSTANT_TRADE_PAY',
      },
      notifyUrl: req.notify_url ?? this.meta.notify_url,
      returnUrl: req.return_url ?? this.meta.return_url,
    });
  }

  wapPay(req: WapOrderRequest, httpMethod: 'GET' | 'POST' = 'GET'): string {
    return this.deps.sdk.pageExec(M.wapPay, httpMethod, {
      bizContent: {
        ...this.bizContent(req),
        product_code: req.product_code ?? 'QUICK_WAP_WAY',
        ...(req.quit_url ? { quit_url: req.quit_url } : {}),
      },
      notifyUrl: req.notify_url ?? this.meta.notify_url,
      returnUrl: req.return_url ?? this.meta.return_url,
    });
  }

  /**
   * APP 支付. Returns the encoded order string the mobile client passes
   * to the alipay app SDK.
   */
  appPay(req: AppOrderRequest): string {
    return this.deps.sdk.sdkExec(M.appPay, {
      bizContent: {
        ...this.bizContent(req),
        product_code: req.product_code ?? 'QUICK_MSECURITY_PAY',
      },
      notifyUrl: req.notify_url ?? this.meta.notify_url,
    });
  }

  // ─── Query / close / refund ──────────────────────────────────────────

  async queryOrder(opts: {
    out_trade_no?: string;
    trade_no?: string;
  }): Promise<AlipaySdkCommonResult> {
    requireOneOf(opts, ['out_trade_no', 'trade_no']);
    return this.exec(M.query, opts);
  }

  async closeOrder(opts: {
    out_trade_no?: string;
    trade_no?: string;
  }): Promise<AlipaySdkCommonResult> {
    requireOneOf(opts, ['out_trade_no', 'trade_no']);
    return this.exec(M.close, opts);
  }

  async refund(req: RefundRequest): Promise<AlipaySdkCommonResult> {
    requireOneOf(req, ['out_trade_no', 'trade_no']);
    return this.exec(M.refund, { ...req });
  }

  async queryRefund(req: RefundQueryRequest): Promise<AlipaySdkCommonResult> {
    requireOneOf(req, ['out_trade_no', 'trade_no']);
    return this.exec(M.refundQuery, { ...req });
  }

  // ─── Async notify verification ───────────────────────────────────────

  /**
   * Verifies an alipay async notify form payload against the configured
   * platform public key. The SDK handles all RSA-SHA256 details.
   */
  verifyNotify(payload: AlipayNotifyPayload): AlipayNotifyDecoded {
    if (!payload || typeof payload !== 'object') {
      throw new ProviderError({
        provider: 'alipay',
        message: 'Empty notify payload',
        retryable: false,
      });
    }
    const ok = this.deps.sdk.checkNotifySign(payload);
    if (!ok) {
      throw new ProviderError({
        provider: 'alipay',
        message: 'Async notify signature verification failed',
        retryable: false,
      });
    }
    const out_trade_no = pickString(payload, 'out_trade_no');
    const trade_no = pickString(payload, 'trade_no');
    const trade_status = pickString(payload, 'trade_status');
    if (!out_trade_no || !trade_no || !trade_status) {
      throw new ProviderError({
        provider: 'alipay',
        message: 'Notify payload missing out_trade_no / trade_no / trade_status',
        retryable: false,
      });
    }
    return {
      out_trade_no,
      trade_no,
      trade_status,
      total_amount: pickString(payload, 'total_amount'),
      raw: payload,
    };
  }

  // ─── Internals ───────────────────────────────────────────────────────

  private async exec(
    method: string,
    biz: Record<string, unknown>,
    opts: { notifyUrl?: string } = {},
  ): Promise<AlipaySdkCommonResult> {
    const params: Record<string, unknown> = { bizContent: biz };
    const notifyUrl = opts.notifyUrl ?? this.meta.notify_url;
    if (notifyUrl) params.notifyUrl = notifyUrl;
    const res = await this.deps.sdk.exec(method, params);
    if (!isSuccess(res)) {
      const subMsg =
        (res as { sub_msg?: string; subMsg?: string }).sub_msg ??
        (res as { subMsg?: string }).subMsg;
      const subCode =
        (res as { sub_code?: string; subCode?: string }).sub_code ??
        (res as { subCode?: string }).subCode;
      throw new ProviderError({
        provider: 'alipay',
        message: `${method} failed: ${subMsg ?? res.msg ?? 'unknown'}`,
        upstreamCode: subCode ?? res.code,
        retryable: false,
      });
    }
    return res;
  }

  private bizContent(req: PrecreateRequest): Record<string, unknown> {
    const out: Record<string, unknown> = {
      out_trade_no: req.out_trade_no,
      total_amount: req.total_amount,
      subject: req.subject,
    };
    if (req.body) out.body = req.body;
    if (req.time_expire) out.time_expire = req.time_expire;
    return out;
  }
}

function isSuccess(res: AlipaySdkCommonResult): boolean {
  return res.code === '10000';
}

function pickString(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key];
  return typeof v === 'string' ? v : undefined;
}

function requireOneOf<T extends object>(obj: T, keys: (keyof T)[]): void {
  const present = keys.filter((k) => obj[k] !== undefined && obj[k] !== '');
  if (present.length === 0) {
    throw new ProviderError({
      provider: 'alipay',
      message: `One of [${keys.join(', ')}] is required`,
      retryable: false,
    });
  }
}
