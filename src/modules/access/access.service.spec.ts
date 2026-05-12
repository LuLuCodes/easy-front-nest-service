import { Test } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

import { CacheService } from '@service/cache.service';
import { OpLogService } from '@modules/oplog/oplog.service';
import { TenantContextService } from '@tenant/tenant-context.service';
import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { LOGIN_CLIENT, LOGIN_TYPE, USER_STATUS } from '@dto/EnumDTO';

import { AccessService } from './access.service';

jest.mock('@libs/redlock', () => ({
  RedisLock: {
    lock: jest.fn().mockResolvedValue({ token: 'lock' }),
    unlock: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@libs/cryptogram', () => ({
  encryptPassword: jest.fn((pwd: string, salt: string) => `enc:${pwd}:${salt}`),
  makeSalt: jest.fn(() => 'salt'),
}));

interface RepoMock {
  find: jest.Mock;
  findOne: jest.Mock;
  findAndCount: jest.Mock;
  count: jest.Mock;
  save: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  softDelete: jest.Mock;
  createQueryBuilder: jest.Mock;
}

function makeRepo(): RepoMock {
  return {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    findAndCount: jest.fn().mockResolvedValue([[], 0]),
    count: jest.fn().mockResolvedValue(0),
    save: jest.fn(async (input) => (Array.isArray(input) ? input : { id: 1, ...input })),
    create: jest.fn((_entity, data) => (data === undefined ? _entity : data)),
    update: jest.fn().mockResolvedValue(undefined),
    softDelete: jest.fn().mockResolvedValue(undefined),
    createQueryBuilder: jest.fn(),
  };
}

function makeQb(rows: unknown[] = [], count = rows.length) {
  const qb: Record<string, jest.Mock> = {};
  ['leftJoinAndSelect', 'select', 'andWhere', 'skip', 'take', 'orderBy'].forEach((m) => {
    qb[m] = jest.fn().mockReturnValue(qb);
  });
  qb.getManyAndCount = jest.fn().mockResolvedValue([rows, count]);
  return qb;
}

describe('AccessService', () => {
  let service: AccessService;
  let userLoginRepo: RepoMock;
  let userRepo: RepoMock;
  let userRoleRepo: RepoMock;
  let userRoleRelationRepo: RepoMock;
  let userRightRepo: RepoMock;
  let userRightRelationRepo: RepoMock;
  let cacheService: { get: jest.Mock; set: jest.Mock };
  let opLogService: { createLogTask: jest.Mock };
  let tenantContext: { tenantId: jest.Mock; isSuperAdmin: jest.Mock };
  let dataSource: { transaction: jest.Mock };
  let txManager: {
    save: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    softDelete: jest.Mock;
  };

  beforeEach(async () => {
    userLoginRepo = makeRepo();
    userRepo = makeRepo();
    userRoleRepo = makeRepo();
    userRoleRelationRepo = makeRepo();
    userRightRepo = makeRepo();
    userRightRelationRepo = makeRepo();
    cacheService = { get: jest.fn().mockResolvedValue(null), set: jest.fn() };
    opLogService = { createLogTask: jest.fn().mockResolvedValue(undefined) };
    tenantContext = {
      tenantId: jest.fn().mockReturnValue(1),
      isSuperAdmin: jest.fn().mockReturnValue(false),
    };
    txManager = {
      save: jest.fn(async (_e, data) => data),
      create: jest.fn((_e, data) => data),
      update: jest.fn().mockResolvedValue(undefined),
      softDelete: jest.fn().mockResolvedValue(undefined),
    };
    dataSource = {
      transaction: jest.fn(async (cb) => cb(txManager)),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AccessService,
        { provide: getDataSourceToken(), useValue: dataSource },
        { provide: CacheService, useValue: cacheService },
        { provide: OpLogService, useValue: opLogService },
        { provide: TenantContextService, useValue: tenantContext },
        { provide: getRepositoryToken(UserLogin), useValue: userLoginRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(UserRole), useValue: userRoleRepo },
        { provide: getRepositoryToken(UserRoleRelation), useValue: userRoleRelationRepo },
        { provide: getRepositoryToken(UserRight), useValue: userRightRepo },
        { provide: getRepositoryToken(UserRightRelation), useValue: userRightRelationRepo },
      ],
    }).compile();

    service = moduleRef.get(AccessService);
  });

  describe('checkAccount', () => {
    it('returns true when an account exists', async () => {
      userLoginRepo.findOne.mockResolvedValue({ id: 1 });
      await expect(
        service.checkAccount({
          account_id: 'leyi',
          login_client: LOGIN_CLIENT.平台端,
        } as never),
      ).resolves.toBe(true);
    });

    it('returns false when no account row matches', async () => {
      userLoginRepo.findOne.mockResolvedValue(null);
      await expect(
        service.checkAccount({
          account_id: 'leyi',
          login_client: LOGIN_CLIENT.平台端,
        } as never),
      ).resolves.toBe(false);
    });
  });

  describe('login', () => {
    it('rejects when the account does not exist', async () => {
      userLoginRepo.findOne.mockResolvedValue(null);
      await expect(
        service.login(
          { account_id: 'x', account_pwd: 'p', login_client: 1 },
          LOGIN_TYPE.账号名密码登录,
        ),
      ).rejects.toThrow(/账号不存在/);
    });

    it('rejects when password mismatch on password-login type', async () => {
      userLoginRepo.findOne.mockResolvedValue({
        id: 1,
        account_id: 'leyi',
        account_pwd: 'enc:correct:salt',
        pwd_salt: 'salt',
        user_id: 99,
      });
      await expect(
        service.login(
          { account_id: 'leyi', account_pwd: 'wrong', login_client: 1 },
          LOGIN_TYPE.账号名密码登录,
        ),
      ).rejects.toThrow(/密码错误/);
    });

    it('rejects when user_status is abnormal', async () => {
      userLoginRepo.findOne.mockResolvedValue({
        id: 1,
        account_id: 'leyi',
        account_pwd: 'enc:p:salt',
        pwd_salt: 'salt',
        user_id: 99,
      });
      userRepo.findOne.mockResolvedValue({ id: 99, user_status: USER_STATUS.冻结, nick: 'x' });
      await expect(
        service.login(
          { account_id: 'leyi', account_pwd: 'p', login_client: 1 },
          LOGIN_TYPE.账号名密码登录,
        ),
      ).rejects.toThrow(/异常|无法登录/);
    });

    it('returns user info on successful login and writes an op-log', async () => {
      userLoginRepo.findOne.mockResolvedValue({
        id: 1,
        account_id: 'leyi',
        account_pwd: 'enc:p:salt',
        pwd_salt: 'salt',
        user_id: 99,
      });
      userRepo.findOne.mockResolvedValue({ id: 99, user_status: USER_STATUS.正常, nick: 'leyi' });
      const out = await service.login(
        { account_id: 'leyi', account_pwd: 'p', login_client: 1 },
        LOGIN_TYPE.账号名密码登录,
      );
      expect(out).toMatchObject({ id: 99, nick: 'leyi', account_id: 'leyi' });
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('createUserAccount', () => {
    it('rejects when the operator is not a platform-side login', async () => {
      userLoginRepo.findOne.mockResolvedValueOnce({ id: 7, login_client: LOGIN_CLIENT.企业端 });
      await expect(
        service.createUserAccount(
          {
            account_id: 'new',
            account_pwd: 'p',
            login_client: LOGIN_CLIENT.平台端,
          } as never,
          { id: 7 },
        ),
      ).rejects.toThrow(/无权限/);
    });

    it('rejects when the target account_id already exists', async () => {
      // 1st findOne: operator lookup → valid
      // 2nd findOne (inside checkAccount): existing account
      userLoginRepo.findOne
        .mockResolvedValueOnce({ id: 7, login_client: LOGIN_CLIENT.平台端 })
        .mockResolvedValueOnce({ id: 999 });
      await expect(
        service.createUserAccount(
          {
            account_id: 'dup',
            account_pwd: 'p',
            login_client: LOGIN_CLIENT.平台端,
          } as never,
          { id: 7 },
        ),
      ).rejects.toThrow(/已存在/);
    });

    it('persists user + login in a transaction and assigns roles when provided', async () => {
      userLoginRepo.findOne
        .mockResolvedValueOnce({ id: 7, login_client: LOGIN_CLIENT.平台端 })
        .mockResolvedValueOnce(null);
      // setUserRoleRelation calls checkUser which does userRepo.findOne
      userRepo.findOne.mockResolvedValue({ id: 1, user_status: USER_STATUS.正常, nick: 'new' });
      txManager.save = jest.fn(async (_e, data) => ({ id: 1, ...(data as object) }));
      txManager.create = jest.fn((_e, data) => data);

      const created = await service.createUserAccount(
        {
          account_id: 'new',
          account_pwd: 'p',
          login_client: LOGIN_CLIENT.平台端,
          nick: 'new',
          role_id_list: [11],
        } as never,
        { id: 7 },
      );

      expect(created).toMatchObject({ id: 1 });
      expect(dataSource.transaction).toHaveBeenCalled();
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('modifyUserPassword', () => {
    it('rejects when target login row missing', async () => {
      userLoginRepo.findOne.mockResolvedValue(null);
      await expect(
        service.modifyUserPassword({ user_id: 1, login_client: 1, account_pwd: 'new' } as never, {
          id: 7,
        }),
      ).rejects.toThrow(/不存在/);
    });

    it('updates pwd_salt and account_pwd then logs', async () => {
      userLoginRepo.findOne.mockResolvedValue({ id: 99, account_id: 'leyi' });
      await service.modifyUserPassword(
        { user_id: 1, login_client: 1, account_pwd: 'new' } as never,
        { id: 7 },
      );
      expect(userLoginRepo.update).toHaveBeenCalledWith(
        { id: 99 },
        expect.objectContaining({ account_pwd: expect.stringContaining('enc:new:salt') }),
      );
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('checkUser', () => {
    it('throws when user row missing', async () => {
      userRepo.findOne.mockResolvedValue(null);
      await expect(service.checkUser(1)).rejects.toThrow(/不存在/);
    });

    it('throws when user_status not 正常', async () => {
      userRepo.findOne.mockResolvedValue({ id: 1, user_status: USER_STATUS.冻结 });
      await expect(service.checkUser(1)).rejects.toThrow(/异常|无法登录/);
    });

    it('returns the row on healthy user', async () => {
      userRepo.findOne.mockResolvedValue({ id: 1, user_status: USER_STATUS.正常, nick: 'ok' });
      await expect(service.checkUser(1)).resolves.toMatchObject({ nick: 'ok' });
    });
  });

  describe('editUser', () => {
    it('rejects when target user is not editable', async () => {
      userRepo.findOne.mockResolvedValue(null);
      await expect(service.editUser({ user_id: 1, nick: 'x' } as never, { id: 7 })).rejects.toThrow(
        /不可编辑|不存在/,
      );
    });

    it('updates fields and writes op-log', async () => {
      userRepo.findOne.mockResolvedValue({ user_status: USER_STATUS.正常 });
      await service.editUser({ user_id: 1, nick: 'new' } as never, { id: 7, nick: 'op' });
      expect(userRepo.update).toHaveBeenCalledWith(
        { id: 1 },
        expect.objectContaining({ nick: 'new', updated_by: 1 }),
      );
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('SetUserStatus', () => {
    it('updates user_status and logs', async () => {
      await service.SetUserStatus({ user_id: 1, user_status: USER_STATUS.冻结 } as never, {
        id: 7,
      });
      expect(userRepo.update).toHaveBeenCalledWith(
        { id: 1 },
        expect.objectContaining({ user_status: USER_STATUS.冻结 }),
      );
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('getUserList', () => {
    it('applies tenant filter for non-super-admin and returns rows + count', async () => {
      const qb = makeQb([{ id: 1, nick: 'a' }], 1);
      userRepo.createQueryBuilder.mockReturnValue(qb);
      userRoleRelationRepo.find.mockResolvedValue([
        { user_id: 1, role_id: 11, role: { id: 11, role_name: 'admin' } as UserRole },
      ]);

      const result = await service.getUserList({
        nick: 'a',
        role_type: 1,
        login_client: 1,
        account_id: 'leyi',
        login_type: LOGIN_TYPE.账号名密码登录,
      } as never);

      expect(qb.andWhere).toHaveBeenCalledWith(
        'user.tenant_id = :tenantId',
        expect.objectContaining({ tenantId: 1 }),
      );
      expect(result.rows[0].roles).toHaveLength(1);
      expect(result.count).toBe(1);
    });

    it('skips tenant filter when super-admin', async () => {
      tenantContext.isSuperAdmin.mockReturnValue(true);
      const qb = makeQb([], 0);
      userRepo.createQueryBuilder.mockReturnValue(qb);
      await service.getUserList({} as never);
      expect(qb.andWhere).not.toHaveBeenCalledWith('user.tenant_id = :tenantId', expect.anything());
    });
  });

  describe('getRoleList / getRightList', () => {
    it('getRoleList applies role_name LIKE and tenant filter', async () => {
      userRoleRepo.findAndCount.mockResolvedValue([[{ id: 1 }], 1]);
      const out = await service.getRoleList({ role_name: 'ad', role_type: 1 } as never);
      expect(out.count).toBe(1);
      const arg = userRoleRepo.findAndCount.mock.calls[0][0];
      expect(arg.where).toMatchObject({ role_type: 1, tenant_id: 1 });
    });

    it('getRightList returns array tree', async () => {
      userRightRepo.find.mockResolvedValue([
        { id: 1, parent_id: 0, right_name: 'r1' },
        { id: 2, parent_id: 1, right_name: 'r1.1' },
      ]);
      const tree = await service.getRightList({ role_type: 1 } as never);
      expect(tree.length).toBeGreaterThan(0);
    });
  });

  describe('setRole', () => {
    it('throws on duplicate role name', async () => {
      userRoleRepo.findOne.mockResolvedValue({ id: 99 });
      await expect(
        service.setRole({ role_id: 0, role_name: 'admin' } as never, { id: 7 }),
      ).rejects.toThrow(/重复/);
    });

    it('creates a new role when role_id=0', async () => {
      userRoleRepo.findOne.mockResolvedValue(null);
      userRoleRepo.save.mockImplementation(async (entity) => ({ id: 42, ...(entity as object) }));
      const saved = await service.setRole(
        { role_id: 0, role_name: 'new', role_type: 1, is_supper: 0, right_id_list: [] } as never,
        { id: 7 },
      );
      expect(saved).toMatchObject({ id: 42 });
      expect(userRoleRepo.save).toHaveBeenCalled();
    });

    it('updates an existing role when role_id > 0', async () => {
      userRoleRepo.findOne.mockResolvedValue(null);
      userRoleRepo.save.mockImplementation(async (entity) => entity);
      const saved = await service.setRole({ role_id: 5, role_name: 'r' } as never, { id: 7 });
      expect(saved).toMatchObject({ id: 5 });
    });
  });

  describe('deleteRole', () => {
    it('soft-deletes and logs', async () => {
      await service.deleteRole({ id: 5 } as never, { id: 7 });
      expect(userRoleRepo.softDelete).toHaveBeenCalledWith({ id: 5 });
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('setRight', () => {
    it('throws on duplicate right_name', async () => {
      userRightRepo.findOne.mockResolvedValue({ right_name: 'X', right_code: 'A' });
      await expect(
        service.setRight({ right_id: 0, right_name: 'X', right_code: 'B' } as never, { id: 7 }),
      ).rejects.toThrow(/权限名.*重复/);
    });

    it('throws on duplicate right_code', async () => {
      userRightRepo.findOne.mockResolvedValue({ right_name: 'OTHER', right_code: 'A' });
      await expect(
        service.setRight({ right_id: 0, right_name: 'X', right_code: 'A' } as never, { id: 7 }),
      ).rejects.toThrow(/权限代码.*重复/);
    });

    it('creates a new right when right_id=0', async () => {
      userRightRepo.findOne.mockResolvedValue(null);
      userRightRepo.save.mockImplementation(async (e) => ({ id: 7, ...(e as object) }));
      const saved = await service.setRight(
        { right_id: 0, right_name: 'r', right_code: 'c' } as never,
        { id: 7 },
      );
      expect(saved).toMatchObject({ id: 7 });
    });
  });

  describe('deleteRight', () => {
    it('soft-deletes and logs', async () => {
      await service.deleteRight({ id: 5 } as never, { id: 7 });
      expect(userRightRepo.softDelete).toHaveBeenCalledWith({ id: 5 });
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('setUserRoleRelation', () => {
    it('clears + reinserts role mapping in a transaction', async () => {
      userRepo.findOne.mockResolvedValue({ id: 1, nick: 'u', user_status: USER_STATUS.正常 });
      await service.setUserRoleRelation({ user_id: 1, role_id_list: [11, 12] } as never, { id: 7 });
      expect(txManager.softDelete).toHaveBeenCalledWith(UserRoleRelation, { user_id: 1 });
      expect(txManager.save).toHaveBeenCalled();
      expect(opLogService.createLogTask).toHaveBeenCalled();
    });
  });

  describe('setRoleRightRelation', () => {
    it('rejects when role does not exist', async () => {
      userRoleRepo.findOne.mockResolvedValue(null);
      await expect(
        service.setRoleRightRelation({ role_id: 99, right_id_list: [1, 2] } as never, { id: 7 }),
      ).rejects.toThrow(/角色信息不存在/);
    });

    it('clears + reinserts right mapping when role exists', async () => {
      userRoleRepo.findOne.mockResolvedValue({ id: 99, role_name: 'admin' });
      await service.setRoleRightRelation({ role_id: 99, right_id_list: [1, 2] } as never, {
        id: 7,
      });
      expect(txManager.softDelete).toHaveBeenCalledWith(UserRightRelation, { role_id: 99 });
      expect(txManager.save).toHaveBeenCalled();
    });
  });

  describe('getUserRoleRight + getRoleRightList', () => {
    it('returns empty bundle when user has no roles', async () => {
      userRoleRelationRepo.find.mockResolvedValue([]);
      const out = await service.getUserRoleRight({ user_id: 1 } as never, { id: 0 });
      expect(out).toEqual({ role_id_list: [], right_list: [], is_supper: false });
    });

    it('returns rights with is_supper=true when at least one role is supper', async () => {
      userRoleRelationRepo.find.mockResolvedValue([{ role_id: 1 }]);
      userRoleRepo.count.mockResolvedValue(1);
      userRightRepo.find.mockResolvedValue([{ id: 5, right_code: 'all' }]);
      const out = await service.getUserRoleRight({ user_id: 1 } as never, { id: 0 });
      expect(out.is_supper).toBe(true);
      expect(out.right_list).toHaveLength(1);
    });

    it('getRoleRightList honors non-admin filter via right-relations', async () => {
      userRightRelationRepo.find.mockResolvedValue([{ right_id: 7 }, { right_id: 7 }]);
      userRightRepo.find.mockResolvedValue([{ id: 7 }]);
      const out = await service.getRoleRightList({ role_id_list: [1] } as never);
      expect(out).toHaveLength(1);
    });

    it('getRoleRightList returns empty when no right-relations', async () => {
      userRightRelationRepo.find.mockResolvedValue([]);
      const out = await service.getRoleRightList({ role_id_list: [1] } as never);
      expect(out).toEqual([]);
    });
  });
});
