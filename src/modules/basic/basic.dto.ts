import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsDateString,
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
  IsEmpty,
  Matches,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO } from '@dto/BaseDTO';
import { regCNMobile } from '@libs/reg-util';
import { SMS_TYPE } from '@dto/EnumDTO';

export class GetDictDto extends QueryDTO {
  @ApiPropertyOptional({
    description: '字典主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  readonly id?: number;

  @ApiPropertyOptional({
    description: '字典名列表',
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'field_name必须为数组' })
  readonly field_name_list?: string[];
}

export class GetAreaDTO extends BaseDTO {}

export class SendSmsDto extends BaseDTO {
  @ApiProperty({
    description: '手机号码',
    type: String,
  })
  @IsString({ message: '手机号码必须为字符串' })
  @Matches(regCNMobile, { message: '手机号码输入不正确' })
  readonly mobile: string;

  @ApiProperty({
    title: '短信类型',
    description: '根据业务自己定义',
    example: SMS_TYPE.验证码,
    enum: SMS_TYPE,
    type: SMS_TYPE,
  })
  @IsIn(Object.values(SMS_TYPE), {
    message: `sms_type必须为指定类型${Object.values(SMS_TYPE)}`,
  })
  readonly sms_type: SMS_TYPE;
}

export class VerifySmsCodeDto extends SendSmsDto {
  @ApiProperty({
    description: '手机验证码',
    type: String,
  })
  @IsString({ message: '手机验证码必须为字符串' })
  @IsNotEmpty({ message: '手机验证码不能为空' })
  readonly code: string;
}
