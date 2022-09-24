import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_cart_item', timestamps: false, comment: '购物车表' })
export class TCartItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '购物车条目主键',
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

  @Column({ type: DataType.BIGINT, comment: '用户id', defaultValue: '0' })
  @Index({
    name: 'idx_customer_cdoe',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键' })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键' })
  sku_id!: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '购买数量' })
  quantity?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '添加到购物车时的价格',
  })
  price?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_customer_cdoe',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_customer_cdoe',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
