import { Test } from '@nestjs/testing';

import { REDIS_CLIENT } from '@common/redis/redis.module';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/index';

import { CredentialService, type DecryptedCredential } from './credential.service';
import { TenantCredentialVault } from './credential-vault.service';

function fakeCredential(overrides: Partial<DecryptedCredential> = {}): DecryptedCredential {
  return {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.wx_oa,
    app_id: 'wx-test',
    secret: 'live-secret',
    status: CREDENTIAL_STATUS.active,
    ...overrides,
  };
}

describe('TenantCredentialVault', () => {
  let vault: TenantCredentialVault;
  let redisStore: Map<string, string>;
  let redis: {
    get: jest.Mock;
    set: jest.Mock;
    keys: jest.Mock;
    del: jest.Mock;
  };
  let credentialService: { findActive: jest.Mock };

  beforeEach(async () => {
    redisStore = new Map();
    redis = {
      get: jest.fn(async (k: string) => redisStore.get(k) ?? null),
      set: jest.fn(async (k: string, v: string) => {
        redisStore.set(k, v);
        return 'OK';
      }),
      keys: jest.fn(async (pattern: string) => {
        const prefix = pattern.replace(/\*$/, '');
        return Array.from(redisStore.keys()).filter((k) => k.startsWith(prefix));
      }),
      del: jest.fn(async (...ks: string[]) => {
        let n = 0;
        for (const k of ks) if (redisStore.delete(k)) n++;
        return n;
      }),
    };
    credentialService = { findActive: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TenantCredentialVault,
        { provide: REDIS_CLIENT, useValue: redis },
        { provide: CredentialService, useValue: credentialService },
      ],
    }).compile();

    vault = moduleRef.get(TenantCredentialVault);
  });

  it('reads from CredentialService on first access and caches in L1 + L2', async () => {
    credentialService.findActive.mockResolvedValueOnce(fakeCredential({ tenant_id: 7 }));

    const out = await vault.get(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');
    expect(out?.secret).toBe('live-secret');
    expect(credentialService.findActive).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledTimes(1);
    expect(vault.l1Size).toBe(1);
  });

  it('returns from L1 cache on second access without touching Redis or DB', async () => {
    credentialService.findActive.mockResolvedValueOnce(fakeCredential({ tenant_id: 7 }));
    await vault.get(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');

    redis.get.mockClear();
    credentialService.findActive.mockClear();

    const out = await vault.get(7, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');
    expect(out?.secret).toBe('live-secret');
    expect(credentialService.findActive).not.toHaveBeenCalled();
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('returns from L2 (Redis) cache when L1 is cold but Redis has the entry', async () => {
    credentialService.findActive.mockResolvedValueOnce(fakeCredential({ tenant_id: 9 }));
    await vault.get(9, CREDENTIAL_PROVIDER.wx_oa, 'wx-x');

    vault.clearL1ForTests();
    credentialService.findActive.mockClear();

    const out = await vault.get(9, CREDENTIAL_PROVIDER.wx_oa, 'wx-x');
    expect(out?.tenant_id).toBe(9);
    expect(credentialService.findActive).not.toHaveBeenCalled();
    expect(redis.get).toHaveBeenCalled();
  });

  it('caches negative results so missing credentials do not stampede the DB', async () => {
    credentialService.findActive.mockResolvedValueOnce(null);

    const a = await vault.get(3, CREDENTIAL_PROVIDER.alipay);
    const b = await vault.get(3, CREDENTIAL_PROVIDER.alipay);
    expect(a).toBeNull();
    expect(b).toBeNull();
    expect(credentialService.findActive).toHaveBeenCalledTimes(1);
  });

  it('invalidate(tenantId, provider, appId) removes the L1 + L2 entry', async () => {
    credentialService.findActive.mockResolvedValueOnce(fakeCredential());
    await vault.get(1, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');

    await vault.invalidate(1, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');
    expect(vault.l1Size).toBe(0);
    expect(redis.del).toHaveBeenCalled();

    credentialService.findActive.mockResolvedValueOnce(fakeCredential({ secret: 'rotated' }));
    const after = await vault.get(1, CREDENTIAL_PROVIDER.wx_oa, 'wx-test');
    expect(after?.secret).toBe('rotated');
  });

  it('invalidate(tenantId, provider) without appId clears every appId entry under that provider', async () => {
    credentialService.findActive
      .mockResolvedValueOnce(fakeCredential({ app_id: 'a' }))
      .mockResolvedValueOnce(fakeCredential({ app_id: 'b' }));
    await vault.get(1, CREDENTIAL_PROVIDER.wx_oa, 'a');
    await vault.get(1, CREDENTIAL_PROVIDER.wx_oa, 'b');
    expect(vault.l1Size).toBe(2);

    await vault.invalidate(1, CREDENTIAL_PROVIDER.wx_oa);
    expect(vault.l1Size).toBe(0);
  });

  it('survives Redis read failures by falling through to the DB', async () => {
    redis.get.mockRejectedValueOnce(new Error('redis down'));
    credentialService.findActive.mockResolvedValueOnce(fakeCredential());

    const out = await vault.get(1, CREDENTIAL_PROVIDER.wx_oa);
    expect(out?.secret).toBe('live-secret');
  });
});
