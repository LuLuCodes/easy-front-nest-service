import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';

import { REDIS_CLIENT } from '@common/redis/redis.module';

import type { WxAccessToken } from './types';

const SAFETY_BUFFER_SEC = 300;
const PREFIX = 'wx_oa:token:';

interface CachedToken {
  access_token: string;
  expires_at: number;
}

/**
 * Two-tier (process LRU + Redis) cache for the public-account access_token.
 * Refresh strategy lives in WxOaClient — this store just persists tokens
 * and answers "is the cached token still valid?" lookups.
 *
 * One Redis key per (tenant, appId) so we can rotate per-tenant credentials
 * cleanly. Process cache is flushed via invalidate() when secrets change.
 */
@Injectable()
export class WxAccessTokenStore {
  private readonly logger = new Logger(WxAccessTokenStore.name);
  private readonly process = new Map<string, CachedToken>();

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async read(tenantId: number, appId: string): Promise<string | null> {
    const key = this.key(tenantId, appId);
    const local = this.process.get(key);
    if (local && local.expires_at > Date.now() / 1000 + SAFETY_BUFFER_SEC) {
      return local.access_token;
    }

    try {
      const raw = await this.redis.get(key);
      if (!raw) return null;
      const cached = JSON.parse(raw) as CachedToken;
      if (cached.expires_at <= Date.now() / 1000 + SAFETY_BUFFER_SEC) return null;
      this.process.set(key, cached);
      return cached.access_token;
    } catch (err) {
      this.logger.warn(`Redis read failed for ${key}: ${(err as Error).message}`);
      return null;
    }
  }

  async write(tenantId: number, appId: string, token: WxAccessToken): Promise<void> {
    const key = this.key(tenantId, appId);
    const expires_at = Math.floor(Date.now() / 1000) + token.expires_in;
    const payload: CachedToken = { access_token: token.access_token, expires_at };
    this.process.set(key, payload);
    try {
      await this.redis.set(key, JSON.stringify(payload), 'EX', token.expires_in);
    } catch (err) {
      this.logger.warn(`Redis write failed for ${key}: ${(err as Error).message}`);
    }
  }

  async invalidate(tenantId: number, appId?: string): Promise<void> {
    if (appId) {
      const key = this.key(tenantId, appId);
      this.process.delete(key);
      try {
        await this.redis.del(key);
      } catch (err) {
        this.logger.warn(`Redis del failed for ${key}: ${(err as Error).message}`);
      }
      return;
    }
    const prefix = `${PREFIX}t:${tenantId}:`;
    for (const k of this.process.keys()) {
      if (k.startsWith(prefix)) this.process.delete(k);
    }
    try {
      const keys = await this.redis.keys(`${prefix}*`);
      if (keys.length > 0) await this.redis.del(...keys);
    } catch (err) {
      this.logger.warn(`Redis prefix del failed for ${prefix}: ${(err as Error).message}`);
    }
  }

  private key(tenantId: number, appId: string): string {
    return `${PREFIX}t:${tenantId}:a:${appId}`;
  }
}
