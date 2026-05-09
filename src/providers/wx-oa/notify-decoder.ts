import { createDecipheriv, createHash } from 'node:crypto';

/**
 * Validates the canonical sha1(token + timestamp + nonce) signature WeChat
 * uses on the GET-side webhook handshake and on POST-side push messages.
 */
export function checkSignature(
  token: string,
  signature: string,
  timestamp: string | number,
  nonce: string,
): boolean {
  const sorted = [String(token), String(timestamp), String(nonce)].sort();
  const sha = createHash('sha1').update(sorted.join(''), 'utf8').digest('hex');
  return safeEqual(sha, signature);
}

/**
 * Validates the safe-mode msg_signature, which mixes in the encrypted
 * payload as a fourth element.
 */
export function checkMsgSignature(
  token: string,
  msgSignature: string,
  timestamp: string | number,
  nonce: string,
  encrypt: string,
): boolean {
  const sorted = [String(token), String(timestamp), String(nonce), encrypt].sort();
  const sha = createHash('sha1').update(sorted.join(''), 'utf8').digest('hex');
  return safeEqual(sha, msgSignature);
}

/**
 * Decrypts the `<Encrypt>` element of a safe-mode push message using the
 * 43-char EncodingAESKey supplied via tenant metadata. Returns the inner
 * XML payload (still XML — the caller decides whether/how to parse it).
 */
export function decryptMessage(encodingAesKey: string, appId: string, encryptB64: string): string {
  const aesKey = Buffer.from(`${encodingAesKey}=`, 'base64');
  if (aesKey.length !== 32) {
    throw new Error('EncodingAESKey must decode to 32 bytes');
  }
  const iv = aesKey.subarray(0, 16);
  const decipher = createDecipheriv('aes-256-cbc', aesKey, iv);
  decipher.setAutoPadding(false);
  const raw = Buffer.concat([decipher.update(encryptB64, 'base64'), decipher.final()]);
  const stripped = stripPkcs7(raw);

  // Layout: 16 random bytes | 4 bytes BE msg length | msg | trailing appId
  if (stripped.length < 20) {
    throw new Error('Decrypted payload too short');
  }
  const msgLen = stripped.readUInt32BE(16);
  if (!Number.isInteger(msgLen) || msgLen < 0 || 20 + msgLen > stripped.length) {
    throw new Error('Invalid message length in decrypted payload');
  }
  const message = stripped.subarray(20, 20 + msgLen).toString('utf8');
  const trailingAppId = stripped.subarray(20 + msgLen).toString('utf8');
  if (trailingAppId !== appId) {
    throw new Error('AppId mismatch in decrypted webhook payload');
  }
  return message;
}

function stripPkcs7(buf: Buffer): Buffer {
  const pad = buf[buf.length - 1];
  if (pad < 1 || pad > 32) {
    throw new Error('Invalid PKCS#7 padding length');
  }
  return buf.subarray(0, buf.length - pad);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
