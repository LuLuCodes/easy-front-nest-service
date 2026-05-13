import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

describe('MetricsController', () => {
  let metrics: MetricsService;
  let controller: MetricsController;

  beforeEach(() => {
    metrics = new MetricsService();
    metrics.onModuleInit();
    controller = new MetricsController(metrics);
  });

  it('returns the prom-client snapshot under the registry content type', async () => {
    metrics.httpRequestsTotal.inc({ method: 'GET', route: '/ping', status_code: '200' });
    const reply = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    await controller.scrape(reply as never);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.header).toHaveBeenCalledWith('Content-Type', metrics.contentType());
    expect(reply.send).toHaveBeenCalledWith(expect.stringContaining('http_requests_total'));
  });
});
