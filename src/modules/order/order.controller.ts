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
import { MqClientService } from '@service/mq.client.service';
import { OrderService } from './order.service';

import {
  AddOrderDTO,
  PayOrderDTO,
  QueryPayResultDTO,
  AddOrderFromCartDTO,
  CancelOrderDTO,
  GetOrderDTO,
} from './order.dto';

@ApiTags('订单API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('order')
export class OrderController {
  private _orderProxy = this.mqClientService.createOrderProxy();
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly orderService: OrderService,
    private readonly mqClientService: MqClientService,
  ) {}

  @ApiOperation({
    summary: '新增订单（直接购买）',
    description: '新增订单（直接购买）',
  })
  @ApiBody({
    description: '请求参数',
    type: AddOrderDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('add-order')
  @CatchError()
  async addOrder(@Session() session, @Body() body: AddOrderDTO): Promise<any> {
    const { user } = session;
    const response = await this.orderService.addOrder(body, user);
    return response;
  }

  @ApiOperation({
    summary: '支付订单',
    description: '支付订单',
  })
  @ApiBody({
    description: '请求参数',
    type: PayOrderDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('pay-order')
  @CatchError()
  async payOrder(@Session() session, @Body() body: PayOrderDTO): Promise<any> {
    const { user } = session;
    const response = await this.orderService.payOrder(body, user);
    return response;
  }

  @ApiOperation({
    summary: '查询支付结果',
    description: '查询支付结果',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryPayResultDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('query-pay-result')
  @CatchError()
  async queryPayResult(
    @Session() session,
    @Body() body: QueryPayResultDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.orderService.queryPayResult(body, user);
    return response;
  }

  @ApiOperation({
    summary: '从购物车添加订单',
    description: '从购物车添加订单',
  })
  @ApiBody({
    description: '请求参数',
    type: AddOrderFromCartDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('add-order-from-cart')
  @CatchError()
  async addOrderFromCart(
    @Session() session,
    @Body() body: AddOrderFromCartDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.orderService.addOrderFromCart(body, user);
    return response;
  }

  @Post('wx-pay-callback')
  @CatchError()
  async wxPayCallback(@Body() body): Promise<any> {
    const response = await this.orderService.wxPayCallback(body);
    return response;
  }

  @ApiOperation({
    summary: '取消订单',
    description: '取消订单',
  })
  @ApiBody({
    description: '请求参数',
    type: CancelOrderDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('cancel-order')
  @CatchError()
  async cancelOrder(
    @Session() session,
    @Body() body: CancelOrderDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.orderService.cancelOrder(body, user);
    return response;
  }

  @ApiOperation({
    summary: '获取订单列表',
    description: '获取订单列表',
  })
  @ApiBody({
    description: '请求参数',
    type: GetOrderDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-order')
  @CatchError()
  async getOrderList(
    @Session() session,
    @Body() body: GetOrderDTO,
  ): Promise<any> {
    const { user } = session;
    const response = await this.orderService.getOrderList(body, user);
    return response;
  }
  // end
}
