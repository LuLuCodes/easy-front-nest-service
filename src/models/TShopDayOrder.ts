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
  tableName: 't_shop_day_order',
  timestamps: false,
  comment: '店铺订单全量表',
})
export class TShopDayOrder extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '商家编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单编号' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单编号' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝来源编号',
  })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝来源子编号',
  })
  @Index({
    name: 'idx_from_cps_oid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_oid?: string;

  @Column({ type: DataType.BIGINT, comment: '代购者', defaultValue: '0' })
  from_cps_sync_purchase_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '实付价格',
    defaultValue: '0.00',
  })
  total_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '采购成本',
    defaultValue: '0.00',
  })
  purchase_amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '付款时间' })
  pay_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发货时间' })
  deliver_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '确认收货时间' })
  receive_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '售后时间' })
  rma_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '其他成本时间' })
  other_const_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '上游退款时间' })
  rma_const_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '采购时间' })
  purchase_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '退款金额',
    defaultValue: '0.00',
  })
  rma_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '上游退款金额',
    defaultValue: '0.00',
  })
  rma_const?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '其他成本',
    defaultValue: '0.00',
  })
  other_const?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '预支利润',
    defaultValue: '0.00',
  })
  pre_profit?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '真实利润',
    defaultValue: '0.00',
  })
  set_profit?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方异常单警告（2数量警告 1金额警告 0正常）',
    defaultValue: '0',
  })
  from_cps_warning?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '首次入账时间' })
  first_set_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '采购支付方式(1花呗 2信用卡 3余额 4储蓄卡)',
    defaultValue: '0',
  })
  tb_cps_paytype?: number;

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
