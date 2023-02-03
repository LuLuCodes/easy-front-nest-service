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
  tableName: 't_cart_item',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '购物车表',
})
export class TCartItem extends Model {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    comment: '购物车条目主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
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
    name: 'idx_customer_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({ type: DataType.BIGINT, comment: '商品主键', defaultValue: '0' })
  product_id?: number;

  @Column({ type: DataType.STRING(64), comment: '货号' })
  product_sn!: string;

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键', defaultValue: '0' })
  sku_id?: number;

  @Column({ type: DataType.STRING(64), comment: 'sku编码' })
  sku_code!: string;

  @Column({
    type: DataType.STRING(255),
    comment: '商品主图, 可以是spu主图，或者sku主图',
  })
  product_pic!: string;

  @Column({ type: DataType.STRING(128), comment: '商品名称' })
  product_name!: string;

  @Column({ type: DataType.INTEGER, comment: '购买数量', defaultValue: '0' })
  quantity?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '添加到购物车的价格',
    defaultValue: '0.00',
  })
  price?: string;

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

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
