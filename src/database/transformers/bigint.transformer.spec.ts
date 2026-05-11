import { bigintTransformer } from './bigint.transformer';

describe('bigintTransformer', () => {
  it('passes numbers through unchanged on write', () => {
    expect(bigintTransformer.to(42)).toBe(42);
    expect(bigintTransformer.to(null)).toBeNull();
    expect(bigintTransformer.to(undefined)).toBeUndefined();
  });

  it('coerces MySQL string representation to number on read', () => {
    expect(bigintTransformer.from('9007199254')).toBe(9007199254);
  });

  it('preserves null / undefined on read', () => {
    expect(bigintTransformer.from(null)).toBeNull();
    expect(bigintTransformer.from(undefined)).toBeUndefined();
  });
});
