import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

@Entity({ name: 't_user_role_relation', comment: '用户角色关系表' })
export class UserRoleRelation extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint', nullable: true, transformer: bigintTransformer })
  user_id?: number;

  @Column({ type: 'bigint', nullable: true, transformer: bigintTransformer })
  role_id?: number;
}
