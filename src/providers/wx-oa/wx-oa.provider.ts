import { Injectable, Logger } from '@nestjs/common';

import { CredentialMissingError, HttpClient, type Provider } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import { TenantCredentialVault } from '@tenant/credential-vault.service';
import { RedisLock } from '@libs/redlock';

import { WxAccessTokenStore } from './access-token.store';
import { WxOaClient, WX_OA_BASE_URL } from './wx-oa.client';
import type { WxAccessToken, WxApiError } from './types';
import { ProviderError } from '@providers/base';

const REFRESH_LOCK_KEY = (tenantId: number, appId: string) =>
  `wx_oa:lock:refresh:${tenantId}:${appId}`;
const REFRESH_LOCK_TTL_MS = 5_000;

@Injectable()
export class WxOaProvider implements Provider<WxOaClient> {
  readonly name = CREDENTIAL_PROVIDER.wx_oa;

  private readonly logger = new Logger(WxOaProvider.name);
  private readonly clients = new Map<string, WxOaClient>();
  private readonly httpClients = new Map<string, HttpClient>();

  constructor(
    private readonly vault: TenantCredentialVault,
    private readonly tokenStore: WxAccessTokenStore,
  ) {}

  async getClient(tenantId: number, appId?: string): Promise<WxOaClient> {
    const credential = await this.vault.get(tenantId, this.name, appId);
    if (!credential) {
      throw new CredentialMissingError(this.name, tenantId);
    }
    const cacheKey = `${tenantId}:${credential.app_id}`;
    let client = this.clients.get(cacheKey);
    if (client) return client;

    const http = this.httpClientFor(cacheKey);
    client = new WxOaClient({
      credential,
      http,
      readAccessToken: () => this.tokenStore.read(tenantId, credential.app_id),
      refreshAccessToken: () =>
        this.refreshAccessTokenLocked(tenantId, credential.app_id, credential.secret, http),
    });
    this.clients.set(cacheKey, client);
    return client;
  }

  async invalidate(tenantId: number, appId?: string): Promise<void> {
    if (appId) {
      this.clients.delete(`${tenantId}:${appId}`);
      this.httpClients.delete(`${tenantId}:${appId}`);
    } else {
      const prefix = `${tenantId}:`;
      for (const k of this.clients.keys()) if (k.startsWith(prefix)) this.clients.delete(k);
      for (const k of this.httpClients.keys()) if (k.startsWith(prefix)) this.httpClients.delete(k);
    }
    await Promise.all([
      this.vault.invalidate(tenantId, this.name, appId),
      this.tokenStore.invalidate(tenantId, appId),
    ]);
  }

  private httpClientFor(cacheKey: string): HttpClient {
    let client = this.httpClients.get(cacheKey);
    if (!client) {
      client = new HttpClient({ provider: 'wx_oa', baseURL: WX_OA_BASE_URL });
      this.httpClients.set(cacheKey, client);
    }
    return client;
  }

  /**
   * Concurrent callers across the cluster are serialized through redlock,
   * so a token refresh fans out to a single WeChat API call. Inside the
   * lock we re-check the cache to avoid the standard double-refresh race.
   */
  private async refreshAccessTokenLocked(
    tenantId: number,
    appId: string,
    secret: string,
    http: HttpClient,
  ): Promise<string> {
    const lockKey = REFRESH_LOCK_KEY(tenantId, appId);
    const lock = await RedisLock.lock(lockKey, REFRESH_LOCK_TTL_MS);
    try {
      const recheck = await this.tokenStore.read(tenantId, appId);
      if (recheck) return recheck;

      const res = await http.request<WxAccessToken & WxApiError>({
        method: 'GET',
        url: '/cgi-bin/token',
        params: { grant_type: 'client_credential', appid: appId, secret },
      });
      if (res.data.errcode && res.data.errcode !== 0) {
        throw new ProviderError({
          provider: 'wx_oa',
          message: res.data.errmsg ?? 'token refresh failed',
          upstreamCode: res.data.errcode,
        });
      }
      await this.tokenStore.write(tenantId, appId, res.data);
      return res.data.access_token;
    } finally {
      if (lock) {
        try {
          await RedisLock.unlock(lock);
        } catch (err) {
          this.logger.warn(`unlock failed for ${lockKey}: ${(err as Error).message}`);
        }
      }
    }
  }
}
