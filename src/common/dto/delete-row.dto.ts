import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteRowDto {
  @ApiProperty({ description: '主键 ID', type: Number })
  @IsInt({ message: 'id必须为有效整数' })
  readonly id: number;
}
