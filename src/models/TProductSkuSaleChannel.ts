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
  tableName: 't_product_sku_sale_channel',
  timestamps: false,
  comment: 'SKU和销售渠道关系',
})
export class TProductSkuSaleChannel extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '款编码' })
  @Index({ name: 'idx_spu_id', using: 'BTREE', order: 'ASC', unique: false })
  spu_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: 'sku编码' })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '销售渠道编码' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '交易类型 1钱包或积分 2钱包且积分',
  })
  sale_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '内购价格',
  })
  sale_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '内购积分',
  })
  sale_point?: string;

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
