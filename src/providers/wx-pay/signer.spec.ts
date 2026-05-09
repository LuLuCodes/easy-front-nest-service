import {
  createPublicKey,
  createSign,
  createVerify,
  generateKeyPairSync,
  X509Certificate,
} from 'node:crypto';

import { buildAuthorizationHeader, loadPrivateKey, verifyV3Signature } from './signer';

function generateMerchantKeyPair(): {
  privateKeyPem: string;
  publicKey: ReturnType<typeof createPublicKey>;
} {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  return {
    privateKeyPem: privateKey as string,
    publicKey: createPublicKey(publicKey as string),
  };
}

describe('wx-pay signer', () => {
  const { privateKeyPem, publicKey: merchantPublic } = generateMerchantKeyPair();
  const privateKey = loadPrivateKey(privateKeyPem);

  it('builds an Authorization header that the merchant public key verifies', () => {
    const req = {
      method: 'POST' as const,
      pathWithQuery: '/v3/pay/transactions/native',
      body: '{"out_trade_no":"abc"}',
    };
    const header = buildAuthorizationHeader(req, {
      mchId: '1900000001',
      serialNo: 'AAA',
      privateKey,
    });
    expect(header.startsWith('WECHATPAY2-SHA256-RSA2048 ')).toBe(true);
    const fields = Object.fromEntries(
      header
        .replace('WECHATPAY2-SHA256-RSA2048 ', '')
        .split(',')
        .map((p) => {
          const [k, v] = p.split('=');
          return [k, v.replace(/^"|"$/g, '')];
        }),
    );
    const message = `${req.method}\n${req.pathWithQuery}\n${fields.timestamp}\n${fields.nonce_str}\n${req.body}\n`;
    const verified = createVerify('RSA-SHA256')
      .update(message, 'utf8')
      .verify(merchantPublic, fields.signature, 'base64');
    expect(verified).toBe(true);
  });

  it('verifyV3Signature accepts a correctly signed response and rejects tampering', () => {
    const body = '{"trade_state":"SUCCESS"}';
    const timestamp = '1700000000';
    const nonce = 'nonce-1';
    const message = `${timestamp}\n${nonce}\n${body}\n`;
    const signature = createSign('RSA-SHA256').update(message, 'utf8').sign(privateKey, 'base64');

    expect(verifyV3Signature({ body, timestamp, nonce, signature }, merchantPublic)).toBe(true);
    expect(
      verifyV3Signature(
        { body: '{"trade_state":"FAIL"}', timestamp, nonce, signature },
        merchantPublic,
      ),
    ).toBe(false);
    expect(
      verifyV3Signature({ body, timestamp: '1700000001', nonce, signature }, merchantPublic),
    ).toBe(false);
  });

  it('loadPrivateKey parses a valid PEM and rejects garbage', () => {
    expect(() => loadPrivateKey(privateKeyPem)).not.toThrow();
    expect(() => loadPrivateKey('not a key')).toThrow();
  });

  // Smoke check: X509Certificate is reachable in the test runtime — the
  // platform-cert module relies on it.
  it('X509Certificate from node:crypto is available', () => {
    expect(typeof X509Certificate).toBe('function');
  });
});
