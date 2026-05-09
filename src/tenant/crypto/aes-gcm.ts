import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGO = 'aes-256-gcm';
const IV_BYTES = 12;
const TAG_BYTES = 16;
const KEY_BYTES = 32;

export interface SealedSecret {
  cipher: Buffer;
  iv: Buffer;
  tag: Buffer;
}

export function loadMasterKey(base64: string): Buffer {
  const buf = Buffer.from(base64, 'base64');
  if (buf.length !== KEY_BYTES) {
    throw new Error(`Tenant master key must decode to ${KEY_BYTES} bytes (got ${buf.length})`);
  }
  return buf;
}

export function seal(plaintext: string, key: Buffer): SealedSecret {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  if (tag.length !== TAG_BYTES) {
    throw new Error(`Unexpected GCM tag length: ${tag.length}`);
  }
  return { cipher: enc, iv, tag };
}

export function open(sealed: SealedSecret, key: Buffer): string {
  const decipher = createDecipheriv(ALGO, key, sealed.iv);
  decipher.setAuthTag(sealed.tag);
  const dec = Buffer.concat([decipher.update(sealed.cipher), decipher.final()]);
  return dec.toString('utf8');
}
