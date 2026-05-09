import { Logger } from '@nestjs/common';
import type { KeyObject } from 'node:crypto';

import { HttpClient, ProviderError } from '@providers/base';

import { decryptNotify } from './notify-decoder';
import { buildAuthorizationHeader, loadPublicKeyFromCertPem } from './signer';
import type { AuthorizationParams } from './signer';

const REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000;

interface PlatformCertEntry {
  serial_no: string;
  effective_time: string;
  expire_time: string;
  certificate: string;
  publicKey: KeyObject;
}

interface CertCache {
  entries: Map<string, PlatformCertEntry>;
  fetchedAt: number;
}

/**
 * Caches platform certificates per (tenant, mch_id). Verification of
 * inbound responses uses the cert whose serial matches the
 * `Wechatpay-Serial` header WeChat returned.
 *
 * The bootstrap GET /v3/certificates response can't be verified (we
 * don't yet hold a cert). All subsequent calls go through verifyV3 in
 * the client, which depends on this cache being warm.
 */
export class PlatformCertCache {
  private readonly logger = new Logger(PlatformCertCache.name);
  private readonly entries = new Map<string, CertCache>();

  constructor(private readonly http: HttpClient) {}

  cacheKey(tenantId: number, mchId: string): string {
    return `${tenantId}:${mchId}`;
  }

  async get(
    tenantId: number,
    mchId: string,
    auth: AuthorizationParams,
    apiV3Key: string,
  ): Promise<Map<string, PlatformCertEntry>> {
    const key = this.cacheKey(tenantId, mchId);
    const cached = this.entries.get(key);
    if (cached && Date.now() - cached.fetchedAt < REFRESH_INTERVAL_MS && cached.entries.size > 0) {
      return cached.entries;
    }
    const fresh = await this.fetch(auth, apiV3Key);
    this.entries.set(key, { entries: fresh, fetchedAt: Date.now() });
    return fresh;
  }

  invalidate(tenantId: number, mchId?: string): void {
    if (mchId) {
      this.entries.delete(this.cacheKey(tenantId, mchId));
      return;
    }
    const prefix = `${tenantId}:`;
    for (const k of this.entries.keys()) if (k.startsWith(prefix)) this.entries.delete(k);
  }

  private async fetch(
    auth: AuthorizationParams,
    apiV3Key: string,
  ): Promise<Map<string, PlatformCertEntry>> {
    const path = '/v3/certificates';
    const authorization = buildAuthorizationHeader(
      { method: 'GET', pathWithQuery: path, body: '' },
      auth,
    );
    const res = await this.http.request<{
      data?: Array<{
        serial_no: string;
        effective_time: string;
        expire_time: string;
        encrypt_certificate: {
          algorithm: string;
          nonce: string;
          associated_data: string;
          ciphertext: string;
        };
      }>;
      code?: string;
      message?: string;
    }>({
      method: 'GET',
      url: path,
      headers: { Authorization: authorization, Accept: 'application/json' },
    });
    if (res.status >= 400 || !res.data?.data) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: res.data?.message ?? 'Failed to fetch platform certificates',
        statusCode: res.status,
      });
    }
    const out = new Map<string, PlatformCertEntry>();
    for (const item of res.data.data) {
      const certificatePem = decryptNotify(
        {
          associated_data: item.encrypt_certificate.associated_data,
          nonce: item.encrypt_certificate.nonce,
          ciphertext: item.encrypt_certificate.ciphertext,
        },
        apiV3Key,
      );
      out.set(item.serial_no, {
        serial_no: item.serial_no,
        effective_time: item.effective_time,
        expire_time: item.expire_time,
        certificate: certificatePem,
        publicKey: loadPublicKeyFromCertPem(certificatePem),
      });
    }
    this.logger.log(`Loaded ${out.size} platform certs for mch_id=${auth.mchId}`);
    return out;
  }
}
