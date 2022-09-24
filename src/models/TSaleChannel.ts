import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_sale_channel', timestamps: false, comment: '销售渠道' })
export class TSaleChannel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
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

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '渠道名称' })
  channel_name?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '渠道类型（1企业渠道 2会员渠道）',
  })
  sale_channel_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '渠道唯一编码',
  })
  channel_uuid?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '渠道图标' })
  channel_ico?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '负责人手机' })
  phone?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否自动审核',
    defaultValue: '0',
  })
  auto_audit?: number;

  @Column({ type: DataType.INTEGER, comment: '是否是平台', defaultValue: '0' })
  is_plant?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '新购分润(%)',
    defaultValue: '0.00',
  })
  first_buy_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '继购分润(%)',
    defaultValue: '0.00',
  })
  second_buy_split?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否启用积分',
    defaultValue: '0',
  })
  if_open_point?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '积分汇率（x积分抵1元）',
    defaultValue: '0.00',
  })
  point_rate?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '积分别名' })
  point_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '发积分验证手机号',
  })
  point_check_phone?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '积分预充值余额',
    defaultValue: '0.00',
  })
  point_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '默认价格类型编码',
  })
  default_price_type_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否需要身份证认证',
    defaultValue: '0',
  })
  if_need_id_card?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '状态 0 可用, 1 禁用, 2 注销',
    defaultValue: '0',
  })
  status?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '渠道管理员' })
  channel_manager?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '渠道业务员' })
  channel_promoter?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '公司名称' })
  company_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '银行账号' })
  account?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '所属银行' })
  bank?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后同步时间' })
  last_sync_time?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
