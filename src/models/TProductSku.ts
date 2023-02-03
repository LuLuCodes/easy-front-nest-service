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
  tableName: 't_product_sku',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品SKU表',
})
export class TProductSku extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '商品SKU主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键', defaultValue: '0' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id?: number;

  @Column({ type: DataType.STRING(64), comment: 'sku编码' })
  @Index({ name: 'idx_sku_code', using: 'BTREE', order: 'ASC', unique: false })
  sku_code!: string;

  @Column({ type: DataType.STRING(255), comment: '主图url' })
  pic_url!: string;

  @Column({ type: DataType.INTEGER, comment: '库存', defaultValue: '0' })
  stock?: number;

  @Column({ type: DataType.INTEGER, comment: '预警库存', defaultValue: '0' })
  low_stock?: number;

  @Column({ type: DataType.INTEGER, comment: '锁定库存', defaultValue: '0' })
  lock_stock?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '市场价',
    defaultValue: '0.00',
  })
  original_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '销售价',
    defaultValue: '0.00',
  })
  sale_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '成本价',
    defaultValue: '0.00',
  })
  cost_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '促销价',
    defaultValue: '0.00',
  })
  promotion_price?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销开始时间' })
  promotion_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销结束时间' })
  promotion_end_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '活动限购数量',
    defaultValue: '1',
  })
  promotion_per_limit?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '促销类型：0->没有促销使用销售价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
    defaultValue: '0',
  })
  price_type?: number;

  @Column({ type: DataType.INTEGER, comment: '销量', defaultValue: '0' })
  sale_num?: number;

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
