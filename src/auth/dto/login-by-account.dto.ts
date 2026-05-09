import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { LOGIN_CLIENT } from '@dto/EnumDTO';

export class LoginByAccountDto {
  @ApiProperty({ description: '登录账号', type: String })
  @IsString({ message: 'account_id必须是字符串' })
  @IsNotEmpty({ message: 'account_id是必填项' })
  @MinLength(2, { message: '登录账号长度应在2-32位之间' })
  @MaxLength(32, { message: '登录账号长度应在2-32位之间' })
  readonly account_id!: string;

  @ApiProperty({ description: '登录密码', type: String })
  @IsString({ message: 'account_pwd必须是字符串' })
  @IsNotEmpty({ message: 'account_pwd是必填项' })
  @MinLength(6, { message: '登录密码长度应在6-32位之间' })
  @MaxLength(32, { message: '登录密码长度应在6-32位之间' })
  readonly account_pwd!: string;

  @ApiProperty({
    description: '登录端 1-平台端 2-企业端 3-小程序端',
    enum: LOGIN_CLIENT,
    example: LOGIN_CLIENT.平台端,
  })
  @IsIn(Object.values(LOGIN_CLIENT), { message: 'login_client必须指定值' })
  readonly login_client!: LOGIN_CLIENT;
}
