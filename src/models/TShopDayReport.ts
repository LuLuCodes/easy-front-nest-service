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
  tableName: 't_shop_day_report',
  timestamps: false,
  comment: '店铺日报表',
})
export class TShopDayReport extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
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

  @Column({ type: DataType.DATE, comment: '报表日期' })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '店铺当日可分佣总利润',
    defaultValue: '0.0000',
  })
  all_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人可用收益',
    defaultValue: '0.0000',
  })
  available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人空投',
    defaultValue: '0.0000',
  })
  air_drop_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示可用收益',
    defaultValue: '0.0000',
  })
  dis_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '已结算到C账号店铺当日可分佣总利润',
  })
  set_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人佣金冻结',
    defaultValue: '0.0000',
  })
  frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人冻结空投',
    defaultValue: '0.0000',
  })
  air_drop_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代理商可用',
    defaultValue: '0.0000',
  })
  agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代理空投',
    defaultValue: '0.0000',
  })
  air_drop_agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示代理商可用',
    defaultValue: '0.0000',
  })
  dis_agent_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '已结算到C账号代理商可用',
  })
  set_dis_agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代理商冻结',
    defaultValue: '0.0000',
  })
  agent_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代理冻结空投',
    defaultValue: '0.0000',
  })
  air_drop_agent_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代购佣金可用',
    defaultValue: '0.0000',
  })
  buy_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示代购佣金可用',
    defaultValue: '0.0000',
  })
  dis_buy_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '代购佣金冻结',
    defaultValue: '0.0000',
  })
  buy_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '技术可用',
    defaultValue: '0.0000',
  })
  it_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示技术可用',
    defaultValue: '0.0000',
  })
  dis_it_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '技术冻结',
    defaultValue: '0.0000',
  })
  it_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '运营可用',
    defaultValue: '0.0000',
  })
  ser_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '展示运营可用',
    defaultValue: '0.0000',
  })
  dis_ser_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '运营冻结',
    defaultValue: '0.0000',
  })
  ser_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '打给代购的采购成本',
    defaultValue: '0.0000',
  })
  give_buy_amount?: string;

  @Column({ type: DataType.INTEGER, comment: '订单数', defaultValue: '0' })
  order_count?: number;

  @Column({ type: DataType.INTEGER, comment: '访客数', defaultValue: '0' })
  visit_count?: number;

  @Column({ type: DataType.INTEGER, comment: '流量', defaultValue: '0' })
  pv_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '店铺额外开支',
    defaultValue: '0.0000',
  })
  shop_const?: string;

  @Column({
    field: 'rateX',
    type: DataType.DECIMAL(18, 4),
    comment: '店主可用比率',
    defaultValue: '0.0000',
  })
  ratex?: string;

  @Column({
    field: 'frozen_rateX',
    type: DataType.DECIMAL(18, 4),
    comment: '店主可用比例（冻结）',
    defaultValue: '0.0000',
  })
  frozen_ratex?: string;

  @Column({
    field: 'rateY',
    type: DataType.DECIMAL(18, 4),
    comment: '供应商可用比率',
    defaultValue: '0.0000',
  })
  ratey?: string;

  @Column({
    field: 'frozen_rateY',
    type: DataType.DECIMAL(18, 4),
    comment: '供应商可用比例（冻结）',
    defaultValue: '0.0000',
  })
  frozen_ratey?: string;

  @Column({
    field: 'rateZ',
    type: DataType.DECIMAL(18, 4),
    comment: '技术可用比率',
    defaultValue: '0.0000',
  })
  ratez?: string;

  @Column({
    field: 'frozen_rateZ',
    type: DataType.DECIMAL(18, 4),
    comment: '技术可用比例（冻结）',
    defaultValue: '0.0000',
  })
  frozen_ratez?: string;

  @Column({
    field: 'rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '运营可用比率',
    defaultValue: '0.0000',
  })
  ratea?: string;

  @Column({
    field: 'frozen_rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '运营可用比例（冻结）',
    defaultValue: '0.0000',
  })
  frozen_ratea?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人和代理保底',
    defaultValue: '0.0000',
  })
  minimum_amount?: string;

  @Column({
    field: 'minimum_rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '投资人保底比例',
    defaultValue: '0.0000',
  })
  minimum_ratea?: string;

  @Column({
    field: 'minimum_rateB',
    type: DataType.DECIMAL(18, 4),
    comment: '代理保底比例',
    defaultValue: '0.0000',
  })
  minimum_rateb?: string;

  @Column({
    field: 'rateA_plus',
    type: DataType.DECIMAL(18, 4),
    comment: '运营额外可用比率',
    defaultValue: '0.0000',
  })
  ratea_plus?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '投资人和代理保底预警值',
    defaultValue: '0.0000',
  })
  minimum_safe?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '店铺利润大于预警，投资人和代理的可用比率',
    defaultValue: '0.0000',
  })
  minimum_safe_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '投资人最大可用收益',
  })
  maxavailable_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '代理商最大可用收益',
  })
  maxagent_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '投资人超过最大的附加收益',
  })
  maxavailable_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '投资人超过最大的附加收益(冻结)',
  })
  maxavailable_frozen_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '代理商超过最大的附加收益',
  })
  maxagent_available_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '资金是到支付宝时间',
  })
  to_ali_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '平台支付宝到投资人支付宝状态（0未打款 1打款中 2已到账 3到账失败）',
    defaultValue: '0',
  })
  available_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '平台支付宝到投资人支付宝流水',
  })
  @Index({
    name: 'idx_available_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  available_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '平台支付宝到投资人支付宝返回备注',
  })
  available_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '平台支付宝到代理支付宝状态（0未打款 1打款中 2已到账 3到账失败）',
    defaultValue: '0',
  })
  agent_available_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '平台支付宝到代理支付宝流水',
  })
  @Index({
    name: 'idx_agent_available_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  agent_available_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '平台支付宝到代理支付宝返回备注',
  })
  agent_available_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台支付宝到投资人支付宝金额',
  })
  available_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台支付宝到代理支付宝金额',
  })
  agent_available_ali_amount?: string;

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
