import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { encryptPassword } from '@libs/cryptogram';
import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { LOGIN_TYPE, USER_STATUS } from '@dto/EnumDTO';
import type { AuthConfig } from '@config/auth';

import { TenantService } from '@tenant/tenant.service';

import { AuthService } from './auth.service';

const TEST_AUTH_CONFIG: AuthConfig = {
  accessSecret: 'a'.repeat(40),
  refreshSecret: 'b'.repeat(40),
  accessTtl: '15m',
  refreshTtl: '7d',
  refreshTtlSeconds: 7 * 24 * 3600,
  refreshCookie: {
    name: 'refresh_token',
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/api/auth',
    maxAgeMs: 7 * 24 * 3600 * 1000,
  },
};

interface RepoMock {
  findOne: jest.Mock;
  find: jest.Mock;
}

function makeRepoMock(): RepoMock {
  return {
    findOne: jest.fn(),
    find: jest.fn(),
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let userLoginRepo: RepoMock;
  let userRepo: RepoMock;
  let userRoleRelationRepo: RepoMock;
  let userRoleRepo: RepoMock;
  let userRightRelationRepo: RepoMock;
  let userRightRepo: RepoMock;
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    userLoginRepo = makeRepoMock();
    userRepo = makeRepoMock();
    userRoleRelationRepo = makeRepoMock();
    userRoleRepo = makeRepoMock();
    userRightRelationRepo = makeRepoMock();
    userRightRepo = makeRepoMock();
    jwtService = { signAsync: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        {
          provide: TenantService,
          useValue: {
            resolveMembership: jest.fn(),
            listMyTenants: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key: string) => (key === 'auth' ? TEST_AUTH_CONFIG : undefined)),
          },
        },
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

    service = moduleRef.get(AuthService);
  });

  describe('validateUser', () => {
    it('returns enriched user on correct credentials', async () => {
      const salt = 'XY';
      const hash = encryptPassword('s3cret123', salt);
      userLoginRepo.findOne.mockResolvedValueOnce({
        id: 1,
        account_id: 'tester',
        account_pwd: hash,
        pwd_salt: salt,
        user_id: 42,
        login_client: 1,
      });
      userRepo.findOne.mockResolvedValueOnce({
        id: 42,
        nick: 'tester',
        role_type: 1,
        user_status: USER_STATUS.正常,
      });
      userRoleRelationRepo.find.mockResolvedValueOnce([{ role_id: 100 }]);
      userRoleRepo.find.mockResolvedValueOnce([{ id: 100, role_name: 'admin', is_supper: 0 }]);
      userRightRelationRepo.find.mockResolvedValueOnce([{ right_id: 9 }]);
      userRightRepo.find.mockResolvedValueOnce([{ right_code: 'access:user:edit' }]);

      const result = await service.validateUser('tester', 's3cret123', 1);

      expect(result).toEqual({
        id: 42,
        sub: 42,
        account_id: 'tester',
        tenant_id: 0,
        is_super_admin: false,
        login_client: 1,
        role_type: 1,
        roles: ['admin'],
        permissions: ['access:user:edit'],
      });
      expect(userLoginRepo.findOne).toHaveBeenCalledWith({
        select: ['id', 'account_id', 'account_pwd', 'pwd_salt', 'user_id', 'login_client'],
        where: {
          account_id: 'tester',
          login_client: 1,
          login_type: LOGIN_TYPE.账号名密码登录,
        },
      });
    });

    it('returns null when account is not found', async () => {
      userLoginRepo.findOne.mockResolvedValueOnce(null);
      const result = await service.validateUser('ghost', 's3cret123', 1);
      expect(result).toBeNull();
    });

    it('returns null on wrong password', async () => {
      userLoginRepo.findOne.mockResolvedValueOnce({
        id: 1,
        account_id: 'tester',
        account_pwd: 'somehash',
        pwd_salt: 'XY',
        user_id: 42,
        login_client: 1,
      });
      const result = await service.validateUser('tester', 'wrong-password', 1);
      expect(result).toBeNull();
    });

    it('returns null when user is disabled', async () => {
      const salt = 'XY';
      const hash = encryptPassword('s3cret123', salt);
      userLoginRepo.findOne.mockResolvedValueOnce({
        id: 1,
        account_id: 'tester',
        account_pwd: hash,
        pwd_salt: salt,
        user_id: 42,
        login_client: 1,
      });
      userRepo.findOne.mockResolvedValueOnce({
        id: 42,
        user_status: USER_STATUS.冻结,
      });
      const result = await service.validateUser('tester', 's3cret123', 1);
      expect(result).toBeNull();
    });
  });

  describe('signTokens', () => {
    it('signs both access and refresh tokens with configured secrets', async () => {
      jwtService.signAsync.mockImplementation((_payload, opts) =>
        Promise.resolve(`signed-${opts.secret.slice(0, 1)}-${opts.expiresIn}`),
      );

      const tokens = await service.signTokens({
        id: 7,
        sub: 7,
        account_id: 'tester',
        tenant_id: 0,
        is_super_admin: false,
        roles: ['admin'],
        permissions: ['p1'],
      });

      expect(tokens.accessToken).toBe('signed-a-15m');
      expect(tokens.refreshToken).toBe('signed-b-7d');
      expect(tokens.refreshExpiresIn).toBe(TEST_AUTH_CONFIG.refreshTtlSeconds);

      const accessCall = jwtService.signAsync.mock.calls[0];
      expect(accessCall[0]).toMatchObject({
        sub: 7,
        account_id: 'tester',
        roles: ['admin'],
        permissions: ['p1'],
      });
      const refreshCall = jwtService.signAsync.mock.calls[1];
      expect(refreshCall[0]).toMatchObject({ sub: 7, account_id: 'tester' });
      expect(refreshCall[0].jti).toEqual(expect.any(String));
    });
  });

  describe('refresh', () => {
    it('reissues tokens for an active user', async () => {
      userRepo.findOne.mockResolvedValueOnce({
        id: 7,
        role_type: 1,
        user_status: USER_STATUS.正常,
      });
      userRoleRelationRepo.find.mockResolvedValueOnce([]);
      jwtService.signAsync.mockResolvedValue('signed');

      const result = await service.refresh({
        sub: 7,
        account_id: 'tester',
        tenant_id: 0,
        jti: 'j-1',
      });

      expect(result.accessToken).toBe('signed');
      expect(result.refreshToken).toBe('signed');
    });

    it('throws Unauthorized when user is no longer active', async () => {
      userRepo.findOne.mockResolvedValueOnce({
        id: 7,
        user_status: USER_STATUS.冻结,
      });
      await expect(
        service.refresh({ sub: 7, account_id: 'tester', tenant_id: 0, jti: 'j-1' }),
      ).rejects.toThrow();
    });
  });

  describe('loadAuthorities', () => {
    it('returns empty bundle when user has no roles', async () => {
      userRoleRelationRepo.find.mockResolvedValueOnce([]);
      const result = await service.loadAuthorities(42);
      expect(result).toEqual({ roles: [], permissions: [] });
    });

    it('returns all rights when user has a supper role', async () => {
      userRoleRelationRepo.find.mockResolvedValueOnce([{ role_id: 1 }]);
      userRoleRepo.find.mockResolvedValueOnce([{ id: 1, role_name: 'root', is_supper: 1 }]);
      userRightRepo.find.mockResolvedValueOnce([{ right_code: 'a' }, { right_code: 'b' }]);

      const result = await service.loadAuthorities(42);

      expect(result.roles).toEqual(['root']);
      expect(result.permissions).toEqual(['a', 'b']);
      expect(userRightRelationRepo.find).not.toHaveBeenCalled();
    });

    it('deduplicates roles and permissions across relations', async () => {
      userRoleRelationRepo.find.mockResolvedValueOnce([{ role_id: 1 }, { role_id: 2 }]);
      userRoleRepo.find.mockResolvedValueOnce([
        { id: 1, role_name: 'admin', is_supper: 0 },
        { id: 2, role_name: 'admin', is_supper: 0 },
      ]);
      userRightRelationRepo.find.mockResolvedValueOnce([
        { right_id: 9 },
        { right_id: 9 },
        { right_id: 10 },
      ]);
      userRightRepo.find.mockResolvedValueOnce([
        { right_code: 'p1' },
        { right_code: 'p1' },
        { right_code: 'p2' },
      ]);

      const result = await service.loadAuthorities(42);

      expect(result.roles).toEqual(['admin']);
      expect(result.permissions).toEqual(['p1', 'p2']);
    });
  });
});
