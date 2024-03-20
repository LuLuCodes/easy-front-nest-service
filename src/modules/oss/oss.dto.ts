/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-03-12 11:15:28
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-03-20 14:53:33
 * @FilePath: /douyin-shop-master-service/src/modules/oss/oss.dto.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
/*
 * @Author: leyi leyi@myun.info
 * @Date: 2024-03-12 11:15:28
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-03-12 11:16:39
 * @FilePath: /douyin-shop-master-service/src/modules/douyin-order/douyin-order.dto.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
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
  Matches,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO } from '@dto/BaseDTO';
import { Is } from 'sequelize-typescript';

export class GetUploadParamsDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: '限制上传文件的大小，单位为MB',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'max_size必须为有效整数' })
  @Min(10, { message: 'max_size必须大于等于10' })
  readonly max_size = 10;
}
