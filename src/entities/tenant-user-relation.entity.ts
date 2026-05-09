import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { bigintTransformer } from '@database/transformers/bigint.transformer';
import { AuditEntity } from './audit.entity';

export enum TENANT_USER_ROLE {
  owner = 'owner',
  admin = 'admin',
  member = 'member',
}

@Entity({ name: 't_tenant_user_relation', comment: '租户-用户关系表' })
@Index('uq_tenant_user', ['relation_tenant_id', 'user_id'], { unique: true })
@Index('idx_tur_user_id', ['user_id'])
export class TenantUserRelation extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  /**
   * The tenant this relation grants access to. Distinct from the inherited
   * `tenant_id` audit column (which records the tenant context that created
   * the relation row — typically the same value, but conceptually separate).
   */
  @Column({
    name: 'relation_tenant_id',
    type: 'bigint',
    transformer: bigintTransformer,
    comment: '关联到的租户 ID',
  })
  relation_tenant_id!: number;

  @Column({ type: 'bigint', transformer: bigintTransformer, comment: '关联用户 ID' })
  user_id!: number;

  @Column({
    type: 'enum',
    enum: TENANT_USER_ROLE,
    default: TENANT_USER_ROLE.member,
    comment: '用户在该租户的角色',
  })
  role_in_tenant!: TENANT_USER_ROLE;

  @Column({ type: 'tinyint', default: 0, comment: '是否为该用户的默认租户' })
  is_default!: number;
}
