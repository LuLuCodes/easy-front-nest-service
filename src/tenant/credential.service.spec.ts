import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomBytes } from 'node:crypto';

import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS, TenantCredential } from '@entities/index';

import { CredentialService } from './credential.service';

describe('CredentialService', () => {
  let service: CredentialService;
  const masterKey = randomBytes(32);
  let store: Map<number, TenantCredential>;
  let nextId: number;

  beforeEach(async () => {
    store = new Map();
    nextId = 1;

    const repo = {
      create: jest.fn((data: Partial<TenantCredential>) => ({ ...data })),
      save: jest.fn(async (entity: TenantCredential) => {
        if (!entity.id) entity.id = nextId++;
        store.set(entity.id!, entity);
        return entity;
      }),
      findOne: jest.fn(async ({ where }: { where: Record<string, unknown> }) => {
        for (const credential of store.values()) {
          if (
            Object.entries(where).every(
              ([k, v]) => (credential as unknown as Record<string, unknown>)[k] === v,
            )
          ) {
            return credential;
          }
        }
        return null;
      }),
      find: jest.fn(async ({ where }: { where?: Record<string, unknown> } = {}) => {
        const result: TenantCredential[] = [];
        for (const credential of store.values()) {
          if (
            !where ||
            Object.entries(where).every(
              ([k, v]) => (credential as unknown as Record<string, unknown>)[k] === v,
            )
          ) {
            result.push(credential);
          }
        }
        return result;
      }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CredentialService,
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key: string) =>
                key === 'tenant' ? { masterKey, masterKeyVersion: 1 } : undefined,
              ),
          },
        },
        { provide: getRepositoryToken(TenantCredential), useValue: repo },
      ],
    }).compile();

    service = moduleRef.get(CredentialService);
  });

  it('encrypts secret on create and decrypts via decryptOne', async () => {
    const created = await service.create(
      42,
      {
        provider: CREDENTIAL_PROVIDER.wx_oa,
        app_id: 'wx-test',
        secret: 'sk_live_xxx',
      },
      999,
    );
    expect(created.id).toBe(1);
    expect(Buffer.isBuffer(created.secret_cipher)).toBe(true);
    expect(created.secret_cipher.toString('utf8')).not.toContain('sk_live_xxx');

    const decrypted = await service.decryptOne(created.id!);
    expect(decrypted.secret).toBe('sk_live_xxx');
    expect(decrypted.tenant_id).toBe(42);
    expect(decrypted.cert).toBeUndefined();
  });

  it('encrypts cert + secret separately when cert is provided', async () => {
    const created = await service.create(
      7,
      {
        provider: CREDENTIAL_PROVIDER.wx_pay,
        app_id: '1900000001',
        secret: 'api3-secret',
        cert: '-----BEGIN PRIVATE KEY-----\nABCDEF\n-----END PRIVATE KEY-----',
        cert_serial_no: 'ABCD1234',
      },
      999,
    );
    const decrypted = await service.decryptOne(created.id!);
    expect(decrypted.secret).toBe('api3-secret');
    expect(decrypted.cert).toContain('BEGIN PRIVATE KEY');
    expect(decrypted.cert_serial_no).toBe('ABCD1234');
  });

  it('rotateSecret replaces the cipher with a fresh IV/tag and bumps key_version', async () => {
    const created = await service.create(
      1,
      { provider: CREDENTIAL_PROVIDER.alipay, app_id: 'app', secret: 'v1' },
      1,
    );
    const originalIv = Buffer.from(created.secret_iv);
    const rotated = await service.rotateSecret(created.id!, { secret: 'v2' }, 1);
    expect(rotated.secret_iv.equals(originalIv)).toBe(false);
    expect(rotated.key_version).toBe(1);
    const decrypted = await service.decryptOne(rotated.id!);
    expect(decrypted.secret).toBe('v2');
  });

  it('updateStatus toggles status without touching cipher', async () => {
    const created = await service.create(
      1,
      { provider: CREDENTIAL_PROVIDER.oss, app_id: 'bucket', secret: 's3cret' },
      1,
    );
    const updated = await service.updateStatus(
      created.id!,
      { status: CREDENTIAL_STATUS.disabled },
      1,
    );
    expect(updated.status).toBe(CREDENTIAL_STATUS.disabled);
    expect(updated.secret_cipher.equals(created.secret_cipher)).toBe(true);
  });

  it('list returns sanitized summaries (no cipher)', async () => {
    await service.create(1, { provider: CREDENTIAL_PROVIDER.oss, app_id: 'a', secret: 'x' }, 1);
    await service.create(1, { provider: CREDENTIAL_PROVIDER.wx_oa, app_id: 'b', secret: 'y' }, 1);
    const list = await service.list(1);
    expect(list).toHaveLength(2);
    for (const item of list) {
      expect(item).not.toHaveProperty('secret');
      expect(item).not.toHaveProperty('secret_cipher');
    }
  });

  it('findActive only returns active credentials', async () => {
    const created = await service.create(
      1,
      { provider: CREDENTIAL_PROVIDER.oss, app_id: 'a', secret: 'x' },
      1,
    );
    await service.updateStatus(created.id!, { status: CREDENTIAL_STATUS.disabled }, 1);
    const out = await service.findActive(1, CREDENTIAL_PROVIDER.oss);
    expect(out).toBeNull();
  });
});
