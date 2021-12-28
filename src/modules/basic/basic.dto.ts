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

export class GetEnabledSwiperDTO extends QueryDTO {
  @ApiPropertyOptional({
    description: '轮播图主键',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'id必须为有效整数' })
  readonly id?: number;

  @ApiPropertyOptional({
    description: '轮播图位置列表',
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'position必须为数组' })
  readonly position?: string[];
}

export class GetAreaDTO extends BaseDTO {}
