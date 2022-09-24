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
  tableName: 't_order_exchange_apply',
  timestamps: false,
  comment: '订单换货表',
})
export class TOrderExchangeApply extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方淘宝换货编号',
  })
  @Index({
    name: 'idx_cps_dispute_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  cps_dispute_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方淘宝当前商品状态',
  })
  cps_good_status?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方淘宝换货状态',
  })
  cps_status?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '三方淘宝超时时间' })
  cps_time_out?: Date;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '商品名称' })
  spu_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '购买数' })
  num?: number;

  @Column({ type: DataType.BIGINT, comment: '订单编码' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单子单号' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '主单号' })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '子单号' })
  @Index({
    name: 'idx_from_cps_oid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_oid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '买家换货地址',
  })
  buyer_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '购买者姓名',
  })
  buyer_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '购买者昵称',
  })
  buyer_nick?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '购买者电话',
  })
  buyer_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '购买的商品sku',
  })
  bought_sku?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '买家申请换货的商品sku',
  })
  exchange_sku?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '申请换货原因',
  })
  reason?: string;

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
