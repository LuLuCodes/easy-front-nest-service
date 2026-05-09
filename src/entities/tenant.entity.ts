import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AuditEntity } from './audit.entity';

export enum TENANT_STATUS {
  active = 'active',
  suspended = 'suspended',
  deleted = 'deleted',
}

@Entity({ name: 't_tenant', comment: '租户表' })
@Index('uq_tenant_code', ['code'], { unique: true })
export class Tenant extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '租户主键' })
  id!: number;

  @Column({ type: 'varchar', length: 64, comment: '租户编码 (kebab-case slug)' })
  code!: string;

  @Column({ type: 'varchar', length: 128, comment: '租户名称' })
  name!: string;

  @Column({
    type: 'enum',
    enum: TENANT_STATUS,
    default: TENANT_STATUS.active,
    comment: '租户状态',
  })
  status!: TENANT_STATUS;

  @Column({ type: 'varchar', length: 32, default: 'free', comment: '套餐标签' })
  plan?: string;

  @Column({ type: 'json', nullable: true, comment: '扩展元数据' })
  metadata?: Record<string, unknown>;
}
