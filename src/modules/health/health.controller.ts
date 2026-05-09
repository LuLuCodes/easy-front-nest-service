import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '@auth/decorators';

/**
 * Liveness probe consumed by Docker HEALTHCHECK and Kubernetes. Stays
 * minimal on purpose — confirms the process is up and the HTTP listener
 * is responsive. Doesn't reach into DB/Redis; readiness probes get their
 * own endpoint when needed.
 */
@ApiTags('Health')
@Public()
@Controller('health')
export class HealthController {
  @ApiOperation({ summary: '健康检查 (liveness)' })
  @Get()
  health(): { status: 'ok'; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
