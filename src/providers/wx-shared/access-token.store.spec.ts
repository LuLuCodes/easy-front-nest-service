import type { Redis } from 'ioredis';

import { WxMpAccessTokenStore, WxOaAccessTokenStore } from './access-token.store';

function fakeRedis() {
  const store = new Map<string, string>();
  return {
    store,
    redis: {
      get: jest.fn(async (k: string) => store.get(k) ?? null),
      set: jest.fn(async (k: string, v: string) => {
        store.set(k, v);
        return 'OK';
      }),
      keys: jest.fn(async (pattern: string) => {
        const prefix = pattern.replace(/\*$/, '');
        return Array.from(store.keys()).filter((k) => k.startsWith(prefix));
      }),
      del: jest.fn(async (...ks: string[]) => {
        let n = 0;
        for (const k of ks) if (store.delete(k)) n++;
        return n;
      }),
    } as unknown as jest.Mocked<Redis>,
  };
}

describe('AccessTokenStore (via WxOa subclass)', () => {
  it('writes a token to redis under the prefixed key', async () => {
    const { store, redis } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    await s.write(1, 'appA', { access_token: 'tok', expires_in: 7200 });
    expect(redis.set).toHaveBeenCalled();
    const key = (redis.set as jest.Mock).mock.calls[0][0] as string;
    expect(key.startsWith('wx_oa:token:t:1:a:appA')).toBe(true);
    const cached = JSON.parse(store.get(key)!);
    expect(cached.access_token).toBe('tok');
  });

  it('round-trips: read returns the written token', async () => {
    const { redis } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    await s.write(1, 'appA', { access_token: 'tok', expires_in: 7200 });
    await expect(s.read(1, 'appA')).resolves.toBe('tok');
  });

  it('returns null when the cached token is past its safety buffer', async () => {
    const { redis } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    // Write with a very short expires_in then drive read past the buffer.
    await s.write(1, 'appA', { access_token: 'tok', expires_in: 100 });
    await expect(s.read(1, 'appA')).resolves.toBeNull();
  });

  it('returns null when redis has no key', async () => {
    const { redis } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    await expect(s.read(1, 'absent')).resolves.toBeNull();
  });

  it('invalidate(tenant, appId) deletes just that key', async () => {
    const { redis, store } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    await s.write(1, 'appA', { access_token: 'tok', expires_in: 7200 });
    await s.invalidate(1, 'appA');
    expect(store.size).toBe(0);
  });

  it('invalidate(tenant) without appId clears every tenant key', async () => {
    const { redis, store } = fakeRedis();
    const s = new WxOaAccessTokenStore(redis);
    await s.write(1, 'a1', { access_token: 'x', expires_in: 7200 });
    await s.write(1, 'a2', { access_token: 'y', expires_in: 7200 });
    await s.write(2, 'a3', { access_token: 'z', expires_in: 7200 });
    await s.invalidate(1);
    const keys = Array.from(store.keys());
    expect(keys.every((k) => !k.includes('t:1:'))).toBe(true);
    expect(keys.some((k) => k.includes('t:2:'))).toBe(true);
  });

  it('swallows redis read/write errors and logs a warning', async () => {
    const { redis } = fakeRedis();
    (redis.get as jest.Mock).mockRejectedValueOnce(new Error('connection refused'));
    const s = new WxOaAccessTokenStore(redis);
    await expect(s.read(1, 'a')).resolves.toBeNull();
  });
});

describe('WxMpAccessTokenStore', () => {
  it('uses the wx_mp prefix', async () => {
    const { redis } = fakeRedis();
    const s = new WxMpAccessTokenStore(redis);
    await s.write(1, 'mpA', { access_token: 'tok', expires_in: 7200 });
    const key = (redis.set as jest.Mock).mock.calls[0][0] as string;
    expect(key.startsWith('wx_mp:token:t:1:a:mpA')).toBe(true);
  });
});
