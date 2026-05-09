import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MchIdOptionalDto {
  @ApiPropertyOptional({ description: '商户号 (留空使用租户默认)' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly mch_id?: string;
}

export class AmountDto {
  @ApiProperty({ description: '金额, 单位: 分' })
  @IsInt()
  @Min(1)
  readonly total!: number;

  @ApiPropertyOptional({ default: 'CNY' })
  @IsOptional()
  @IsString()
  readonly currency?: 'CNY';
}

export class NativeOrderDto extends MchIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly out_trade_no!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  readonly description!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly notify_url!: string;

  @ApiProperty({ type: AmountDto })
  @ValidateNested()
  @Type(() => AmountDto)
  readonly amount!: AmountDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly attach?: string;

  @ApiPropertyOptional({ description: '订单失效时间 ISO8601' })
  @IsOptional()
  @IsString()
  readonly time_expire?: string;
}

export class JsApiPayerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly openid!: string;
}

export class JsApiOrderDto extends NativeOrderDto {
  @ApiProperty({ type: JsApiPayerDto })
  @ValidateNested()
  @Type(() => JsApiPayerDto)
  readonly payer!: JsApiPayerDto;
}

export class H5SceneInfoDto {
  @ApiProperty()
  @IsString()
  readonly payer_client_ip!: string;

  @ApiProperty()
  @IsObject()
  readonly h5_info!: { type: 'iOS' | 'Android' | 'Wap'; app_name?: string; app_url?: string };
}

export class H5OrderDto extends NativeOrderDto {
  @ApiProperty({ type: H5SceneInfoDto })
  @ValidateNested()
  @Type(() => H5SceneInfoDto)
  readonly scene_info!: H5SceneInfoDto;
}

export class AppOrderDto extends NativeOrderDto {}

export class OutTradeNoDto extends MchIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly out_trade_no!: string;
}

export class RefundAmountDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly refund!: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly total!: number;

  @ApiPropertyOptional({ default: 'CNY' })
  @IsOptional()
  @IsString()
  readonly currency?: 'CNY';
}

export class RefundDto extends MchIdOptionalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly out_trade_no?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly transaction_id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly out_refund_no!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly notify_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  readonly reason?: string;

  @ApiProperty({ type: RefundAmountDto })
  @ValidateNested()
  @Type(() => RefundAmountDto)
  readonly amount!: RefundAmountDto;
}

export class OutRefundNoDto extends MchIdOptionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  readonly out_refund_no!: string;
}

const ALL_PAY_TYPES = ['payment', 'refund'] as const;
export type WxPayNotifyType = (typeof ALL_PAY_TYPES)[number];

export class NotifyTypeParamDto {
  @ApiProperty({ enum: ALL_PAY_TYPES })
  @IsIn(ALL_PAY_TYPES as unknown as string[])
  readonly type!: WxPayNotifyType;
}
