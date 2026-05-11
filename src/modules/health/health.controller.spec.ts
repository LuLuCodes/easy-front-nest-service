import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('returns status=ok with an ISO timestamp', () => {
    const controller = new HealthController();
    const result = controller.health();
    expect(result.status).toBe('ok');
    expect(Date.parse(result.timestamp)).toBeGreaterThan(0);
  });
});
