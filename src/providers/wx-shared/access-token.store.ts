import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Redis } from 'ioredis';

import { REDIS_CLIENT } from '@common/redis/redis.module';

export interface CachedAccessToken {
  access_token: string;
  expires_in: number;
}

const SAFETY_BUFFER_SEC = 300;

interface CachedTokenRecord {
  access_token: string;
  expires_at: number;
}

/**
 * Two-tier (process LRU + Redis) cache for an access_token-style WeChat
 * credential. Construct one instance per provider — the prefix is what
 * keeps OA and MP tokens in separate keyspaces in Redis.
 *
 * Concrete subclass examples:
 *   - WxOaAccessTokenStore (prefix: "wx_oa:token:")
 *   - WxMpAccessTokenStore (prefix: "wx_mp:token:")
 *
 * Refresh strategy lives in the provider — this store just persists
 * tokens and answers "is the cached token still valid?" lookups.
 */
export abstract class AccessTokenStore {
  protected readonly logger: Logger;
  private readonly process = new Map<string, CachedTokenRecord>();

  protected constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly prefix: string,
  ) {
    this.logger = new Logger(`AccessTokenStore:${prefix}`);
  }

  async read(tenantId: number, appId: string): Promise<string | null> {
    const key = this.key(tenantId, appId);
    const local = this.process.get(key);
    if (local && local.expires_at > Date.now() / 1000 + SAFETY_BUFFER_SEC) {
      return local.access_token;
    }
    try {
      const raw = await this.redis.get(key);
      if (!raw) return null;
      const cached = JSON.parse(raw) as CachedTokenRecord;
      if (cached.expires_at <= Date.now() / 1000 + SAFETY_BUFFER_SEC) return null;
      this.process.set(key, cached);
      return cached.access_token;
    } catch (err) {
      this.logger.warn(`Redis read failed for ${key}: ${(err as Error).message}`);
      return null;
    }
  }

  async write(tenantId: number, appId: string, token: CachedAccessToken): Promise<void> {
    const key = this.key(tenantId, appId);
    const expires_at = Math.floor(Date.now() / 1000) + token.expires_in;
    const payload: CachedTokenRecord = { access_token: token.access_token, expires_at };
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
    const tenantPrefix = `${this.prefix}t:${tenantId}:`;
    for (const k of this.process.keys()) {
      if (k.startsWith(tenantPrefix)) this.process.delete(k);
    }
    try {
      const keys = await this.redis.keys(`${tenantPrefix}*`);
      if (keys.length > 0) await this.redis.del(...keys);
    } catch (err) {
      this.logger.warn(`Redis prefix del failed for ${tenantPrefix}: ${(err as Error).message}`);
    }
  }

  private key(tenantId: number, appId: string): string {
    return `${this.prefix}t:${tenantId}:a:${appId}`;
  }
}

@Injectable()
export class WxOaAccessTokenStore extends AccessTokenStore {
  constructor(@Inject(REDIS_CLIENT) redis: Redis) {
    super(redis, 'wx_oa:token:');
  }
}

@Injectable()
export class WxMpAccessTokenStore extends AccessTokenStore {
  constructor(@Inject(REDIS_CLIENT) redis: Redis) {
    super(redis, 'wx_mp:token:');
  }
}
