import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateStatusDto {
  @ApiPropertyOptional({ description: '是否启用，1: 启用', type: Number })
  @IsOptional()
  @IsInt({ message: 'enabled必须为有效整数' })
  @Min(0, { message: 'enabled必须大于等于0' })
  readonly enabled?: number;

  @ApiPropertyOptional({ description: '是否逻辑删除，1: 已删除', type: Number })
  @IsOptional()
  @IsInt({ message: 'deleted必须为有效整数' })
  @Min(0, { message: 'deleted必须大于等于0' })
  readonly deleted?: number;
}
