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
  tableName: 't_shop_day_order',
  timestamps: false,
  comment: '\u5E97\u94FA\u8BA2\u5355\u5168\u91CF\u8868',
})
export class TShopDayOrder extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u7801' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u5546\u5BB6\u7F16\u7801' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u8BA2\u5355\u7F16\u53F7' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u8BA2\u5355\u7F16\u53F7' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6DD8\u5B9D\u6765\u6E90\u7F16\u53F7',
  })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6DD8\u5B9D\u6765\u6E90\u5B50\u7F16\u53F7',
  })
  @Index({
    name: 'idx_from_cps_oid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_oid?: string;

  @Column({
    type: DataType.BIGINT,
    comment: '\u4EE3\u8D2D\u8005',
    defaultValue: '0',
  })
  from_cps_sync_purchase_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5B9E\u4ED8\u4EF7\u683C',
    defaultValue: '0.00',
  })
  total_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u91C7\u8D2D\u6210\u672C',
    defaultValue: '0.00',
  })
  purchase_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4ED8\u6B3E\u65F6\u95F4',
  })
  pay_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53D1\u8D27\u65F6\u95F4',
  })
  deliver_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u786E\u8BA4\u6536\u8D27\u65F6\u95F4',
  })
  receive_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u552E\u540E\u65F6\u95F4',
  })
  rma_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5176\u4ED6\u6210\u672C\u65F6\u95F4',
  })
  other_const_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4E0A\u6E38\u9000\u6B3E\u65F6\u95F4',
  })
  rma_const_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u91C7\u8D2D\u65F6\u95F4',
  })
  purchase_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u9000\u6B3E\u91D1\u989D',
    defaultValue: '0.00',
  })
  rma_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u4E0A\u6E38\u9000\u6B3E\u91D1\u989D',
    defaultValue: '0.00',
  })
  rma_const?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5176\u4ED6\u6210\u672C',
    defaultValue: '0.00',
  })
  other_const?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u9884\u652F\u5229\u6DA6',
    defaultValue: '0.00',
  })
  pre_profit?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u771F\u5B9E\u5229\u6DA6',
    defaultValue: '0.00',
  })
  set_profit?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E09\u65B9\u5F02\u5E38\u5355\u8B66\u544A\uFF082\u6570\u91CF\u8B66\u544A 1\u91D1\u989D\u8B66\u544A 0\u6B63\u5E38\uFF09',
    defaultValue: '0',
  })
  from_cps_warning?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u9996\u6B21\u5165\u8D26\u65F6\u95F4',
  })
  first_set_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u91C7\u8D2D\u652F\u4ED8\u65B9\u5F0F(1\u82B1\u5457 2\u4FE1\u7528\u5361 3\u4F59\u989D 4\u50A8\u84C4\u5361)',
    defaultValue: '0',
  })
  tb_cps_paytype?: number;

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
