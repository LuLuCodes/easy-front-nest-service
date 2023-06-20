import {
  IsInt,
  IsArray,
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsIn,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDTO, QueryDTO } from '@dto/BaseDTO';
import {
  LOGIN_CLIENT,
  LOGIN_TYPE,
  RIGHT_TYPE,
  ROLE_TYPE,
  USER_STATUS,
} from '@dto/EnumDTO';
export class LoginBaseDto extends BaseDTO {
  @ApiProperty({
    description: '登录账号',
    type: String,
  })
  @IsString({ message: 'account_id必须是字符串' })
  @IsNotEmpty({ message: 'account_id是必填项' })
  @MinLength(2, { message: '登录账号长度应在2-32位之间' })
  @MaxLength(32, { message: '登录账号长度应在2-32位之间' })
  readonly account_id: string;

  @ApiProperty({
    title: '登录端',
    description: ' 1-平台端 2-企业端 3-小程序端',
    type: LOGIN_CLIENT,
    enum: LOGIN_CLIENT,
    example: LOGIN_CLIENT.平台端,
  })
  @IsIn(Object.values(LOGIN_CLIENT), { message: `login_client必须指定值` })
  readonly login_client: LOGIN_CLIENT;
}

export class LoginByAccountDto extends LoginBaseDto {
  @ApiProperty({
    description: '登录密码',
    type: String,
  })
  @IsString({ message: 'account_pwd必须是字符串' })
  @IsNotEmpty({ message: 'account_pwd是必填项' })
  @MinLength(6, { message: '登录密码长度应在6-32位之间' })
  @MaxLength(32, { message: '登录密码长度应在6-32位之间' })
  readonly account_pwd: string;
}

export class LoginByMPDto extends LoginBaseDto {}

export class RegByMPDto extends BaseDTO {
  @ApiProperty({
    description: 'openid',
    type: String,
  })
  @IsString({ message: 'openid必须是字符串' })
  @IsNotEmpty({ message: 'openid是必填项' })
  readonly openid: string;

  @ApiPropertyOptional({
    description: 'unionid',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'unionid必须是字符串' })
  readonly unionid?: string;

  @ApiProperty({
    description: '身份证号',
    type: String,
  })
  @IsString({ message: 'id_card必须是字符串' })
  @IsNotEmpty({ message: 'id_card是必填项' })
  readonly id_card: string;
}

