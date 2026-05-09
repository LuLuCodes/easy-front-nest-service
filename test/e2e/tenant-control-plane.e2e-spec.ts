import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { randomBytes } from 'node:crypto';

import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtRefreshStrategy } from '@auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@auth/guards/permissions.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import auth_config from '@config/auth';
import tenant_config from '@config/tenant';
import {
  CREDENTIAL_PROVIDER,
  Tenant,
  TenantCredential,
  TenantUserRelation,
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { OpLogService } from '@modules/oplog/oplog.service';
import { CredentialController } from '@tenant/credential.controller';
import { CredentialService } from '@tenant/credential.service';
import { TenantCredentialVault } from '@tenant/credential-vault.service';
import { SuperAdminGuard } from '@tenant/guards/super-admin.guard';
import { TenantContextInterceptor } from '@tenant/tenant-context.interceptor';
import { TenantContextService } from '@tenant/tenant-context.service';
import { TenantController } from '@tenant/tenant.controller';
import { TenantService } from '@tenant/tenant.service';
import { open } from '@tenant/crypto/aes-gcm';

describe('Tenant control plane e2e', () => {
  let app: INestApplication;
  let tenantSeq: number;
  let credentialSeq: number;
  let relationSeq: number;
  const tenants = new Map<number, Tenant>();
  const relations = new Map<number, TenantUserRelation>();
  const credentials = new Map<number, TenantCredential>();
  const masterKeyB64 = randomBytes(32).toString('base64');

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'a'.repeat(40);
    process.env.JWT_REFRESH_SECRET = 'b'.repeat(40);
    process.env.JWT_ACCESS_TTL = '15m';
    process.env.JWT_REFRESH_TTL = '7d';
    process.env.REFRESH_COOKIE_SECURE = 'false';
    process.env.TENANT_MASTER_KEY = masterKeyB64;

    tenantSeq = 1;
    credentialSeq = 1;
    relationSeq = 1;

    const tenantRepo = mkRepo<Tenant>(tenants, () => tenantSeq++);
    const relationRepo = mkRepo<TenantUserRelation>(relations, () => relationSeq++);
    const credentialRepo = mkRepo<TenantCredential>(credentials, () => credentialSeq++);
    relationRepo.createQueryBuilder = jest.fn(() => stubQueryBuilder([]));

    const userRepo = mkRepo<User>(new Map(), () => 0);
    userRepo.findOne = jest.fn(async () => null);

    const dataSource = {
      transaction: async (fn: (m: unknown) => Promise<unknown>) =>
        fn({
          create: <T>(_e: unknown, partial: T) => partial,
          save: <T>(entity: T) => repoSaveDispatch(entity, tenantRepo, relationRepo),
          createQueryBuilder: () => ({
            update: () => ({
              set: () => ({ where: () => ({ execute: async () => undefined }) }),
            }),
          }),
        }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [auth_config, tenant_config], isGlobal: true }),
        PassportModule,
        JwtModule.register({}),
      ],
      controllers: [AuthController, TenantController, CredentialController],
      providers: [
        TenantContextService,
        AuthService,
        JwtStrategy,
        JwtRefreshStrategy,
        LocalStrategy,
        TenantService,
        CredentialService,
        {
          provide: TenantCredentialVault,
          useValue: { invalidate: jest.fn() },
        },
        SuperAdminGuard,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        { provide: APP_GUARD, useClass: PermissionsGuard },
        { provide: APP_GUARD, useClass: SuperAdminGuard },
        { provide: 'APP_INTERCEPTOR_TenantCtx', useClass: TenantContextInterceptor },
        { provide: OpLogService, useValue: { createLogTask: jest.fn() } },
        { provide: getRepositoryToken(Tenant), useValue: tenantRepo },
        { provide: getRepositoryToken(TenantUserRelation), useValue: relationRepo },
        { provide: getRepositoryToken(TenantCredential), useValue: credentialRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(UserLogin), useValue: stubRepo() },
        { provide: getRepositoryToken(UserRole), useValue: stubRepo() },
        { provide: getRepositoryToken(UserRoleRelation), useValue: stubRepo() },
        { provide: getRepositoryToken(UserRight), useValue: stubRepo() },
        { provide: getRepositoryToken(UserRightRelation), useValue: stubRepo() },
        { provide: getDataSourceToken(), useValue: dataSource },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects /admin/tenants without auth', async () => {
    await request(app.getHttpServer()).get('/api/admin/tenants').expect(401);
  });

  it('rejects /admin/tenants when caller is not super-admin', async () => {
    const token = await issueToken(app, { is_super_admin: false });
    await request(app.getHttpServer())
      .get('/api/admin/tenants')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);
  });

  it('round-trips create + list + credential add when caller is super-admin', async () => {
    const token = await issueToken(app, { is_super_admin: true });

    const created = await request(app.getHttpServer())
      .post('/api/admin/tenants')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: 'acme', name: 'Acme' })
      .expect(201);
    expect(created.body.code).toBe('acme');
    const tenantId = Number(created.body.id);

    const list = await request(app.getHttpServer())
      .get('/api/admin/tenants')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list.body).toEqual(expect.arrayContaining([expect.objectContaining({ code: 'acme' })]));

    const credResp = await request(app.getHttpServer())
      .post(`/api/admin/tenants/${tenantId}/credentials`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        provider: CREDENTIAL_PROVIDER.wx_oa,
        app_id: 'wx-acme',
        secret: 'live-secret',
      })
      .expect(201);
    expect(credResp.body.app_id).toBe('wx-acme');

    const stored = credentials.get(Number(credResp.body.id));
    expect(stored).toBeDefined();
    expect(stored!.secret_cipher).toBeInstanceOf(Buffer);
    const decrypted = open(
      {
        cipher: stored!.secret_cipher,
        iv: stored!.secret_iv,
        tag: stored!.secret_tag,
      },
      Buffer.from(masterKeyB64, 'base64'),
    );
    expect(decrypted).toBe('live-secret');
  });
});

