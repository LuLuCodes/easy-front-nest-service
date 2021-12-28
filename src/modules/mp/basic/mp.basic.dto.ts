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
import { BaseDTO } from '@dto/BaseDTO';

export class AppIdDTO extends BaseDTO {
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

export class Code2SessionDTO extends AppIdDTO {
  @ApiProperty({
    description: '登录时获取的code',
    type: String,
  })
  @IsNotEmpty({ message: 'code不能为空' })
  @IsString({ message: 'code必须为字符串' })
  readonly code: string;
}

export class UserDataDecryptDTO {
  @ApiProperty({
    description: '用户的唯一标识',
    type: String,
  })
  @IsNotEmpty({ message: 'openId不能为空' })
  @IsString({ message: 'openId必须为字符串' })
  readonly openId: string;

  @ApiPropertyOptional({
    description: '不包括敏感信息的原始数据字符串，用于计算签名',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'rawData不能为空' })
  @IsString({ message: 'rawData必须为字符串' })
  readonly rawData?: string;

  @ApiPropertyOptional({
    description:
      '使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'signature不能为空' })
  @IsString({ message: 'signature必须为字符串' })
  readonly signature: string;

  @ApiProperty({
    description: '包括敏感数据在内的完整用户信息的加密数据',
    type: String,
  })
  @IsNotEmpty({ message: 'encryptedData不能为空' })
  @IsString({ message: 'encryptedData必须为字符串' })
  readonly encryptedData: string;

  @ApiProperty({
    description: '加密算法的初始向量',
    type: String,
  })
  @IsNotEmpty({ message: 'iv不能为空' })
  @IsString({ message: 'iv必须为字符串' })
  readonly iv: string;
}

export class Color {
  @ApiProperty({
    description: 'r',
    type: Number,
  })
  @IsInt({ message: 'r必须为有效整数' })
  @Min(0, { message: 'r必须大于等于0' })
  @Max(255, { message: 'r必须小于等于255' })
  readonly r: number;

  @ApiProperty({
    description: 'g',
    type: Number,
  })
  @IsInt({ message: 'g必须为有效整数' })
  @Min(0, { message: 'g必须大于等于0' })
  @Max(255, { message: 'g必须小于等于255' })
  readonly g: number;

  @ApiProperty({
    description: 'b',
    type: Number,
  })
  @IsInt({ message: 'b必须为有效整数' })
  @Min(0, { message: 'b必须大于等于0' })
  @Max(255, { message: 'b必须小于等于255' })
  readonly b: number;
}

export class QrCodeDTO extends AppIdDTO {
  @ApiProperty({
    description: '扫码进入的小程序页面路径',
    type: String,
  })
  @IsNotEmpty({ message: 'page不能为空' })
  @IsString({ message: 'page必须为字符串' })
  readonly path: string;

  @ApiPropertyOptional({
    description: '二维码的宽度',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'width必须为有效整数' })
  readonly width?: number;
}

export class LimitQrCodeDTO extends QrCodeDTO {
  @ApiPropertyOptional({
    description: '自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调',
    type: Boolean,
  })
  @IsOptional()
  readonly autoColor?: boolean;

  @ApiPropertyOptional({
    description: '是否需要透明底色',
    type: Boolean,
  })
  @IsOptional()
  readonly isHyaline?: boolean;

  @ApiPropertyOptional({
    description: 'auto_color 为 false 时生效，使用 rgb 设置颜色',
    type: Color,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Color)
  readonly lineColor?: Color;
}

export class UnQrlimitCodeDTO extends LimitQrCodeDTO {
  @ApiProperty({
    description: '场景值',
    type: String,
    maxLength: 1,
    minLength: 32,
  })
  @IsNotEmpty({ message: 'scene不能为空' })
  @IsString({ message: 'scene必须为字符串' })
  @Length(1, 32, { message: 'scene长度1~32' })
  readonly scene: string;
}
