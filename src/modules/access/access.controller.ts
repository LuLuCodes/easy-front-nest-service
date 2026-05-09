import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser, Permissions, Public } from '@auth/decorators';
import { AuthenticatedUser } from '@auth/types/jwt-payload';
import { DeleteRowDTO } from '@dto/BaseDTO';
import { ValidationPipe } from '@pipe/validation.pipe';

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
import { AccessService } from './access.service';

@ApiTags('权限API')
@ApiHeader({
  name: 'x-from-source',
  description: '如果是swagger发送的请求，会跳过sign验证',
  example: 'swagger',
  schema: { type: 'string', example: 'swagger' },
})
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiOperation({ summary: '修改用户信息', description: '修改用户信息' })
  @ApiBody({ description: '请求参数', type: EditUserInfoDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('edit-user')
  async editUser(
    @Body() body: EditUserInfoDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.editUser(body, { id: user.id });
  }

  @Public()
  @ApiOperation({ summary: '检查账号是否重复', description: '检查账号是否已存在' })
  @ApiBody({ description: '请求参数', type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('check-account')
  async checkAccount(@Body() body: CreateUserDto): Promise<boolean> {
    return this.accessService.checkAccount(body);
  }

  @Permissions('access:user:create')
  @ApiOperation({ summary: '创建后台用户账号密码' })
  @ApiBody({ description: '请求参数', type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-user-account')
  async createUserAccount(
    @Body() body: CreateUserDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.createUserAccount(body, { id: user.id });
  }

  @Permissions('access:user:edit')
  @ApiOperation({ summary: '管理员修改用户密码' })
  @ApiBody({ description: '请求参数', type: ModifyUserPasswordDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('modify-user-password')
  async modifyUserPassword(
    @Body() body: ModifyUserPasswordDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.modifyUserPassword(body, { id: user.id });
  }

  @Permissions('access:user:edit')
  @ApiOperation({ summary: '设置用户状态' })
  @ApiBody({ description: '请求参数', type: SetUserStatusDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-user-status')
  async setUserStatus(
    @Body() body: SetUserStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.SetUserStatus(body, { id: user.id });
  }

  @Permissions('access:role:write')
  @ApiOperation({ summary: '新增或修改角色' })
  @ApiBody({ description: '请求参数', type: CreateOrUpdateRoleDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-role')
  async setRole(
    @Body() body: CreateOrUpdateRoleDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.setRole(body, { id: user.id, nick: user.account_id });
  }

  @Permissions('access:role:write')
  @ApiOperation({ summary: '删除角色' })
  @ApiBody({ description: '请求参数', type: DeleteRowDTO })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('delete-role')
  async deleteRole(
    @Body() body: DeleteRowDTO,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.deleteRole(body, { id: user.id });
  }

  @Permissions('access:right:write')
  @ApiOperation({ summary: '新增或修改权限' })
  @ApiBody({ description: '请求参数', type: CreateOrUpdateRightDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-right')
  async setRight(
    @Body() body: CreateOrUpdateRightDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.setRight(body, { id: user.id });
  }

  @Permissions('access:right:write')
  @ApiOperation({ summary: '删除权限' })
  @ApiBody({ description: '请求参数', type: DeleteRowDTO })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('delete-right')
  async deleteRight(
    @Body() body: DeleteRowDTO,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.deleteRight(body, { id: user.id });
  }

  @Permissions('access:user:edit')
  @ApiOperation({ summary: '分配用户角色' })
  @ApiBody({ description: '请求参数', type: SetUserRoleRelationDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-user-role-relation')
  async setUserRoleRelation(
    @Body() body: SetUserRoleRelationDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.setUserRoleRelation(body, { id: user.id });
  }

  @Permissions('access:role:write')
  @ApiOperation({ summary: '分配角色权限' })
  @ApiBody({ description: '请求参数', type: SetRoleRightRelationDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('set-role-right-relation')
  async setRoleRightRelation(
    @Body() body: SetRoleRightRelationDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.setRoleRightRelation(body, { id: user.id });
  }

  @Permissions('access:user:read')
  @ApiOperation({ summary: '获取用户角色与权限' })
  @ApiBody({ description: '请求参数', type: QueryUserRoleRightDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-user-role-right')
  async getUserRoleRight(
    @Body() body: QueryUserRoleRightDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<unknown> {
    return this.accessService.getUserRoleRight(body, { id: user.id });
  }

  @Permissions('access:role:read')
  @ApiOperation({ summary: '获取角色分配的权限列表' })
  @ApiBody({ description: '请求参数', type: QueryRoleRightDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-role-right-list')
  async getRoleRightList(@Body() body: QueryRoleRightDto): Promise<unknown> {
    return this.accessService.getRoleRightList(body);
  }

  @Permissions('access:user:read')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiBody({ description: '请求参数', type: QueryUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-user-list')
  async getUserList(@Body() body: QueryUserDto): Promise<unknown> {
    return this.accessService.getUserList(body);
  }

  @Permissions('access:role:read')
  @ApiOperation({ summary: '获取角色列表' })
  @ApiBody({ description: '请求参数', type: QueryRoleDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-role-list')
  async getRoleList(@Body() body: QueryRoleDto): Promise<unknown> {
    return this.accessService.getRoleList(body);
  }

  @Permissions('access:right:read')
  @ApiOperation({ summary: '获取权限列表' })
  @ApiBody({ description: '请求参数', type: QueryRightDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-right-list')
  async getRightList(@Body() body: QueryRightDto): Promise<unknown> {
    return this.accessService.getRightList(body);
  }

  @ApiOperation({
    summary: '获取当前用户档案',
    description: '通过当前 access token 携带的用户信息回填档案数据',
  })
  @Post('get-session')
  async getSession(@CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    if (!user) return {};
    const fill = await this.accessService.checkUser(user.id);
    return { id: user.id, account_id: user.account_id, ...fill };
  }
}
