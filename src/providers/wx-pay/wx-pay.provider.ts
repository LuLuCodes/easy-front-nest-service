import { Injectable } from '@nestjs/common';

import { CredentialMissingError, HttpClient, ProviderError, type Provider } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import { TenantCredentialVault } from '@tenant/credential-vault.service';

import { PlatformCertCache } from './platform-cert';
import { loadPrivateKey } from './signer';
import { WxPayClient, WX_PAY_BASE_URL } from './wx-pay.client';

@Injectable()
export class WxPayProvider implements Provider<WxPayClient> {
  readonly name = CREDENTIAL_PROVIDER.wx_pay;

  private readonly clients = new Map<string, WxPayClient>();
  private readonly httpClients = new Map<string, HttpClient>();
  private readonly certCaches = new Map<string, PlatformCertCache>();

  constructor(private readonly vault: TenantCredentialVault) {}

  async getClient(tenantId: number, mchId?: string): Promise<WxPayClient> {
    const credential = await this.vault.get(tenantId, this.name, mchId);
    if (!credential) throw new CredentialMissingError(this.name, tenantId);
    if (!credential.cert) {
      throw new ProviderError({
        provider: 'wx_pay',
        message: 'Merchant private key (cert) missing on credential',
        retryable: false,
      });
    }
    const cacheKey = `${tenantId}:${credential.app_id}`;
    let client = this.clients.get(cacheKey);
    if (client) return client;

    const http = this.httpClientFor(cacheKey);
    const platformCerts = this.certCacheFor(cacheKey, http);
    client = new WxPayClient({
      credential,
      http,
      privateKey: loadPrivateKey(credential.cert),
      platformCerts,
    });
    this.clients.set(cacheKey, client);
    return client;
  }

  async invalidate(tenantId: number, mchId?: string): Promise<void> {
    if (mchId) {
      const k = `${tenantId}:${mchId}`;
      this.clients.delete(k);
      this.httpClients.delete(k);
      this.certCaches.get(k)?.invalidate(tenantId, mchId);
      this.certCaches.delete(k);
    } else {
      const prefix = `${tenantId}:`;
      for (const k of this.clients.keys()) if (k.startsWith(prefix)) this.clients.delete(k);
      for (const k of this.httpClients.keys()) if (k.startsWith(prefix)) this.httpClients.delete(k);
      for (const [k, c] of this.certCaches.entries()) {
        if (k.startsWith(prefix)) {
          c.invalidate(tenantId);
          this.certCaches.delete(k);
        }
      }
    }
    await this.vault.invalidate(tenantId, this.name, mchId);
  }

  private httpClientFor(cacheKey: string): HttpClient {
    let client = this.httpClients.get(cacheKey);
    if (!client) {
      client = new HttpClient({ provider: 'wx_pay', baseURL: WX_PAY_BASE_URL });
      this.httpClients.set(cacheKey, client);
    }
    return client;
  }

  private certCacheFor(cacheKey: string, http: HttpClient): PlatformCertCache {
    let cache = this.certCaches.get(cacheKey);
    if (!cache) {
      cache = new PlatformCertCache(http);
      this.certCaches.set(cacheKey, cache);
    }
    return cache;
  }
}
