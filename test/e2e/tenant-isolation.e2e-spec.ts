import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomBytes } from 'node:crypto';

import { REDIS_CLIENT } from '@common/redis/redis.module';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS, TenantCredential } from '@entities/index';
import tenant_config from '@config/tenant';
import { CredentialService } from '@tenant/credential.service';
import { TenantCredentialVault } from '@tenant/credential-vault.service';
import { seal } from '@tenant/crypto/aes-gcm';

/**
 * End-to-end smoke covering the row-level tenant isolation guarantee.
 *
 * The contract under test:
 *   - Vault.get(tenantId, provider, app_id) only returns rows whose
 *     `credential_tenant_id` matches the supplied tenantId.
 *   - Cross-tenant lookups return null (no leaked secrets, no exception
 *     leaking the existence of a row).
 *   - Negative results are cached briefly without poisoning a later
 *     positive lookup for a different tenant.
 *
 * We boot just the vault + credential service against an in-memory repo
 * stand-in, mirroring the production filter logic but skipping a real DB.
 */

const TENANT_A = 101;
const TENANT_B = 202;

type Row = TenantCredential & {
  // Convenience for the in-memory store; the real repo column matches.
  credential_tenant_id: number;
};

describe('Tenant isolation (vault → credential service)', () => {
  let vault: TenantCredentialVault;
  const masterKeyB64 = randomBytes(32).toString('base64');
  const masterKey = Buffer.from(masterKeyB64, 'base64');

  const rows: Row[] = [];
  const redisStore = new Map<string, string>();

  function seal_(text: string) {
    return seal(text, masterKey);
  }

  function seedCredential(opts: {
    id: number;
    tenant_id: number;
    provider: CREDENTIAL_PROVIDER;
    app_id: string;
    secret: string;
  }): Row {
    const sealed = seal_(opts.secret);
    const row = {
      id: opts.id,
      credential_tenant_id: opts.tenant_id,
      provider: opts.provider,
      app_id: opts.app_id,
      display_name: undefined,
      status: CREDENTIAL_STATUS.active,
      secret_cipher: sealed.cipher,
      secret_iv: sealed.iv,
      secret_tag: sealed.tag,
      cert_cipher: undefined,
      cert_iv: undefined,
      cert_tag: undefined,
      cert_serial_no: undefined,
      key_version: 1,
      metadata: undefined,
    } as unknown as Row;
    rows.push(row);
    return row;
  }

  const credentialRepo = {
    findOne: jest.fn(async ({ where }: { where: Record<string, unknown> }) => {
      return (
        rows.find((r) => {
          for (const [k, v] of Object.entries(where)) {
            if ((r as unknown as Record<string, unknown>)[k] !== v) return false;
          }
          return true;
        }) ?? null
      );
    }),
  };

  const redis = {
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

  beforeAll(async () => {
    process.env.TENANT_MASTER_KEY = masterKeyB64;

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [tenant_config], isGlobal: true })],
      providers: [
        CredentialService,
        TenantCredentialVault,
        { provide: REDIS_CLIENT, useValue: redis },
        { provide: getRepositoryToken(TenantCredential), useValue: credentialRepo },
      ],
    }).compile();

    vault = moduleRef.get(TenantCredentialVault);
  });

  beforeEach(() => {
    rows.length = 0;
    redisStore.clear();
    jest.clearAllMocks();
  });

  it('returns each tenant only its own credential', async () => {
    seedCredential({
      id: 1,
      tenant_id: TENANT_A,
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-A',
      secret: 'secret-A',
    });
    seedCredential({
      id: 2,
      tenant_id: TENANT_B,
      provider: CREDENTIAL_PROVIDER.wx_oa,
      app_id: 'wx-B',
      secret: 'secret-B',
    });

    const a = await vault.get(TENANT_A, CREDENTIAL_PROVIDER.wx_oa);
    const b = await vault.get(TENANT_B, CREDENTIAL_PROVIDER.wx_oa);

    expect(a?.tenant_id).toBe(TENANT_A);
    expect(a?.secret).toBe('secret-A');
    expect(b?.tenant_id).toBe(TENANT_B);
    expect(b?.secret).toBe('secret-B');
  });

  it('refuses cross-tenant lookup by foreign app_id', async () => {
    seedCredential({
      id: 1,
      tenant_id: TENANT_A,
      provider: CREDENTIAL_PROVIDER.wx_pay,
      app_id: 'mch-A',
      secret: 'secret-A',
    });
    seedCredential({
      id: 2,
      tenant_id: TENANT_B,
      provider: CREDENTIAL_PROVIDER.wx_pay,
      app_id: 'mch-B',
      secret: 'secret-B',
    });

    // Tenant A asks for tenant B's app_id under the same provider — must miss.
    const cross = await vault.get(TENANT_A, CREDENTIAL_PROVIDER.wx_pay, 'mch-B');
    expect(cross).toBeNull();

    // And tenant A's normal lookup still works after the negative.
    const own = await vault.get(TENANT_A, CREDENTIAL_PROVIDER.wx_pay, 'mch-A');
    expect(own?.app_id).toBe('mch-A');
  });

  it('caches negative results per (tenant, provider, appId) without poisoning others', async () => {
    seedCredential({
      id: 1,
      tenant_id: TENANT_B,
      provider: CREDENTIAL_PROVIDER.alipay,
      app_id: 'alipay-B',
      secret: 'secret-B',
    });

    // First call for tenant A misses → negative cached.
    const miss1 = await vault.get(TENANT_A, CREDENTIAL_PROVIDER.alipay);
    expect(miss1).toBeNull();

    // A second tenant A call returns cached null without re-hitting findOne.
    credentialRepo.findOne.mockClear();
    const miss2 = await vault.get(TENANT_A, CREDENTIAL_PROVIDER.alipay);
    expect(miss2).toBeNull();
    expect(credentialRepo.findOne).not.toHaveBeenCalled();

    // Tenant B is unaffected by A's negative cache.
    const hit = await vault.get(TENANT_B, CREDENTIAL_PROVIDER.alipay);
    expect(hit?.tenant_id).toBe(TENANT_B);
  });

  it('clears only the targeted tenant on invalidate', async () => {
    seedCredential({
      id: 1,
      tenant_id: TENANT_A,
      provider: CREDENTIAL_PROVIDER.oss,
      app_id: 'bucket-A',
      secret: 'ak-A',
    });
    seedCredential({
      id: 2,
      tenant_id: TENANT_B,
      provider: CREDENTIAL_PROVIDER.oss,
      app_id: 'bucket-B',
      secret: 'ak-B',
    });

    await vault.get(TENANT_A, CREDENTIAL_PROVIDER.oss);
    await vault.get(TENANT_B, CREDENTIAL_PROVIDER.oss);

    await vault.invalidate(TENANT_A, CREDENTIAL_PROVIDER.oss);

    credentialRepo.findOne.mockClear();
    await vault.get(TENANT_A, CREDENTIAL_PROVIDER.oss);
    expect(credentialRepo.findOne).toHaveBeenCalledTimes(1);

    credentialRepo.findOne.mockClear();
    await vault.get(TENANT_B, CREDENTIAL_PROVIDER.oss);
    // B was not invalidated → still served from cache.
    expect(credentialRepo.findOne).not.toHaveBeenCalled();
  });
});
