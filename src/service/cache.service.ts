import { Inject, Injectable } from '@nestjs/common';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@common/redis/redis.module';

@Injectable()
export class CacheService {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  async exists(key: string): Promise<boolean> {
    const n = await this.client.exists(key);
    return n === 1;
  }

  async set(
    key: string,
    value: string | Buffer | number,
    expiryMode?: 'EX' | 'PX',
    seconds?: number,
  ): Promise<void> {
    if (seconds && expiryMode === 'EX') {
      await this.client.set(key, value, 'EX', seconds);
    } else if (seconds && expiryMode === 'PX') {
      await this.client.set(key, value, 'PX', seconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string> {
    const data = await this.client.get(key);
    return data ?? '';
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  decrby(key: string, value: number): Promise<number> {
    return this.client.decrby(key, value);
  }

  incrby(key: string, value: number): Promise<number> {
    return this.client.incrby(key, value);
  }

  async sadd(key: string, members: Array<number | string>): Promise<number> {
    return this.client.sadd(key, ...members.map(String));
  }

  async sismember(key: string, member: number | string): Promise<boolean> {
    const result = await this.client.sismember(key, String(member));
    return result === 1;
  }

  hget(key: string, field: string): Promise<string | null> {
    return this.client.hget(key, field);
  }

  hmget(key: string, fields: string[]): Promise<Array<string | null>> {
    return this.client.hmget(key, ...fields);
  }

  hset(key: string, field: string, value: string | number): Promise<number> {
    return this.client.hset(key, field, value);
  }

  hmset(key: string, args: Array<string | number>): Promise<'OK'> {
    return this.client.hmset(key, ...args);
  }

  expire(key: string, seconds: number): Promise<number> {
    return this.client.expire(key, seconds);
  }
}
