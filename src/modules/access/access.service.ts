/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-06-20 16:33:55
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-09-20 12:16:29
 * @FilePath: /easy-front-nest-service/src/modules/access/access.service.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { CacheService } from '@service/cache.service';
import {
  CreateOrUpdateRoleDto,
  CreateUserDto,
  EditUserInfoDto,
  ModifyUserPasswordDto,
  QueryRightDto,
  QueryRoleDto,
  QueryUserDto,
  QueryUserRoleRightDto,
  SetUserRoleRelationDto,
  SetRoleRightRelationDto,
  CreateOrUpdateRightDto,
  QueryRoleRightDto,
  SetUserStatusDto,
} from './access.dto';
import {
  TUserLogin,
  TUser,
  TUserRole,
  TUserRight,
  TUserRightRelation,
  TUserRoleRelation,
} from '@models/index';
import * as _ from 'lodash';
import {
  ACTION_TYPE,
  LOGIN_CLIENT,
  LOGIN_TYPE,
  USER_STATUS,
  TARGET_TYPE,
} from '@dto/EnumDTO';
import { encryptPassword, makeSalt } from '@libs/cryptogram';
import { OpLogService } from '@modules/oplog/oplog.service';
import { ex_attributes, ex_attributes2 } from '@config/global';
import { RedisLock } from '@libs/redlock';
import { arrayToTree } from '@libs/util';
import { DeleteRowDTO } from '@dto/BaseDTO';
@Injectable()
export class AccessService {
  constructor(
    private sequelize: Sequelize,
    private cacheService: CacheService,
    private opLogService: OpLogService,
    @InjectModel(TUserLogin)
    private readonly tUserLogin: typeof TUserLogin,
    @InjectModel(TUser)
    private readonly tUser: typeof TUser,
    @InjectModel(TUserRole)
    private readonly tUserRole: typeof TUserRole,
    @InjectModel(TUserRoleRelation)
    private readonly tUserRoleRelation: typeof TUserRoleRelation,
    @InjectModel(TUserRight)
    private readonly tUserRight: typeof TUserRight,
    @InjectModel(TUserRightRelation)
    private readonly tUserRightRelation: typeof TUserRightRelation,
  ) {}

