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
  tableName: 't_shop_day_ordertemp',
  timestamps: false,
  comment: '店铺订单全量临时表',
})
export class TShopDayOrdertemp extends Model {
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

  @Column({ type: DataType.STRING(200), comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: string;

  @Column({ type: DataType.STRING(200), comment: '订单编号' })
  order_sn!: string;

  @Column({ type: DataType.STRING(200), comment: '子订单编号' })
  order_child_sn!: string;

  @Column({ type: DataType.STRING(500), comment: '标题' })
  product_name!: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '实付价格',
    defaultValue: '0.00',
  })
  total_amount?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '采购单号' })
  purchase_sn?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '采购成本',
    defaultValue: '0.00',
  })
  purchase_amount?: string;

  @Column({ type: DataType.STRING(45), comment: '订单状态' })
  order_status!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '付款时间' })
  pay_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发货时间' })
  deliver_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '确认收货时间' })
  receive_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(45), comment: '售后' })
  rma_status?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '售后时间' })
  rma_time?: Date;

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

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

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
