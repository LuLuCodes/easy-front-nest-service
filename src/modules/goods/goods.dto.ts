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

export class GetGoodsSpuDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: '商品主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  readonly id?: number;

  @ApiPropertyOptional({
    description: '分组id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'group_id必须为有效整数' })
  @Min(1, { message: 'group_id必须大于等于1' })
  readonly group_id?: number;

  @ApiPropertyOptional({
    description: '商品名称',
    type: String,
  })
  @IsOptional()
  @IsString({ message: '商品名称必须为字符串' })
  @MinLength(2, { message: '商品名称长度需大于2' })
  readonly spu_name?: string;

  @ApiPropertyOptional({
    description: '是否新品',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_new必须为有效整数' })
  readonly is_new?: number;

  @ApiPropertyOptional({
    description: '热门状态:0->不是新品；1->新品',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_hot必须为有效整数' })
  @Min(0, { message: 'is_hot必须大于等于0' })
  readonly is_hot?: number;

  @ApiPropertyOptional({
    description: '是否推荐商品',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'is_recommend必须为有效整数' })
  readonly is_recommend?: number;

  @ApiPropertyOptional({
    description: '品牌',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: '品牌必须为有效整数' })
  readonly brand_id?: number;

  @ApiPropertyOptional({
    description: '分类',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: '分类必须为有效整数' })
  readonly category_id?: number;

  @ApiPropertyOptional({
    description: '是否携带sku',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: '是否携带sku信息' })
  readonly extra_sku?: number;
}

export class GroupLimitDTO {
  @ApiProperty({
    description: '分组位置',
    type: String,
  })
  @IsString({ message: 'position_code必须为字符串2' })
  readonly position_code: string;

  @ApiProperty({
    description: 'Top N',
    type: String,
  })
  @IsString({ message: 'limit必须为数组' })
  readonly limit: number;
}
// 根据code查询分组
export class GetGoodsGroupByCodeDTO extends QueryDTO {
  @ApiProperty({
    description: '分组位置',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'position_code必须为字符串' })
  readonly position_code?: string;

  @ApiProperty({
    description: '分组位置',
    type: [GroupLimitDTO],
  })
  @IsOptional()
  @IsArray({ message: 'position_code_list必须为数组' })
  readonly position_code_list?: GroupLimitDTO[];

  @ApiProperty({
    description: '分组id',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'group_id必须为数字' })
  readonly group_id?: number;
}
