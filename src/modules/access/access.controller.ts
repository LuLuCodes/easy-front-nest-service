import { Controller, Post, Body, UsePipes, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheService } from '@service/cache.service';
import { AccessService } from './access.service';
import { OpLogService } from '@modules/oplog/oplog.service';
import {
  LoginByMPDto,
  LoginByAccountDto,
  CreateUserDto,
  CreateOrUpdateRoleDto,
  QueryUserRoleRightDto,
  RegByMPDto,
  EditUserInfoDto,
  EditMPUserInfoDto,
  QueryRoleDto,
  QueryUserDto,
  QueryRightDto,
  SetUserRoleRelationDto,
  CreateOrUpdateRightDto,
  SetRoleRightRelationDto,
  QueryRoleRightDto,
  SetUserStatusDto,
  ModifyUserPasswordDto,
} from './access.dto';
import {
  ACTION_TYPE,
  LOGIN_CLIENT,
  LOGIN_TYPE,
  TARGET_TYPE,
} from '@dto/EnumDTO';
import { md5 } from '@libs/cryptogram';
import { CacheKey } from '@config/global';
import { DeleteRowDTO } from '@dto/BaseDTO';

@ApiTags('权限API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('access')
export class AccessController {
  cookie_key = '';
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly accessService: AccessService,
    private readonly opLogService: OpLogService,
  ) {
    this.cookie_key = this.configService.get('session.key');
  }

  @ApiOperation({
    summary: '账号密码登录',
    description: '账号密码登录',
  })
  @ApiBody({
    description: '请求参数',
    type: LoginByAccountDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login-by-account')
  async loginByAccount(
    @Body() body: LoginByAccountDto,
    @Session() session,
  ): Promise<any> {
    const response = await this.accessService.login(
      body,
      LOGIN_TYPE.账号名密码登录,
    );
    await this.setSession(response, session);
    return response;
  }

  // @ApiOperation({
  //   summary: '小程序登录',
  //   description: '小程序登录',
  // })
  // @ApiBody({
  //   description: '请求参数',
  //   type: LoginByMPDto,
  // })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @Post('login-by-mp')
  // async loginByMP(@Body() body: LoginByMPDto): Promise<any> {
  //   const response = await this.accessService.login(body, LOGIN_TYPE.小程序授权);
  //   await this.setSession(response, null);
  //   return response;
  // }

  // @ApiOperation({
  //   summary: '小程序注册',
  //   description: '小程序注册,，会返回token，不用再次登录了',
  // })
  // @ApiBody({
  //   description: '请求参数',
  //   type: RegByMPDto,
  // })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @Post('reg-mp-user')
  // async regMpUser(@Body() body: RegByMPDto): Promise<any> {
  //   let response = await this.accessService.regMpUser(body);
  //   response = await this.setSession(response, null);
  //   return response;
  // }

  // @ApiOperation({
  //   summary: '修改小程序用户信息',
  //   description: '修改小程序用户信息',
  // })
  // @ApiBody({
  //   description: '请求参数',
  //   type: EditMPUserInfoDto,
  // })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @Post('edit-mp-user')
  // async editMPUser(@Body() body: EditMPUserInfoDto, @Session() session): Promise<any> {
  //   const data = { ...body, user_id: session.user.id };
  //   return await this.accessService.EditUser(data, session.user);
  // }

  @ApiOperation({
    summary: '修改用户信息',
    description: '修改用户信息',
  })
  @ApiBody({
    description: '请求参数',
    type: EditUserInfoDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('edit-user')
  async editUser(
    @Body() body: EditUserInfoDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.editUser(body, session.user);
  }

  @ApiOperation({
    summary: '检查账号是否重复',
    description: '账号密码登录',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('check-account')
  async checkAccount(@Body() body: CreateUserDto): Promise<any> {
    return await this.accessService.checkAccount(body);
  }

  @ApiOperation({
    summary: '创建后台用户账号密码',
    description: '账号密码登录',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-user-account')
  async createUserAccount(
    @Body() body: CreateUserDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.createUserAccount(body, session.user);
  }

  @ApiOperation({
    summary: '管理员修改用户密码',
    description: '管理员修改用户密码',
  })
  @ApiBody({
    description: '请求参数',
    type: ModifyUserPasswordDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('modify-user-password')
  async modifyUserPassword(
    @Body() body: ModifyUserPasswordDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.modifyUserPassword(body, session.user);
  }

  @ApiOperation({
    summary: '设置用户状态',
    description: '设置用户状态',
  })
  @ApiBody({
    description: '请求参数',
    type: SetUserStatusDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-user-status')
  async SetUserStatus(
    @Body() body: SetUserStatusDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.SetUserStatus(body, session.user);
  }

  @ApiOperation({
    summary: '新增或修改角色',
    description: '新增或修改角色',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateOrUpdateRoleDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-role')
  async setRole(
    @Body() body: CreateOrUpdateRoleDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.setRole(body, session.user);
  }

  @ApiOperation({
    summary: '删除角色',
    description: '删除角色',
  })
  @ApiBody({
    description: '请求参数',
    type: DeleteRowDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('delete-role')
  async deleteRole(
    @Body() body: DeleteRowDTO,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.deleteRole(body, session.user);
  }

  @ApiOperation({
    summary: '新增或修改权限',
    description: '新增或修改权限',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateOrUpdateRightDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-right')
  async setRight(
    @Body() body: CreateOrUpdateRightDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.setRight(body, session.user);
  }

  @ApiOperation({
    summary: '删除权限',
    description: '删除权限',
  })
  @ApiBody({
    description: '请求参数',
    type: DeleteRowDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('delete-right')
  async deleteRight(
    @Body() body: DeleteRowDTO,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.deleteRight(body, session.user);
  }

  @ApiOperation({
    summary: '分配用户角色',
    description: '分配用户角色',
  })
  @ApiBody({
    description: '请求参数',
    type: SetUserRoleRelationDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-user-role-relation')
  async setUserRoleRight(
    @Body() body: SetUserRoleRelationDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.setUserRoleRelation(body, session.user);
  }

  @ApiOperation({
    summary: '分配角色权限',
    description: '分配角色权限',
  })
  @ApiBody({
    description: '请求参数',
    type: SetRoleRightRelationDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-role-right-relation')
  async setRoleRightRelation(
    @Body() body: SetRoleRightRelationDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.setRoleRightRelation(body, session.user);
  }

  @ApiOperation({
    summary: '获取用户角色权限',
    description: '获取用户角色权限',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryUserRoleRightDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-user-role-right')
  async getUserRoleRight(
    @Body() body: QueryUserRoleRightDto,
    @Session() session,
  ): Promise<any> {
    return await this.accessService.getUserRoleRight(body, session.user);
  }

  @ApiOperation({
    summary: '获取角色分配的权限列表',
    description: '获取角色分配的权限列表',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryRoleRightDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-role-right-list')
  async getRoleRightList(@Body() body: QueryRoleRightDto): Promise<any> {
    return await this.accessService.getRoleRightList(body);
  }

  @ApiOperation({
    summary: '获取用户列表',
    description: '获取用户列表',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-user-list')
  async getUserList(@Body() body: QueryUserDto): Promise<any> {
    return await this.accessService.getUserList(body);
  }

  @ApiOperation({
    summary: '获取角色列表',
    description: '获取角色列表',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryRoleDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-role-list')
  async getRoleList(@Body() body: QueryRoleDto): Promise<any> {
    return await this.accessService.getRoleList(body);
  }

  @ApiOperation({
    summary: '获取权限列表',
    description: '获取权限列表',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryRightDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-right-list')
  async getRightList(@Body() body: QueryRightDto): Promise<any> {
    return await this.accessService.getRightList(body);
  }

  @ApiOperation({
    summary: '获取session',
    description: '获取session',
  })
  @ApiBody({
    description: '请求参数',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-session')
  async getSession(@Session() session): Promise<any> {
    let user = {};
    if (session.user && session.user.id) {
      const fill = await this.accessService.checkUser(session.user.id);
      user = { ...session.user, ...fill };
    }
    return user;
  }

  @ApiOperation({
    summary: '退出登录',
    description: '退出登录',
  })
  @ApiBody({
    description: '请求参数',
    type: Object,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('logout')
  async logout(@Session() session): Promise<any> {
    if (session.user) {
      await this.opLogService.createLogTask({
        user_id: session.user.id,
        action_user: session.user.nick,
        target_id: session.user.id,
        target_type: TARGET_TYPE.用户,
        action_type: ACTION_TYPE.退出登录,
        action_desc: `退出系统`,
      });
    }
    session.user = undefined;
    session.authToken = undefined;
    return;
  }

  async setSession(user: any, session: any) {
    const token_str = `${this.cookie_key}${JSON.stringify({
      id: user.id,
    })}${this.cookie_key}`;
    const authToken = md5(token_str).toString();
    if (session) {
      session.authToken = authToken;
      session.user = user;
    } else {
      // 小程序或无cookie用户
      await this.cacheService.set(
        `${CacheKey.SESSION_USER}_${authToken}`,
        JSON.stringify(user),
        'EX',
        7 * 24 * 3600,
      );
    }
    user.token = authToken;
    return user;
  }
  // end
}
