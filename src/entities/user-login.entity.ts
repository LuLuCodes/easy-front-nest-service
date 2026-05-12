import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { User } from './user.entity';
import { bigintTransformer } from '@database/transformers/bigint.transformer';

@Entity({ name: 't_user_login', comment: '用户登录账号表' })
@Index('idx_account', ['account_id', 'account_pwd'], { unique: true })
@Index('idx_userid', ['user_id'])
export class UserLogin extends AuditEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '账号类型：1-账号名密码 2-手机号 3-微信公众号授权 4-小程序授权 5-微信unionid登录',
  })
  login_type?: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '账号客户端类型 1-平台端 2-企业端 3-小程序端',
  })
  login_client?: number;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '账号id' })
  account_id?: string;

  @Column({ type: 'varchar', length: 32, nullable: true, comment: '密码' })
  account_pwd?: string;

  @Column({ type: 'varchar', length: 32, nullable: true, comment: '密码盐' })
  pwd_salt?: string;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: bigintTransformer,
    comment: '账号所属user_id',
  })
  user_id?: number;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: Relation<User>;
}
