import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 't_user_login',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户登录账号表',
})
export class TUserLogin extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '账号类型：1-账号名密码 2-手机号 3-微信公众号授权 4-小程序授权 5-微信unionid登录',
  })
  login_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '账号客户端类型 1-平台端 2-企业端 3-小程序端',
  })
  login_client?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '账号id' })
  @Index({ name: 'idx_account', using: 'BTREE', order: 'ASC', unique: true })
  account_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '密码' })
  @Index({ name: 'idx_account', using: 'BTREE', order: 'ASC', unique: true })
  account_pwd?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '密码盐' })
  pwd_salt?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '账号所属user_id',
  })
  @Index({ name: 'idx_userid', using: 'BTREE', order: 'ASC', unique: false })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '删除时间 null-未删除',
  })
  deleted_at?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
