import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { CREDENTIAL_PROVIDER } from '@entities/index';
import { ValidationPipe } from '@pipe/validation.pipe';

import { CredentialService } from './credential.service';
import { SuperAdminOnly } from './decorators/super-admin.decorator';
import {
  CreateCredentialDto,
  RotateCredentialSecretDto,
  UpdateCredentialStatusDto,
} from './dto/tenant.dto';
import { SuperAdminGuard } from './guards/super-admin.guard';

@ApiTags('租户凭证 (super-admin)')
@ApiBearerAuth()
@SuperAdminOnly()
@UseGuards(SuperAdminGuard)
@Controller('admin/tenants/:tenantId/credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @ApiOperation({ summary: '为租户添加凭证（secret 立即加密入库）' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body() dto: CreateCredentialDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const credential = await this.credentialService.create(tenantId, dto, user.id);
    return {
      id: credential.id,
      tenant_id: credential.credential_tenant_id,
      provider: credential.provider,
      app_id: credential.app_id,
      display_name: credential.display_name,
      status: credential.status,
    };
  }

  @ApiOperation({ summary: '列出租户凭证（不返回 secret）' })
  @Get()
  async list(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Query('provider') provider?: CREDENTIAL_PROVIDER,
  ) {
    return this.credentialService.list(tenantId, provider);
  }

  @ApiOperation({ summary: '修改凭证状态' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCredentialStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const credential = await this.credentialService.updateStatus(id, dto, user.id);
    return { id: credential.id, status: credential.status };
  }

  @ApiOperation({ summary: '轮换凭证 secret / 证书' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id/secret')
  async rotate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RotateCredentialSecretDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const credential = await this.credentialService.rotateSecret(id, dto, user.id);
    return { id: credential.id, key_version: credential.key_version };
  }
}
