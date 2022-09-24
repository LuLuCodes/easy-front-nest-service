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
  tableName: 't_order_cps_amount',
  timestamps: false,
  comment: '订单三方结算资金',
})
export class TOrderCpsAmount extends Model {
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

  @Column({ type: DataType.STRING(100), comment: '支付宝流水号' })
  @Index({ name: 'idx_cps_sn', using: 'BTREE', order: 'ASC', unique: false })
  cps_sn!: string;

  @Column({ type: DataType.STRING(100), comment: '淘宝来源编号' })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid!: string;

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

  @Column({
    type: DataType.INTEGER,
    comment: '三方异常单警告（2数量警告 1金额警告 0正常）',
    defaultValue: '0',
  })
  from_cps_warning?: number;

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单编码' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单明细编码' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id?: number;

  @Column({ type: DataType.STRING(100), comment: '交易类型' })
  cps_amount_type!: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '商品名称' })
  title?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '完成时间' })
  @Index({
    name: 'idx_finish_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  finish_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '金额（带符号）',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '计算状态（0未计算 1已计算）',
    defaultValue: '0',
  })
  set_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '平台支付宝到支付宝D时间（刷单成本）',
  })
  swipe_to_ali_time?: Date;

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
