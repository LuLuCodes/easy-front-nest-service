import { generateKeyPairSync } from 'node:crypto';

import { AlipaySdk } from 'alipay-sdk';

import { ProviderError } from '@providers/base';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/tenant-credential.entity';
import type { DecryptedCredential } from '@tenant/credential.service';

import { createAlipaySdk, DEFAULT_GATEWAY } from './alipay-sdk.factory';

function newKeyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  return { privateKey: privateKey as string, publicKey: publicKey as string };
}

function baseCredential(overrides: Partial<DecryptedCredential> = {}): DecryptedCredential {
  const { privateKey, publicKey } = newKeyPair();
  return {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.alipay,
    app_id: '2014072300007148',
    secret: privateKey,
    cert: publicKey,
    status: CREDENTIAL_STATUS.active,
    metadata: { key_type: 'PKCS8' },
    ...overrides,
  };
}

describe('alipay-sdk factory', () => {
  it('builds an AlipaySdk with sane defaults', () => {
    const sdk = createAlipaySdk(baseCredential());
    expect(sdk).toBeInstanceOf(AlipaySdk);
    expect(sdk.config.appId).toBe('2014072300007148');
    expect(sdk.config.signType).toBe('RSA2');
    expect(sdk.config.gateway).toBe(DEFAULT_GATEWAY);
  });

  it('respects metadata overrides', () => {
    const sdk = createAlipaySdk(
      baseCredential({
        metadata: {
          key_type: 'PKCS8',
          gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
          timeout_ms: 8000,
          encrypt_key: 'aGVsbG93b3JsZGVuY3J5cHRrZXk=',
        },
      }),
    );
    expect(sdk.config.gateway).toBe('https://openapi-sandbox.dl.alipaydev.com/gateway.do');
    expect(sdk.config.timeout).toBe(8000);
    expect(sdk.config.encryptKey).toBe('aGVsbG93b3JsZGVuY3J5cHRrZXk=');
  });

  it('throws ProviderError when private key missing', () => {
    expect(() => createAlipaySdk(baseCredential({ secret: '' }))).toThrow(ProviderError);
  });

  it('throws ProviderError when alipay public key missing', () => {
    expect(() => createAlipaySdk(baseCredential({ cert: undefined }))).toThrow(ProviderError);
  });
});
