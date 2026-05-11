import { randomBytes } from 'node:crypto';

import {
  aes128cbcDecrypt,
  aes128cbcEncrypt,
  aes256ecbDecrypt,
  aes256ecbEncrypt,
  apiCipher,
  hash,
  hashx,
  hmacsha256,
  md5,
  sha1,
  uuid,
} from './cryptogram';

describe('libs/cryptogram', () => {
  describe('uuid', () => {
    it('returns a 32-char hyphen-free string by default', () => {
      const v = uuid();
      expect(v).toMatch(/^[0-9a-f]{32}$/);
    });

    it('keeps hyphens when replace=false', () => {
      const v = uuid(false);
      expect(v).toMatch(/^[0-9a-f-]{36}$/);
    });
  });

  describe('hash family', () => {
    it('md5 and sha1 produce stable hex strings', () => {
      expect(md5('hi')).toBe('49f68a5c8493ec2c0bf489821c21fc3b');
      expect(sha1('hi')).toBe('c22b5f9178342609428d6f51b2c5af4c0bde6a42');
    });

    it('hash defers to crypto.createHash for the chosen algorithm', () => {
      expect(hash('hi', 'md5')).toBe(md5('hi'));
    });

    it('hashx accepts a Buffer / TypedArray-like input', () => {
      expect(hashx(Buffer.from('hi', 'utf8'), 'md5')).toBe(md5('hi'));
    });

    it('hmacsha256 is deterministic', () => {
      expect(hmacsha256('hi', 'k')).toBe(hmacsha256('hi', 'k'));
      expect(hmacsha256('hi', 'k')).not.toBe(hmacsha256('hi', 'other'));
    });
  });

  describe('AES-128-CBC', () => {
    it('round-trips encrypt → decrypt', () => {
      const key = randomBytes(16);
      const iv = randomBytes(16);
      const plain = 'hello-128';
      const cipher = aes128cbcEncrypt(key, iv, plain);
      expect(aes128cbcDecrypt(key, iv, cipher)).toBe(plain);
    });
  });

  describe('AES-256-ECB', () => {
    it('round-trips encrypt → decrypt', () => {
      const key = randomBytes(32);
      // ECB ignores IV but the signature requires one
      const iv = Buffer.alloc(0);
      const plain = 'hello-256';
      const cipher = aes256ecbEncrypt(key, iv, plain);
      expect(aes256ecbDecrypt(key, iv, cipher)).toBe(plain);
    });
  });

  describe('apiCipher', () => {
    it('returns the value unchanged when it is null/undefined', () => {
      expect(apiCipher(null, 'k')).toBeNull();
      expect(apiCipher(undefined, 'k')).toBeUndefined();
    });

    it('produces a base64-ish ciphertext for object inputs', () => {
      const out = apiCipher({ a: 1 }, 'a-strong-key');
      expect(typeof out).toBe('string');
      expect(out.length).toBeGreaterThan(0);
    });
  });
});
