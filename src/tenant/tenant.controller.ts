import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ValidationPipe } from '@pipe/validation.pipe';

import { SuperAdminOnly } from './decorators/super-admin.decorator';
import { CreateTenantDto, InviteUserDto, UpdateTenantDto } from './dto/tenant.dto';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { TenantService } from './tenant.service';

@ApiTags('租户管理 (super-admin)')
@ApiBearerAuth()
@SuperAdminOnly()
@UseGuards(SuperAdminGuard)
@Controller('admin/tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOperation({ summary: '创建租户' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() dto: CreateTenantDto, @CurrentUser() user: AuthenticatedUser) {
    return this.tenantService.createTenant(dto, user.id);
  }

  @ApiOperation({ summary: '租户列表' })
  @Get()
  async list() {
    return this.tenantService.listTenants();
  }

  @ApiOperation({ summary: '租户详情' })
  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.tenantService.findById(id);
  }

  @ApiOperation({ summary: '更新租户（含状态变更）' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTenantDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.tenantService.updateTenant(id, dto, user.id);
  }

  @ApiOperation({ summary: '邀请用户加入租户' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(':id/users')
  async invite(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: InviteUserDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.tenantService.inviteUser(id, dto, user.id);
  }

  @ApiOperation({ summary: '从租户移除用户' })
  @Delete(':id/users/:userId')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.tenantService.removeUser(id, userId);
    return { success: true };
  }
}
