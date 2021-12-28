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

export enum CheckAction {
  ALL = 'all',
  DNS = 'dns',
  PING = 'ping',
}

export enum CheckOperator {
  DEFAULT = 'DEFAULT',
  CHINANET = 'CHINANET',
  UNICOM = 'UNICOM',
  CAP = 'CAP',
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

export class NetCheckDTO extends AppIdDTO {
  @ApiProperty({
    description:
      '执行的检测动作，允许的值：dns（做域名解析）、ping（做ping检测）、all（dns和ping都做）',
    enum: CheckAction,
  })
  @IsEnum(CheckAction)
  readonly action: CheckAction;

  @ApiProperty({
    description:
      '指定平台从某个运营商进行检测，允许的值：CHINANET（电信出口）、UNICOM（联通出口）、CAP（腾讯自建出口）、DEFAULT（根据ip来选择运营商）',
    enum: CheckOperator,
  })
  @IsEnum(CheckOperator)
  readonly operator: CheckOperator;
}
