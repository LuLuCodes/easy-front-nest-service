import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UsePipes,
  Session,
  Headers,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { ResponseCode } from '@config/global';
import { md5 } from '@libs/cryptogram';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { BasicService } from './basic.service';

import { GetEnabledSwiperDTO, GetAreaDTO } from './basic.dto';

@ApiTags('基础API')
@ApiHeader({
  name: 'x-from-swagger',
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
    summary: '获取轮播图',
    description: '获取轮播图',
  })
  @ApiBody({
    description: '请求参数',
    type: GetEnabledSwiperDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-swiper')
  async getSwiper(@Body() body: GetEnabledSwiperDTO): Promise<any> {
    const response = await this.basicService.getSwiper(body);
    return response;
  }

  @ApiOperation({
    summary: '获取省市区',
    description: '获取省市区',
  })
  @ApiBody({
    description: '请求参数',
    type: GetAreaDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-area')
  async getArea(@Body() body: GetAreaDTO): Promise<any> {
    const response = await this.basicService.getArea(body);
    return response;
  }
}
