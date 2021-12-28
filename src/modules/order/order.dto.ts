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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO, UpdateStatusDTO } from '@dto/BaseDTO';

export enum WX_TRADE_STATE {
  SUCCESS = 'SUCCESS',
  REFUND = 'REFUND',
  NOTPAY = 'NOTPAY',
  CLOSED = 'CLOSED',
  REVOKED = 'REVOKED',
  USERPAYING = 'USERPAYING',
  PAYERROR = 'PAYERROR',
}

export enum WXPAY_TRADE_TYPE {
  /**
   * 小程序支付
   */
  MINI = 'MINI',
  /**
   * 微信公众号支付
   */
  JSAPI = 'JSAPI',
  /**
   * 微信扫码支付
   */
  NATIVE = 'NATIVE',
  /**
   * 微信APP支付
   */
  APP = 'APP',
  /**
   * 付款码支付
   */
  MICROPAY = 'MICROPAY',
  /**
   * H5支付
   */
  MWEB = 'MWEB',
}

export enum PAY_TYPE {
  UNKONW = 0,
  ALIPAY = 1,
  WXPAY = 2,
  WALLET = 3,
}

export enum ORDER_STATUS {
  WAIT_PAY = 0, //待付款
  WAIT_DELIVER = 10, // 待发货
  PART_DELIVER = 20, //部分发货
  ALL_DELIVER = 30, //已发货
  COMPLETED = 40, //已完成
  CLOSED = 50, //已关闭
  INVALID = 60, //无效订单
  SETTLEMENT = 70, //已结算
}

export class AddOrderDTO extends BaseDTO {
  @ApiProperty({
    description: '商品spu主键',
    type: Number,
  })
  @IsInt({ message: 'product_id必须为有效整数' })
  @Min(1, { message: 'product_id必须大于等于1' })
  readonly product_id: number;

  @ApiProperty({
    description: '商品sku主键',
    type: Number,
  })
  @IsInt({ message: 'sku_id必须为有效整数' })
  @Min(1, { message: 'sku_id必须大于等于1' })
  readonly sku_id: number;

  @ApiProperty({
    description: '数量',
    type: Number,
  })
  @IsInt({ message: 'quantity必须为有效整数' })
  @Min(1, { message: 'quantity必须大于等于1' })
  readonly quantity: number;

  @ApiProperty({
    description: '收货地址主键',
    type: Number,
  })
  @IsInt({ message: 'address_id必须为有效整数' })
  @Min(1, { message: 'address_id必须大于等于1' })
  readonly address_id: number;

  @ApiPropertyOptional({
    description: '订单备注',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'note必须为字符串' })
  readonly note?: string;
}

// 从购物车下单
export class AddOrderFromCartDTO extends BaseDTO {
  @ApiProperty({
    description: '收货地址主键',
    type: Number,
  })
  @IsInt({ message: 'address_id必须为有效整数' })
  @Min(1, { message: 'address_id必须大于等于1' })
  readonly address_id: number;

  @ApiProperty({
    description: '购物车主键数组',
    type: [Number],
  })
  @IsArray({ message: 'cart_item_id_list必须需是数组' })
  @ArrayMinSize(1, {
    message: 'cart_item_id_list长度必须大于等于1',
  })
  readonly cart_item_id_list: number[];

  @ApiPropertyOptional({
    description: '订单备注',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'note必须为字符串' })
  readonly note?: string;
}

export class PayOrderDTO extends BaseDTO {
  @ApiProperty({
    description: '订单主键',
    type: Number,
  })
  @IsInt({ message: 'order_id必须为有效整数' })
  @Min(1, { message: 'order_id必须大于等于1' })
  readonly order_id: number;

  @ApiProperty({
    description: '支付类型，1->支付宝；2->微信；3->钱包余额',
    type: Number,
  })
  @IsInt({ message: 'pay_type必须为有效整数' })
  @Min(1, { message: 'pay_type必须大于等于1' })
  readonly pay_type: number;

  @ApiPropertyOptional({
    description: '微信支付交易类型',
    enum: WXPAY_TRADE_TYPE,
  })
  @IsOptional()
  @IsEnum(WXPAY_TRADE_TYPE)
  readonly wxpay_trade_type?: WXPAY_TRADE_TYPE;
}

export class QueryPayResultDTO extends BaseDTO {
  @ApiProperty({
    description: '订单编号',
    type: String,
  })
  @IsString({ message: 'order_sn必须为字符串' })
  @MinLength(2, { message: 'order_sn长度需大于2' })
  readonly order_sn: string;

  @ApiProperty({
    description: '支付类型，1->支付宝；2->微信；3->钱包余额',
    type: Number,
  })
  @IsInt({ message: 'pay_type必须为有效整数' })
  @Min(1, { message: 'pay_type必须大于等于1' })
  readonly pay_type: number;
}

export class CancelOrderDTO extends BaseDTO {
  @ApiProperty({
    description: '订单主键',
    type: Number,
  })
  @IsInt({ message: 'order_id必须为有效整数' })
  @Min(1, { message: 'order_id必须大于等于1' })
  readonly order_id: number;
}

export class GetOrderDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: '订单主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'order_id必须为有效整数' })
  @Min(1, { message: 'order_id必须大于等于1' })
  readonly order_id?: number;

  @ApiPropertyOptional({
    description: '订单SN',
    type: Number,
  })
  @IsOptional()
  @IsString({ message: 'order_sn必须为有效整数' })
  readonly order_sn?: string;

  @ApiPropertyOptional({
    description:
      '订单状态 0->待付款；10->待发货；20->部分发货；30->已发货；40->已完成；50->已关闭；60->无效订单；70->已结算',
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'order_status必须为有效整数' })
  readonly order_status?: number[];

  @ApiPropertyOptional({
    description: '订单取消状态 订单取消状态：0->未取消；1->已取消',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'cancel_status必须为有效整数' })
  readonly cancel_status?: number;

  @ApiPropertyOptional({
    description: '是否附带sku信息',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'extra_sku必须为有效整数' })
  readonly extra_sku?: number;

  @ApiPropertyOptional({
    description: 'sku attributes',
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'attributes_sku必须需是数组' })
  readonly attributes_sku?: string[];
}
