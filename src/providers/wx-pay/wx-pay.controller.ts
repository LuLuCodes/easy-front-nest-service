import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';

import { CurrentUser, Public } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ValidationPipe } from '@pipe/validation.pipe';

import {
  AppOrderDto,
  H5OrderDto,
  JsApiOrderDto,
  NativeOrderDto,
  OutRefundNoDto,
  OutTradeNoDto,
  RefundDto,
} from './wx-pay.dto';
import { WxPayProvider } from './wx-pay.provider';

@ApiTags('微信支付 v3 (wx-pay)')
@ApiBearerAuth()
@Controller('wx-pay')
export class WxPayController {
  constructor(private readonly provider: WxPayProvider) {}

  // ─── Order creation ──────────────────────────────────────────────────

  @Post('native')
  @UsePipes(new ValidationPipe({ transform: true }))
  async native(@Body() body: NativeOrderDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.createNativeOrder(stripMchId(body));
  }

  @Post('jsapi')
  @UsePipes(new ValidationPipe({ transform: true }))
  async jsapi(@Body() body: JsApiOrderDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.createJsApiOrder(stripMchId(body));
  }

  @Post('h5')
  @UsePipes(new ValidationPipe({ transform: true }))
  async h5(@Body() body: H5OrderDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.createH5Order(stripMchId(body));
  }

  @Post('app')
  @UsePipes(new ValidationPipe({ transform: true }))
  async app(@Body() body: AppOrderDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.createAppOrder(stripMchId(body));
  }

  @Post('order/query')
  @UsePipes(new ValidationPipe({ transform: true }))
  async query(@Body() body: OutTradeNoDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.queryOrder(body.out_trade_no);
  }

  @Post('order/close')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async close(@Body() body: OutTradeNoDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    await client.closeOrder(body.out_trade_no);
    return { success: true };
  }

  // ─── Refunds ─────────────────────────────────────────────────────────

  @Post('refund')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refund(@Body() body: RefundDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.refund(stripMchId(body));
  }

  @Post('refund/query')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refundQuery(@Body() body: OutRefundNoDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.mch_id);
    return client.queryRefund(body.out_refund_no);
  }

  // ─── Notify (async webhook, public) ──────────────────────────────────

  @Public()
  @Post(':type/notify/:tenantId/:mchId')
  @HttpCode(HttpStatus.OK)
  async notify(
    @Param('type') type: string,
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('mchId') mchId: string,
    @Headers('Wechatpay-Signature') signature: string,
    @Headers('Wechatpay-Serial') serial: string,
    @Headers('Wechatpay-Timestamp') timestamp: string,
    @Headers('Wechatpay-Nonce') nonce: string,
    @Req() req: FastifyRequest,
  ): Promise<{ code: 'SUCCESS'; message: string }> {
    if (type !== 'payment' && type !== 'refund') {
      throw new BadRequestException('Unsupported notify type');
    }
    if (!signature || !serial || !timestamp || !nonce) {
      throw new BadRequestException('Missing Wechatpay-* headers');
    }
    const withRaw = req as FastifyRequest & { rawBody?: string };
    const rawBody =
      typeof withRaw.rawBody === 'string' ? withRaw.rawBody : JSON.stringify(req.body ?? {});
    const client = await this.provider.getClient(tenantId, mchId);
    await client.verifyAndDecryptNotify(rawBody, { signature, serial, timestamp, nonce });
    // Production wires this into a BullMQ queue so handlers can be retried
    // independently from the WeChat ack. Stub for P5-6.
    return { code: 'SUCCESS', message: 'OK' };
  }
}

function stripMchId<T extends { mch_id?: string }>(body: T): Omit<T, 'mch_id'> {
  const { mch_id: _ignored, ...rest } = body;
  void _ignored;
  return rest as Omit<T, 'mch_id'>;
}
