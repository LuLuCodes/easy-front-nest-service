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
  tableName: 't_sku_customer_price',
  timestamps: false,
  comment: '商品(SKU)会员价格表',
})
export class TSkuCustomerPrice extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '价格主键',
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

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键' })
  @Index({
    name: 'idx_customer_level_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id!: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({
    name: 'idx_customer_level_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_level_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '会员价格',
  })
  customer_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  customer_level_name?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
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
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
