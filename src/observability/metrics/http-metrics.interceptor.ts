import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

import { MetricsService } from './metrics.service';

/**
 * Records http_requests_total + http_request_duration_seconds per
 * (method, route, status_code).
 *
 * Labels are bound to the *route template* (e.g. `/api/v1/tenant/:id`)
 * rather than the literal URL — Fastify surfaces this via
 * `request.routeOptions.url` after routing, which keeps label
 * cardinality bounded.
 */
@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();
    const startNs = process.hrtime.bigint();

    const record = () => {
      const elapsedSeconds = Number(process.hrtime.bigint() - startNs) / 1e9;
      const labels = {
        method: request.method,
        route: this.resolveRoute(request),
        status_code: String(reply.statusCode ?? 0),
      };
      this.metrics.httpRequestsTotal.inc(labels);
      this.metrics.httpRequestDurationSeconds.observe(labels, elapsedSeconds);
    };

    return next.handle().pipe(
      tap({
        next: () => record(),
        error: () => record(),
      }),
    );
  }

  private resolveRoute(request: FastifyRequest): string {
    const routeOptions = (request as unknown as { routeOptions?: { url?: string } }).routeOptions;
    return routeOptions?.url ?? request.url ?? 'unknown';
  }
}
