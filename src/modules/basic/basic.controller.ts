/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-06-20 16:33:55
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-07-24 18:56:11
 * @FilePath: /easy-front-nest-service/src/modules/basic/basic.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseFilters,
  Session,
  Version,
  SetMetadata,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheService } from '@service/cache.service';
import { BasicService } from './basic.service';

import { OtherOkResponse, OtherErrorResponse } from '@libs/util';

import { GetDictDto, SendSmsDto, VerifySmsCodeDto } from './basic.dto';
import { OtherExceptionsFilter } from '@filter/other-exception.filter';

@ApiTags('基础API')
@ApiHeader({
  name: 'x-from-source',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('basic')
export class BasicController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly basicService: BasicService,
  ) {}

  @ApiOperation({
    summary: '获取字典',
    description: '获取字典',
  })
  @ApiBody({
    description: '请求参数',
    type: GetDictDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseFilters(new OtherExceptionsFilter())
  // @Version(['1', '2'])
  @Post('get-dict')
  @SetMetadata('OkResponse', OtherOkResponse)
  async getDictionary(@Body() body: GetDictDto): Promise<any> {
    const response = await this.basicService.getDictionary(body);
    return response;
  }

  @ApiOperation({
    summary: '发送短信',
    description: '发送短信场景',
  })
  @ApiBody({
    description: '请求参数',
    type: SendSmsDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('send-code')
  async sendCode(@Body() body: SendSmsDto): Promise<any> {
    const response = await this.basicService.sendCode(body);
    return response;
  }

  @ApiOperation({
    summary: '校验短信码',
    description: '校验短信码',
  })
  @ApiBody({
    description: '请求参数',
    type: VerifySmsCodeDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('verify-code')
  async verifyCode(@Body() body: VerifySmsCodeDto): Promise<any> {
    const response = await this.basicService.verifyCode(body);
    return response;
  }
}
