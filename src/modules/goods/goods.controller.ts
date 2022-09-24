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
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { GoodsService } from './goods.service';

import { GetGoodsSpuDTO, GetGoodsGroupByCodeDTO } from './goods.dto';

@ApiTags('商品API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('goods')
export class GoodsController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly goodsService: GoodsService,
  ) {}

  @ApiOperation({
    summary: '获取商品spu',
    description: '获取商品spu',
  })
  @ApiBody({
    description: '请求参数',
    type: GetGoodsSpuDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-goods-spu')
  async getGoodsSpu(
    @Session() session,
    @Body() body: GetGoodsSpuDTO,
  ): Promise<any> {
    const response = await this.goodsService.getGoodsSpu(body);
    return response;
  }

  @ApiOperation({
    summary: '获取商品spu详情',
    description: '获取商品spu详情',
  })
  @ApiBody({
    description: '请求参数',
    type: GetGoodsSpuDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-goods-detail')
  async getGoodsSpuDetail(
    @Session() session,
    @Body() body: GetGoodsSpuDTO,
  ): Promise<any> {
    const response = await this.goodsService.getGoodsDetail(body);
    return response;
  }

  @ApiOperation({
    summary: '根据查询商品分组',
    description: '根据查询商品分组',
  })
  @ApiBody({
    description: '请求参数',
    type: GetGoodsGroupByCodeDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-goods-group-by-code')
  async getGoodsGroupByCode(
    @Session() session,
    @Body() body: GetGoodsGroupByCodeDTO,
  ): Promise<any> {
    const response = await this.goodsService.getGoodsGroupByCode(body);
    return response;
  }

  @ApiOperation({
    summary: '查询topN分组商品',
    description: '查询topN分组商品',
  })
  @ApiBody({
    description: '请求参数',
    type: GetGoodsGroupByCodeDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-group-goods-limit')
  async getGroupGoodsLimit(
    @Session() session,
    @Body() body: GetGoodsGroupByCodeDTO,
  ): Promise<any> {
    const response = await this.goodsService.getGroupGoodsLimit(body);
    return response;
  }
  // end
}
