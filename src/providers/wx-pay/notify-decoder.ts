import { createDecipheriv } from 'node:crypto';

export interface AeadEnvelope {
  /** UTF-8 string used as associated_data; usually the `original_type`. */
  associated_data: string;
  /** Base64-encoded 12-byte nonce (WeChat ships ASCII string of length 12). */
  nonce: string;
  /** Base64-encoded ciphertext (includes 16-byte trailing GCM tag). */
  ciphertext: string;
}

/**
 * Decrypts the `resource` block of a WeChat Pay v3 async notify using
 * AEAD-AES-256-GCM. WeChat puts the 16-byte GCM tag at the END of the
 * ciphertext (Node's GCM API expects it via setAuthTag, so we split).
 *
 * apiV3Key is the merchant's API v3 secret — exactly 32 ASCII chars.
 */
export function decryptNotify(envelope: AeadEnvelope, apiV3Key: string): string {
  if (apiV3Key.length !== 32) {
    throw new Error('API v3 key must be exactly 32 bytes');
  }
  if (envelope.nonce.length !== 12) {
    throw new Error('AEAD nonce must be exactly 12 bytes');
  }
  const cipher = Buffer.from(envelope.ciphertext, 'base64');
  if (cipher.length < 16) {
    throw new Error('AEAD ciphertext too short to contain auth tag');
  }
  const data = cipher.subarray(0, cipher.length - 16);
  const tag = cipher.subarray(cipher.length - 16);

  const decipher = createDecipheriv(
    'aes-256-gcm',
    Buffer.from(apiV3Key, 'utf8'),
    Buffer.from(envelope.nonce, 'utf8'),
  );
  decipher.setAuthTag(tag);
  decipher.setAAD(Buffer.from(envelope.associated_data, 'utf8'));
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString('utf8');
}
