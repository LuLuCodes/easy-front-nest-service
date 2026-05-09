import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';

import { REDIS_CLIENT } from '@common/redis/redis.module';
import type { CREDENTIAL_PROVIDER } from '@entities/index';

import { LruCache } from './cache/lru';
import { CredentialService, type DecryptedCredential } from './credential.service';

const REDIS_PREFIX = 'tenant_vault:';
const DEFAULT_TTL_MS = 5 * 60 * 1000;
const REDIS_TTL_SEC = 5 * 60;
const LRU_MAX = 256;

const NEGATIVE_TTL_MS = 30 * 1000;
const NEGATIVE_TTL_SEC = 30;
const NEGATIVE_MARKER = Symbol('NEGATIVE_VAULT_HIT');
type CachedEntry = DecryptedCredential | typeof NEGATIVE_MARKER;

interface SerializedCredential {
  id: number;
  tenant_id: number;
  provider: CREDENTIAL_PROVIDER;
  app_id: string;
  display_name?: string;
  secret: string;
  cert?: string;
  cert_serial_no?: string;
  status: 'active' | 'disabled';
  metadata?: Record<string, unknown>;
}

@Injectable()
export class TenantCredentialVault {
  private readonly logger = new Logger(TenantCredentialVault.name);
  private readonly l1 = new LruCache<CachedEntry>(LRU_MAX, DEFAULT_TTL_MS);

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly credentialService: CredentialService,
  ) {}

  /**
   * Fetch a decrypted credential through the L1 (in-process LRU) and L2
   * (Redis) caches, falling back to the database via CredentialService.
   *
   * Negative results (no active credential) are cached briefly to avoid
   * thundering-herd DB lookups when a tenant simply hasn't configured a
   * provider.
   */
  async get(
    tenantId: number,
    provider: CREDENTIAL_PROVIDER,
    appId?: string,
  ): Promise<DecryptedCredential | null> {
    const key = this.cacheKey(tenantId, provider, appId);

    const l1 = this.l1.get(key);
    if (l1 !== undefined) {
      return l1 === NEGATIVE_MARKER ? null : l1;
    }

    const l2 = await this.fetchFromRedis(key);
    if (l2 !== undefined) {
      this.l1.set(key, l2);
      return l2 === NEGATIVE_MARKER ? null : l2;
    }

    const fresh = await this.credentialService.findActive(tenantId, provider, appId);
    await this.cacheBoth(key, fresh ?? NEGATIVE_MARKER);
    return fresh;
  }

  /**
   * Drop every cached credential for a tenant/provider pair. Called from
   * the control-plane after add / rotate / status updates so the next
   * request reads through to the DB.
   */
  async invalidate(
    tenantId: number,
    provider?: CREDENTIAL_PROVIDER,
    appId?: string,
  ): Promise<void> {
    const prefix = this.cacheKeyPrefix(tenantId, provider, appId);
    this.l1.invalidatePrefix(prefix);
    try {
      const keys = await this.redis.keys(`${prefix}*`);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (err) {
      this.logger.warn(`Redis invalidate failed for ${prefix}: ${(err as Error).message}`);
    }
  }

  private async fetchFromRedis(key: string): Promise<CachedEntry | undefined> {
    try {
      const raw = await this.redis.get(key);
      if (raw === null) return undefined;
      if (raw === '__NEG__') return NEGATIVE_MARKER;
      const parsed = JSON.parse(raw) as SerializedCredential;
      return parsed as DecryptedCredential;
    } catch (err) {
      this.logger.warn(`Redis read failed for ${key}: ${(err as Error).message}`);
      return undefined;
    }
  }

  private async cacheBoth(key: string, entry: CachedEntry): Promise<void> {
    this.l1.set(key, entry);
    try {
      if (entry === NEGATIVE_MARKER) {
        await this.redis.set(key, '__NEG__', 'EX', NEGATIVE_TTL_SEC);
        this.l1.set(key, entry);
      } else {
        await this.redis.set(key, JSON.stringify(entry), 'EX', REDIS_TTL_SEC);
      }
    } catch (err) {
      this.logger.warn(`Redis write failed for ${key}: ${(err as Error).message}`);
    }
  }

  private cacheKey(tenantId: number, provider: CREDENTIAL_PROVIDER, appId?: string): string {
    return `${REDIS_PREFIX}t:${tenantId}:p:${provider}:a:${appId ?? '*'}`;
  }

  private cacheKeyPrefix(tenantId: number, provider?: CREDENTIAL_PROVIDER, appId?: string): string {
    if (!provider) return `${REDIS_PREFIX}t:${tenantId}:`;
    if (!appId) return `${REDIS_PREFIX}t:${tenantId}:p:${provider}:`;
    return `${REDIS_PREFIX}t:${tenantId}:p:${provider}:a:${appId}`;
  }

  /** For tests only — purges the L1 cache without touching Redis. */
  clearL1ForTests(): void {
    this.l1.clear();
  }

  get l1Size(): number {
    return this.l1.size;
  }

  get negativeTtlMs(): number {
    return NEGATIVE_TTL_MS;
  }
}
