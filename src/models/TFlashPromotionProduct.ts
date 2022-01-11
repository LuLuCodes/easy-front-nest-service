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
  tableName: 't_flash_promotion_product',
  timestamps: false,
  comment: '\u9650\u65F6\u8D2D\u5546\u54C1\u8868',
})
export class TFlashPromotionProduct extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5173\u7CFB\u4E3B\u952E(\u81EA\u589E)',
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

  @Column({ type: DataType.BIGINT, comment: '\u9650\u65F6\u8D2D\u4E3B\u952E' })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u9650\u65F6\u8D2D\u573A\u6B21\u4E3B\u952E',
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_session_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u6D3B\u52A8\u5546\u54C1(SPU)\u4E3B\u952E',
  })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u6D3B\u52A8SKU\u4E3B\u952E' })
  sku_id!: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u4E0A\u67B6\u72B6\u6001\uFF1A0->\u4E0B\u67B6\uFF1B1->\u4E0A\u67B6',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_publish_status',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  publish_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u6D3B\u52A8\u4EF7\u683C',
    defaultValue: '0.00',
  })
  active_price?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u53C2\u52A0\u6D3B\u52A8\u7684\u5E93\u5B58',
    defaultValue: '0',
  })
  active_stock?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6BCF\u4EBA\u9650\u8D2D\u6570\u636E\u91CF',
    defaultValue: '0',
  })
  num_limit?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6392\u5E8F',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

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