function stubRepo() {
  return {
    findOne: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
}

function mkRepo<T extends { id?: number }>(
  store: Map<number, T>,
  nextId: () => number,
): {
  create: jest.Mock;
  save: jest.Mock;
  findOne: jest.Mock;
  find: jest.Mock;
  delete: jest.Mock;
  createQueryBuilder?: jest.Mock;
} {
  return {
    create: jest.fn((data: T) => ({ ...data })),
    save: jest.fn(async (entity: T) => {
      if (!entity.id) entity.id = nextId();
      store.set(entity.id!, entity);
      return entity;
    }),
    findOne: jest.fn(async ({ where }: { where: Record<string, unknown> }) => {
      for (const item of store.values()) {
        if (
          Object.entries(where).every(
            ([k, v]) => (item as unknown as Record<string, unknown>)[k] === v,
          )
        ) {
          return item;
        }
      }
      return null;
    }),
    find: jest.fn(async ({ where }: { where?: Record<string, unknown> } = {}) => {
      const out: T[] = [];
      for (const item of store.values()) {
        if (
          !where ||
          Object.entries(where).every(
            ([k, v]) => (item as unknown as Record<string, unknown>)[k] === v,
          )
        ) {
          out.push(item);
        }
      }
      return out;
    }),
    delete: jest.fn(async (where: Record<string, unknown>) => {
      let affected = 0;
      for (const [id, item] of store.entries()) {
        if (
          Object.entries(where).every(
            ([k, v]) => (item as unknown as Record<string, unknown>)[k] === v,
          )
        ) {
          store.delete(id);
          affected++;
        }
      }
      return { affected };
    }),
  };
}

function stubQueryBuilder<T>(rows: T[]) {
  return {
    innerJoin: () => stubQueryBuilder(rows),
    leftJoinAndSelect: () => stubQueryBuilder(rows),
    where: () => stubQueryBuilder(rows),
    andWhere: () => stubQueryBuilder(rows),
    select: () => stubQueryBuilder(rows),
    getRawMany: async () => rows,
  };
}

async function repoSaveDispatch<T>(
  entity: T,
  tenantRepo: { save: jest.Mock },
  relationRepo: { save: jest.Mock },
) {
  if ((entity as Record<string, unknown>).code !== undefined) {
    return tenantRepo.save(entity);
  }
  return relationRepo.save(entity);
}

async function issueToken(
  app: INestApplication,
  payload: { is_super_admin: boolean; tenant_id?: number; sub?: number },
): Promise<string> {
  const { JwtService } = await import('@nestjs/jwt');
  const jwt = app.get(JwtService);
  return jwt.signAsync(
    {
      sub: payload.sub ?? 99,
      account_id: 'tester',
      tenant_id: payload.tenant_id ?? 0,
      is_super_admin: payload.is_super_admin,
      roles: [],
      permissions: [],
    },
    { secret: 'a'.repeat(40), expiresIn: '5m' },
  );
}
