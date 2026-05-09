export interface WxAccessToken {
  access_token: string;
  expires_in: number;
}

export interface WxJsTicket {
  ticket: string;
  expires_in: number;
}

export interface WxOaCredentialMetadata {
  /** Plain "token" used to validate /webhook signature requests. */
  notify_token?: string;
  /** Optional EncodingAESKey for safe-mode webhook payloads (43 chars). */
  encoding_aes_key?: string;
}

export interface WxApiError {
  errcode: number;
  errmsg: string;
}

export interface NewsArticle {
  title: string;
  thumb_media_id: string;
  author?: string;
  digest?: string;
  show_cover_pic: 0 | 1;
  content: string;
  content_source_url?: string;
  need_open_comment?: 0 | 1;
  only_fans_can_comment?: 0 | 1;
}

export type SnsScope = 'snsapi_base' | 'snsapi_userinfo';
export type WxLang = 'zh_CN' | 'zh_TW' | 'en';
