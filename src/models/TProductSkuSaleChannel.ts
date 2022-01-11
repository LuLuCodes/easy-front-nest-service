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
  comment: 'SKU\u548C\u9500\u552E\u6E20\u9053\u5173\u7CFB',
})
export class TProductSkuSaleChannel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6B3E\u7F16\u7801',
  })
  @Index({ name: 'idx_spu_id', using: 'BTREE', order: 'ASC', unique: false })
  spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'sku\u7F16\u7801',
  })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u9500\u552E\u6E20\u9053\u7F16\u7801',
  })
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
    comment:
      '\u4EA4\u6613\u7C7B\u578B 1\u94B1\u5305\u6216\u79EF\u5206 2\u94B1\u5305\u4E14\u79EF\u5206',
  })
  sale_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u5185\u8D2D\u4EF7\u683C',
  })
  sale_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u5185\u8D2D\u79EF\u5206',
  })
  sale_point?: string;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
