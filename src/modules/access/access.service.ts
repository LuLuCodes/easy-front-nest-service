import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Like, Not, Repository } from 'typeorm';
import * as _ from 'lodash';

import { CacheService } from '@service/cache.service';
import {
  CreateOrUpdateRightDto,
  CreateOrUpdateRoleDto,
  CreateUserDto,
  EditUserInfoDto,
  ModifyUserPasswordDto,
  QueryRightDto,
  QueryRoleDto,
  QueryRoleRightDto,
  QueryUserDto,
  QueryUserRoleRightDto,
  SetRoleRightRelationDto,
  SetUserRoleRelationDto,
  SetUserStatusDto,
} from './access.dto';
import {
  User,
  UserLogin,
  UserRight,
  UserRightRelation,
  UserRole,
  UserRoleRelation,
} from '@entities/index';
import { ACTION_TYPE, LOGIN_CLIENT, LOGIN_TYPE, TARGET_TYPE, USER_STATUS } from '@dto/EnumDTO';
import { encryptPassword, makeSalt } from '@libs/cryptogram';
import { OpLogService } from '@modules/oplog/oplog.service';
import { TenantContextService } from '@tenant/tenant-context.service';
import { RedisLock } from '@libs/redlock';
import { arrayToTree } from '@libs/util';
import { DeleteRowDTO } from '@dto/BaseDTO';

const USER_LIST_FIELDS: (keyof User)[] = [
  'id',
  'nick',
  'avatar',
  'tag',
  'note',
  'user_status',
  'role_type',
];

const USER_DETAIL_FIELDS: (keyof User)[] = [
  'id',
  'nick',
  'avatar',
  'phone',
  'tag',
  'note',
  'role_type',
  'user_status',
  'created_at',
  'updated_at',
];

const ROLE_FIELDS: (keyof UserRole)[] = [
  'id',
  'role_type',
  'role_name',
  'is_supper',
  'remark',
  'created_at',
  'updated_at',
];

const RIGHT_FIELDS: (keyof UserRight)[] = [
  'id',
  'parent_id',
  'role_type',
  'right_type',
  'right_code',
  'right_name',
  'sort_no',
];

const RIGHT_FIELDS_WITH_TS: (keyof UserRight)[] = [...RIGHT_FIELDS, 'created_at', 'updated_at'];

