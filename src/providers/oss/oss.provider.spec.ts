import { CredentialMissingError } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import type { TenantCredentialVault } from '@tenant/credential-vault.service';

import { OssClient } from './oss.client';
import { OssProvider } from './oss.provider';

jest.mock('./oss.client');

const MockedOssClient = OssClient as unknown as jest.MockedClass<typeof OssClient>;

function makeVault(): jest.Mocked<TenantCredentialVault> {
  return {
    get: jest.fn(),
    invalidate: jest.fn().mockResolvedValue(undefined),
    // other methods unused by this provider
  } as unknown as jest.Mocked<TenantCredentialVault>;
}

describe('OssProvider', () => {
  beforeEach(() => MockedOssClient.mockClear());

  it('throws CredentialMissingError when vault returns nothing', async () => {
    const vault = makeVault();
    vault.get.mockResolvedValue(null);
    const provider = new OssProvider(vault);
    await expect(provider.getClient(1)).rejects.toBeInstanceOf(CredentialMissingError);
  });

  it('builds and caches a client per tenant + app_id', async () => {
    const vault = makeVault();
    const cred = { app_id: 'bucketA' };
    vault.get.mockResolvedValue(cred as never);
    const provider = new OssProvider(vault);

    const c1 = await provider.getClient(1);
    const c2 = await provider.getClient(1);
    expect(c1).toBe(c2);
    expect(MockedOssClient).toHaveBeenCalledTimes(1);
    expect(vault.get).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.oss, undefined);
  });

  it('different tenants get independent client instances', async () => {
    const vault = makeVault();
    vault.get.mockImplementation(
      async (tenantId: number) => ({ app_id: `bucket${tenantId}` }) as never,
    );
    const provider = new OssProvider(vault);
    await provider.getClient(1);
    await provider.getClient(2);
    expect(MockedOssClient).toHaveBeenCalledTimes(2);
  });

  it('invalidate(tenantId, bucket) drops only that key and forwards to vault', async () => {
    const vault = makeVault();
    vault.get.mockResolvedValue({ app_id: 'bA' } as never);
    const provider = new OssProvider(vault);
    await provider.getClient(1, 'bA');
    await provider.invalidate(1, 'bA');
    expect(vault.invalidate).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.oss, 'bA');
    // re-fetch builds a new client (cache was cleared for that key)
    MockedOssClient.mockClear();
    await provider.getClient(1, 'bA');
    expect(MockedOssClient).toHaveBeenCalledTimes(1);
  });

  it('invalidate(tenantId) drops every cached client for that tenant', async () => {
    const vault = makeVault();
    let counter = 0;
    vault.get.mockImplementation(async () => ({ app_id: `b${++counter}` }) as never);
    const provider = new OssProvider(vault);
    await provider.getClient(1);
    await provider.getClient(1);
    await provider.invalidate(1);
    expect(vault.invalidate).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.oss, undefined);
  });
});
