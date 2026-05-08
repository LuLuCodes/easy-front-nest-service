import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { UserLogin } from './user-login.entity';

@Entity({ name: 't_user', comment: '用户基础信息表' })
export class User extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '主键' })
  id!: number;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '用户名称' })
  nick?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '用户头像' })
  avatar?: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '手机号' })
  phone?: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '用户标签' })
  tag?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '备注' })
  note?: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
  })
  role_type?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '账户状态 1-正常 11-禁用 12-注销',
  })
  user_status?: number;

  @OneToOne(() => UserLogin, (login) => login.user)
  account?: UserLogin;
}
