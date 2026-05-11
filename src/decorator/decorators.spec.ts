import { CatchError } from './catch.decorator';
import { ClearCache, SaveCache, UseCache } from './cache.decorator';

function applyDecorator(
  decorator: () => MethodDecorator,
  originalMethod: (this: unknown, ...args: unknown[]) => Promise<unknown>,
) {
  const descriptor = { value: originalMethod } as PropertyDescriptor;
  decorator()({} as never, 'm' as never, descriptor);
  return descriptor.value as (
    this: unknown,
    ...args: unknown[]
  ) => Promise<{ data: unknown; msg: string }>;
}

describe('decorators', () => {
  describe('CatchError', () => {
    it('wraps return value as OkResponse', async () => {
      const fn = applyDecorator(CatchError, async () => 42);
      const r = await fn.call({});
      expect(r).toMatchObject({ data: 42, msg: 'OK' });
    });

    it('wraps thrown error as ErrorResponse', async () => {
      const fn = applyDecorator(CatchError, async () => {
        throw new Error('boom');
      });
      const r = await fn.call({});
      expect(r).toMatchObject({ data: null, msg: 'boom' });
    });
  });

  describe('SaveCache', () => {
    it('returns OkResponse without touching cache when args[0] is falsy', async () => {
      const fn = applyDecorator(SaveCache, async () => 'data');
      const r = await fn.call({});
      expect(r).toMatchObject({ data: 'data' });
    });

    it('sets cache when cache_key is present', async () => {
      const cacheService = {
        set: jest.fn().mockResolvedValue(undefined),
        del: jest.fn().mockResolvedValue(undefined),
      };
      const fn = applyDecorator(SaveCache, async () => 'fresh');
      await fn.call({ cacheService }, { cache_key: 'k', cache_time: 60 });
      expect(cacheService.set).toHaveBeenCalledWith('k', '"fresh"', 'EX', 60);
    });

    it('deletes the listed keys when del_cache_key is present', async () => {
      const cacheService = {
        set: jest.fn(),
        del: jest.fn().mockResolvedValue(undefined),
      };
      const fn = applyDecorator(SaveCache, async () => 'x');
      await fn.call({ cacheService }, { del_cache_key: ['a', 'b'] });
      expect(cacheService.del).toHaveBeenCalledWith('a');
      expect(cacheService.del).toHaveBeenCalledWith('b');
    });

    it('wraps thrown error as ErrorResponse', async () => {
      const fn = applyDecorator(SaveCache, async () => {
        throw new Error('x');
      });
      const r = await fn.call({}, {});
      expect(r).toMatchObject({ data: null });
    });
  });

  describe('UseCache', () => {
    it('short-circuits when no cacheService is wired', async () => {
      const fn = applyDecorator(UseCache, async () => 'compute');
      const r = await fn.call({}, { cache_key: 'k' });
      expect(r).toMatchObject({ data: 'compute' });
    });

    it('returns the cached value when present', async () => {
      const cacheService = {
        get: jest.fn().mockResolvedValue(JSON.stringify('cached')),
        set: jest.fn(),
        del: jest.fn(),
      };
      const fn = applyDecorator(UseCache, async () => 'should-not-run');
      const r = await fn.call({ cacheService }, { cache_key: 'k' });
      expect(r).toMatchObject({ data: 'cached' });
    });

    it('computes + sets when cache miss', async () => {
      const cacheService = {
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue(undefined),
        del: jest.fn(),
      };
      const fn = applyDecorator(UseCache, async () => 'fresh');
      await fn.call({ cacheService }, { cache_key: 'k', cache_time: 30 });
      expect(cacheService.set).toHaveBeenCalledWith('k', '"fresh"', 'EX', 30);
    });

    it('deletes the listed keys when del_cache_key is present', async () => {
      const cacheService = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn().mockResolvedValue(undefined),
      };
      const fn = applyDecorator(UseCache, async () => 'r');
      await fn.call({ cacheService }, { del_cache_key: ['a'] });
      expect(cacheService.del).toHaveBeenCalledWith('a');
    });
  });

  describe('ClearCache', () => {
    it('deletes listed keys and runs the original method', async () => {
      const cacheService = { del: jest.fn().mockResolvedValue(undefined) };
      const fn = applyDecorator(ClearCache, async () => 'cleared');
      const r = await fn.call({ cacheService }, { del_cache_key: ['a', 'b'] });
      expect(cacheService.del).toHaveBeenCalledWith('a');
      expect(cacheService.del).toHaveBeenCalledWith('b');
      expect(r).toMatchObject({ data: 'cleared' });
    });

    it('still runs the method even without cacheService', async () => {
      const fn = applyDecorator(ClearCache, async () => 'no-cache');
      const r = await fn.call({}, {});
      expect(r).toMatchObject({ data: 'no-cache' });
    });

    it('wraps thrown error as ErrorResponse', async () => {
      const fn = applyDecorator(ClearCache, async () => {
        throw new Error('x');
      });
      const r = await fn.call({}, {});
      expect(r).toMatchObject({ data: null });
    });
  });
});
