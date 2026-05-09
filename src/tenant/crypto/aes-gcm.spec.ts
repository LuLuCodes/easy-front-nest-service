import { randomBytes } from 'node:crypto';

import { loadMasterKey, open, seal } from './aes-gcm';

describe('aes-gcm crypto', () => {
  const key = randomBytes(32);

  it('round-trips a plaintext through seal/open', () => {
    const plain = 'sk_live_super-secret-value';
    const sealed = seal(plain, key);
    expect(sealed.iv).toHaveLength(12);
    expect(sealed.tag).toHaveLength(16);
    expect(open(sealed, key)).toBe(plain);
  });

  it('produces different ciphertexts on each seal call (random IV)', () => {
    const plain = 'same-input';
    const a = seal(plain, key);
    const b = seal(plain, key);
    expect(a.iv.equals(b.iv)).toBe(false);
    expect(a.cipher.equals(b.cipher)).toBe(false);
    expect(open(a, key)).toBe(plain);
    expect(open(b, key)).toBe(plain);
  });

  it('throws when ciphertext is tampered with', () => {
    const sealed = seal('something', key);
    sealed.cipher[0] ^= 0xff;
    expect(() => open(sealed, key)).toThrow();
  });

  it('throws when auth tag is tampered with', () => {
    const sealed = seal('something', key);
    sealed.tag[0] ^= 0xff;
    expect(() => open(sealed, key)).toThrow();
  });

  it('rejects keys of wrong length', () => {
    const shortKey = Buffer.alloc(16, 1).toString('base64');
    expect(() => loadMasterKey(shortKey)).toThrow(/32 bytes/);
  });

  it('decodes a base64 key into a 32-byte Buffer', () => {
    const raw = randomBytes(32);
    const decoded = loadMasterKey(raw.toString('base64'));
    expect(decoded.equals(raw)).toBe(true);
  });
});
