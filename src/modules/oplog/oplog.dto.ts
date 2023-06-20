import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO } from '@dto/BaseDTO';
import { ACTION_TYPE, TARGET_TYPE } from '@dto/EnumDTO';
import { Optional } from '@nestjs/common';
import { IsOptional } from 'class-validator';

export class QueryLogDto extends QueryDTO {
  @ApiProperty({
    description: '操作人',
    type: String,
  })
  readonly action_user?: string;

  @ApiPropertyOptional({
    description: '操作内容',
    type: String,
  })
  @IsOptional()
  readonly action_desc?: string;

  @ApiPropertyOptional({
    description: '模块',
    type: String,
  })
  @IsOptional()
  readonly target_type?: string;
}

export class CreateLogDto {
  @ApiProperty({
    description: '操作人',
    type: Number,
  })
  readonly user_id?: number;

  @ApiProperty({
    description: '谁',
    example: '马丁',
  })
  readonly action_user: string;

  @ApiPropertyOptional({
    description: '目标模块',
    type: TARGET_TYPE,
    enum: TARGET_TYPE,
    example: TARGET_TYPE.其他,
  })
  @Optional()
  readonly target_type?: TARGET_TYPE;

  @ApiPropertyOptional({
    description: '目标id',
    type: Number,
  })
  @Optional()
  readonly target_id?: number;

  @ApiProperty({
    description: '动作',
    type: ACTION_TYPE,
    enum: ACTION_TYPE,
    example: ACTION_TYPE.其他,
  })
  readonly action_type: ACTION_TYPE;

  @ApiProperty({
    description: '动作',
    type: String,
    example: '登录【后台系统】',
  })
  readonly action_desc: string;
}
