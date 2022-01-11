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
  tableName: 't_order_cps_rma_set',
  timestamps: false,
  comment: '\u8BA2\u5355\u4E09\u65B9\u7ED3\u7B97\u624B\u5DE5\u552E\u540E\u8868',
})
export class TOrderCpsRmaSet extends Model {
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
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u8BA2\u5355\u7F16\u7801',
  })
  order_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u8BA2\u5355\u660E\u7EC6\u7F16\u7801',
  })
  order_item_id?: number;

  @Column({ type: DataType.DATE, comment: '\u4E0A\u62A5\u65F6\u95F4' })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u552E\u540E\u91D1\u989D',
    defaultValue: '0.00',
  })
  rma_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u552E\u540E\u6210\u672C',
    defaultValue: '0.00',
  })
  rma_const?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8BA2\u5355\u6D41\u6C34\u53F7',
  })
  order_sn?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8BA1\u7B97\u72B6\u6001\uFF080\u672A\u8BA1\u7B97 1\u5DF2\u8BA1\u7B97\uFF09',
    defaultValue: '0',
  })
  set_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u63D2\u5165\u4EBA',
  })
  opt_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u63D2\u5165\u4EBA',
  })
  opt_user?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
  })
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
