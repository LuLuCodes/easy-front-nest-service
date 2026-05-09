export interface WxPayCredentialMetadata {
  /** API v3 secret used as AEAD key for notify decryption. */
  api_v3_key: string;
  /** Default notify URL (concrete URL is per-tenant, see controller). */
  notify_url?: string;
  refund_notify_url?: string;
  appid?: string;
}

export interface NativeOrderRequest {
  out_trade_no: string;
  description: string;
  notify_url: string;
  amount: { total: number; currency?: 'CNY' };
  attach?: string;
  time_expire?: string;
}

export interface JsApiOrderRequest extends NativeOrderRequest {
  payer: { openid: string };
}

export interface H5OrderRequest extends NativeOrderRequest {
  scene_info: {
    payer_client_ip: string;
    h5_info: { type: 'iOS' | 'Android' | 'Wap'; app_name?: string; app_url?: string };
  };
}

export interface AppOrderRequest extends NativeOrderRequest {}

export interface RefundRequest {
  out_trade_no?: string;
  transaction_id?: string;
  out_refund_no: string;
  notify_url?: string;
  reason?: string;
  amount: { refund: number; total: number; currency?: 'CNY' };
}

export interface WxPayOrderState {
  appid: string;
  mchid: string;
  out_trade_no: string;
  transaction_id?: string;
  trade_type?: string;
  trade_state: string;
  trade_state_desc: string;
  bank_type?: string;
  attach?: string;
  success_time?: string;
  payer?: { openid: string };
  amount?: { total: number; payer_total: number; currency: string; payer_currency: string };
}

export interface WxPayApiError {
  code: string;
  message: string;
  detail?: unknown;
}

export interface WxPayNotifyEnvelope {
  id: string;
  create_time: string;
  resource_type: string;
  event_type: string;
  summary: string;
  resource: {
    original_type: string;
    algorithm: 'AEAD_AES_256_GCM';
    ciphertext: string;
    associated_data: string;
    nonce: string;
  };
}
