import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';

@Entity({ name: 't_user_role', comment: '角色表' })
@Index('idx_role_name', ['role_name'])
export class UserRole extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '角色主键' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
  })
  role_type?: number;

  @Column({ type: 'varchar', length: 50, comment: '角色名称' })
  role_name!: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '是否系统角色，不可操作',
  })
  is_supper?: number;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '角色描述' })
  remark?: string;
}
