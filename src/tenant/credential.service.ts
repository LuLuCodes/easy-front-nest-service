import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS, TenantCredential } from '@entities/index';

import type { TenantConfig } from '@config/tenant';

import { open, seal, type SealedSecret } from './crypto/aes-gcm';
import type {
  CreateCredentialDto,
  RotateCredentialSecretDto,
  UpdateCredentialStatusDto,
} from './dto/tenant.dto';

export interface DecryptedCredential {
  id: number;
  tenant_id: number;
  provider: CREDENTIAL_PROVIDER;
  app_id: string;
  display_name?: string;
  secret: string;
  cert?: string;
  cert_serial_no?: string;
  status: CREDENTIAL_STATUS;
  metadata?: Record<string, unknown>;
}

export interface CredentialSummary {
  id: number;
  tenant_id: number;
  provider: CREDENTIAL_PROVIDER;
  app_id: string;
  display_name?: string;
  status: CREDENTIAL_STATUS;
  cert_serial_no?: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class CredentialService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TenantCredential)
    private readonly credentialRepo: Repository<TenantCredential>,
  ) {}

  async create(
    tenantId: number,
    dto: CreateCredentialDto,
    actingUserId: number,
  ): Promise<TenantCredential> {
    const config = this.requireConfig();
    const sealedSecret = seal(dto.secret, config.masterKey);
    const sealedCert = dto.cert ? seal(dto.cert, config.masterKey) : null;

    const credential = this.credentialRepo.create({
      credential_tenant_id: tenantId,
      provider: dto.provider,
      app_id: dto.app_id,
      display_name: dto.display_name,
      secret_cipher: sealedSecret.cipher,
      secret_iv: sealedSecret.iv,
      secret_tag: sealedSecret.tag,
      cert_cipher: sealedCert?.cipher,
      cert_iv: sealedCert?.iv,
      cert_tag: sealedCert?.tag,
      cert_serial_no: dto.cert_serial_no,
      status: CREDENTIAL_STATUS.active,
      key_version: config.masterKeyVersion,
      metadata: dto.metadata,
      tenant_id: tenantId,
      created_by: actingUserId,
      updated_by: actingUserId,
    });
    return this.credentialRepo.save(credential);
  }

  async list(tenantId: number, provider?: CREDENTIAL_PROVIDER): Promise<CredentialSummary[]> {
    const where: Record<string, unknown> = { credential_tenant_id: tenantId };
    if (provider) where.provider = provider;
    const rows = await this.credentialRepo.find({
      where,
      order: { id: 'ASC' },
    });
    return rows.map((c) => ({
      id: c.id!,
      tenant_id: c.credential_tenant_id,
      provider: c.provider,
      app_id: c.app_id,
      display_name: c.display_name,
      status: c.status,
      cert_serial_no: c.cert_serial_no,
      metadata: c.metadata,
    }));
  }

  async updateStatus(
    id: number,
    dto: UpdateCredentialStatusDto,
    actingUserId: number,
  ): Promise<TenantCredential> {
    const credential = await this.requireById(id);
    credential.status = dto.status;
    credential.updated_by = actingUserId;
    return this.credentialRepo.save(credential);
  }

  async rotateSecret(
    id: number,
    dto: RotateCredentialSecretDto,
    actingUserId: number,
  ): Promise<TenantCredential> {
    const config = this.requireConfig();
    const credential = await this.requireById(id);
    const sealedSecret = seal(dto.secret, config.masterKey);
    credential.secret_cipher = sealedSecret.cipher;
    credential.secret_iv = sealedSecret.iv;
    credential.secret_tag = sealedSecret.tag;
    credential.key_version = config.masterKeyVersion;
    if (dto.cert) {
      const sealedCert = seal(dto.cert, config.masterKey);
      credential.cert_cipher = sealedCert.cipher;
      credential.cert_iv = sealedCert.iv;
      credential.cert_tag = sealedCert.tag;
    }
    if (dto.cert_serial_no !== undefined) {
      credential.cert_serial_no = dto.cert_serial_no;
    }
    credential.updated_by = actingUserId;
    return this.credentialRepo.save(credential);
  }

  async decryptOne(id: number): Promise<DecryptedCredential> {
    const credential = await this.requireById(id);
    return this.decrypt(credential);
  }

  async findActive(
    tenantId: number,
    provider: CREDENTIAL_PROVIDER,
    appId?: string,
  ): Promise<DecryptedCredential | null> {
    const where: Record<string, unknown> = {
      credential_tenant_id: tenantId,
      provider,
      status: CREDENTIAL_STATUS.active,
    };
    if (appId) where.app_id = appId;
    const credential = await this.credentialRepo.findOne({ where });
    if (!credential) return null;
    return this.decrypt(credential);
  }

  private decrypt(credential: TenantCredential): DecryptedCredential {
    const config = this.requireConfig();
    const sealedSecret: SealedSecret = {
      cipher: credential.secret_cipher,
      iv: credential.secret_iv,
      tag: credential.secret_tag,
    };
    const secret = open(sealedSecret, config.masterKey);
    let cert: string | undefined;
    if (credential.cert_cipher && credential.cert_iv && credential.cert_tag) {
      cert = open(
        {
          cipher: credential.cert_cipher,
          iv: credential.cert_iv,
          tag: credential.cert_tag,
        },
        config.masterKey,
      );
    }
    return {
      id: credential.id!,
      tenant_id: credential.credential_tenant_id,
      provider: credential.provider,
      app_id: credential.app_id,
      display_name: credential.display_name,
      secret,
      cert,
      cert_serial_no: credential.cert_serial_no,
      status: credential.status,
      metadata: credential.metadata,
    };
  }

  private async requireById(id: number): Promise<TenantCredential> {
    const credential = await this.credentialRepo.findOne({ where: { id } });
    if (!credential) throw new NotFoundException('Credential not found');
    return credential;
  }

  private requireConfig(): TenantConfig {
    const config = this.configService.get<TenantConfig>('tenant');
    if (!config) throw new Error('Tenant config not loaded');
    return config;
  }
}
