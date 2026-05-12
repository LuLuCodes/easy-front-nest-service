import {
  HealthCheckService,
  HealthIndicatorService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis.health';

describe('HealthController', () => {
  function makeController() {
    const health = {
      check: jest.fn(async (checks: Array<() => Promise<unknown>>) => {
        const details: Record<string, unknown> = {};
        for (const c of checks) Object.assign(details, await c());
        return { status: 'ok', details };
      }),
    } as unknown as HealthCheckService;
    const db = {
      pingCheck: jest.fn(async (key: string) => ({ [key]: { status: 'up' } })),
    } as unknown as TypeOrmHealthIndicator;
    return { health, db };
  }

  it('liveness returns status=ok with an ISO timestamp', () => {
    const { health, db } = makeController();
    const redis = {} as RedisHealthIndicator;
    const controller = new HealthController(health, db, redis);
    const result = controller.liveness();
    expect(result.status).toBe('ok');
    expect(Date.parse(result.timestamp)).toBeGreaterThan(0);
  });

  it('readiness pings DB + Redis through terminus', async () => {
    const { health, db } = makeController();
    const redisClient = { ping: jest.fn().mockResolvedValue('PONG') } as any;
    const indicators = new HealthIndicatorService();
    const redis = new RedisHealthIndicator(redisClient, indicators);
    const controller = new HealthController(health, db, redis);

    const result = (await controller.readiness()) as { status: string; details: any };
    expect(result.status).toBe('ok');
    expect(result.details.database.status).toBe('up');
    expect(result.details.redis.status).toBe('up');
    expect(redisClient.ping).toHaveBeenCalled();
  });

  it('readiness flags redis as down on ping rejection', async () => {
    const { health, db } = makeController();
    const redisClient = { ping: jest.fn().mockRejectedValue(new Error('econnrefused')) } as any;
    const redis = new RedisHealthIndicator(redisClient, new HealthIndicatorService());
    const controller = new HealthController(health, db, redis);

    const result = (await controller.readiness()) as { details: any };
    expect(result.details.redis.status).toBe('down');
    expect(result.details.redis.message).toBe('econnrefused');
  });
});
