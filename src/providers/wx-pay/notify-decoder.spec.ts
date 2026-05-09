import { createCipheriv } from 'node:crypto';

import { decryptNotify } from './notify-decoder';

function encrypt(plaintext: string, apiV3Key: string, nonce: string, aad: string): string {
  if (apiV3Key.length !== 32) throw new Error('key must be 32 bytes');
  if (nonce.length !== 12) throw new Error('nonce must be 12 bytes');
  const cipher = createCipheriv(
    'aes-256-gcm',
    Buffer.from(apiV3Key, 'utf8'),
    Buffer.from(nonce, 'utf8'),
  );
  cipher.setAAD(Buffer.from(aad, 'utf8'));
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([enc, tag]).toString('base64');
}

describe('wx-pay notify-decoder', () => {
  const apiV3Key = '01234567890123456789012345678901';
  const nonce = 'nonce-12byte';
  const aad = 'transaction';

  it('round-trips an AEAD payload', () => {
    const plaintext = '{"out_trade_no":"abc","trade_state":"SUCCESS"}';
    const ciphertext = encrypt(plaintext, apiV3Key, nonce, aad);
    expect(decryptNotify({ associated_data: aad, nonce, ciphertext }, apiV3Key)).toBe(plaintext);
  });

  it('rejects tampered ciphertext', () => {
    const ciphertext = encrypt('hello', apiV3Key, nonce, aad);
    const tampered = Buffer.from(ciphertext, 'base64');
    tampered[0] ^= 0xff;
    expect(() =>
      decryptNotify(
        { associated_data: aad, nonce, ciphertext: tampered.toString('base64') },
        apiV3Key,
      ),
    ).toThrow();
  });

  it('rejects when associated_data does not match', () => {
    const ciphertext = encrypt('hello', apiV3Key, nonce, aad);
    expect(() =>
      decryptNotify({ associated_data: 'other', nonce, ciphertext }, apiV3Key),
    ).toThrow();
  });

  it('rejects malformed apiV3Key length', () => {
    expect(() =>
      decryptNotify({ associated_data: aad, nonce, ciphertext: 'AAAA' }, 'short-key'),
    ).toThrow(/32 bytes/);
  });

  it('rejects malformed nonce length', () => {
    expect(() =>
      decryptNotify({ associated_data: aad, nonce: 'short', ciphertext: 'AAAA' }, apiV3Key),
    ).toThrow(/12 bytes/);
  });

  it('rejects ciphertext too short to contain tag', () => {
    expect(() =>
      decryptNotify(
        { associated_data: aad, nonce, ciphertext: Buffer.alloc(8).toString('base64') },
        apiV3Key,
      ),
    ).toThrow(/auth tag/);
  });
});
