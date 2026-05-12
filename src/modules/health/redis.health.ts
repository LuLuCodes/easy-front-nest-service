import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import type { Redis } from 'ioredis';

import { REDIS_CLIENT } from '@common/redis/redis.module';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    @Inject(REDIS_CLIENT) private readonly client: Redis,
    private readonly indicators: HealthIndicatorService,
  ) {}

  async isHealthy(key: string) {
    const session = this.indicators.check(key);
    try {
      const reply = await this.client.ping();
      if (reply !== 'PONG') {
        return session.down({ reply });
      }
      return session.up();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return session.down({ message });
    }
  }
}