  // 统一登录
  async login(requestBody: any, login_type: LOGIN_TYPE): Promise<any> {
    const { account_id, account_pwd, login_client } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:Login_${account_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);
      const where = {
        account_id,
        login_client,
        login_type,
      };

      const login_user = await this.tUserLogin.findOne({
        attributes: ['id', 'account_id', 'account_pwd', 'pwd_salt', 'user_id'],
        where,
        raw: true,
      });
      if (!login_user) {
        throw new Error(`账号不存在，请检查`);
      }

      if (login_type === LOGIN_TYPE.账号名密码登录) {
        const pwd = encryptPassword(account_pwd, login_user.pwd_salt);
        console.log(`加密结果：${pwd}`);
        if (pwd !== login_user.account_pwd) {
          throw new Error('密码错误，请重新输入！');
        }
      }

      const user: any = await this.tUser.findOne({
        attributes: global.ex_attributes2,
        where: { id: login_user.user_id },
        raw: true,
      });
      if (!user) {
        throw new Error(`账号不存在，请检查！`);
      }
      if (user.user_status !== USER_STATUS.正常) {
        throw new Error(`你的账号存在异常，无法登录！`);
      }

      // 写入异步操作日志
      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user.id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick,
        action_type: ACTION_TYPE.登录,
        action_desc: `登录系统`,
      });

      user.account_id = login_user.account_id;
      return user;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  // 注册小程序用户
  // async regMpUser(requestBody: RegByMPDto): Promise<any> {
  //   const { openid, unionid } = requestBody;

  //   let lock = null;
  //   const LOCK_KEY = `Lock:RegMpUser_${openid}`;
  //   try {
  //     lock = await RedisLock.lock(LOCK_KEY, 3000);
  //     const login_user = await this.tUserLogin.findOne({
  //       attributes: ['id'],
  //       where: {
  //         account_id: openid,
  //         login_client: LOGIN_CLIENT.小程序端,
  //         login_type: LOGIN_TYPE.小程序授权,
  //       },
  //       raw: true,
  //     });
  //     if (login_user) {
  //       throw new Error(`当前账号已注册`);
  //     }

  //     // 查看unionid是否注册
  //     let wx_unonid_user: any;
  //     if (unionid) {
  //       wx_unonid_user = await this.tUserLogin.findOne({
  //         attributes: ['id'],
  //         where: {
  //           account_id: unionid,
  //           login_type: LOGIN_TYPE.微信unionid登录,
  //         },
  //         raw: true,
  //       });
  //     }

  //     const _user = await this.sequelize.transaction(async (t) => {
  //       // 1、创建user
  //       const add_user = await this.tUser.create(
  //         {
  //           nick: `小程序用户` + openid.slice(4),
  //           user_status: USER_STATUS.正常,
  //           created_by: 1,
  //           updated_by: 1,
  //         },
  //         {
  //           transaction: t,
  //         },
  //       );

  //       // 2、添加openid登录方式
  //       await this.tUserLogin.create(
  //         {
  //           login_type: LOGIN_TYPE.小程序授权,
  //           login_client: LOGIN_CLIENT.小程序端,
  //           account_id: openid,
  //           user_id: add_user.id,
  //           created_by: add_user.id,
  //           updated_by: add_user.id,
  //         },
  //         {
  //           transaction: t,
  //         },
  //       );

  //       // 3、添加union登录方式
  //       if (!wx_unonid_user && unionid) {
  //         await this.tUserLogin.create(
  //           {
  //             login_type: LOGIN_TYPE.微信unionid登录,
  //             login_client: LOGIN_CLIENT.小程序端,
  //             account_id: unionid,
  //             user_id: add_user.id,
  //             created_by: add_user.id,
  //             updated_by: add_user.id,
  //           },
  //           {
  //             transaction: t,
  //           },
  //         );
  //       }

  //       return add_user;
  //     });

  //     // 写入异步操作日志
  //     await this.opLogService.createLogTask({
  //       user_id: _user.id,
  //       target_id: _user.id,
  //       target_type: TARGET_TYPE.用户,
  //       action_type: ACTION_TYPE.小程序用户注册,
  //       action_user: _user.nick,
  //       action_desc: `小程序用户注册`,
  //     });

  //     const user = _user.toJSON();
  //     delete _user.created_by;
  //     delete _user.updated_by;
  //     return user;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   } finally {
  //     if (lock) {
  //       await RedisLock.unlock(lock);
  //       lock = null;
  //     }
  //   }
  // }

  // 检查账号是否存在
  async checkAccount(requestBody: CreateUserDto): Promise<boolean> {
    const { login_client, account_id } = requestBody;
    const login_user = await this.tUserLogin.findOne({
      attributes: ['id'],
      where: {
        account_id,
        login_client,
        login_type: LOGIN_TYPE.账号名密码登录,
      },
      raw: true,
    });
    return !!login_user;
  }

  // 创建后台登录账号
  async createUserAccount(requestBody: CreateUserDto, user): Promise<TUser> {
    // login_client 1-平台端 2-企业端 3-小程序端
    const {
      login_client,
      account_id,
      account_pwd,
      nick,
      avatar,
      tag,
      note,
      role_id_list,
    } = requestBody;

    let lock = null;
    const LOCK_KEY = `Lock:CreateUserAccount_${account_id}`;
    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);
      // todo 检验权限
      const op_user = await this.tUserLogin.findOne({
        attributes: ['id', 'login_client'],
        where: {
          id: user.id,
        },
        raw: true,
      });
      if (!op_user || op_user.login_client !== LOGIN_CLIENT.平台端) {
        throw new Error(`无权限`);
      }
      const updated_by = user.id;

      // 检查登录账号是否存在
      const account_exist = await this.checkAccount(requestBody);
      if (account_exist) {
        throw new Error(`登录账户[${account_id}]已存在`);
      }

      const pwd_salt = makeSalt(2);
      const encrypted_pwd = encryptPassword(account_pwd, pwd_salt);

      const _user = await this.sequelize.transaction(async (t) => {
        const add_user = await this.tUser.create(
          {
            nick,
            avatar,
            tag,
            note,
            role_type: login_client,
            user_status: USER_STATUS.正常,
            created_by: updated_by,
            updated_by: updated_by,
          },
          {
            transaction: t,
          },
        );

        await this.tUserLogin.create(
          {
            login_type: LOGIN_TYPE.账号名密码登录,
            login_client,
            account_id,
            account_pwd: encrypted_pwd,
            pwd_salt,
            user_id: add_user.id,
            created_by: updated_by,
            updated_by: updated_by,
          },
          {
            transaction: t,
          },
        );

        return add_user;
      });
      delete _user.updated_by;
      delete _user.updated_by;
      // 写入异步操作日志
      await this.opLogService.createLogTask({
        user_id: updated_by,
        target_id: updated_by,
        target_type: TARGET_TYPE.用户,
        action_user: _user.nick,
        action_type: ACTION_TYPE.创建登录用户,
        action_desc: `创建创建登录用户【${account_id}】`,
      });

      if (role_id_list?.length) {
        await this.setUserRoleRelation(
          {
            role_id_list,
            user_id: _user.id,
          },
          user,
        );
      }
      return _user;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  async modifyUserPassword(
    requestBody: ModifyUserPasswordDto,
    user,
  ): Promise<TUser> {
    // login_client 1-平台端 2-企业端 3-小程序端
    const { user_id, login_client, account_pwd } = requestBody;

    let lock = null;
    const LOCK_KEY = `Lock:ModifyUserPassword_${user_id}`;
    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);
      // todo 检验权限
      const login_user = await this.tUserLogin.findOne({
        attributes: ['id', 'account_id'],
        where: {
          user_id,
          login_client,
        },
        raw: true,
      });
      if (!login_user) {
        throw new Error(`不存在修改账号`);
      }
      const updated_by = user.id;

      const pwd_salt = makeSalt(2);
      const encrypted_pwd = encryptPassword(account_pwd, pwd_salt);

      await this.tUserLogin.update(
        {
          account_pwd: encrypted_pwd,
          pwd_salt,
          updated_by: updated_by,
        },
        {
          where: {
            id: login_user.id,
          },
        },
      );

      // 写入异步操作日志
      await this.opLogService.createLogTask({
        user_id: updated_by,
        target_id: updated_by,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick,
        action_type: ACTION_TYPE.修改密码,
        action_desc: `修改账号${login_user.account_id}密码`,
      });
      return;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
  }

  async checkUser(user_id: number) {
    const user = await this.tUser.findOne({
      attributes: ['id', 'nick', 'avatar', 'tag', 'note', 'user_status'],
      where: { id: user_id },
      raw: true,
    });
    if (!user) {
      throw new Error(`账号信息不存在，请检查！`);
    }
    if (user.user_status !== USER_STATUS.正常) {
      throw new Error(`你的账号存在异常，无法登录！`);
    }
    return user;
  }

  // end

  // 编辑用户
  async editUser(requestBody: EditUserInfoDto, user: any): Promise<any> {
    const { nick, avatar, tag, note, user_id, role_id_list } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:EditUser_${user_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      const user_info = await this.tUser.findOne({
        attributes: ['user_status'],
        where: {
          id: user_id,
        },
        raw: true,
      });
      if (!user_info || USER_STATUS.正常 !== user_info.user_status) {
        throw new Error(`当前用户不存在或不可编辑`);
      }
      const update_data = _.omitBy(
        {
          nick,
          avatar,
          tag,
          note,
          updated_by: user_id,
        },
        _.isNil,
      );

      await this.tUser.update(update_data, {
        where: { id: user_id },
      });

      // 写入异步操作日志
      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user_id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick,
        action_type: ACTION_TYPE.修改用户信息,
        action_desc: `修改用户信息`,
      });

      if (role_id_list?.length) {
        await this.setUserRoleRelation(
          {
            role_id_list,
            user_id,
          },
          user,
        );
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
    return;
  }

  // 设置用户状态
  async SetUserStatus(requestBody: SetUserStatusDto, user: any): Promise<any> {
    const { user_status, user_id } = requestBody;
    let lock = null;
    const LOCK_KEY = `Lock:SetUserStatus_${user_id}`;

    try {
      lock = await RedisLock.lock(LOCK_KEY, 3000);

      await this.tUser.update(
        {
          user_status,
          updated_by: user_id,
        },
        {
          where: { id: user_id },
        },
      );

      // 写入异步操作日志
      await this.opLogService.createLogTask({
        user_id: user.id,
        target_id: user_id,
        target_type: TARGET_TYPE.用户,
        action_user: user.nick,
        action_type: ACTION_TYPE.设置用户状态,
        action_desc: `设置用户状态：${USER_STATUS[user_status]}`,
      });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      if (lock) {
        await RedisLock.unlock(lock);
        lock = null;
      }
    }
    return;
  }

  /************权限相关 *********************/
  /************权限相关 *********************/
  /************权限相关 *********************/
  async getUserList(requestBody: QueryUserDto): Promise<any> {
    const { nick, login_client, account_id, role_type, login_type } =
      requestBody;
    const page_num = requestBody.page_num || 1;
    const page_size = requestBody.page_size || 10;
    const offset = (page_num - 1) * page_size;
    const where: any = {};
    if (nick) {
      where.nick = { [Op.startsWith]: nick };
    }
    if (role_type) {
      where.role_type = role_type;
    }
    if (login_client != null) {
      where['$login_client$'] = login_client;
    }
    if (account_id) {
      where['$account_id$'] = account_id;
    }
    if (login_type) {
      where['$login_type$'] = login_type;
    }
    const { rows, count } = await this.tUser.findAndCountAll<any>({
      attributes: [
        'id',
        'nick',
        'avatar',
        'tag',
        'note',
        'user_status',
        'role_type',
      ],
      include: [
        {
          model: this.tUserLogin,
          attributes: ['id', 'login_client', 'account_id'],
          as: 'account',
        },
      ],
      where,
      offset: offset,
      limit: page_size,
      order: requestBody.order || [['id', 'desc']],
      raw: true,
      nest: true,
    });

    if (rows.length) {
      const user_ids = _.unionBy(rows.map((v) => v.id));
      const roles = await this.tUserRoleRelation.findAll<any>({
        attributes: ['user_id', 'role_id'],
        include: [
          {
            model: this.tUserRole,
            attributes: ['id', 'role_name', 'is_supper'],
            as: 'role',
          },
        ],
        where: { user_id: user_ids },
        raw: true,
        nest: true,
      });
      // if (roles.length) {
      rows.forEach((user) => {
        const user_roles = roles.filter(
          (v) => user.id === v.user_id && v.role != null,
        );
        user.roles = user_roles.map((v) => {
          return v.role;
        });
      });
      // }
    }
    return { rows, count };
  }

  // 角色列表
  async getRoleList(requestBody: QueryRoleDto): Promise<any> {
    const { role_name, role_type, attributes } = requestBody;
    const page_num = requestBody.page_num || 1;
    const page_size = requestBody.page_size || 10;
    const offset = (page_num - 1) * page_size;
    const where: any = {};
    if (role_type) {
      where.role_type = role_type;
    }
    if (role_name) {
      where.role_name = { [Op.startsWith]: role_name };
    }
    const role_list = await this.tUserRole.findAndCountAll({
      attributes: attributes || ex_attributes2,
      where,
      offset: offset,
      limit: page_size,
      order: requestBody.order || [['id', 'desc']],
    });
    return role_list;
  }

  // 权限列表
  async getRightList(requestBody: QueryRightDto): Promise<any> {
    const { role_type, right_name } = requestBody;
    const where: any = {};
    if (role_type) {
      where.role_type = role_type;
    }
    if (right_name) {
      where.right_name = right_name;
    }
    const right_list = await this.tUserRight.findAll({
      attributes: ex_attributes2,
      where,
      order: [
        ['sort_no', 'asc'],
        ['id', 'asc'],
      ],
      raw: true,
    });

    return arrayToTree(right_list);
  }

  LOGIN_USER_RIGHT_KEY = 'LOGIN_USER_RIGHT_';

  /**
   * 获取登录用户权限
   * @param user_id 用户id
   * @param ingore_cache 是否刷新缓存
   * @returns
   */
  private async getLoginUserRight(
    user_id,
    ingore_cache = false,
  ): Promise<{
    role_id_list: number[];
    right_list: TUserRight[];
    is_supper?: boolean;
  }> {
    const cache_key = `${this.LOGIN_USER_RIGHT_KEY}${user_id}`;
    if (!ingore_cache) {
      const right = await this.cacheService.get(cache_key);
      if (right) {
        return JSON.parse(right);
      }
    }
    let res = {
      role_id_list: [],
      right_list: [],
      is_supper: false,
    };

    // 查用户所属的角色 1对多
    const role_relation = await this.tUserRoleRelation.findAll({
      attributes: ['role_id'],
      where: {
        user_id,
      },
      raw: true,
    });
    if (!role_relation.length) {
      return res;
    }

    const role_id_list = _.unionBy(role_relation.map((v) => v.role_id));

    // 角色是否有超管权限
    const supper_role_count = await this.tUserRole.count({
      where: {
        id: role_id_list,
        is_supper: 1,
      },
    });

    // 查询角色拥有的权限
    const right_list = await this.getRightByRoleIds(
      role_id_list,
      supper_role_count > 0,
    );
    res = {
      role_id_list,
      right_list,
      is_supper: supper_role_count > 0,
    };
    await this.cacheService.set(
      cache_key,
      JSON.stringify(res),
      'EX',
      7 * 24 * 3600,
    );
    return res;
  }

  /**
   * 根据角色id获取权限
   * 如果是admin，则有全部权限
   * @param role_id_list
   * @param is_admin
   * @returns
   */
  private async getRightByRoleIds(
    role_id_list: number[],
    is_admin = false,
  ): Promise<TUserRight[]> {
    const where: any = {};
    if (!is_admin) {
      const right_relation = await this.tUserRightRelation.findAll({
        attributes: ['right_id'],
        where: {
          role_id: role_id_list,
        },
        raw: true,
      });
      if (!right_relation.length) {
        return [];
      }

      const right_id_list = _.unionBy(right_relation.map((v) => v.right_id));
      where.id = right_id_list;
    }
    return await this.tUserRight.findAll({
      attributes: ex_attributes,
      order: [
        ['sort_no', 'asc'],
        ['id', 'asc'],
      ],
      where,
      raw: true,
    });
  }

  // 获取用户权限列表
  async getUserRoleRight(
    requestBody: QueryUserRoleRightDto,
    user: any,
  ): Promise<{
    role_id_list: number[];
    right_list: TUserRight[];
    is_supper?: boolean;
  }> {
    const { user_id } = requestBody;
    const _user_id = user_id || user.id;
    return await this.getLoginUserRight(_user_id, true);
  }

  // 获取角色对应的权限
  async getRoleRightList(reqBody: QueryRoleRightDto): Promise<TUserRight[]> {
    const { role_id_list } = reqBody;
    return await this.getRightByRoleIds(role_id_list);
  }

  // 新增或编辑角色
  async setRole(requestBody: CreateOrUpdateRoleDto, user): Promise<TUserRole> {
    const { role_id, role_name, role_type, is_supper, remark, right_id_list } =
      requestBody;
    // 检查角色名或权限code 是否重复
    const exist_role_where: any = {
      role_name,
    };
    if (role_id) {
      exist_role_where.id = { [Op.ne]: role_id };
    }
    const exist_role = await this.tUserRole.findOne({
      attributes: ['id'],
      where: exist_role_where,
      raw: true,
    });
    if (exist_role) {
      throw new Error(`角色名[${role_name}]重复，请使用其他名称`);
    }
    const is_update = role_id > 0;
    // 更新或插入角色
    const _raw: Partial<TUserRole> = {
      role_name,
      is_supper,
      role_type,
      remark,
      updated_by: user.id,
      created_by: user.id,
    };
    if (is_update) {
      _raw.id = role_id;
    }
    const [_role] = await this.tUserRole.upsert(_raw, {
      fields: ['role_name', 'role_type', 'remark', 'updated_by', 'updated_at'],
    });
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      target_type: TARGET_TYPE.角色,
      target_id: role_id,
      action_type: is_update ? ACTION_TYPE.修改角色 : ACTION_TYPE.创建角色,
      action_desc: `${is_update ? '修改' : '创建'}角色【${role_name}】`,
    });

    if (right_id_list?.length) {
      await this.setRoleRightRelation(
        {
          role_id: _role.id,
          right_id_list,
        },
        user,
      );
    }
    return _role;
  }

  async deleteRole(requestBody: DeleteRowDTO, user): Promise<any> {
    const { id } = requestBody;

    await this.tUserRole.destroy({
      deleted_by: user.id,
      where: { id },
    } as any);
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      target_type: TARGET_TYPE.角色,
      target_id: id,
      action_type: ACTION_TYPE.删除角色,
      action_desc: `删除角色【${id}】`,
    });
    return;
  }

  // 新增编辑权限
  async setRight(
    requestBody: CreateOrUpdateRightDto,
    user,
  ): Promise<TUserRight> {
    const {
      right_id,
      right_code,
      right_name,
      role_type,
      parent_id,
      sort_no,
      right_type,
    } = requestBody;
    // 检查角色名或权限code 是否重复
    const exist_role_where: any = {
      [Op.or]: [
        {
          right_name,
        },
        {
          right_code,
        },
      ],
    };
    if (right_id) {
      exist_role_where.id = { [Op.ne]: right_id };
    }
    const exist_role = await this.tUserRight.findOne({
      attributes: ['right_name', 'right_code'],
      where: exist_role_where,
      raw: true,
    });
    if (exist_role) {
      if (exist_role.right_name === right_name) {
        throw new Error(`权限名[${right_name}]重复，请使用其他名称`);
      } else if (exist_role.right_code === right_code) {
        throw new Error(`权限代码[${right_code}]重复，请使用其他名称`);
      }
    }
    const is_update = right_id > 0;
    // 更新或插入角色
    const _raw: Partial<TUserRight> = {
      parent_id,
      right_name,
      right_code,
      role_type,
      sort_no,
      right_type,
      created_by: user.id,
      updated_by: user.id,
    };
    if (is_update) {
      _raw.id = right_id;
    }
    const [_right] = await this.tUserRight.upsert(_raw, {
      fields: [
        'parent_id',
        'right_name',
        'right_code',
        'role_type',
        'sort_no',
        'updated_by',
        'updated_at',
      ],
    });
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      target_type: TARGET_TYPE.权限,
      target_id: right_id,
      action_type: is_update ? ACTION_TYPE.修改权限 : ACTION_TYPE.创建权限,
      action_desc: `${is_update ? '修改' : '创建'}权限【${right_name}】`,
    });
    return _right;
  }

  async deleteRight(requestBody: DeleteRowDTO, user): Promise<any> {
    const { id } = requestBody;

    await this.tUserRight.destroy({
      deleted_by: user.id,
      where: { id },
    } as any);
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      target_type: TARGET_TYPE.权限,
      target_id: id,
      action_type: ACTION_TYPE.删除权限,
      action_desc: `删除权限【${id}】`,
    });
    return;
  }

  // 设置用户和角色之间的关联
  async setUserRoleRelation(
    requestBody: SetUserRoleRelationDto,
    user,
  ): Promise<TUserRole> {
    const { role_id_list } = requestBody;

    const user_id = requestBody.user_id || user.id;

    const _user = await this.checkUser(user_id);

    const role_mapping = role_id_list.map((role_id) => {
      return {
        user_id,
        role_id,
        created_by: user.id,
        updated_by: user.id,
      };
    });
    await this.sequelize.transaction(async (t) => {
      await this.tUserRoleRelation.destroy({
        deleted_by: user_id,
        where: {
          user_id,
        },
        transaction: t,
      } as any);

      await this.tUserRoleRelation.bulkCreate(role_mapping, {
        transaction: t,
      });
    });
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      action_type: ACTION_TYPE.分配角色,
      action_desc: `为用户【${_user.nick}】分配角色`,
    });
    return;
  }

  // 设置角色和权限之间的关联
  async setRoleRightRelation(
    requestBody: SetRoleRightRelationDto,
    user,
  ): Promise<TUserRole> {
    const { right_id_list, role_id } = requestBody;

    const role = await this.tUserRole.findOne({
      attributes: ['id', 'role_name'],
      where: { id: role_id },
      raw: true,
    });
    if (!role) {
      throw new Error(`角色信息不存在，请检查！`);
    }
    const right_mapping = right_id_list.map((right_id) => {
      return {
        role_id,
        right_id,
        created_by: user.id,
        updated_by: user.id,
      };
    });
    await this.sequelize.transaction(async (t) => {
      await this.tUserRightRelation.destroy({
        deleted_by: user.id,
        where: {
          role_id,
        },
        transaction: t,
      } as any);

      await this.tUserRightRelation.bulkCreate(right_mapping, {
        transaction: t,
      });
    });
    // 写入异步操作日志
    await this.opLogService.createLogTask({
      user_id: user.id,
      action_user: user.nick,
      action_type: ACTION_TYPE.分配权限,
      action_desc: `为角色【${role.role_name}】分配权限`,
    });
    return;
  }
}
