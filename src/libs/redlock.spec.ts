import { RedisLock } from './redlock';

beforeEach(() => {
  // Reset the static state between tests
  (RedisLock as unknown as { redlock: unknown }).redlock = null;
  (RedisLock as unknown as { redis: unknown }).redis = null;
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('RedisLock', () => {
  it('lock() returns null when redlock is uninitialised', async () => {
    await expect(RedisLock.lock('k', 1000)).resolves.toBeNull();
  });

  it('unlock(null) is a no-op', async () => {
    await expect(RedisLock.unlock(null)).resolves.toBeUndefined();
  });

  it('unlock() swallows errors from lock.release()', async () => {
    const fakeLock = { release: jest.fn().mockRejectedValue(new Error('x')) };
    await expect(RedisLock.unlock(fakeLock as never)).resolves.toBeUndefined();
  });

  it('extend(null) is a no-op', async () => {
    await expect(RedisLock.extend(null, 1000)).resolves.toBeUndefined();
  });

  it('extend() swallows errors from lock.extend()', async () => {
    const fakeLock = { extend: jest.fn().mockRejectedValue(new Error('x')) };
    await expect(RedisLock.extend(fakeLock as never, 1000)).resolves.toBeUndefined();
  });

  it('using() returns null when redlock is uninitialised', async () => {
    const fn = jest.fn();
    await expect(RedisLock.using('k', 1000, fn)).resolves.toBeNull();
    expect(fn).not.toHaveBeenCalled();
  });

  it('getLock returns the current internal redlock instance', () => {
    expect(RedisLock.getLock()).toBeNull();
  });

  it('lock() swallows acquire errors and returns null', async () => {
    const acquire = jest.fn().mockRejectedValue(new Error('boom'));
    (RedisLock as unknown as { redlock: { acquire: typeof acquire } }).redlock = {
      acquire,
    };
    await expect(RedisLock.lock('k', 1000)).resolves.toBeNull();
  });

  it('using() runs the callback when a lock is acquired', async () => {
    const release = jest.fn().mockResolvedValue(undefined);
    const acquire = jest.fn().mockResolvedValue({ release });
    (RedisLock as unknown as { redlock: { acquire: typeof acquire } }).redlock = {
      acquire,
    };
    const cb = jest.fn().mockResolvedValue('result');
    await expect(RedisLock.using('k', 1000, cb)).resolves.toBe('result');
    expect(cb).toHaveBeenCalled();
    expect(release).toHaveBeenCalled();
  });

  it('using() wraps callback errors and still releases the lock', async () => {
    const release = jest.fn().mockResolvedValue(undefined);
    const acquire = jest.fn().mockResolvedValue({ release });
    (RedisLock as unknown as { redlock: { acquire: typeof acquire } }).redlock = {
      acquire,
    };
    await expect(
      RedisLock.using('k', 1000, async () => {
        throw new Error('inside');
      }),
    ).rejects.toThrow(/Internal Error: inside/);
    expect(release).toHaveBeenCalled();
  });
});
