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
  tableName: 't_order_work',
  timestamps: false,
  comment: '\u8BA2\u5355\u5DE5\u5355\u8868',
})
export class TOrderWork extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u7801' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    type: DataType.STRING(100),
    comment: '\u4E09\u65B9\u539F\u4E3B\u5355\u53F7',
  })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u4E0B\u5355\u4EBA\u65FA\u65FA\u53F7',
  })
  nick_name?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment:
      '\u6B3E\u7CFB\u7EDF\u7F16\u7801\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '\u6B3E\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '\u6B3E\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u6B3E\u4E3B\u56FE\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'SKU\u7CFB\u7EDF\u7F16\u7801\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  sku_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: 'SKU\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09',
  })
  sku_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u7701\u4EFD/\u76F4\u8F96\u5E02',
  })
  order_receiver_pcd_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u8BE6\u7EC6\u5730\u5740\uFF08\u52A0\u5BC6\uFF09',
  })
  order_ini_receiver_detail_address?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u8BA2\u5355\u91D1\u989D',
    defaultValue: '0.00',
  })
  order_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8BA2\u5355\u4E0B\u5355\u65F6\u95F4',
  })
  order_create_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8BA2\u5355\u652F\u4ED8\u65F6\u95F4',
  })
  order_payment_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5DE5\u5355\u72B6\u6001\uFF081\u5F85\u8FD0\u8425\u5904\u7406 2\u5F85\u5BA2\u670D\u5904\u7406 3\u5173\u95ED\uFF09',
    defaultValue: '1',
  })
  work_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5DE5\u5355\u5907\u6CE8\u5185\u5BB9',
  })
  work_content?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u9644\u4EF6\uFF08JSON\uFF09',
  })
  work_file?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u5904\u7406\u65F6\u95F4',
  })
  last_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6700\u540E\u5904\u7406\u521B\u5EFA\u4EBA',
  })
  last_deal_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6700\u540E\u5904\u7406\u521B\u5EFA\u4EBA',
  })
  last_deal_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6700\u540E\u5904\u7406\u5185\u5BB9',
  })
  last_deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6700\u540E\u5904\u7406\u9644\u4EF6\uFF08JSON\uFF09',
  })
  last_deal_file?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u521B\u5EFA\u4EBA',
  })
  create_user?: string;

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
