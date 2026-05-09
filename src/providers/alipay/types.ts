/**
 * Alipay credential metadata blob (lives in t_tenant_credential.metadata).
 *
 * The merchant private key (used to sign requests) is stored in
 * `credential.secret`; the alipay platform public key (used to verify
 * responses + async notifies) is stored in `credential.cert`. Both
 * are AES-GCM encrypted at rest by TenantCredentialVault.
 */
export interface AlipayCredentialMetadata {
  /** Default async notify URL — overridable per-request. */
  notify_url?: string;
  /** Default browser return URL for page/wap pay. */
  return_url?: string;
  /** Gateway override (default https://openapi.alipay.com/gateway.do). */
  gateway?: string;
  /** Sign type, default 'RSA2'. */
  sign_type?: 'RSA2';
  /** Private key encoding: PKCS1 (default, BEGIN RSA PRIVATE KEY) or PKCS8. */
  key_type?: 'PKCS1' | 'PKCS8';
  /** AES-128 key for content-encrypted requests (optional, base64). */
  encrypt_key?: string;
  /** Network timeout (ms), default 5000. */
  timeout_ms?: number;
}

export interface PrecreateRequest {
  out_trade_no: string;
  total_amount: string;
  subject: string;
  body?: string;
  time_expire?: string;
  notify_url?: string;
}

export interface FaceToFaceRequest extends PrecreateRequest {
  /** Buyer's barcode/auth_code scanned at POS. */
  auth_code: string;
}

export interface PageOrderRequest extends PrecreateRequest {
  product_code?: 'FAST_INSTANT_TRADE_PAY';
  return_url?: string;
}

export interface WapOrderRequest extends PrecreateRequest {
  product_code?: 'QUICK_WAP_WAY';
  return_url?: string;
  quit_url?: string;
}

export interface AppOrderRequest extends PrecreateRequest {
  product_code?: 'QUICK_MSECURITY_PAY';
}

export interface RefundRequest {
  out_trade_no?: string;
  trade_no?: string;
  refund_amount: string;
  out_request_no?: string;
  refund_reason?: string;
}

export interface RefundQueryRequest {
  out_trade_no?: string;
  trade_no?: string;
  out_request_no: string;
}

/**
 * Async notify form payload from alipay. Always urlencoded body, alipay
 * decides which fields are present; signature is in `sign` and the
 * verifier digests every other field.
 */
export type AlipayNotifyPayload = Record<string, string>;

export interface AlipayNotifyDecoded {
  out_trade_no: string;
  trade_no: string;
  trade_status: string;
  total_amount?: string;
  raw: AlipayNotifyPayload;
}
