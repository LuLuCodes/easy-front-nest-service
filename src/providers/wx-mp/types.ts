export interface WxMpCode2SessionResult {
  openid: string;
  session_key: string;
  unionid?: string;
}

export interface WxMpQrCodeOptions {
  path: string;
  width?: number;
  auto_color?: boolean;
  line_color?: { r: number; g: number; b: number };
  is_hyaline?: boolean;
}

export interface WxMpUnlimitedQrCodeOptions {
  scene: string;
  page?: string;
  width?: number;
  check_path?: boolean;
  auto_color?: boolean;
  line_color?: { r: number; g: number; b: number };
  is_hyaline?: boolean;
  env_version?: 'release' | 'trial' | 'develop';
}

export interface WxMpUrlSchemeOptions {
  jump_wxa?: { path: string; query?: string; env_version?: string };
  is_expire?: boolean;
  expire_time?: number;
  expire_type?: 0 | 1;
  expire_interval?: number;
}

export interface WxMpUrlLinkOptions {
  path?: string;
  query?: string;
  env_version?: 'release' | 'trial' | 'develop';
  is_expire?: boolean;
  expire_type?: 0 | 1;
  expire_time?: number;
  expire_interval?: number;
  cloud_base?: Record<string, unknown>;
}

export interface WxApiError {
  errcode?: number;
  errmsg?: string;
}
