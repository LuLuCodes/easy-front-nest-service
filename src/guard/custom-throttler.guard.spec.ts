import { ThrottlerException } from '@nestjs/throttler';
import type { ExecutionContext } from '@nestjs/common';

import { CustomThrottlerGuard } from './custom-throttler.guard';

interface FakeRequest {
  headers: Record<string, unknown>;
  ip?: string;
  user?: { tenant_id?: number };
}

interface FakeResponse {
  header: jest.Mock;
}

function makeGuard(
  opts: {
    totalHits: number;
    limit: number;
    timeToExpire?: number;
  } = { totalHits: 1, limit: 100 },
) {
  const guard = new CustomThrottlerGuard({ throttlers: [] } as never, {} as never, {} as never);
  // override storage service with a stub
  (guard as unknown as { storageService: unknown }).storageService = {
    increment: jest.fn().mockResolvedValue({
      totalHits: opts.totalHits,
      timeToExpire: opts.timeToExpire ?? 60_000,
    }),
  };
  return guard;
}

function makeContext(req: FakeRequest, res: FakeResponse): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => res,
    }),
    getHandler: () => () => undefined,
    getClass: () => class {},
  } as unknown as ExecutionContext;
}

describe('CustomThrottlerGuard', () => {
  describe('trackerKey', () => {
    it('returns ip-keyed bucket when request is anonymous', async () => {
      const guard = makeGuard();
      const tracker = await (
        guard as unknown as { getTracker: (r: FakeRequest) => Promise<string> }
      ).getTracker({
        headers: { 'x-forwarded-for': '1.2.3.4' },
      });
      expect(tracker).toBe('ip:1.2.3.4');
    });

    it('returns tenant-keyed bucket when JWT populated req.user', async () => {
      const guard = makeGuard();
      const tracker = await (
        guard as unknown as { getTracker: (r: FakeRequest) => Promise<string> }
      ).getTracker({
        headers: { 'x-forwarded-for': '1.2.3.4' },
        user: { tenant_id: 42 },
      });
      expect(tracker).toBe('tenant:42:1.2.3.4');
    });

    it('prefers x-forwarded-for over req.ip when both present', async () => {
      const guard = makeGuard();
      const tracker = await (
        guard as unknown as { getTracker: (r: FakeRequest) => Promise<string> }
      ).getTracker({
        headers: { 'x-forwarded-for': 'proxy-ip' },
        ip: 'socket-ip',
      });
      expect(tracker).toBe('ip:proxy-ip');
    });
  });

  describe('handleRequest', () => {
    it('passes when totalHits <= limit and writes rate-limit headers', async () => {
      const guard = makeGuard({ totalHits: 5, limit: 100, timeToExpire: 30_000 });
      const res: FakeResponse = { header: jest.fn() };
      const req: FakeRequest = {
        headers: { 'x-forwarded-for': '1.2.3.4' },
        user: { tenant_id: 7 },
      };
      const result = await guard.handleRequest({
        context: makeContext(req, res),
        limit: 100,
        ttl: 60_000,
        throttler: { name: 'default' },
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      } as never);
      expect(result).toBe(true);
      expect(res.header).toHaveBeenCalledWith('X-RateLimit-Limit', 100);
      expect(res.header).toHaveBeenCalledWith('X-RateLimit-Remaining', 95);
      expect(res.header).toHaveBeenCalledWith('X-RateLimit-Reset', 30);
    });

    it('throws ThrottlerException when totalHits > limit', async () => {
      const guard = makeGuard({ totalHits: 101, limit: 100 });
      const res: FakeResponse = { header: jest.fn() };
      const req: FakeRequest = {
        headers: { 'x-forwarded-for': '1.2.3.4' },
        user: { tenant_id: 7 },
      };
      await expect(
        guard.handleRequest({
          context: makeContext(req, res),
          limit: 100,
          ttl: 60_000,
          throttler: { name: 'default' },
          blockDuration: 0,
          getTracker: jest.fn(),
          generateKey: jest.fn(),
        } as never),
      ).rejects.toBeInstanceOf(ThrottlerException);
      expect(res.header).toHaveBeenCalledWith('X-RateLimit-Remaining', 0);
    });

    it('two tenants on the same IP increment separate buckets', async () => {
      const guard = makeGuard();
      const increment = (guard as unknown as { storageService: { increment: jest.Mock } })
        .storageService.increment;
      const res: FakeResponse = { header: jest.fn() };
      const reqA: FakeRequest = {
        headers: { 'x-forwarded-for': '1.2.3.4' },
        user: { tenant_id: 1 },
      };
      const reqB: FakeRequest = {
        headers: { 'x-forwarded-for': '1.2.3.4' },
        user: { tenant_id: 2 },
      };

      // Spy on the protected generateKey via cast.
      const generateKeySpy = jest
        .spyOn(guard as unknown as { generateKey: (...args: unknown[]) => string }, 'generateKey')
        .mockImplementation((_ctx, tracker) => `k:${String(tracker)}`);

      await guard.handleRequest({
        context: makeContext(reqA, res),
        limit: 100,
        ttl: 60_000,
        throttler: { name: 'default' },
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      } as never);
      await guard.handleRequest({
        context: makeContext(reqB, res),
        limit: 100,
        ttl: 60_000,
        throttler: { name: 'default' },
        blockDuration: 0,
        getTracker: jest.fn(),
        generateKey: jest.fn(),
      } as never);

      const trackerA = generateKeySpy.mock.calls[0][1];
      const trackerB = generateKeySpy.mock.calls[1][1];
      expect(trackerA).toBe('tenant:1:1.2.3.4');
      expect(trackerB).toBe('tenant:2:1.2.3.4');
      expect(increment).toHaveBeenCalledTimes(2);
    });
  });
});
