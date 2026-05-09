import { createCipheriv, createHash, randomBytes } from 'node:crypto';

import { checkMsgSignature, checkSignature, decryptMessage } from './notify-decoder';

describe('notify-decoder', () => {
  describe('checkSignature', () => {
    const token = 'wechat-token';
    const timestamp = '1700000000';
    const nonce = 'abc123';

    function expected(): string {
      const sorted = [token, timestamp, nonce].sort().join('');
      return createHash('sha1').update(sorted, 'utf8').digest('hex');
    }

    it('returns true for a valid GET handshake signature', () => {
      expect(checkSignature(token, expected(), timestamp, nonce)).toBe(true);
    });

    it('returns false when any input is tampered with', () => {
      const sig = expected();
      expect(checkSignature(token, sig, '1700000001', nonce)).toBe(false);
      expect(checkSignature(token, sig, timestamp, 'def')).toBe(false);
      expect(checkSignature('other-token', sig, timestamp, nonce)).toBe(false);
    });

    it('returns false for length-mismatched signatures (constant-time)', () => {
      expect(checkSignature(token, 'short', timestamp, nonce)).toBe(false);
    });
  });

  describe('checkMsgSignature', () => {
    const token = 'safe-mode-token';
    it('mixes the encrypted payload into the signature', () => {
      const ts = '1700000000';
      const nonce = 'n';
      const enc = 'cipher-payload';
      const expected = createHash('sha1')
        .update([token, ts, nonce, enc].sort().join(''), 'utf8')
        .digest('hex');
      expect(checkMsgSignature(token, expected, ts, nonce, enc)).toBe(true);
      expect(checkMsgSignature(token, expected, ts, nonce, 'tampered')).toBe(false);
    });
  });

  describe('decryptMessage', () => {
    const appId = 'wx_app_demo';
    const encodingAesKey = randomBytes(32).toString('base64').slice(0, 43);

    function encrypt(message: string, withAppId: string = appId): string {
      const aesKey = Buffer.from(`${encodingAesKey}=`, 'base64');
      const iv = aesKey.subarray(0, 16);
      const random = randomBytes(16);
      const msgBuf = Buffer.from(message, 'utf8');
      const len = Buffer.alloc(4);
      len.writeUInt32BE(msgBuf.length, 0);
      const appIdBuf = Buffer.from(withAppId, 'utf8');
      const raw = Buffer.concat([random, len, msgBuf, appIdBuf]);
      const padLen = 32 - (raw.length % 32);
      const pad = Buffer.alloc(padLen, padLen);
      const padded = Buffer.concat([raw, pad]);
      const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
      cipher.setAutoPadding(false);
      return Buffer.concat([cipher.update(padded), cipher.final()]).toString('base64');
    }

    it('round-trips a plaintext payload', () => {
      const xml = '<xml><MsgType>text</MsgType><Content>hello</Content></xml>';
      const enc = encrypt(xml);
      expect(decryptMessage(encodingAesKey, appId, enc)).toBe(xml);
    });

    it('rejects payloads where the trailing appId mismatches', () => {
      const enc = encrypt('hello', 'wx_other_app');
      expect(() => decryptMessage(encodingAesKey, appId, enc)).toThrow(/AppId mismatch/);
    });

    it('rejects malformed EncodingAESKey', () => {
      expect(() => decryptMessage('too-short', appId, 'AAAA')).toThrow(/32 bytes/);
    });
  });
});
