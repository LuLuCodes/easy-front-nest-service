import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/index';
import { CredentialMissingError } from '@providers/base';
import { AlipayProvider } from '@providers/alipay/alipay.provider';
import { OssProvider } from '@providers/oss/oss.provider';
import { WxMpProvider } from '@providers/wx-mp/wx-mp.provider';
import { WxOaProvider } from '@providers/wx-oa/wx-oa.provider';
import { WxPayProvider } from '@providers/wx-pay/wx-pay.provider';
import type {
  WxMpAccessTokenStore,
  WxOaAccessTokenStore,
} from '@providers/wx-shared/access-token.store';
import type { DecryptedCredential } from '@tenant/credential.service';
import type { TenantCredentialVault } from '@tenant/credential-vault.service';

import { generateKeyPairSync } from 'node:crypto';

jest.mock('ali-oss', () => {
  const Mock = jest.fn().mockImplementation(() => ({
    put: jest.fn(),
    signatureUrl: jest.fn(),
  }));
  return { __esModule: true, default: Mock };
});

/**
 * Each Provider plays the same shape:
 *   - getClient() throws CredentialMissingError when no credential is stored
 *   - getClient() returns a client (and caches it) when a credential is present
 *   - invalidate() clears the cached client AND propagates to the vault
 *
 * This file boots one Provider per case with a stub vault, mimicking the
 * end-to-end shape (Provider → Vault → Credential row) without requiring
 * a real database or live upstream HTTP.
 */

const TENANT_ID = 42;

function rsaPem(): { priv: string; pub: string } {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' },
  });
  return { priv: privateKey as string, pub: publicKey as string };
}

function makeVault(credential: DecryptedCredential | null): jest.Mocked<TenantCredentialVault> {
  return {
    get: jest.fn(async () => credential),
    invalidate: jest.fn(async () => undefined),
  } as unknown as jest.Mocked<TenantCredentialVault>;
}

function makeTokenStore(): WxOaAccessTokenStore & WxMpAccessTokenStore {
  return {
    read: jest.fn(async () => null),
    write: jest.fn(async () => undefined),
    invalidate: jest.fn(async () => undefined),
  } as unknown as WxOaAccessTokenStore & WxMpAccessTokenStore;
}

function baseCred(provider: CREDENTIAL_PROVIDER, overrides: Partial<DecryptedCredential> = {}) {
  return {
    id: 1,
    tenant_id: TENANT_ID,
    provider,
    app_id: 'app-id',
    secret: 'secret',
    status: CREDENTIAL_STATUS.active,
    metadata: {},
    ...overrides,
  } as DecryptedCredential;
}

describe('Providers smoke (vault-backed lifecycle)', () => {
  describe('WxOaProvider', () => {
    it('throws CredentialMissingError when no credential is configured', async () => {
      const provider = new WxOaProvider(makeVault(null), makeTokenStore());
      await expect(provider.getClient(TENANT_ID)).rejects.toBeInstanceOf(CredentialMissingError);
    });

    it('builds and caches a client per (tenant, app_id)', async () => {
      const vault = makeVault(
        baseCred(CREDENTIAL_PROVIDER.wx_oa, {
          metadata: { token: 'verify-token', encoding_aes_key: 'a'.repeat(43) },
        }),
      );
      const provider = new WxOaProvider(vault, makeTokenStore());
      const a = await provider.getClient(TENANT_ID);
      const b = await provider.getClient(TENANT_ID);
      expect(a).toBe(b);
      expect(vault.get).toHaveBeenCalledTimes(2);
    });

    it('invalidate forwards to the vault and clears the cached client', async () => {
      const vault = makeVault(
        baseCred(CREDENTIAL_PROVIDER.wx_oa, {
          metadata: { token: 'verify-token', encoding_aes_key: 'a'.repeat(43) },
        }),
      );
      const provider = new WxOaProvider(vault, makeTokenStore());
      const first = await provider.getClient(TENANT_ID);
      await provider.invalidate(TENANT_ID);
      expect(vault.invalidate).toHaveBeenCalledWith(
        TENANT_ID,
        CREDENTIAL_PROVIDER.wx_oa,
        undefined,
      );
      const second = await provider.getClient(TENANT_ID);
      expect(second).not.toBe(first);
    });
  });

  describe('WxMpProvider', () => {
    it('throws CredentialMissingError on missing credential', async () => {
      const provider = new WxMpProvider(makeVault(null), makeTokenStore());
      await expect(provider.getClient(TENANT_ID)).rejects.toBeInstanceOf(CredentialMissingError);
    });

    it('builds a client when credential present', async () => {
      const provider = new WxMpProvider(
        makeVault(baseCred(CREDENTIAL_PROVIDER.wx_mp)),
        makeTokenStore(),
      );
      await expect(provider.getClient(TENANT_ID)).resolves.toBeDefined();
    });
  });

  describe('WxPayProvider', () => {
    it('throws CredentialMissingError on missing credential', async () => {
      const provider = new WxPayProvider(makeVault(null));
      await expect(provider.getClient(TENANT_ID)).rejects.toBeInstanceOf(CredentialMissingError);
    });

    it('builds a client when credential present', async () => {
      const { priv } = rsaPem();
      const provider = new WxPayProvider(
        makeVault(
          baseCred(CREDENTIAL_PROVIDER.wx_pay, {
            cert: priv,
            cert_serial_no: 'AAAA',
            metadata: { api_v3_key: 'x'.repeat(32), appid: 'wx-app' },
          }),
        ),
      );
      await expect(provider.getClient(TENANT_ID)).resolves.toBeDefined();
    });
  });

  describe('AlipayProvider', () => {
    it('throws CredentialMissingError on missing credential', async () => {
      const provider = new AlipayProvider(makeVault(null));
      await expect(provider.getClient(TENANT_ID)).rejects.toBeInstanceOf(CredentialMissingError);
    });

    it('builds a client when credential present', async () => {
      const { priv, pub } = rsaPem();
      const provider = new AlipayProvider(
        makeVault(
          baseCred(CREDENTIAL_PROVIDER.alipay, {
            secret: priv,
            cert: pub,
            metadata: { key_type: 'PKCS8' },
          }),
        ),
      );
      await expect(provider.getClient(TENANT_ID)).resolves.toBeDefined();
    });
  });

  describe('OssProvider', () => {
    it('throws CredentialMissingError on missing credential', async () => {
      const provider = new OssProvider(makeVault(null));
      await expect(provider.getClient(TENANT_ID)).rejects.toBeInstanceOf(CredentialMissingError);
    });

    it('builds a client when credential present', async () => {
      const provider = new OssProvider(
        makeVault(
          baseCred(CREDENTIAL_PROVIDER.oss, {
            cert: 'ak-id',
            metadata: { region: 'oss-cn-hangzhou' },
          }),
        ),
      );
      await expect(provider.getClient(TENANT_ID)).resolves.toBeDefined();
    });
  });
});
