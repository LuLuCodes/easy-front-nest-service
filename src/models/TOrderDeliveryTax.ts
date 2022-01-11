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
  tableName: 't_order_delivery_tax',
  timestamps: false,
  comment: '\u53D1\u8D27\u62A5\u7A0E\u5355',
})
export class TOrderDeliveryTax extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u53D1\u8D27\u5355\u7F16\u7801' })
  @Index({
    name: 'idx_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '\u82F1\u6587\u540D\u79F0',
  })
  item_en_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '\u4E2D\u6587\u540D\u79F0',
  })
  item_cn_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5546\u54C1sku',
  })
  item_sn?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6570\u91CF',
    defaultValue: '0',
  })
  item_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u7533\u62A5\u4EF7\u683C\uFF08\u7F8E\u5143\uFF09',
    defaultValue: '0.00',
  })
  price?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u91CD\u91CF',
    defaultValue: '0',
  })
  weight?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '\u5907\u6CE8',
  })
  note?: string;

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
