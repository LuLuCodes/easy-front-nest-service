import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_customer', timestamps: false, comment: '用户表' })
export class TCustomer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户主键',
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

  @Column({ type: DataType.STRING(36), comment: '用户code' })
  @Index({
    name: 'idx_customer_cdoe',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '客户来源（0普通客户 1代购人员  2代理商 3看板管理者）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '性别：0 未知， 1男， 2 女',
    defaultValue: '0',
  })
  @Index({ name: 'idx_gender', using: 'BTREE', order: 'ASC', unique: false })
  gender?: number;

  @Column({ allowNull: true, type: DataType.DATEONLY, comment: '生日' })
  birthday?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '身份证号' })
  idcard?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '昵称' })
  @Index({ name: 'idx_nick', using: 'BTREE', order: 'ASC', unique: false })
  nick_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '姓名' })
  @Index({ name: 'idx_name', using: 'BTREE', order: 'ASC', unique: false })
  real_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '常用名' })
  common_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '标签' })
  tag?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '头像地址' })
  avatar_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '手机号码' })
  phone?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '用户等级',
    defaultValue: '0',
  })
  @Index({ name: 'idx_level', using: 'BTREE', order: 'ASC', unique: false })
  level?: number;

  @Column({ allowNull: true, type: DataType.STRING(10), comment: '邀请码' })
  invitation_code?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: 'VIP过期时间' })
  vip_expire?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: 'VIP蓄水时间（天）',
    defaultValue: '0',
  })
  vip_save_days?: number;

  @Column({ type: DataType.TINYINT, comment: '是否游客', defaultValue: '0' })
  is_tour?: number;

  @Column({ type: DataType.INTEGER, comment: '是否黑名单', defaultValue: '0' })
  is_black?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '销售渠道' })
  sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '待审核的销售渠道',
  })
  wait_audit_sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后审核的销售渠道时间',
  })
  audit_sale_channel_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后审核的销售渠道人员',
  })
  audit_sale_channel_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '最后审核的销售渠道人员',
  })
  audit_sale_channel_user_id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '在线状态（0离线 1在线）',
    defaultValue: '0',
  })
  online_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后心跳时间' })
  beet_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '登录状态（0登出 1登入）',
    defaultValue: '0',
  })
  login_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后下线时间' })
  offline_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: 'app_key' })
  app_key?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: 'app_secret',
  })
  app_secret?: string;

  @Column({ type: DataType.INTEGER, comment: '签到次数', defaultValue: '0' })
  sign_in_count?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后签到时间' })
  last_sign_in_time?: Date;

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
