import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

import { CurrentUser, Public } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ValidationPipe } from '@pipe/validation.pipe';

import {
  AppOrderDto,
  FaceToFaceDto,
  PageHttpMethodDto,
  PageOrderDto,
  PrecreateDto,
  RefundDto,
  RefundQueryDto,
  TradeQueryDto,
  WapOrderDto,
} from './alipay.dto';
import { AlipayProvider } from './alipay.provider';

@ApiTags('支付宝 (alipay)')
@ApiBearerAuth()
@Controller('alipay')
export class AlipayController {
  constructor(private readonly provider: AlipayProvider) {}

  // ─── Order creation ──────────────────────────────────────────────────

  @Post('precreate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async precreate(@Body() body: PrecreateDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.precreate(stripAppId(body));
  }

  @Post('face-to-face')
  @UsePipes(new ValidationPipe({ transform: true }))
  async faceToFace(@Body() body: FaceToFaceDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.faceToFace(stripAppId(body));
  }

  @Post('page')
  @UsePipes(new ValidationPipe({ transform: true }))
  async page(
    @Body() body: PageOrderDto,
    @Query() query: PageHttpMethodDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const html_or_url = client.pagePay(stripAppId(body), query.http_method ?? 'POST');
    return { kind: query.http_method === 'GET' ? 'url' : 'html', body: html_or_url };
  }

  @Post('wap')
  @UsePipes(new ValidationPipe({ transform: true }))
  async wap(
    @Body() body: WapOrderDto,
    @Query() query: PageHttpMethodDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const html_or_url = client.wapPay(stripAppId(body), query.http_method ?? 'GET');
    return { kind: query.http_method === 'POST' ? 'html' : 'url', body: html_or_url };
  }

  @Post('app')
  @UsePipes(new ValidationPipe({ transform: true }))
  async app(@Body() body: AppOrderDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { order_str: client.appPay(stripAppId(body)) };
  }

  // ─── Query / close / refund ──────────────────────────────────────────

  @Post('order/query')
  @UsePipes(new ValidationPipe({ transform: true }))
  async query(@Body() body: TradeQueryDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const { app_id: _ignored, ...rest } = body;
    void _ignored;
    return client.queryOrder(rest);
  }

  @Post('order/close')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async close(@Body() body: TradeQueryDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const { app_id: _ignored, ...rest } = body;
    void _ignored;
    return client.closeOrder(rest);
  }

  @Post('refund')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refund(@Body() body: RefundDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.refund(stripAppId(body));
  }

  @Post('refund/query')
  @UsePipes(new ValidationPipe({ transform: true }))
  async refundQuery(@Body() body: RefundQueryDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.queryRefund(stripAppId(body));
  }

  // ─── Async notify (urlencoded form, public) ──────────────────────────

  @Public()
  @Post('notify/:tenantId/:appId')
  @HttpCode(HttpStatus.OK)
  async notify(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('appId') appId: string,
    @Body() body: unknown,
    @Res() res: Response,
  ): Promise<void> {
    if (!isStringRecord(body)) {
      throw new BadRequestException('Notify body must be urlencoded form fields');
    }
    if (!appId || appId.length > 64 || !/^[A-Za-z0-9_-]+$/.test(appId)) {
      throw new BadRequestException('Invalid appId');
    }
    const client = await this.provider.getClient(tenantId, appId);
    client.verifyNotify(body);
    // Alipay expects literal "success" (text/plain) within 5s — production
    // wires the decoded payload into BullMQ for retry-safe handling.
    res.type('text/plain').send('success');
  }
}

function stripAppId<T extends { app_id?: string }>(body: T): Omit<T, 'app_id'> {
  const { app_id: _ignored, ...rest } = body;
  void _ignored;
  return rest as Omit<T, 'app_id'>;
}

function isStringRecord(v: unknown): v is Record<string, string> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (typeof k !== 'string') return false;
    // urlencoded values are always strings; reject nested arrays / objects
    if (typeof val !== 'string') return false;
  }
  return true;
}
