import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';

import { CurrentUser } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ValidationPipe } from '@pipe/validation.pipe';

import {
  AppIdOptionalDto,
  Code2SessionDto,
  CreateQrCodeDto,
  CreateUnlimitedQrCodeDto,
  DecryptUserDataDto,
  GenerateUrlLinkDto,
  GenerateUrlSchemeDto,
} from './wx-mp.dto';
import { WxMpProvider } from './wx-mp.provider';

@ApiTags('微信小程序 (wx-mp)')
@ApiBearerAuth()
@Controller('wx-mp')
export class WxMpController {
  constructor(private readonly provider: WxMpProvider) {}

  @Post('access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  async accessToken(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { access_token: await client.getAccessToken() };
  }

  @Post('code2session')
  @UsePipes(new ValidationPipe({ transform: true }))
  async code2Session(@Body() body: Code2SessionDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.code2Session(body.js_code);
  }

  @Post('decrypt-user-data')
  @UsePipes(new ValidationPipe({ transform: true }))
  async decryptUserData(@Body() body: DecryptUserDataDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.decryptUserData(body.session_key, body.encrypted_data, body.iv);
  }

  @Post('qrcode/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createQrCode(
    @Body() body: CreateQrCodeDto,
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: FastifyReply,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const buf = await client.createQrCode({
      path: body.path,
      width: body.width,
      auto_color: body.auto_color,
      line_color: body.line_color,
      is_hyaline: body.is_hyaline,
    });
    void res.type('image/png').send(buf);
  }

  @Post('qrcode/wxacode')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getWxaCode(
    @Body() body: CreateQrCodeDto,
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: FastifyReply,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const buf = await client.getWxaCode({
      path: body.path,
      width: body.width,
      auto_color: body.auto_color,
      line_color: body.line_color,
      is_hyaline: body.is_hyaline,
    });
    void res.type('image/png').send(buf);
  }

  @Post('qrcode/unlimited')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUnlimitedQrCode(
    @Body() body: CreateUnlimitedQrCodeDto,
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: FastifyReply,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const buf = await client.getUnlimitedQrCode({
      scene: body.scene,
      page: body.page,
      width: body.width,
      check_path: body.check_path,
      auto_color: body.auto_color,
      line_color: body.line_color,
      is_hyaline: body.is_hyaline,
      env_version: body.env_version,
    });
    void res.type('image/png').send(buf);
  }

  @Post('url-scheme')
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateUrlScheme(
    @Body() body: GenerateUrlSchemeDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const { app_id: _ignored, ...payload } = body;
    void _ignored;
    return client.generateUrlScheme(payload);
  }

  @Post('url-link')
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateUrlLink(@Body() body: GenerateUrlLinkDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const { app_id: _ignored, ...payload } = body;
    void _ignored;
    return client.generateUrlLink(payload);
  }
}
