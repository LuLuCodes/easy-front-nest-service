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

export class LoginByWeChatDTO extends BaseDTO {
  @ApiProperty({
    description: '微信unionid',
    type: String,
  })
  @IsString({ message: 'wx_unionid必须为字符串' })
  @IsNotEmpty({ message: 'wx_unionid必须不能为空字符串' })
  readonly wx_unionid: string;

  @ApiProperty({
    description: '微信openid',
    type: String,
  })
  @IsString({ message: 'wx_openid必须为字符串' })
  @IsNotEmpty({ message: 'wx_openid必须不能为空字符串' })
  readonly wx_openid: string;

  @ApiProperty({
    description: '1-微信公众号 2-微信小程序 3-微信开放平台',
    type: Number,
  })
  @IsInt({ message: 'type必须为有效整数' })
  @Min(0, { message: 'type必须大于等于0' })
  readonly type: number;

  @ApiPropertyOptional({
    description: '没有账户的话，是否自动创建，0-否 1-是',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'auto_register必须为有效整数' })
  @Min(0, { message: 'auto_register必须大于等于0' })
  readonly auto_register = 0;

  @ApiPropertyOptional({
    description: '性别：0 未知， 1男， 2 女',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'gender必须为有效整数' })
  @Min(0, { message: 'gender必须大于等于0' })
  readonly gender?: number;

  @ApiPropertyOptional({
    description: '昵称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'nick必须是字符串' })
  readonly nick_name?: string;

  @ApiPropertyOptional({
    description: '头像',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'avatar必须是字符串' })
  readonly avatar_url?: string;
}

export class BindPhoneAndEmailDTO extends BaseDTO {
  @ApiProperty({
    description: '账户id',
    type: Number,
  })
  @IsInt({ message: 'account_id必须为有效整数' })
  @Min(1, { message: 'account_id必须大于等于1' })
  readonly account_id: number;

  @ApiPropertyOptional({
    description: '手机号',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'phone必须是字符串' })
  readonly phone?: string;

  @ApiPropertyOptional({
    description: 'email',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'email必须是字符串' })
  readonly email?: string;
}

export class CreateOrUpdateAddressDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: '地址主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  @Min(0, { message: 'id必须大于等于0' })
  readonly id = 0;

  @ApiProperty({
    description: '收货人',
    type: String,
  })
  @IsString({ message: 'name必须为字符串' })
  @IsNotEmpty({ message: 'name必须不能为空字符串' })
  readonly name: string;

  @ApiProperty({
    description: '收货人手机',
    type: String,
  })
  @IsString({ message: 'phone必须为字符串' })
  @IsNotEmpty({ message: 'phone必须不能为空字符串' })
  readonly phone: string;

  @ApiPropertyOptional({
    description: '省市区编码',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'pcd_code必须为字符串' })
  @IsNotEmpty({ message: 'pcd_code必须不能为空字符串' })
  readonly pcd_code?: string;

  @ApiPropertyOptional({
    description: '省市区',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'pcd_desc必须为字符串' })
  @IsNotEmpty({ message: 'pcd_desc必须不能为空字符串' })
  readonly pcd_desc?: string;

  @ApiPropertyOptional({
    description: '街道，xx路',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'address必须为字符串' })
  readonly address?: string;

  @ApiPropertyOptional({
    description: '标签',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'tags必须为字符串' })
  readonly tags?: string;

  @ApiPropertyOptional({
    description: '是否默认地址，0-否 1-是',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_default必须为有效整数' })
  @Min(0, { message: 'is_default必须大于等于0' })
  readonly is_default?: number;

  @ApiPropertyOptional({
    description: '排序',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'sort必须为有效整数' })
  @Min(0, { message: 'sort必须大于等于0' })
  readonly sort?: number;

  @ApiPropertyOptional({
    description: '是否逻辑删除 1:已删除',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'deleted必须为有效整数' })
  @Min(0, { message: 'deleted必须大于等于0' })
  readonly deleted?: number;
}

export class GetAddressDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: '是否默认地址，0-否 1-是',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_default必须为有效整数' })
  @Min(0, { message: 'is_default必须大于等于0' })
  readonly is_default?: number;

  @ApiPropertyOptional({
    description: '地址id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  @Min(0, { message: 'id必须大于等于0' })
  readonly id?: number;
}

export class CreateOrUpdateCartItemDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: '购物车主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  @Min(0, { message: 'id必须大于等于0' })
  readonly id = 0;

  @ApiPropertyOptional({
    description: '商品spu主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'product_id必须为有效整数' })
  @Min(1, { message: 'product_id必须大于等于1' })
  readonly product_id?: number;

  @ApiPropertyOptional({
    description: '商品sku主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'sku_id必须为有效整数' })
  @Min(1, { message: 'sku_id必须大于等于1' })
  readonly sku_id?: number;

  @ApiPropertyOptional({
    description: '数量',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'quantity必须为有效整数' })
  @Min(1, { message: 'quantity必须大于等于1' })
  readonly quantity?: number;

  @ApiPropertyOptional({
    description: '是否启用 1:启用',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'enabled必须为有效整数' })
  @Min(0, { message: 'enabled必须大于等于0' })
  readonly enabled?: number;

  @ApiPropertyOptional({
    description: '是否逻辑删除 1:已删除',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'deleted必须为有效整数' })
  @Min(0, { message: 'deleted必须大于等于0' })
  readonly deleted?: number;
}

export class UpdateCartItemStatusDTO extends BaseDTO {
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
    description: '是否启用 1:启用',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'enabled必须为有效整数' })
  @Min(0, { message: 'enabled必须大于等于0' })
  readonly enabled?: number;

  @ApiPropertyOptional({
    description: '是否逻辑删除 1:已删除',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'deleted必须为有效整数' })
  @Min(0, { message: 'deleted必须大于等于0' })
  readonly deleted?: number;
}

// 获取用户的通用查询 dto
export class GetCustomerDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: '编号',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  @Min(0, { message: 'id必须大于等于0' })
  readonly id?: number;

  @ApiPropertyOptional({
    description: '编号',
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'id_list必须为数组' })
  readonly id_list?: number[];
}

export class BindSuperiorsDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: '上级用户的customer_id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'superiors_customer_id必须为有效整数' })
  @Min(1, { message: 'superiors_customer_id必须大于等于1' })
  readonly superiors_customer_id?: number;

  @ApiPropertyOptional({
    description: '上级用户的邀请码',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'superiors_invitation_code必须是字符串' })
  readonly superiors_invitation_code?: string;
}
