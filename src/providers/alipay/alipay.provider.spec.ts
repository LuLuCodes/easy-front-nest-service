import { CredentialMissingError } from '@providers/base';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import type { TenantCredentialVault } from '@tenant/credential-vault.service';

import { AlipayClient } from './alipay.client';
import { AlipayProvider } from './alipay.provider';

jest.mock('./alipay.client');
jest.mock('./alipay-sdk.factory', () => ({
  createAlipaySdk: jest.fn(() => ({})),
}));

const MockedAlipayClient = AlipayClient as unknown as jest.MockedClass<typeof AlipayClient>;

function makeVault(): jest.Mocked<TenantCredentialVault> {
  return {
    get: jest.fn(),
    invalidate: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<TenantCredentialVault>;
}

describe('AlipayProvider', () => {
  beforeEach(() => MockedAlipayClient.mockClear());

  it('throws when vault returns no credential', async () => {
    const vault = makeVault();
    vault.get.mockResolvedValue(null);
    const provider = new AlipayProvider(vault);
    await expect(provider.getClient(1)).rejects.toBeInstanceOf(CredentialMissingError);
  });

  it('builds + caches one client per tenant + appId', async () => {
    const vault = makeVault();
    vault.get.mockResolvedValue({ app_id: 'A1' } as never);
    const provider = new AlipayProvider(vault);
    const c1 = await provider.getClient(1, 'A1');
    const c2 = await provider.getClient(1, 'A1');
    expect(c1).toBe(c2);
    expect(MockedAlipayClient).toHaveBeenCalledTimes(1);
    expect(vault.get).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.alipay, 'A1');
  });

  it('invalidate by appId clears just one cached entry', async () => {
    const vault = makeVault();
    vault.get.mockResolvedValue({ app_id: 'A1' } as never);
    const provider = new AlipayProvider(vault);
    await provider.getClient(1, 'A1');
    await provider.invalidate(1, 'A1');
    expect(vault.invalidate).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.alipay, 'A1');
  });

  it('invalidate without appId clears all tenant entries', async () => {
    const vault = makeVault();
    let n = 0;
    vault.get.mockImplementation(async () => ({ app_id: `A${++n}` }) as never);
    const provider = new AlipayProvider(vault);
    await provider.getClient(1);
    await provider.getClient(1);
    await provider.invalidate(1);
    expect(vault.invalidate).toHaveBeenCalledWith(1, CREDENTIAL_PROVIDER.alipay, undefined);
  });
});
