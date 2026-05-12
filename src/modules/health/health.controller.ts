import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { Public } from '@auth/decorators';

import { RedisHealthIndicator } from './redis.health';

/**
 * - `/api/health` → liveness. Stays minimal on purpose: confirms the
 *   process is up so Docker HEALTHCHECK / K8s livenessProbe doesn't
 *   restart-loop when an external dep flaps.
 * - `/api/health/ready` → readiness. Pings DB + Redis so a K8s
 *   readinessProbe or service-mesh check can take the pod out of the
 *   load balancer when downstream is unavailable.
 */
@ApiTags('Health')
@Public()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @ApiOperation({ summary: '健康检查 (liveness)' })
  @Get()
  liveness(): { status: 'ok'; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @ApiOperation({ summary: '就绪探针 (readiness; DB + Redis)' })
  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.db.pingCheck('database', { timeout: 1500 }),
      () => this.redis.isHealthy('redis'),
    ]);
  }
}
