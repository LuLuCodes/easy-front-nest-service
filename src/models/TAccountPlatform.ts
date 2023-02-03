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
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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
    comment: '平台类型 0:未知,1:wechat',
    defaultValue: '0',
  })
  type?: number;

  @Column({ type: DataType.STRING(60), comment: '昵称' })
  nickname!: string;

  @Column({ type: DataType.STRING(255), comment: '头像' })
  avatar!: string;

  @Column({ type: DataType.STRING(64), comment: '微信登录openid' })
  weixin_openid!: string;

  @Column({ type: DataType.STRING(100), comment: '微信登录unionid' })
  weixin_unionid!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用, 2 注销',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
