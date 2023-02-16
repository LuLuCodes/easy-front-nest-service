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
  tableName: 't_order_item',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '订单中所包含的商品',
})
export class TOrderItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单编号', defaultValue: '0' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id?: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键', defaultValue: '0' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id?: number;

  @Column({ type: DataType.STRING(64), comment: '货号' })
  product_sn!: string;

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键', defaultValue: '0' })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id?: number;

  @Column({ type: DataType.STRING(64), comment: 'sku编码' })
  @Index({ name: 'idx_sku_code', using: 'BTREE', order: 'ASC', unique: false })
  sku_code!: string;

  @Column({
    type: DataType.STRING(255),
    comment: '商品主图, 可以是spu主图，或者sku主图',
  })
  product_pic!: string;

  @Column({ type: DataType.STRING(128), comment: '商品名称' })
  product_name!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '下单时的价格',
    defaultValue: '0.00',
  })
  price?: string;

  @Column({ type: DataType.INTEGER, comment: '购买数量', defaultValue: '0' })
  quantity?: number;

  @Column({ type: DataType.STRING(200), comment: '商品促销名称' })
  promotion_name!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '商品促销分解金额',
    defaultValue: '0.00',
  })
  promotion_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '优惠券优惠分解金额',
    defaultValue: '0.00',
  })
  coupon_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '积分优惠分解金额',
    defaultValue: '0.00',
  })
  integration_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '该商品经过优惠后的分解金额',
    defaultValue: '0.00',
  })
  real_amount?: string;

  @Column({ type: DataType.INTEGER, comment: '赠送的积分', defaultValue: '0' })
  gift_integration?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '赠送的成长值',
    defaultValue: '0',
  })
  gift_growth?: number;

  @Column({
    type: DataType.STRING(1000),
    comment:
      '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  })
  product_attr!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
