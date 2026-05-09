import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tenant, TenantCredential, TenantUserRelation, User } from '@entities/index';

import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { TenantCredentialVault } from './credential-vault.service';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { TenantContextInterceptor } from './tenant-context.interceptor';
import { TenantContextService } from './tenant-context.service';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tenant, TenantUserRelation, TenantCredential, User])],
  controllers: [TenantController, CredentialController],
  providers: [
    TenantContextService,
    TenantService,
    CredentialService,
    TenantCredentialVault,
    SuperAdminGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
  ],
  exports: [TenantContextService, TenantService, CredentialService, TenantCredentialVault],
})
export class TenantModule {}
