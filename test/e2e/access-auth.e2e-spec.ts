import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';

import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { JwtRefreshStrategy } from '@auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@auth/guards/permissions.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import auth_config from '@config/auth';
import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { AccessController } from '@modules/access/access.controller';
import { AccessService } from '@modules/access/access.service';
import { OpLogService } from '@modules/oplog/oplog.service';
import { TenantService } from '@tenant/tenant.service';
import { encryptPassword, makeSalt } from '@libs/cryptogram';

describe('Auth + Access e2e (JWT contract)', () => {
  let app: INestApplication;
  let userLoginRepo: { findOne: jest.Mock; find: jest.Mock };
  let userRepo: { findOne: jest.Mock; find: jest.Mock };
  let userRoleRelationRepo: { findOne: jest.Mock; find: jest.Mock };
  let userRoleRepo: { findOne: jest.Mock; find: jest.Mock };
  let userRightRelationRepo: { findOne: jest.Mock; find: jest.Mock };
  let userRightRepo: { findOne: jest.Mock; find: jest.Mock };
  let accessService: { checkUser: jest.Mock };
  let opLogService: { createLogTask: jest.Mock };
  let tenantService: { resolveMembership: jest.Mock; listMyTenants: jest.Mock };

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'a'.repeat(40);
    process.env.JWT_REFRESH_SECRET = 'b'.repeat(40);
    process.env.JWT_ACCESS_TTL = '15m';
    process.env.JWT_REFRESH_TTL = '7d';
    process.env.REFRESH_COOKIE_SECURE = 'false';

    userLoginRepo = makeRepo();
    userRepo = makeRepo();
    userRoleRelationRepo = makeRepo();
    userRoleRepo = makeRepo();
    userRightRelationRepo = makeRepo();
    userRightRepo = makeRepo();
    accessService = { checkUser: jest.fn() };
    opLogService = { createLogTask: jest.fn() };
    tenantService = {
      resolveMembership: jest.fn(),
      listMyTenants: jest.fn().mockResolvedValue([]),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [auth_config], isGlobal: true }),
        PassportModule,
        JwtModule.register({}),
      ],
      controllers: [AuthController, AccessController],
      providers: [
        AuthService,
        JwtStrategy,
        JwtRefreshStrategy,
        LocalStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        { provide: APP_GUARD, useClass: PermissionsGuard },
        { provide: AccessService, useValue: accessService },
        { provide: OpLogService, useValue: opLogService },
        { provide: TenantService, useValue: tenantService },
        { provide: getRepositoryToken(UserLogin), useValue: userLoginRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        {
          provide: getRepositoryToken(UserRoleRelation),
          useValue: userRoleRelationRepo,
        },
        { provide: getRepositoryToken(UserRole), useValue: userRoleRepo },
        {
          provide: getRepositoryToken(UserRightRelation),
          useValue: userRightRelationRepo,
        },
        { provide: getRepositoryToken(UserRight), useValue: userRightRepo },
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

  beforeEach(() => {
    Object.values({
      userLoginRepo,
      userRepo,
      userRoleRelationRepo,
      userRoleRepo,
      userRightRelationRepo,
      userRightRepo,
    }).forEach((r) => {
      r.findOne.mockReset();
      r.find.mockReset();
    });
    accessService.checkUser.mockReset();
    opLogService.createLogTask.mockReset();
  });

  function seedUser(overrides: Partial<{ pwd: string }> = {}): {
    salt: string;
    hashedPwd: string;
    pwd: string;
  } {
    const pwd = overrides.pwd ?? 's3cret123';
    const salt = makeSalt(2);
    const hashedPwd = encryptPassword(pwd, salt);
    userLoginRepo.findOne.mockResolvedValueOnce({
      id: 1,
      account_id: 'tester',
      account_pwd: hashedPwd,
      pwd_salt: salt,
      user_id: 42,
      login_client: 1,
      login_type: 1,
    });
    userRepo.findOne.mockResolvedValueOnce({
      id: 42,
      nick: 'Tester',
      role_type: 1,
      user_status: 1,
    });
    userRoleRelationRepo.find.mockResolvedValueOnce([{ role_id: 100 }]);
    userRoleRepo.find.mockResolvedValueOnce([{ id: 100, role_name: 'admin', is_supper: 0 }]);
    userRightRelationRepo.find.mockResolvedValueOnce([{ right_id: 9 }]);
    userRightRepo.find.mockResolvedValueOnce([{ right_code: 'access:user:edit' }]);
    return { salt, hashedPwd, pwd };
  }

  describe('login', () => {
    it('returns access + refresh and sets refresh_token cookie on valid credentials', async () => {
      const { pwd } = seedUser();
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: pwd, login_client: 1 })
        .expect(200);

      expect(response.body.accessToken).toEqual(expect.any(String));
      expect(response.body.refreshToken).toEqual(expect.any(String));
      expect(response.body.user).toMatchObject({
        id: 42,
        account_id: 'tester',
        roles: ['admin'],
        permissions: ['access:user:edit'],
      });
      expect(response.body.user).not.toHaveProperty('sub');

      const setCookie = response.headers['set-cookie'] as unknown as string[] | undefined;
      expect(setCookie?.some((c) => c.includes('refresh_token='))).toBe(true);
      expect(opLogService.createLogTask).toHaveBeenCalledTimes(1);
    });

    it('rejects with 401 on wrong password', async () => {
      seedUser({ pwd: 's3cret123' });
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: 'wrong-pass', login_client: 1 })
        .expect(401);
      expect(opLogService.createLogTask).not.toHaveBeenCalled();
    });

    it('rejects with 401 when account is unknown', async () => {
      userLoginRepo.findOne.mockResolvedValueOnce(null);
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'ghost', account_pwd: 's3cret123', login_client: 1 })
        .expect(401);
    });
  });

  describe('protected routes', () => {
    it('rejects /auth/me without Authorization header', async () => {
      await request(app.getHttpServer()).get('/api/auth/me').expect(401);
    });

    it('returns the current user when a valid bearer token is sent', async () => {
      const { pwd } = seedUser();
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: pwd, login_client: 1 })
        .expect(200);

      const profile = await request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${login.body.accessToken}`)
        .expect(200);
      expect(profile.body).toMatchObject({ id: 42, account_id: 'tester' });
    });

    it('rejects /access/get-session without auth', async () => {
      await request(app.getHttpServer()).post('/api/access/get-session').send({}).expect(401);
    });

    it('returns access/get-session with bearer token', async () => {
      const { pwd } = seedUser();
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: pwd, login_client: 1 })
        .expect(200);
      accessService.checkUser.mockResolvedValueOnce({ extra: 'profile' });

      const result = await request(app.getHttpServer())
        .post('/api/access/get-session')
        .set('Authorization', `Bearer ${login.body.accessToken}`)
        .send({})
        .expect(201);
      expect(result.body).toMatchObject({
        id: 42,
        account_id: 'tester',
        extra: 'profile',
      });
    });
  });

  describe('public routes', () => {
    it('allows access/check-account without auth (annotated @Public)', async () => {
      const accessAny = accessService as unknown as { checkAccount?: jest.Mock };
      accessAny.checkAccount = jest.fn().mockResolvedValueOnce(false);
      await request(app.getHttpServer())
        .post('/api/access/check-account')
        .send({
          account_id: 'tester',
          login_client: 1,
          account_pwd: 's3cret123',
          role_id_list: [],
        })
        .expect(201);
    });
  });

  describe('refresh', () => {
    it('issues new tokens when a valid refresh cookie is present', async () => {
      const { pwd } = seedUser();
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: pwd, login_client: 1 })
        .expect(200);

      userRepo.findOne.mockResolvedValueOnce({
        id: 42,
        role_type: 1,
        user_status: 1,
      });
      userRoleRelationRepo.find.mockResolvedValueOnce([]);

      const refresh = await request(app.getHttpServer())
        .post('/api/auth/refresh')
        .set('Cookie', `refresh_token=${login.body.refreshToken}`)
        .send({})
        .expect(200);
      expect(refresh.body.accessToken).toEqual(expect.any(String));
      expect(refresh.body.refreshToken).toEqual(expect.any(String));
    });

    it('rejects refresh with no token', async () => {
      await request(app.getHttpServer()).post('/api/auth/refresh').send({}).expect(401);
    });
  });

  describe('logout', () => {
    it('clears the refresh cookie and records an oplog entry', async () => {
      const { pwd } = seedUser();
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ account_id: 'tester', account_pwd: pwd, login_client: 1 })
        .expect(200);
      opLogService.createLogTask.mockClear();

      const response = await request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${login.body.accessToken}`)
        .send({})
        .expect(200);

      expect(response.body).toEqual({ success: true });
      const setCookie = response.headers['set-cookie'] as unknown as string[] | undefined;
      expect(setCookie?.some((c) => c.startsWith('refresh_token='))).toBe(true);
      expect(opLogService.createLogTask).toHaveBeenCalledTimes(1);
    });
  });
});

function makeRepo(): { findOne: jest.Mock; find: jest.Mock } {
  return { findOne: jest.fn(), find: jest.fn() };
}
