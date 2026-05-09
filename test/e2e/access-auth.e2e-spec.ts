import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const session: (opts: Record<string, unknown>) => unknown = require('express-session');

import { AccessController } from '@modules/access/access.controller';
import { AccessService } from '@modules/access/access.service';
import { OpLogService } from '@modules/oplog/oplog.service';
import { CacheService } from '@service/cache.service';
import { AuthGuard } from '@guard/auth.guard';
import session_config from '@config/session';
import while_list from '@config/white-list';

const TEST_COOKIE_SECRET = 'test-cookie-secret-do-not-use-in-prod';
const TEST_COOKIE_KEY = 'easy-front-test-key';

interface AccessServiceMock {
  login: jest.Mock;
  checkUser: jest.Mock;
}

interface CacheServiceMock {
  set: jest.Mock;
  get: jest.Mock;
}

interface OpLogServiceMock {
  createLogTask: jest.Mock;
}

describe('Access auth (e2e baseline — session + MD5 token)', () => {
  let app: INestApplication;
  let accessService: AccessServiceMock;
  let cacheService: CacheServiceMock;
  let opLogService: OpLogServiceMock;

  beforeAll(async () => {
    process.env.COOKIE_SECRET = TEST_COOKIE_SECRET;
    process.env.COOKIE_KEY = TEST_COOKIE_KEY;

    accessService = {
      login: jest.fn(),
      checkUser: jest.fn(),
    };
    cacheService = {
      set: jest.fn(),
      get: jest.fn(),
    };
    opLogService = {
      createLogTask: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [session_config, while_list],
          isGlobal: true,
        }),
      ],
      controllers: [AccessController],
      providers: [
        { provide: AccessService, useValue: accessService },
        { provide: CacheService, useValue: cacheService },
        { provide: OpLogService, useValue: opLogService },
        { provide: APP_GUARD, useClass: AuthGuard },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(
      session({
        secret: TEST_COOKIE_SECRET,
        name: TEST_COOKIE_KEY,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { httpOnly: true, secure: false, maxAge: 60_000 },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    accessService.login.mockReset();
    accessService.checkUser.mockReset();
    cacheService.set.mockReset();
    cacheService.get.mockReset();
    opLogService.createLogTask.mockReset();
  });

  describe('AuthGuard contract on protected routes', () => {
    it('rejects login-by-account without auth/swagger bypass with 401', async () => {
      await request(app.getHttpServer())
        .post('/api/access/login-by-account')
        .send({
          account_id: 'tester',
          login_client: 1,
          account_pwd: 'password123',
        })
        .expect(401);

      expect(accessService.login).not.toHaveBeenCalled();
    });

    it('rejects get-session without cookie/swagger bypass with 401', async () => {
      await request(app.getHttpServer()).post('/api/access/get-session').send({}).expect(401);
    });

    it('rejects with 401 when only x-auth-token header is present but cache miss', async () => {
      cacheService.get.mockResolvedValueOnce(null);

      await request(app.getHttpServer())
        .post('/api/access/get-session')
        .set('x-auth-token', 'unknown-token')
        .send({})
        .expect(401);
    });
  });

  describe('Session-based login flow', () => {
    it('login with x-from-source=swagger succeeds and returns md5 token', async () => {
      accessService.login.mockResolvedValueOnce({
        id: 7,
        nick: 'tester',
        account_id: 'tester',
      });

      const response = await request(app.getHttpServer())
        .post('/api/access/login-by-account')
        .set('x-from-source', 'swagger')
        .send({
          account_id: 'tester',
          login_client: 1,
          account_pwd: 'password123',
        })
        .expect(201);

      expect(response.body.id).toBe(7);
      expect(response.body.token).toEqual(expect.any(String));
      expect(response.body.token).toHaveLength(32);
      expect(accessService.login).toHaveBeenCalledTimes(1);
    });

    it('login sets a session cookie that authenticates subsequent requests', async () => {
      accessService.login.mockResolvedValueOnce({
        id: 9,
        nick: 'tester',
        account_id: 'tester',
      });
      accessService.checkUser.mockResolvedValueOnce({ extra: 'profile' });

      const agent = request.agent(app.getHttpServer());

      await agent
        .post('/api/access/login-by-account')
        .set('x-from-source', 'swagger')
        .send({
          account_id: 'tester',
          login_client: 1,
          account_pwd: 'password123',
        })
        .expect(201);

      const protectedResponse = await agent.post('/api/access/get-session').send({}).expect(201);

      expect(protectedResponse.body).toMatchObject({
        id: 9,
        nick: 'tester',
        account_id: 'tester',
        extra: 'profile',
      });
      expect(protectedResponse.body.token).toEqual(expect.any(String));
      expect(accessService.checkUser).toHaveBeenCalledWith(9);
    });

    it('logout clears the session so the same cookie is rejected afterwards', async () => {
      accessService.login.mockResolvedValueOnce({
        id: 11,
        nick: 'tester',
        account_id: 'tester',
      });

      const agent = request.agent(app.getHttpServer());

      await agent
        .post('/api/access/login-by-account')
        .set('x-from-source', 'swagger')
        .send({
          account_id: 'tester',
          login_client: 1,
          account_pwd: 'password123',
        })
        .expect(201);

      await agent.post('/api/access/logout').send({}).expect(201);
      expect(opLogService.createLogTask).toHaveBeenCalledTimes(1);

      await agent.post('/api/access/get-session').send({}).expect(401);
    });
  });

  describe('Token-header login flow (mobile / mini-program)', () => {
    it('honours x-auth-token header by reading the user from cache', async () => {
      const cachedUser = { id: 21, account_id: 'mobile' };
      const validToken = await computeAuthToken(cachedUser.id, TEST_COOKIE_KEY);
      cacheService.get.mockResolvedValueOnce(JSON.stringify(cachedUser));
      accessService.checkUser.mockResolvedValueOnce({ extra: 'cached' });

      const response = await request(app.getHttpServer())
        .post('/api/access/get-session')
        .set('x-auth-token', validToken)
        .send({})
        .expect(201);

      expect(response.body).toEqual({ ...cachedUser, extra: 'cached' });
      expect(cacheService.get).toHaveBeenCalledWith(`SESSION_USER_${validToken}`);
    });
  });
});

async function computeAuthToken(id: number, cookieKey: string): Promise<string> {
  const { md5 } = await import('@libs/cryptogram');
  return md5(`${cookieKey}${JSON.stringify({ id, code: undefined })}${cookieKey}`).toString();
}