export class CreateUserDto extends LoginByAccountDto {
  @ApiPropertyOptional({
    description: '昵称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'nick必须是字符串' })
  readonly nick?: string;

  @ApiPropertyOptional({
    description: '头像',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'avatar必须是字符串' })
  readonly avatar?: string;

  @ApiPropertyOptional({
    description: '标签',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'tag必须是字符串' })
  readonly tag?: string;

  @ApiPropertyOptional({
    description: '备注',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'note必须是字符串' })
  readonly note?: string;

  @ApiPropertyOptional({
    description: '角色ID列表',
    type: [Number],
  })
  @IsArray({ message: 'role_id_list必须是数组' })
  readonly role_id_list: number[];
}

export class ModifyUserPasswordDto extends BaseDTO {
  @ApiProperty({
    description: '用户id',
    type: Number,
  })
  @IsInt({ message: '用户id必须是数字' })
  readonly user_id: number;

  @ApiProperty({
    title: '登录端',
    description: ' 1-平台端 2-企业端 3-小程序端',
    type: LOGIN_CLIENT,
    enum: LOGIN_CLIENT,
    example: LOGIN_CLIENT.平台端,
  })
  @IsIn(Object.values(LOGIN_CLIENT), { message: `登录端必须指定值` })
  readonly login_client: LOGIN_CLIENT;

  @ApiProperty({
    description: '登录密码',
    type: String,
  })
  @IsString({ message: '登录密码必须是字符串' })
  @IsNotEmpty({ message: '登录密码是必填项' })
  @MinLength(6, { message: '登录密码长度应在6-32位之间' })
  @MaxLength(32, { message: '登录密码长度应在6-32位之间' })
  readonly account_pwd: string;
}

export class CreateOrUpdateRoleDto extends BaseDTO {
  @ApiPropertyOptional({
    description: '角色ID',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'role_id必须是数字' })
  readonly role_id?: number;

  @ApiPropertyOptional({
    description: '角色类型 1-平台端 2-商家端 3-小程序端',
    type: ROLE_TYPE,
    enum: ROLE_TYPE,
    example: ROLE_TYPE.平台端,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly role_type?: ROLE_TYPE;

  @ApiProperty({
    description: '角色名称',
    type: String,
  })
  @IsNotEmpty({ message: '角色名称是必填项' })
  @IsString({ message: 'role_name必须是字符串' })
  readonly role_name: string;

  @ApiPropertyOptional({
    description: '是否是超级管理员 1-是 0-不是(默认)',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_supper必须是数字' })
  readonly is_supper?: number;

  @ApiPropertyOptional({
    description: '备注',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'remark必须是字符串' })
  readonly remark?: string;

  @ApiPropertyOptional({
    description: '权限id数组',
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: '权限id必须是数组' })
  readonly right_id_list?: number[];
}

export class CreateOrUpdateRightDto extends BaseDTO {
  @ApiPropertyOptional({
    description: '权限ID',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'right_id必须是数字' })
  readonly right_id?: number;

  @ApiPropertyOptional({
    description: '角色类型 1-平台端 2-商家端 3-小程序端',
    type: ROLE_TYPE,
    enum: ROLE_TYPE,
    example: ROLE_TYPE.平台端,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly role_type?: ROLE_TYPE;

  @ApiProperty({
    description: '权限名称',
    type: String,
  })
  @IsNotEmpty({ message: '权限名称是必填项' })
  @IsString({ message: '权限名称必须是字符串' })
  readonly right_name: string;

  @ApiProperty({
    description: '权限代码',
    type: String,
  })
  @IsNotEmpty({ message: '权限代码是必填项' })
  @IsString({ message: '权限代码必须是字符串' })
  readonly right_code: string;

  @ApiPropertyOptional({
    description: 'parent_id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'parent_id必须是数字' })
  readonly parent_id?: number;

  @ApiPropertyOptional({
    description: '权限类型 1-菜单 2-按钮',
    type: RIGHT_TYPE,
    enum: RIGHT_TYPE,
    example: RIGHT_TYPE.菜单,
  })
  @IsOptional()
  @IsInt({ message: '权限类型必须是数字' })
  readonly right_type?: RIGHT_TYPE;

  @ApiPropertyOptional({
    description: '排序字段 1-最大 默认999',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'sort_no必须是数字' })
  readonly sort_no?: number;
}

export class QueryUserRoleRightDto extends BaseDTO {
  @ApiPropertyOptional({
    description: '用户id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: '用户id必须是数字' })
  readonly user_id?: number;
}

export class QueryRoleRightDto extends QueryDTO {
  @ApiPropertyOptional({
    description: '用户id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: '用户id必须是数字' })
  readonly user_id?: number;

  @ApiPropertyOptional({
    description: '角色ID列表',
    type: [Number],
  })
  @IsArray({ message: 'role_id_list必须是数组' })
  readonly role_id_list: number[];
}

export class SetUserRoleRelationDto extends QueryUserRoleRightDto {
  @ApiProperty({
    description: '角色ID列表',
    type: [Number],
  })
  @IsArray({ message: 'role_id_list必须是数组' })
  readonly role_id_list: number[];
}

export class SetRoleRightRelationDto extends BaseDTO {
  @ApiProperty({
    description: '角色ID',
    type: Number,
  })
  @IsInt({ message: '角色ID必须是数字' })
  readonly role_id: number;

  @ApiProperty({
    description: '权限ID列表',
    type: [Number],
  })
  @IsArray({ message: 'right_id_list必须是数组' })
  readonly right_id_list: number[];
}

export class EditMPUserInfoDto extends BaseDTO {
  @ApiPropertyOptional({
    type: String,
    example: '昵称',
  })
  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  readonly nick?: string;

  @ApiPropertyOptional({
    example: '头像，注意微信头像，把http替换成https',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'avatar必须是字符串' })
  readonly avatar?: string;

  @ApiPropertyOptional({
    example: '标签',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '标签必须是字符串' })
  readonly tag?: string;

  @ApiPropertyOptional({
    example: '备注',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'note必须是字符串' })
  readonly note?: string;
}

export class EditUserInfoDto extends EditMPUserInfoDto {
  @ApiProperty({
    description: '用户id',
    type: Number,
  })
  @IsInt({ message: '用户id必须是数字' })
  readonly user_id: number;

  @ApiPropertyOptional({
    description: '角色ID列表',
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'role_id_list必须是数组' })
  readonly role_id_list?: number[];
}

export class SetUserStatusDto extends BaseDTO {
  @ApiProperty({
    description: '用户id',
    type: Number,
  })
  @IsInt({ message: '用户id必须是数字' })
  readonly user_id: number;

  @ApiProperty({
    title: '账户状态',
    description: '账户状态 1-正常 11-注销 12-冻结',
    type: USER_STATUS,
    enum: USER_STATUS,
    example: USER_STATUS.正常,
  })
  @IsIn(Object.values(USER_STATUS), { message: `user_status必须指定值` })
  readonly user_status: USER_STATUS;
}

export class QueryUserDto extends QueryDTO {
  @ApiPropertyOptional({
    description: '昵称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  readonly nick?: string;

  @ApiPropertyOptional({
    description: '登录账号',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '登录账号必须是字符串' })
  readonly account_id?: string;

  @ApiPropertyOptional({
    title: '登录端',
    description: ' 1-平台端 2-企业端 3-小程序端',
    type: LOGIN_CLIENT,
    enum: LOGIN_CLIENT,
    example: LOGIN_CLIENT.平台端,
  })
  @IsOptional()
  @IsIn(Object.values(LOGIN_CLIENT), { message: `login_client必须指定值` })
  readonly login_client?: LOGIN_CLIENT;

  @ApiPropertyOptional({
    title: '登录类型',
    description:
      '登录类型：1-账号名密码 2-手机号 3-微信公众号授权 4-小程序授权 5-微信unionid登录',
    type: LOGIN_TYPE,
    enum: LOGIN_TYPE,
    example: LOGIN_TYPE.账号名密码登录,
  })
  @IsOptional()
  @IsIn(Object.values(LOGIN_TYPE), { message: `login_type必须指定值` })
  readonly login_type?: LOGIN_TYPE;

  @ApiPropertyOptional({
    description: '角色类型 1-平台端 2-商家端 3-小程序端',
    type: ROLE_TYPE,
    enum: ROLE_TYPE,
    example: ROLE_TYPE.平台端,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly role_type?: ROLE_TYPE;
}

export class QueryRoleDto extends QueryDTO {
  @ApiPropertyOptional({
    description: '角色类型 1-平台端 2-商家端 3-小程序端',
    type: ROLE_TYPE,
    enum: ROLE_TYPE,
    example: ROLE_TYPE.平台端,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly role_type?: ROLE_TYPE;

  @ApiPropertyOptional({
    description: '角色名称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '角色名称必须是字符串' })
  readonly role_name?: string;
}

// 查询角色分配的权限列表
export class QueryRightDto extends QueryDTO {
  @ApiPropertyOptional({
    description: '角色类型 1-平台端 2-商家端 3-小程序端',
    type: ROLE_TYPE,
    enum: ROLE_TYPE,
    example: ROLE_TYPE.平台端,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly role_type?: ROLE_TYPE;

  @ApiPropertyOptional({
    description: '权限类型 1-菜单 2-按钮',
    type: RIGHT_TYPE,
    enum: RIGHT_TYPE,
    example: RIGHT_TYPE.菜单,
  })
  @IsOptional()
  @IsInt({ message: '角色类型必须是数字' })
  readonly right_type?: RIGHT_TYPE;

  @ApiPropertyOptional({
    description: '权限名称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '权限名称必须是字符串' })
  readonly right_name?: string;
}
