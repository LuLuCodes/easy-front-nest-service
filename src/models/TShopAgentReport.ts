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
  tableName: 't_shop_agent_report',
  timestamps: false,
  comment: '店铺代购日报表',
})
export class TShopAgentReport extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键',
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '企业编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.BIGINT, comment: '代购编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.DATE, comment: '报表日期' })
  @Index({
    name: 'idx_report_day',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代购赚取的当日可分佣总利润',
    defaultValue: '0.0000',
  })
  all_available_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '代购赚取的当日可分佣总单数',
    defaultValue: '0',
  })
  all_available_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代购可用收益',
    defaultValue: '0.0000',
  })
  available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示代购可用收益',
    defaultValue: '0.0000',
  })
  dis_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '已结算到B账号佣金',
  })
  set_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代购佣金冻结',
    defaultValue: '0.0000',
  })
  frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '日采购成本',
    defaultValue: '0.0000',
  })
  const_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示日采购成本',
    defaultValue: '0.0000',
  })
  const_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '日采购成本(支付宝)',
    defaultValue: '0.0000',
  })
  const_zfb_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示日采购成本(支付宝)',
    defaultValue: '0.0000',
  })
  const_dis_zfb_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '已结算到B账号支付宝本金',
  })
  set_const_dis_zfb_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '日采购成本(银行卡)',
    defaultValue: '0.0000',
  })
  const_yhk_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示日采购成本(银行卡)',
    defaultValue: '0.0000',
  })
  const_dis_yhk_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '已结算到B账号银行卡本金',
  })
  set_const_dis_yhk_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '日采购成本冻结',
    defaultValue: '0.0000',
  })
  const_frozen_amount?: string;

  @Column({ type: DataType.INTEGER, comment: '订单数', defaultValue: '0' })
  order_count?: number;

  @Column({
    field: 'rateB',
    type: DataType.DECIMAL(18, 4),
    comment: '采购可用比率',
    defaultValue: '0.0000',
  })
  rateb?: string;

  @Column({
    field: 'amountB',
    type: DataType.DECIMAL(18, 4),
    comment: '采购可用单比佣金',
    defaultValue: '0.0000',
  })
  amountb?: string;

  @Column({
    field: 'typeB',
    type: DataType.INTEGER,
    comment: '采购可用佣金计算方式(1按比例 0按固定金额)',
    defaultValue: '0',
  })
  typeb?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '资金是到支付宝时间',
  })
  to_ali_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '资金打到支付宝时间(佣金)',
  })
  com_to_ali_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '平台支付宝到用户支付宝时间(佣金)',
  })
  to_wallet_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '平台支付宝到用户支付宝时间（成本）',
  })
  const_to_wallet_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '平台支付宝到用户支付宝流水（佣金）',
  })
  @Index({
    name: 'idx_to_wallet_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_wallet_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台支付宝到用户支付宝金额（佣金）',
  })
  to_wallet_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '平台支付宝到用户支付宝流水（成本）',
  })
  @Index({
    name: 'idx_const_to_wallet_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  const_to_wallet_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台支付宝到用户支付宝金额（成本）',
  })
  const_to_wallet_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '平台支付宝到用户支付宝返回备注（佣金）',
  })
  to_wallet_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '平台支付宝到用户支付宝状态（0未打款 1打款中 2已到账 3到账失败）（佣金）',
    defaultValue: '0',
  })
  to_wallet_ali_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '平台支付宝到用户支付宝状态（0未打款 1打款中 2已到账 3到账失败）（成本）',
    defaultValue: '0',
  })
  const_to_wallet_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '平台支付宝到用户支付宝返回备注（成本）',
  })
  const_to_wallet_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '平台支付宝到用户银行卡时间（成本）',
  })
  const_to_card_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '平台支付宝到用户银行卡状态（0未打款 1打款中 2已到账 3到账失败）（成本）',
    defaultValue: '0',
  })
  const_to_card_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '平台支付宝到用户银行卡流水（成本）',
  })
  const_to_card_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台支付宝到用户银行卡金额（成本）',
  })
  const_to_card_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '平台支付宝到用户银行卡返回备注（成本）',
  })
  const_to_card_ali_remark?: string;

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
