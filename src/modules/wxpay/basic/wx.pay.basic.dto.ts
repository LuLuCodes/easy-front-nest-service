import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MchIdDTO {
  @ApiPropertyOptional({
    description: '商户号id',
    type: String,
    maxLength: 1,
    minLength: 20,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'mchId不能为空' })
  @IsString({ message: 'mchId必须为字符串' })
  @Length(10, 20, { message: 'mchId长度10~20' })
  readonly mchId?: string;
}
