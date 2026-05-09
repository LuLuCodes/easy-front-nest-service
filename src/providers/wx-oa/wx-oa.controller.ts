import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Express, Request, Response } from 'express';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';

import { CurrentUser, Public } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ValidationPipe } from '@pipe/validation.pipe';

import {
  AddNewsDto,
  AddPermanentMediaDto,
  AddVideoMaterialDto,
  AppIdOptionalDto,
  BatchGetMaterialDto,
  GetAuthorizeUrlDto,
  GetTempMediaDto,
  JsApiSignDto,
  MaterialIdDto,
  NetCheckDto,
  SnsCheckTokenDto,
  SnsCodeDto,
  SnsRefreshTokenDto,
  SnsUserInfoDto,
  UpdateNewsDto,
  UploadTempMediaDto,
} from './wx-oa.dto';
import { WxOaProvider } from './wx-oa.provider';

@ApiTags('微信公众号 (wx-oa)')
@ApiBearerAuth()
@Controller('wx-oa')
export class WxOaController {
  constructor(private readonly provider: WxOaProvider) {}

  // ─── Webhook (server-to-server, public) ──────────────────────────────

  @Public()
  @Get('webhook/:appId')
  async webhookHandshake(
    @Param('appId') appId: string,
    @Query('signature') signature: string,
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('echostr') echostr: string,
    @Query('tenant_id') tenantId: string,
    @Res() res: Response,
  ): Promise<void> {
    const tid = Number(tenantId);
    if (!tid) throw new BadRequestException('tenant_id query param required');
    if (!ECHOSTR_PATTERN.test(echostr ?? '')) {
      throw new BadRequestException('Invalid echostr');
    }
    const client = await this.provider.getClient(tid, appId);
    const ok = client.verifyHandshake(signature, String(timestamp), nonce);
    res
      .status(ok ? 200 : 403)
      .type('text/plain')
      .send(ok ? echostr : 'forbidden');
  }

  @Public()
  @Post('webhook/:appId')
  @HttpCode(HttpStatus.OK)
  async webhookPush(
    @Param('appId') appId: string,
    @Query('msg_signature') msgSignature: string,
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('tenant_id') tenantId: string,
    @Req() req: Request,
  ): Promise<{ received: boolean }> {
    const tid = Number(tenantId);
    if (!tid) throw new BadRequestException('tenant_id query param required');
    const client = await this.provider.getClient(tid, appId);
    const xml = req.body as { xml?: { Encrypt?: string } } | string;
    const encrypt =
      typeof xml === 'object' && xml?.xml?.Encrypt
        ? xml.xml.Encrypt
        : extractEncryptElement(typeof xml === 'string' ? xml : '');
    if (!encrypt) {
      throw new BadRequestException('Missing <Encrypt> element');
    }
    client.verifyAndDecrypt(msgSignature, String(timestamp), nonce, encrypt);
    // Production typically dispatches to a BullMQ queue here (P5-9).
    return { received: true };
  }

  // ─── Basic ────────────────────────────────────────────────────────────

  @Post('access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  async accessToken(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { access_token: await client.getAccessToken() };
  }

  @Post('api-domain-ip')
  @UsePipes(new ValidationPipe({ transform: true }))
  async apiDomainIp(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { ip_list: await client.getApiDomainIp() };
  }

  @Post('callback-ip')
  @UsePipes(new ValidationPipe({ transform: true }))
  async callbackIp(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { ip_list: await client.getCallbackIp() };
  }

  @Post('net-check')
  @UsePipes(new ValidationPipe({ transform: true }))
  async netCheck(@Body() body: NetCheckDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.netCheck(body.action, body.operator);
  }

  @Post('clear-quota')
  @UsePipes(new ValidationPipe({ transform: true }))
  async clearQuota(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.clearQuota();
  }

  @Post('auto-reply-rules')
  @UsePipes(new ValidationPipe({ transform: true }))
  async autoReplyRules(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.getAutoReplyRules();
  }

  // ─── Materials ────────────────────────────────────────────────────────

