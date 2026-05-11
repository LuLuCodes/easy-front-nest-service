import type { Repository } from 'typeorm';

import { CacheService } from './cache.service';
import { DictCacheService } from './dict-cache.service';
import type { Dictionary } from '@entities/index';

function buildEntry(over: Partial<Dictionary>): Dictionary {
  return {
    id: 1,
    field_name: 'kind',
    field_key: 'a',
    field_value: 'A',
    sort_no: 1,
    is_init_cache: 1,
    ...over,
  } as Dictionary;
}

describe('DictCacheService', () => {
  let cache: jest.Mocked<CacheService>;
  let repo: jest.Mocked<Repository<Dictionary>>;
  let svc: DictCacheService;

  beforeEach(() => {
    cache = {
      get: jest.fn().mockResolvedValue(''),
      set: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<CacheService>;
    repo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<Dictionary>>;
    svc = new DictCacheService(cache, repo);
  });

  describe('setDictCache', () => {
    it('writes a redis blob per field_name when no filter is given', async () => {
      const rows = [
        buildEntry({ id: 1, field_name: 'kind', field_key: 'a', field_value: 'A' }),
        buildEntry({ id: 2, field_name: 'kind', field_key: 'b', field_value: 'B' }),
        buildEntry({ id: 3, field_name: 'color', field_key: 'r', field_value: 'red' }),
      ];
      repo.find.mockResolvedValueOnce(rows);

      const out = await svc.setDictCache();
      expect(out).toBe(rows);
      // two distinct field_names → two cache.set calls
      expect(cache.set).toHaveBeenCalledTimes(2);
      const calls = cache.set.mock.calls.map((c) => c[0]);
      expect(calls.some((k) => k.includes('kind'))).toBe(true);
      expect(calls.some((k) => k.includes('color'))).toBe(true);
    });

    it('scopes the redis write when a field_name is supplied', async () => {
      const rows = [buildEntry({ id: 1, field_name: 'kind' })];
      repo.find.mockResolvedValueOnce(rows);

      await svc.setDictCache('kind');
      expect(repo.find).toHaveBeenCalledWith(
        expect.objectContaining({ where: { is_init_cache: 1, field_name: 'kind' } }),
      );
      expect(cache.set).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDictConf', () => {
    it('returns cached entries when redis has a hit', async () => {
      const cached = [buildEntry({ id: 1, field_name: 'kind' })];
      cache.get.mockResolvedValueOnce(JSON.stringify(cached));

      const out = await svc.getDictConf('kind');
      expect(out).toEqual(cached);
      expect(repo.find).not.toHaveBeenCalled();
    });

    it('falls back to setDictCache on cache miss', async () => {
      cache.get.mockResolvedValueOnce('');
      const fresh = [buildEntry({ id: 9, field_name: 'kind' })];
      repo.find.mockResolvedValueOnce(fresh);

      const out = await svc.getDictConf('kind');
      expect(out).toEqual(fresh);
      expect(repo.find).toHaveBeenCalled();
    });

    it('filters by field_key when given', async () => {
      const cached = [
        buildEntry({ id: 1, field_name: 'k', field_key: 'a' }),
        buildEntry({ id: 2, field_name: 'k', field_key: 'b' }),
      ];
      cache.get.mockResolvedValueOnce(JSON.stringify(cached));
      const out = await svc.getDictConf('k', 'b');
      expect(out).toHaveLength(1);
      expect(out[0].field_key).toBe('b');
    });
  });
});
