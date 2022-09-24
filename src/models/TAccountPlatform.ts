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
  tableName: 't_account_platform',
  timestamps: false,
  comment: '第三方用户信息',
})
export class TAccountPlatform extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '自增id',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(60), comment: '平台id，多个app共同一个账号' })
  @Index({
    name: 'idx_platform_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  platform_id!: string;

  @Column({ type: DataType.STRING(60), comment: '平台access_token' })
  platform_token!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '平台类型 0-未知,1-微信公众号 2-微信小程序 3-微信开放平台',
    defaultValue: '0',
  })
  type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '性别：0 未知， 1男， 2 女',
    defaultValue: '0',
  })
  gender?: number;

  @Column({ type: DataType.STRING(60), comment: '昵称' })
  nick_name!: string;

  @Column({ type: DataType.STRING(255), comment: '头像' })
  avatar_url!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '微信登录openid',
  })
  wx_openid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '微信登录unionid',
  })
  @Index({
    name: 'idx_wx_unionid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  wx_unionid?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
