import { AlipaySdk, type AlipaySdkConfig } from 'alipay-sdk';

import { ProviderError } from '@providers/base';
import type { DecryptedCredential } from '@tenant/credential.service';

import type { AlipayCredentialMetadata } from './types';

export const DEFAULT_GATEWAY = 'https://openapi.alipay.com/gateway.do';
export const DEFAULT_TIMEOUT_MS = 5000;

/**
 * Build an alipay-sdk instance from a decrypted tenant credential.
 *
 * Layout:
 *  - `credential.app_id`  → alipay app_id
 *  - `credential.secret`  → merchant private key (PEM)
 *  - `credential.cert`    → alipay platform public key (PEM, required for verify)
 *  - `credential.metadata` → AlipayCredentialMetadata
 */
export function createAlipaySdk(credential: DecryptedCredential): AlipaySdk {
  const meta = (credential.metadata ?? {}) as AlipayCredentialMetadata;

  if (!credential.secret) {
    throw new ProviderError({
      provider: 'alipay',
      message: 'Merchant private key (secret) missing on credential',
      retryable: false,
    });
  }
  if (!credential.cert) {
    throw new ProviderError({
      provider: 'alipay',
      message: 'Alipay platform public key (cert) missing on credential',
      retryable: false,
    });
  }

  const config: AlipaySdkConfig = {
    appId: credential.app_id,
    privateKey: credential.secret,
    alipayPublicKey: credential.cert,
    signType: meta.sign_type ?? 'RSA2',
    keyType: meta.key_type ?? 'PKCS1',
    gateway: meta.gateway ?? DEFAULT_GATEWAY,
    timeout: meta.timeout_ms ?? DEFAULT_TIMEOUT_MS,
    charset: 'utf-8',
    version: '1.0',
  };
  if (meta.encrypt_key) {
    config.encryptKey = meta.encrypt_key;
  }
  return new AlipaySdk(config);
}
