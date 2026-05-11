import type { Redis } from 'ioredis';

import { CacheService } from './cache.service';

function fakeRedis() {
  return {
    exists: jest.fn().mockResolvedValue(0),
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
    decrby: jest.fn().mockResolvedValue(0),
    incrby: jest.fn().mockResolvedValue(0),
    sadd: jest.fn().mockResolvedValue(1),
    sismember: jest.fn().mockResolvedValue(0),
    hget: jest.fn().mockResolvedValue(null),
    hmget: jest.fn().mockResolvedValue([null]),
    hset: jest.fn().mockResolvedValue(1),
    hmset: jest.fn().mockResolvedValue('OK'),
    expire: jest.fn().mockResolvedValue(1),
  } as unknown as jest.Mocked<Redis>;
}

describe('CacheService', () => {
  let redis: jest.Mocked<Redis>;
  let svc: CacheService;

  beforeEach(() => {
    redis = fakeRedis();
    svc = new CacheService(redis);
  });

  it('exists returns true when redis returns 1', async () => {
    (redis.exists as jest.Mock).mockResolvedValueOnce(1);
    await expect(svc.exists('k')).resolves.toBe(true);
    (redis.exists as jest.Mock).mockResolvedValueOnce(0);
    await expect(svc.exists('k')).resolves.toBe(false);
  });

  it('set with EX includes TTL', async () => {
    await svc.set('k', 'v', 'EX', 60);
    expect(redis.set).toHaveBeenCalledWith('k', 'v', 'EX', 60);
  });

  it('set with PX includes milliseconds TTL', async () => {
    await svc.set('k', 'v', 'PX', 1500);
    expect(redis.set).toHaveBeenCalledWith('k', 'v', 'PX', 1500);
  });

  it('set without TTL drops the expiry args', async () => {
    await svc.set('k', 'v');
    expect(redis.set).toHaveBeenCalledWith('k', 'v');
  });

  it('get coerces a null miss to empty string', async () => {
    (redis.get as jest.Mock).mockResolvedValueOnce(null);
    await expect(svc.get('k')).resolves.toBe('');
    (redis.get as jest.Mock).mockResolvedValueOnce('value');
    await expect(svc.get('k')).resolves.toBe('value');
  });

  it('del / decrby / incrby pass through', async () => {
    await svc.del('k');
    expect(redis.del).toHaveBeenCalledWith('k');
    await svc.decrby('k', 2);
    expect(redis.decrby).toHaveBeenCalledWith('k', 2);
    await svc.incrby('k', 3);
    expect(redis.incrby).toHaveBeenCalledWith('k', 3);
  });

  it('sadd stringifies members', async () => {
    await svc.sadd('s', [1, 'two', 3]);
    expect(redis.sadd).toHaveBeenCalledWith('s', '1', 'two', '3');
  });

  it('sismember returns boolean', async () => {
    (redis.sismember as jest.Mock).mockResolvedValueOnce(1);
    await expect(svc.sismember('s', 'a')).resolves.toBe(true);
  });

  it('hash + expire helpers delegate', async () => {
    await svc.hget('h', 'f');
    await svc.hmget('h', ['a', 'b']);
    await svc.hset('h', 'f', 1);
    await svc.hmset('h', ['a', 1, 'b', 2]);
    await svc.expire('k', 60);
    expect(redis.hget).toHaveBeenCalledWith('h', 'f');
    expect(redis.hmget).toHaveBeenCalledWith('h', 'a', 'b');
    expect(redis.hset).toHaveBeenCalledWith('h', 'f', 1);
    expect(redis.hmset).toHaveBeenCalledWith('h', 'a', 1, 'b', 2);
    expect(redis.expire).toHaveBeenCalledWith('k', 60);
  });
});
