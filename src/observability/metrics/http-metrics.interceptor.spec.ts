import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { lastValueFrom, of, throwError } from 'rxjs';

import { HttpMetricsInterceptor } from './http-metrics.interceptor';
import { MetricsService } from './metrics.service';

function httpContext(
  request: Record<string, unknown>,
  reply: Record<string, unknown>,
): ExecutionContext {
  return {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => reply,
    }),
  } as unknown as ExecutionContext;
}

describe('HttpMetricsInterceptor', () => {
  let metrics: MetricsService;
  let interceptor: HttpMetricsInterceptor;

  beforeEach(() => {
    metrics = new MetricsService();
    metrics.onModuleInit();
    interceptor = new HttpMetricsInterceptor(metrics);
  });

  it('records the request count + duration on success', async () => {
    const next: CallHandler = { handle: () => of('ok') };
    const ctx = httpContext(
      { method: 'GET', routeOptions: { url: '/api/v1/foo/:id' } },
      { statusCode: 200 },
    );
    await lastValueFrom(interceptor.intercept(ctx, next));
    const snap = await metrics.snapshot();
    expect(snap).toContain(
      'http_requests_total{method="GET",route="/api/v1/foo/:id",status_code="200"} 1',
    );
    expect(snap).toContain(
      'http_request_duration_seconds_count{method="GET",route="/api/v1/foo/:id",status_code="200"} 1',
    );
  });

  it('falls back to request.url when routeOptions is unavailable', async () => {
    const next: CallHandler = { handle: () => of('ok') };
    const ctx = httpContext({ method: 'POST', url: '/raw' }, { statusCode: 201 });
    await lastValueFrom(interceptor.intercept(ctx, next));
    const snap = await metrics.snapshot();
    expect(snap).toContain('route="/raw"');
  });

  it('still records when the handler throws', async () => {
    const next: CallHandler = { handle: () => throwError(() => new Error('boom')) };
    const ctx = httpContext({ method: 'GET', routeOptions: { url: '/err' } }, { statusCode: 500 });
    await expect(lastValueFrom(interceptor.intercept(ctx, next))).rejects.toThrow('boom');
    const snap = await metrics.snapshot();
    expect(snap).toContain('http_requests_total{method="GET",route="/err",status_code="500"} 1');
  });

  it('bypasses non-http contexts', async () => {
    const next: CallHandler = { handle: () => of('ws') };
    const ctx = {
      getType: () => 'ws',
      switchToHttp: () => ({
        getRequest: () => {
          throw new Error('should not be called');
        },
        getResponse: () => {
          throw new Error('should not be called');
        },
      }),
    } as unknown as ExecutionContext;
    await expect(lastValueFrom(interceptor.intercept(ctx, next))).resolves.toBe('ws');
  });
});
