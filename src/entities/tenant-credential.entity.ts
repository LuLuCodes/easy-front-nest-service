import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { bigintTransformer } from '@database/transformers/bigint.transformer';
import { AuditEntity } from './audit.entity';

export enum CREDENTIAL_PROVIDER {
  wx_oa = 'wx_oa',
  wx_mp = 'wx_mp',
  wx_pay = 'wx_pay',
  alipay = 'alipay',
  oss = 'oss',
  sms = 'sms',
}

export enum CREDENTIAL_STATUS {
  active = 'active',
  disabled = 'disabled',
}

@Entity({ name: 't_tenant_credential', comment: '租户外部服务凭证表（密文存储）' })
@Index('uq_tenant_provider_app', ['credential_tenant_id', 'provider', 'app_id'], { unique: true })
@Index('idx_tc_provider', ['provider'])
export class TenantCredential extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({
    name: 'credential_tenant_id',
    type: 'bigint',
    transformer: bigintTransformer,
    comment: '凭证归属的租户 ID',
  })
  credential_tenant_id!: number;

  @Column({
    type: 'enum',
    enum: CREDENTIAL_PROVIDER,
    comment: '凭证所属外部服务',
  })
  provider!: CREDENTIAL_PROVIDER;

  @Column({ type: 'varchar', length: 128, comment: '应用 ID / 商户号 / Bucket 名等' })
  app_id!: string;

  @Column({ type: 'varchar', length: 128, nullable: true, comment: '运营展示用标签' })
  display_name?: string;

  @Column({ type: 'blob', comment: 'AES-GCM 加密后的 secret' })
  secret_cipher!: Buffer;

  @Column({ type: 'binary', length: 12, comment: 'AES-GCM IV' })
  secret_iv!: Buffer;

  @Column({ type: 'binary', length: 16, comment: 'AES-GCM auth tag' })
  secret_tag!: Buffer;

  @Column({ type: 'blob', nullable: true, comment: '可选证书密文（如微信支付私钥）' })
  cert_cipher?: Buffer;

  @Column({ type: 'binary', length: 12, nullable: true, comment: '证书 IV' })
  cert_iv?: Buffer;

  @Column({ type: 'binary', length: 16, nullable: true, comment: '证书 auth tag' })
  cert_tag?: Buffer;

  @Column({ type: 'varchar', length: 64, nullable: true, comment: '证书序列号' })
  cert_serial_no?: string;

  @Column({
    type: 'enum',
    enum: CREDENTIAL_STATUS,
    default: CREDENTIAL_STATUS.active,
    comment: '凭证状态',
  })
  status!: CREDENTIAL_STATUS;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Master key 版本（用于密钥轮换）',
  })
  key_version!: number;

  @Column({ type: 'json', nullable: true, comment: '附加配置（token / aesKey / notifyUrl 等）' })
  metadata?: Record<string, unknown>;
}
