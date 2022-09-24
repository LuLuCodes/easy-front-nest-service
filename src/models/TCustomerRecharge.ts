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
  tableName: 't_customer_recharge',
  timestamps: false,
  comment: '客户充值',
})
export class TCustomerRecharge extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
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

  @Column({ type: DataType.INTEGER, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '账号来源（0customer 1seller）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '充值金额' })
  amount!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '充值类型（1vip充值订单 2豆豆币 3对象钱包t_object_wallet）',
  })
  recharge_type!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '充值时效（10 10天，30 一个月，90三个月 180 六个月 ）',
  })
  useful_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '充值类型（0新购 1续费）',
  })
  oper_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '三方支付流水号',
  })
  @Index({ name: 'idx_trade_no', using: 'BTREE', order: 'ASC', unique: true })
  trade_no?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '支付类型 （1->支付宝；2->微信；3->钱包余额）',
  })
  pay_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '支付状态（0待支付 10已支付 11已关闭）',
  })
  pay_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '支付时间' })
  pay_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '充值城市' })
  pay_city?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '豆豆币',
    defaultValue: '0.00',
  })
  point?: string;

  @Column({ type: DataType.INTEGER, comment: '分润类型', defaultValue: '0' })
  split_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '首冲分润',
    defaultValue: '0.00',
  })
  first_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '平台分润',
    defaultValue: '0.00',
  })
  plant_split?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '所属渠道' })
  sale_channel_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '所属渠道分润',
    defaultValue: '0.00',
  })
  sale_channel_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '分给代理的钱',
    defaultValue: '0.00',
  })
  agent_split?: string;

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
