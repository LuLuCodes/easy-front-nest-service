import { createHmac } from 'node:crypto';

import OSS from 'ali-oss';

import { ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import type {
  OssCredentialMetadata,
  PostObjectParams,
  PostObjectRequest,
  PutObjectResult,
  SignedUrlOptions,
  UploadFileSpec,
} from './types';

const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_DOWNLOAD_TTL = 1800;
const DEFAULT_POLICY_TTL = 3600;
const MAX_TTL = 7 * 24 * 3600;
const DEFAULT_MAX_SIZE_MB = 10;

export interface OssClientDeps {
  credential: DecryptedCredential;
}

export class OssClient {
  private readonly oss: OSS;
  private readonly meta: OssCredentialMetadata;
  private readonly accessKeyId: string;
  private readonly accessKeySecret: string;
  private readonly bucket: string;
  private readonly domain?: string;

  constructor(deps: OssClientDeps) {
    const meta = (deps.credential.metadata ?? {}) as Partial<OssCredentialMetadata>;
    if (!meta.region) {
      throw new ProviderError({
        provider: 'oss',
        message: 'metadata.region missing on OSS credential',
        retryable: false,
      });
    }
    if (!deps.credential.cert) {
      throw new ProviderError({
        provider: 'oss',
        message: 'access_key_id (cert) missing on OSS credential',
        retryable: false,
      });
    }
    if (!deps.credential.secret) {
      throw new ProviderError({
        provider: 'oss',
        message: 'access_key_secret (secret) missing on OSS credential',
        retryable: false,
      });
    }
    this.meta = meta as OssCredentialMetadata;
    this.accessKeyId = deps.credential.cert;
    this.accessKeySecret = deps.credential.secret;
    this.bucket = deps.credential.app_id;
    this.domain = normalizeDomain(meta.domain);

    this.oss = new OSS({
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accessKeySecret,
      region: this.meta.region,
      endpoint: this.meta.endpoint,
      bucket: this.bucket,
      internal: this.meta.internal ?? false,
      secure: this.meta.secure ?? true,
      timeout: this.meta.timeout_ms ?? DEFAULT_TIMEOUT_MS,
    });
  }

  /** Direct upload via OSS SDK. Use for server-side uploads only. */
  async put(spec: UploadFileSpec): Promise<PutObjectResult> {
    if (!spec.key || spec.key.startsWith('/')) {
      throw new ProviderError({
        provider: 'oss',
        message: 'Object key must be non-empty and not start with "/"',
        retryable: false,
      });
    }
    const result = await this.oss.put(spec.key, spec.body, {
      mime: spec.mime,
    });
    return { key: result.name, url: this.rewriteHost(result.url) };
  }

  /**
   * Generates a signed URL for download (GET) or upload (PUT). The URL
   * carries an expiring HMAC; treat it as sensitive.
   */
  signedUrl(name: string, options: SignedUrlOptions = {}): string {
    if (!name || name.startsWith('/')) {
      throw new ProviderError({
        provider: 'oss',
        message: 'Object key must be non-empty and not start with "/"',
        retryable: false,
      });
    }
    const expires = clampTtl(options.expires_seconds ?? DEFAULT_DOWNLOAD_TTL);
    const method = options.method ?? 'GET';
    const url = this.oss.signatureUrl(name, {
      expires,
      method,
      'Content-Type': options.content_type,
    });
    return this.rewriteHost(url);
  }

  /**
   * Builds parameters for a browser PostObject upload (CORS-friendly,
   * never proxied through the server). Returns the pieces the client
   * needs to construct the multipart form.
   *
   * The client posts to `host` with form fields:
   *   policy, signature, OSSAccessKeyId, key, success_action_status, file
   *
   * The OSS PostObject signature is HMAC-SHA1(policyBase64, accessKeySecret).
   */
  signPostObjectParams(req: PostObjectRequest): PostObjectParams {
    const ttl = clampTtl(req.expires_seconds ?? DEFAULT_POLICY_TTL);
    const maxBytes = (req.max_size_mb ?? DEFAULT_MAX_SIZE_MB) * 1024 * 1024;
    const expire = new Date(Date.now() + ttl * 1000).toISOString();
    const conditions: unknown[] = [['content-length-range', 0, maxBytes]];
    const dir = normalizeDir(req.dir);
    if (dir) conditions.push(['starts-with', '$key', dir]);

    const policyText = JSON.stringify({ expiration: expire, conditions });
    const policy = Buffer.from(policyText, 'utf8').toString('base64');
    const signature = createHmac('sha1', this.accessKeySecret).update(policy).digest('base64');

    return {
      access_key_id: this.accessKeyId,
      policy,
      signature,
      host: this.postHost(),
      domain: this.domain,
      expire,
      dir,
    };
  }

  /** Bucket name in use (e.g. for diagnostics/logs). */
  getBucket(): string {
    return this.bucket;
  }

  // ─── internals ────────────────────────────────────────────────────────

  private postHost(): string {
    const protocol = this.meta.secure === false ? 'http' : 'https';
    const region = this.meta.region;
    const internalSuffix = this.meta.internal ? '-internal' : '';
    return `${protocol}://${this.bucket}.${region}${internalSuffix}.aliyuncs.com`;
  }

  private rewriteHost(url: string): string {
    if (!this.domain) return url;
    return url.replace(/^(https?:\/\/)([^/]+)/, `$1${this.domain}`);
  }
}

function clampTtl(seconds: number): number {
  if (!Number.isFinite(seconds) || seconds <= 0) return DEFAULT_DOWNLOAD_TTL;
  return Math.min(Math.floor(seconds), MAX_TTL);
}

function normalizeDir(dir?: string): string | undefined {
  if (!dir) return undefined;
  return dir.endsWith('/') ? dir : `${dir}/`;
}

function normalizeDomain(domain?: string): string | undefined {
  if (!domain) return undefined;
  return domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
