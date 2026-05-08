import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

@Entity({ name: 't_user_right', comment: '权限表' })
@Index('idx_parent_id', ['parent_id'])
export class UserRight extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '权限主键' })
  id!: number;

  @Column({
    type: 'bigint',
    default: 0,
    transformer: bigintTransformer,
    comment: '权限父级ID',
  })
  parent_id?: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
  })
  role_type?: number;

  @Column({ type: 'tinyint', comment: '权限类型 1-菜单 2-按钮' })
  right_type!: number;

  @Column({ type: 'varchar', length: 50, comment: '菜单编码' })
  right_code!: string;

  @Column({ type: 'varchar', length: 50, comment: '权限名称' })
  right_name!: string;

  @Column({ type: 'int', default: 0, comment: '排序字段 0-最大 默认0' })
  sort_no?: number;
}