  @Post('media/upload-temp')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTempMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadTempMediaDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) throw new BadRequestException('file is required');
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return withTempFile(file, (path) => client.uploadTempMedia(path, body.type));
  }

  @Post('media/get-temp')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTempMedia(
    @Body() body: GetTempMediaDto,
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const result = await client.getTempMedia(body.media_id);
    if (result.contentType) res.type(result.contentType);
    res.send(result.buffer);
  }

  @Post('media/get-jssdk')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getJssdkMedia(
    @Body() body: MaterialIdDto,
    @CurrentUser() user: AuthenticatedUser,
    @Res() res: Response,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    const result = await client.getJssdkMedia(body.media_id);
    if (result.contentType) res.type(result.contentType);
    res.send(result.buffer);
  }

  @Post('media/add-news')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addNews(@Body() body: AddNewsDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.addNews(body.articles as never);
  }

  @Post('media/update-news')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateNews(@Body() body: UpdateNewsDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.updateNews(body.media_id, body.index, body.articles as never);
  }

  @Post('media/upload-img')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AppIdOptionalDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) throw new BadRequestException('file is required');
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return withTempFile(file, (path) => client.uploadImg(path));
  }

  @Post('media/add-permanent')
  @UseInterceptors(FileInterceptor('file'))
  async addPermanentMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AddPermanentMediaDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) throw new BadRequestException('file is required');
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return withTempFile(file, (path) => client.addMaterial(path, body.type));
  }

  @Post('media/add-video')
  @UseInterceptors(FileInterceptor('file'))
  async addVideoMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AddVideoMaterialDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) throw new BadRequestException('file is required');
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return withTempFile(file, (path) =>
      client.addVideoMaterial(path, body.title, body.introduction),
    );
  }

  @Post('media/get-permanent')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getMaterial(@Body() body: MaterialIdDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.getMaterial(body.media_id);
  }

  @Post('media/delete-permanent')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteMaterial(@Body() body: MaterialIdDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.deleteMaterial(body.media_id);
  }

  @Post('media/count')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getMaterialCount(@Body() body: AppIdOptionalDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.getMaterialCount();
  }

  @Post('media/batch-get')
  @UsePipes(new ValidationPipe({ transform: true }))
  async batchGetMaterial(
    @Body() body: BatchGetMaterialDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.batchGetMaterial(body.type, body.offset, body.count);
  }

  // ─── JS-SDK ──────────────────────────────────────────────────────────

  @Post('jssdk/sign')
  @UsePipes(new ValidationPipe({ transform: true }))
  async jsApiSign(@Body() body: JsApiSignDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.signJsApi(body.url);
  }

  // ─── SNS OAuth ───────────────────────────────────────────────────────

  @Post('sns/authorize-url')
  @UsePipes(new ValidationPipe({ transform: true }))
  async authorizeUrl(@Body() body: GetAuthorizeUrlDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return { url: client.buildAuthorizeUrl(body.redirect_uri, body.scope, body.state) };
  }

  @Post('sns/access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  async snsAccessToken(@Body() body: SnsCodeDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.getSnsAccessToken(body.code);
  }

  @Post('sns/refresh-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  async snsRefresh(@Body() body: SnsRefreshTokenDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.refreshSnsAccessToken(body.refresh_token);
  }

  @Post('sns/check-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  async snsCheck(@Body() body: SnsCheckTokenDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id);
    return client.checkSnsAccessToken(body.access_token, body.openid);
  }

  @Post('sns/user-info')
  @UsePipes(new ValidationPipe({ transform: true }))
  async snsUserInfo(@Body() body: SnsUserInfoDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id);
    return client.getSnsUserInfo(body.access_token, body.openid, body.lang);
  }
}

const SAFE_EXT = /^\.[A-Za-z0-9]{1,16}$/;
const ECHOSTR_PATTERN = /^[A-Za-z0-9_-]{1,256}$/;

async function withTempFile<T>(
  file: Express.Multer.File,
  task: (path: string) => Promise<T>,
): Promise<T> {
  const ext = extractSafeExt(file.originalname);
  // Filename built only from server-controlled randomness + a sanitized
  // extension; the client-provided filename never reaches the FS path.
  const safeName = `wx-oa-${Date.now()}-${randomBytes(16).toString('hex')}${ext}`;
  const path = join(tmpdir(), safeName);
  await writeFile(path, file.buffer, { mode: 0o600 });
  try {
    return await task(path);
  } finally {
    try {
      await unlink(path);
    } catch {
      /* ignore */
    }
  }
}

function extractSafeExt(originalName: string | undefined): string {
  if (!originalName) return '';
  const dot = originalName.lastIndexOf('.');
  if (dot < 0) return '';
  const ext = originalName.slice(dot);
  return SAFE_EXT.test(ext) ? ext.toLowerCase() : '';
}

function extractEncryptElement(xml: string): string | undefined {
  // Bounded, character-class-only group rules out polynomial backtracking
  // even if the document contains many ']' characters or repeated CDATA.
  const match = /<Encrypt><!\[CDATA\[([A-Za-z0-9+/=]{1,4096})\]\]><\/Encrypt>/.exec(xml);
  return match?.[1];
}
