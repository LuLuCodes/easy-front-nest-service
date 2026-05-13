import { Controller, Get, Header, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';

import { Public } from '@auth/decorators';

import { MetricsService } from './metrics.service';

@ApiTags('Metrics')
@Public()
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @ApiOperation({
    summary: 'Prometheus scrape endpoint',
    description:
      'Returns the prom-client registry snapshot (Node runtime metrics + HTTP RED). Public on purpose — intended for in-cluster scraping.',
  })
  @Get()
  @Header('Cache-Control', 'no-store')
  async scrape(@Res() reply: FastifyReply): Promise<void> {
    const body = await this.metrics.snapshot();
    void reply.status(200).header('Content-Type', this.metrics.contentType()).send(body);
  }
}