@Injectable()
export class AccessService {
  private readonly LOGIN_USER_RIGHT_KEY = 'LOGIN_USER_RIGHT_';

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly cacheService: CacheService,
    private readonly opLogService: OpLogService,
    private readonly tenantContext: TenantContextService,
    @InjectRepository(UserLogin)
    private readonly userLoginRepo: Repository<UserLogin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
    @InjectRepository(UserRoleRelation)
    private readonly userRoleRelationRepo: Repository<UserRoleRelation>,
    @InjectRepository(UserRight)
    private readonly userRightRepo: Repository<UserRight>,
    @InjectRepository(UserRightRelation)
    private readonly userRightRelationRepo: Repository<UserRightRelation>,
  ) {}

  /**
   * Returns the tenant filter to apply to read-side queries. Super-admin
   * (system tenant) gets `null`, meaning no filter is applied. Regular
   * tenants get the active tenant id from AsyncLocalStorage.
   */
  private tenantFilter(): { tenant_id: number } | null {
    if (this.tenantContext.isSuperAdmin()) return null;
    return { tenant_id: this.tenantContext.tenantId() };
  }

  // 统一登录
  async login(requestBody: any, login_type: LOGIN_TYPE): Promise<any> {
    const { account_id, account_pwd, login_client } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:Login_${account_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      const login_user = await this.userLoginRepo.findOne({
        select: ['id', 'account_id', 'account_pwd', 'pwd_salt', 'user_id'],
        where: { account_id, login_client, login_type },
      });
      if (!login_user) {
        throw new Error('账号不存在，请检查');
      }

      if (login_type === LOGIN_TYPE.账号名密码登录) {
        const pwd = encryptPassword(account_pwd, login_user.pwd_salt!);
        if (pwd !== login_user.account_pwd) {
          throw new Error('密码错误，请重新输入！');
        }
      }

      const user = await this.userRepo.findOne({
        select: USER_DETAIL_FIELDS,
        where: { id: login_user.user_id },
      });
      if (!user) {
        throw new Error('账号不存在，请检查！');
      }
      if (user.user_status !== USER_STATUS.正常) {
        throw new Error('你的账号存在异常，无法登录！');
      }

      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user.id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick ?? '',
        action_type: ACTION_TYPE.登录,
        action_desc: '登录系统',
      });

      return { ...user, account_id: login_user.account_id };
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  // 检查账号是否存在
  async checkAccount(requestBody: CreateUserDto): Promise<boolean> {
    const { login_client, account_id } = requestBody;
    const login_user = await this.userLoginRepo.findOne({
      select: ['id'],
      where: {
        account_id,
        login_client,
        login_type: LOGIN_TYPE.账号名密码登录,
      },
    });
    return !!login_user;
  }

  // 创建后台登录账号
  async createUserAccount(requestBody: CreateUserDto, user: { id: number }): Promise<User> {
    const { login_client, account_id, account_pwd, nick, avatar, tag, note, role_id_list } =
      requestBody;

    let lock = null;
    const LOCK_KEY = `Lock:CreateUserAccount_${account_id}`;
    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      const op_user = await this.userLoginRepo.findOne({
        select: ['id', 'login_client'],
        where: { id: user.id },
      });
      if (!op_user || op_user.login_client !== LOGIN_CLIENT.平台端) {
        throw new Error('无权限');
      }
      const updated_by = user.id;

      if (await this.checkAccount(requestBody)) {
        throw new Error(`登录账户[${account_id}]已存在`);
      }

      const pwd_salt = makeSalt(2);
      const encrypted_pwd = encryptPassword(account_pwd, pwd_salt);

      const created: User = await this.dataSource.transaction(async (manager) => {
        const newUser = manager.create(User, {
          nick,
          avatar,
          tag,
          note,
          role_type: login_client,
          user_status: USER_STATUS.正常,
          created_by: updated_by,
          updated_by,
        });
        const savedUser = await manager.save(User, newUser);

        await manager.save(
          UserLogin,
          manager.create(UserLogin, {
            login_type: LOGIN_TYPE.账号名密码登录,
            login_client,
            account_id,
            account_pwd: encrypted_pwd,
            pwd_salt,
            user_id: savedUser.id,
            created_by: updated_by,
            updated_by,
          }),
        );

        return savedUser;
      });

      await this.opLogService.createLogTask({
        user_id: updated_by,
        target_id: updated_by,
        target_type: TARGET_TYPE.用户,
        action_user: created.nick ?? '',
        action_type: ACTION_TYPE.创建登录用户,
        action_desc: `创建创建登录用户【${account_id}】`,
      });

      if (role_id_list?.length) {
        await this.setUserRoleRelation({ role_id_list, user_id: created.id }, user);
      }
      return created;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  async modifyUserPassword(
    requestBody: ModifyUserPasswordDto,
    user: { id: number; nick?: string },
  ): Promise<void> {
    const { user_id, login_client, account_pwd } = requestBody;

    let lock = null;
    const LOCK_KEY = `Lock:ModifyUserPassword_${user_id}`;
    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);
      const login_user = await this.userLoginRepo.findOne({
        select: ['id', 'account_id'],
        where: { user_id, login_client },
      });
      if (!login_user) {
        throw new Error('不存在修改账号');
      }
      const updated_by = user.id;

      const pwd_salt = makeSalt(2);
      const encrypted_pwd = encryptPassword(account_pwd, pwd_salt);

      await this.userLoginRepo.update(
        { id: login_user.id },
        {
          account_pwd: encrypted_pwd,
          pwd_salt,
          updated_by,
        },
      );

      await this.opLogService.createLogTask({
        user_id: updated_by,
        target_id: updated_by,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick ?? '',
        action_type: ACTION_TYPE.修改密码,
        action_desc: `修改账号${login_user.account_id}密码`,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  async checkUser(user_id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      select: ['id', 'nick', 'avatar', 'tag', 'note', 'user_status'],
      where: { id: user_id },
    });
    if (!user) {
      throw new Error('账号信息不存在，请检查！');
    }
    if (user.user_status !== USER_STATUS.正常) {
      throw new Error('你的账号存在异常，无法登录！');
    }
    return user;
  }

  async editUser(requestBody: EditUserInfoDto, user: { id: number; nick?: string }): Promise<void> {
    const { nick, avatar, tag, note, user_id, role_id_list } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:EditUser_${user_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      const user_info = await this.userRepo.findOne({
        select: ['user_status'],
        where: { id: user_id },
      });
      if (!user_info || user_info.user_status !== USER_STATUS.正常) {
        throw new Error('当前用户不存在或不可编辑');
      }

      const update_data = _.omitBy({ nick, avatar, tag, note, updated_by: user_id }, _.isNil);

      await this.userRepo.update({ id: user_id }, update_data);

      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user_id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick ?? '',
        action_type: ACTION_TYPE.修改用户信息,
        action_desc: '修改用户信息',
      });

      if (role_id_list?.length) {
        await this.setUserRoleRelation({ role_id_list, user_id }, user);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  async SetUserStatus(
    requestBody: SetUserStatusDto,
    user: { id: number; nick?: string },
  ): Promise<void> {
    const { user_status, user_id } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:SetUserStatus_${user_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      await this.userRepo.update({ id: user_id }, { user_status, updated_by: user_id });

      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user_id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick ?? '',
        action_type: ACTION_TYPE.设置用户状态,
        action_desc: `设置用户状态：${USER_STATUS[user_status]}`,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  /************ 权限相关 *********************/

  async getUserList(requestBody: QueryUserDto): Promise<{
    rows: (User & { roles?: UserRole[] })[];
    count: number;
  }> {
    const {
      nick,
      login_client,
      account_id,
      role_type,
      login_type,
      page_num = 1,
      page_size = 10,
    } = requestBody as QueryUserDto & {
      page_num?: number;
      page_size?: number;
    };

    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.account', 'account')
      .select([
        ...USER_LIST_FIELDS.map((f) => `user.${f}`),
        'account.id',
        'account.login_client',
        'account.account_id',
      ]);

    if (nick) qb.andWhere('user.nick LIKE :nick', { nick: `${nick}%` });
    if (role_type) qb.andWhere('user.role_type = :role_type', { role_type });
    if (login_client != null) qb.andWhere('account.login_client = :login_client', { login_client });
    if (account_id) qb.andWhere('account.account_id = :account_id', { account_id });
    if (login_type) qb.andWhere('account.login_type = :login_type', { login_type });

    const filter = this.tenantFilter();
    if (filter) qb.andWhere('user.tenant_id = :tenantId', { tenantId: filter.tenant_id });

    qb.skip((page_num - 1) * page_size)
      .take(page_size)
      .orderBy('user.id', 'DESC');

    const [users, count] = await qb.getManyAndCount();
    const rows = users as (User & { roles?: UserRole[] })[];

    if (rows.length) {
      const user_ids = rows.map((v) => v.id);
      const roleRelations = await this.userRoleRelationRepo.find({
        select: { user_id: true, role_id: true },
        where: { user_id: In(user_ids) },
        relations: { role: true },
      });

      rows.forEach((u) => {
        u.roles = roleRelations
          .filter((r) => r.user_id === u.id && r.role)
          .map((r) => r.role!) as UserRole[];
      });
    }

    return { rows, count };
  }

  async getRoleList(requestBody: QueryRoleDto): Promise<{
    rows: UserRole[];
    count: number;
  }> {
    const {
      role_name,
      role_type,
      page_num = 1,
      page_size = 10,
    } = requestBody as QueryRoleDto & {
      page_num?: number;
      page_size?: number;
    };

    const where: Record<string, unknown> = {};
    if (role_type) where.role_type = role_type;
    if (role_name) where.role_name = Like(`${role_name}%`);
    const tenantFilter = this.tenantFilter();
    if (tenantFilter) where.tenant_id = tenantFilter.tenant_id;

    const [rows, count] = await this.userRoleRepo.findAndCount({
      select: ROLE_FIELDS,
      where,
      skip: (page_num - 1) * page_size,
      take: page_size,
      order: { id: 'DESC' },
    });
    return { rows, count };
  }

  async getRightList(requestBody: QueryRightDto): Promise<UserRight[]> {
    const { role_type, right_name } = requestBody;
    const where: Record<string, unknown> = {};
    if (role_type) where.role_type = role_type;
    if (right_name) where.right_name = right_name;
    const tenantFilter = this.tenantFilter();
    if (tenantFilter) where.tenant_id = tenantFilter.tenant_id;

    const right_list = await this.userRightRepo.find({
      select: RIGHT_FIELDS_WITH_TS,
      where,
      order: { sort_no: 'ASC', id: 'ASC' },
    });
    return arrayToTree(right_list);
  }

  /**
   * 获取登录用户权限
   */
  private async getLoginUserRight(
    user_id: number,
    ingore_cache = false,
  ): Promise<{
    role_id_list: number[];
    right_list: UserRight[];
    is_supper: boolean;
  }> {
    const cache_key = `${this.LOGIN_USER_RIGHT_KEY}${user_id}`;
    if (!ingore_cache) {
      const cached = await this.cacheService.get(cache_key);
      if (cached) return JSON.parse(cached);
    }

    const empty = { role_id_list: [], right_list: [], is_supper: false };

    const role_relation = await this.userRoleRelationRepo.find({
      select: { role_id: true },
      where: { user_id },
    });
    if (!role_relation.length) return empty;

    const role_id_list = _.unionBy(role_relation.map((v) => v.role_id!)) as number[];

    const supper_role_count = await this.userRoleRepo.count({
      where: { id: In(role_id_list), is_supper: 1 },
    });

    const right_list = await this.getRightByRoleIds(role_id_list, supper_role_count > 0);

    const res = {
      role_id_list,
      right_list,
      is_supper: supper_role_count > 0,
    };
    await this.cacheService.set(cache_key, JSON.stringify(res), 'EX', 7 * 24 * 3600);
    return res;
  }

  private async getRightByRoleIds(role_id_list: number[], is_admin = false): Promise<UserRight[]> {
    const where: Record<string, unknown> = {};
    if (!is_admin) {
      const right_relation = await this.userRightRelationRepo.find({
        select: { right_id: true },
        where: { role_id: In(role_id_list) },
      });
      if (!right_relation.length) return [];
      const right_id_list = _.unionBy(right_relation.map((v) => v.right_id!)) as number[];
      where.id = In(right_id_list);
    }
    return this.userRightRepo.find({
      select: RIGHT_FIELDS,
      where,
      order: { sort_no: 'ASC', id: 'ASC' },
    });
  }

  async getUserRoleRight(
    requestBody: QueryUserRoleRightDto,
    user: { id: number },
  ): Promise<{
    role_id_list: number[];
    right_list: UserRight[];
    is_supper: boolean;
  }> {
    const { user_id } = requestBody;
    const _user_id = user_id || user.id;
    return this.getLoginUserRight(_user_id, true);
  }

  async getRoleRightList(reqBody: QueryRoleRightDto): Promise<UserRight[]> {
    const { role_id_list } = reqBody;
    return this.getRightByRoleIds(role_id_list);
  }

  async setRole(
    requestBody: CreateOrUpdateRoleDto,
    user: { id: number; nick?: string },
  ): Promise<UserRole> {
    const { role_id, role_name, role_type, is_supper, remark, right_id_list } = requestBody;

    const dup_where: Record<string, unknown> = { role_name };
    if (role_id) dup_where.id = Not(role_id);

    const dup = await this.userRoleRepo.findOne({
      select: ['id'],
      where: dup_where,
    });
    if (dup) {
      throw new Error(`角色名[${role_name}]重复，请使用其他名称`);
    }

    const is_update = (role_id ?? 0) > 0;
    const payload: Partial<UserRole> = {
      role_name,
      is_supper,
      role_type,
      remark,
      updated_by: user.id,
      created_by: user.id,
    };

    let saved: UserRole;
    if (is_update) {
      saved = await this.userRoleRepo.save({ id: role_id, ...payload });
    } else {
      saved = await this.userRoleRepo.save(this.userRoleRepo.create(payload));
    }

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      target_type: TARGET_TYPE.角色,
      target_id: role_id,
      action_type: is_update ? ACTION_TYPE.修改角色 : ACTION_TYPE.创建角色,
      action_desc: `${is_update ? '修改' : '创建'}角色【${role_name}】`,
    });

    if (right_id_list?.length) {
      await this.setRoleRightRelation({ role_id: saved.id, right_id_list }, user);
    }
    return saved;
  }

  async deleteRole(requestBody: DeleteRowDTO, user: { id: number; nick?: string }): Promise<void> {
    const { id } = requestBody;
    await this.userRoleRepo.update({ id }, { updated_by: user.id });
    await this.userRoleRepo.softDelete({ id });

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      target_type: TARGET_TYPE.角色,
      target_id: id,
      action_type: ACTION_TYPE.删除角色,
      action_desc: `删除角色【${id}】`,
    });
  }

  async setRight(
    requestBody: CreateOrUpdateRightDto,
    user: { id: number; nick?: string },
  ): Promise<UserRight> {
    const { right_id, right_code, right_name, role_type, parent_id, sort_no, right_type } =
      requestBody;

    const orClauses: Record<string, unknown>[] = [{ right_name }, { right_code }];
    if (right_id) {
      orClauses.forEach((c) => {
        c.id = Not(right_id);
      });
    }

    const dup = await this.userRightRepo.findOne({
      select: ['right_name', 'right_code'],
      where: orClauses,
    });
    if (dup) {
      if (dup.right_name === right_name) {
        throw new Error(`权限名[${right_name}]重复，请使用其他名称`);
      }
      if (dup.right_code === right_code) {
        throw new Error(`权限代码[${right_code}]重复，请使用其他名称`);
      }
    }

    const is_update = (right_id ?? 0) > 0;
    const payload: Partial<UserRight> = {
      parent_id,
      right_name,
      right_code,
      role_type,
      sort_no,
      right_type,
      created_by: user.id,
      updated_by: user.id,
    };

    let saved: UserRight;
    if (is_update) {
      saved = await this.userRightRepo.save({ id: right_id, ...payload });
    } else {
      saved = await this.userRightRepo.save(this.userRightRepo.create(payload));
    }

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      target_type: TARGET_TYPE.权限,
      target_id: right_id,
      action_type: is_update ? ACTION_TYPE.修改权限 : ACTION_TYPE.创建权限,
      action_desc: `${is_update ? '修改' : '创建'}权限【${right_name}】`,
    });
    return saved;
  }

  async deleteRight(requestBody: DeleteRowDTO, user: { id: number; nick?: string }): Promise<void> {
    const { id } = requestBody;
    await this.userRightRepo.update({ id }, { updated_by: user.id });
    await this.userRightRepo.softDelete({ id });

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      target_type: TARGET_TYPE.权限,
      target_id: id,
      action_type: ACTION_TYPE.删除权限,
      action_desc: `删除权限【${id}】`,
    });
  }

  async setUserRoleRelation(
    requestBody: SetUserRoleRelationDto,
    user: { id: number; nick?: string },
  ): Promise<void> {
    const { role_id_list } = requestBody;
    const user_id = requestBody.user_id || user.id;

    const _user = await this.checkUser(user_id);

    const role_mapping = role_id_list.map((role_id) => ({
      user_id,
      role_id,
      created_by: user.id,
      updated_by: user.id,
    }));

    await this.dataSource.transaction(async (manager) => {
      await manager.update(UserRoleRelation, { user_id }, { updated_by: user.id });
      await manager.softDelete(UserRoleRelation, { user_id });
      if (role_mapping.length) {
        await manager.save(manager.create(UserRoleRelation, role_mapping));
      }
    });

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      action_type: ACTION_TYPE.分配角色,
      action_desc: `为用户【${_user.nick ?? ''}】分配角色`,
    });
  }

  async setRoleRightRelation(
    requestBody: SetRoleRightRelationDto,
    user: { id: number; nick?: string },
  ): Promise<void> {
    const { right_id_list, role_id } = requestBody;

    const role = await this.userRoleRepo.findOne({
      select: ['id', 'role_name'],
      where: { id: role_id },
    });
    if (!role) {
      throw new Error('角色信息不存在，请检查！');
    }

    const right_mapping = right_id_list.map((right_id) => ({
      role_id,
      right_id,
      created_by: user.id,
      updated_by: user.id,
    }));

    await this.dataSource.transaction(async (manager) => {
      await manager.update(UserRightRelation, { role_id }, { updated_by: user.id });
      await manager.softDelete(UserRightRelation, { role_id });
      if (right_mapping.length) {
        await manager.save(manager.create(UserRightRelation, right_mapping));
      }
    });

    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick ?? '',
      action_type: ACTION_TYPE.分配权限,
      action_desc: `为角色【${role.role_name}】分配权限`,
    });
  }
}
