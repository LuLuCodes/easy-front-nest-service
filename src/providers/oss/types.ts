/**
 * OSS credential metadata blob (lives in t_tenant_credential.metadata).
 *
 * Layout in t_tenant_credential:
 *  - `app_id`            → bucket name (also used to namespace cached clients)
 *  - `secret` (encrypted) → access_key_secret
 *  - `cert` (encrypted)   → access_key_id (paired with secret, also rotation-sensitive)
 *  - `metadata`           → OssCredentialMetadata (this file)
 */
export interface OssCredentialMetadata {
  /** Region slug, e.g. `oss-cn-hangzhou`. */
  region: string;
  /** OSS endpoint, e.g. `https://oss-cn-hangzhou.aliyuncs.com`. */
  endpoint?: string;
  /** Use VPC-internal endpoint when running inside Alibaba Cloud. */
  internal?: boolean;
  /** Replace returned object URL host with this CDN domain. */
  domain?: string;
  /** Use HTTPS, default true. */
  secure?: boolean;
  /** Per-instance request timeout (ms), default 60000. */
  timeout_ms?: number;
}

export interface UploadFileSpec {
  /** Object key (no leading slash). */
  key: string;
  /** Buffer or readable stream. */
  body: Buffer | NodeJS.ReadableStream;
  /** MIME type (Content-Type), optional — OSS infers from key if absent. */
  mime?: string;
}

export interface PutObjectResult {
  /** Object key as stored. */
  key: string;
  /** Object URL, with CDN domain substituted if configured. */
  url: string;
}

export interface SignedUrlOptions {
  /** Validity in seconds, default 1800 (30 min). Capped at 7d. */
  expires_seconds?: number;
  /** HTTP method, default GET (download). */
  method?: 'GET' | 'PUT';
  /** Content-Type to bind to the signature for PUT. */
  content_type?: string;
}

export interface PostObjectParams {
  access_key_id: string;
  policy: string;
  signature: string;
  /** Browser POSTs to this host. */
  host: string;
  /** Optional CDN host the client should rewrite into the response URL. */
  domain?: string;
  /** ISO 8601 expiration. */
  expire: string;
  /** Suggested upload directory under bucket root; client can extend. */
  dir?: string;
}

export interface PostObjectRequest {
  /** Max upload size in MiB. */
  max_size_mb?: number;
  /** Validity (seconds) of the policy itself. Default 1h. */
  expires_seconds?: number;
  /** Optional `key starts-with` constraint. */
  dir?: string;
}
