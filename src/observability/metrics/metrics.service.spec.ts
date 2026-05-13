import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let svc: MetricsService;

  beforeEach(() => {
    svc = new MetricsService();
    svc.onModuleInit();
  });

  it('exposes a prom-client text/plain content type for scraping', () => {
    expect(svc.contentType()).toMatch(/^text\/plain/);
  });

  it('emits http_requests_total under the configured labels', async () => {
    svc.httpRequestsTotal.inc({ method: 'GET', route: '/x', status_code: '200' });
    svc.httpRequestsTotal.inc({ method: 'GET', route: '/x', status_code: '200' });
    const snap = await svc.snapshot();
    expect(snap).toContain('http_requests_total{method="GET",route="/x",status_code="200"} 2');
  });

  it('records into http_request_duration_seconds histogram buckets', async () => {
    svc.httpRequestDurationSeconds.observe(
      { method: 'POST', route: '/y', status_code: '500' },
      0.42,
    );
    const snap = await svc.snapshot();
    expect(snap).toContain('http_request_duration_seconds_bucket');
    expect(snap).toContain(
      'http_request_duration_seconds_count{method="POST",route="/y",status_code="500"} 1',
    );
  });

  it('includes default Node runtime metrics on the registry', async () => {
    const snap = await svc.snapshot();
    expect(snap).toContain('process_cpu_user_seconds_total');
    expect(snap).toContain('nodejs_eventloop_lag_seconds');
  });
});
