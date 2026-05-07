import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ description: '页码（从 1 开始）', type: Number })
  @IsOptional()
  @IsInt({ message: 'page_num必须为有效整数' })
  @Min(1, { message: 'page_num应大于等于1' })
  readonly page_num: number = 1;

  @ApiPropertyOptional({ description: '每页大小', type: Number })
  @IsOptional()
  @IsInt({ message: 'page_size必须为有效整数' })
  @Min(1, { message: 'page_size应大于等于1' })
  @Max(1000, { message: 'page_size应小于等于1000' })
  readonly page_size: number = 10;

  @ApiPropertyOptional({
    description: '排序字段（参考 Sequelize order 语法）',
    type: Array,
  })
  @IsOptional()
  @IsArray({ message: 'order必须为数组' })
  readonly order?: any[];

  @ApiPropertyOptional({
    description: '查询字段名（参考 Sequelize attributes 语法）',
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'attributes必须为数组' })
  readonly attributes?: string[];
}
