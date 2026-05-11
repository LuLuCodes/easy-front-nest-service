import { env, envArray, envBoolean, envNumber } from './env-unit';

describe('libs/env-unit', () => {
  const K = 'P7_TEST_KEY';

  afterEach(() => {
    delete process.env[K];
  });

  describe('env', () => {
    it('returns the raw value when set', () => {
      process.env[K] = 'hello';
      expect(env(K)).toBe('hello');
    });

    it('returns the default when unset', () => {
      expect(env(K, 'fallback')).toBe('fallback');
    });

    it('treats an empty string as unset', () => {
      process.env[K] = '';
      expect(env(K, 'fallback')).toBe('fallback');
    });
  });

  describe('envNumber', () => {
    it('parses a numeric string', () => {
      process.env[K] = '42';
      expect(envNumber(K)).toBe(42);
    });

    it('falls back to default on missing value', () => {
      expect(envNumber(K, 7)).toBe(7);
    });
  });

  describe('envBoolean', () => {
    it('returns true only for literal "true"', () => {
      process.env[K] = 'true';
      expect(envBoolean(K)).toBe(true);
      process.env[K] = '1';
      expect(envBoolean(K)).toBe(false);
    });

    it('falls back to default when unset', () => {
      expect(envBoolean(K, true)).toBe(true);
    });
  });

  describe('envArray', () => {
    it('splits on default separator and trims empties', () => {
      process.env[K] = 'a,b,,c';
      expect(envArray(K)).toEqual(['a', 'b', 'c']);
    });

    it('supports a custom separator', () => {
      process.env[K] = 'x|y|z';
      expect(envArray(K, '|')).toEqual(['x', 'y', 'z']);
    });

    it('returns empty array for whitespace-only value', () => {
      process.env[K] = '   ';
      expect(envArray(K)).toEqual([]);
    });

    it('falls back to default when unset', () => {
      expect(envArray(K, ',', ['d'])).toEqual(['d']);
    });
  });
});
