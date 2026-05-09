import { LruCache } from './lru';

describe('LruCache', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
    jest.setSystemTime(new Date('2026-05-09T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stores and retrieves values up to max entries', () => {
    const cache = new LruCache<number>(3, 60_000);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  it('evicts the least-recently-used entry when full', () => {
    const cache = new LruCache<number>(2, 60_000);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');
    cache.set('c', 3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
  });

  it('expires entries after the TTL elapses', () => {
    const cache = new LruCache<number>(2, 60_000);
    cache.set('a', 1);
    jest.advanceTimersByTime(60_000 + 1);
    expect(cache.get('a')).toBeUndefined();
    expect(cache.size).toBe(0);
  });

  it('refreshes TTL when the same key is re-set', () => {
    const cache = new LruCache<number>(2, 60_000);
    cache.set('a', 1);
    jest.advanceTimersByTime(50_000);
    cache.set('a', 2);
    jest.advanceTimersByTime(20_000);
    expect(cache.get('a')).toBe(2);
  });

  it('invalidatePrefix drops every key with the matching prefix', () => {
    const cache = new LruCache<number>(10, 60_000);
    cache.set('t:1:p:a', 1);
    cache.set('t:1:p:b', 2);
    cache.set('t:2:p:a', 3);
    cache.invalidatePrefix('t:1:');
    expect(cache.get('t:1:p:a')).toBeUndefined();
    expect(cache.get('t:1:p:b')).toBeUndefined();
    expect(cache.get('t:2:p:a')).toBe(3);
  });
});
