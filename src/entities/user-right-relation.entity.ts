import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

@Entity({ name: 't_user_right_relation', comment: '角色权限关系表' })
export class UserRightRelation extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint', nullable: true, transformer: bigintTransformer })
  role_id?: number;

  @Column({ type: 'bigint', nullable: true, transformer: bigintTransformer })
  right_id?: number;
}
