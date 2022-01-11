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
  tableName: 't_purchase_report',
  timestamps: false,
  comment: '\u91C7\u8D2D\u8BB0\u5F55\u62A5\u8868',
})
export class TPurchaseReport extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: '\u91C7\u8D2D\u4EBA\u5458',
  })
  purchase_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u91C7\u8D2D\u65F6\u95F4',
  })
  purchase_time?: Date;

  @Column({ type: DataType.BIGINT, comment: '\u5173\u8054\u8BA2\u5355' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u5F52\u5C5E\u5546\u5BB6\u7F16\u7801',
  })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u5E97\u94FA\u540D\u79F0',
  })
  shop_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u91C7\u8D2D\u6E20\u9053',
  })
  way_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u91C7\u8D2D\u8BA2\u5355\u53F7',
  })
  purchase_sn?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u91C7\u8D2D\u91D1\u989D',
    defaultValue: '0.00',
  })
  purchase_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u91C7\u8D2D\u5907\u7528\u91D1',
    defaultValue: '0.00',
  })
  purchase_amount_bak?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u91C7\u8D2D\u51ED\u8BC1',
  })
  file_url?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '\u5907\u6CE8' })
  remark?: string;

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
