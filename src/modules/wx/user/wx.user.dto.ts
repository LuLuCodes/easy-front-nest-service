import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  ValidateNested,
  MaxLength,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ScopeEnum {
  SNSAPI_BASE = 'snsapi_base',
  SNSAPI_USERINFO = 'snsapi_userinfo',
}

export enum Lang {
  ZH_CN = 'zh_CN',
  ZH_TW = 'zh_TW',
  EN = 'en',
}
export class AppIdDTO {
  @ApiPropertyOptional({
    description: '微信公众号appId',
    type: String,
    maxLength: 1,
    minLength: 20,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'appId不能为空' })
  @IsString({ message: 'appId必须为字符串' })
  @Length(18, 32, { message: 'appId长度18~32' })
  readonly appId?: string;
}

export class GetAuthorizeUrlDTO extends AppIdDTO {
  @ApiProperty({
    description: '授权后重定向的回调链接地址， 请使用urlEncode对链接进行处理',
    type: String,
  })
  @IsNotEmpty({ message: 'redirectUri不能为空' })
  @IsString({ message: 'redirectUri必须为字符串' })
  readonly redirectUri: string;

  @ApiProperty({
    description: `应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）。
    snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）`,
    enum: ScopeEnum,
  })
  @IsEnum(ScopeEnum)
  readonly scope: ScopeEnum;

  @ApiPropertyOptional({
    description:
      '重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节',
    type: String,
    maxLength: 128,
    minLength: 0,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'state不能为空' })
  @IsString({ message: 'state必须为字符串' })
  @Length(0, 128, { message: 'state长度0~128' })
  readonly state?: string;
}

export class GetSnsAccessTokenDTO extends AppIdDTO {
  @ApiProperty({
    description: '授权后获取的code',
    type: String,
  })
  @IsNotEmpty({ message: 'code不能为空' })
  @IsString({ message: 'code必须为字符串' })
  readonly code: string;
}

export class RefreshTokenDTO extends AppIdDTO {
  @ApiProperty({
    description: '填写通过access_token获取到的refresh_token参数',
    type: String,
  })
  @IsNotEmpty({ message: 'refreshToken不能为空' })
  @IsString({ message: 'refreshToken必须为字符串' })
  readonly refreshToken: string;
}

export class CheckAccessTokenDTO {
  @ApiProperty({
    description:
      '网页授权接口调用凭证注意：此access_token与基础支持的access_token不同',
    type: String,
  })
  @IsNotEmpty({ message: 'accessToken不能为空' })
  @IsString({ message: 'accessToken必须为字符串' })
  readonly accessToken: string;

  @ApiProperty({
    description: '用户的唯一标识',
    type: String,
  })
  @IsNotEmpty({ message: 'openId不能为空' })
  @IsString({ message: 'openId必须为字符串' })
  readonly openId: string;
}

export class GetUserInfoDTO {
  @ApiProperty({
    description:
      '网页授权接口调用凭证注意：此access_token与基础支持的access_token不同',
    type: String,
  })
  @IsNotEmpty({ message: 'accessToken不能为空' })
  @IsString({ message: 'accessToken必须为字符串' })
  readonly accessToken: string;

  @ApiProperty({
    description: '用户的唯一标识',
    type: String,
  })
  @IsNotEmpty({ message: 'openId不能为空' })
  @IsString({ message: 'openId必须为字符串' })
  readonly openId: string;

  @ApiProperty({
    description: `返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语`,
    enum: Lang,
  })
  @IsEnum(Lang)
  readonly lang: Lang;
}
