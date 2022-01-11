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
  tableName: 't_customer_coupon_history',
  timestamps: false,
  comment: '\u7528\u6237\u4F18\u60E0\u5238\u4F7F\u7528\u9886\u53D6\u8868',
})
export class TCustomerCouponHistory extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7528\u6237\u4F18\u60E0\u5238\u4E3B\u952E(\u81EA\u589E)',
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

  @Column({ type: DataType.BIGINT, comment: '\u7528\u6237id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.STRING(36), comment: '\u7528\u6237\u6635\u79F0' })
  customer_nick!: string;

  @Column({
    type: DataType.STRING(36),
    comment: '\u4F18\u60E0\u5238\u4E3B\u952E',
  })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(36),
    comment: '\u8BA2\u5355\u4E3B\u952E',
  })
  order_id?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u83B7\u53D6\u7C7B\u578B\uFF1A0->\u540E\u53F0\u8D60\u9001\uFF1B1->\u4E3B\u52A8\u83B7\u53D6',
    defaultValue: '0',
  })
  @Index({ name: 'idx_get_type', using: 'BTREE', order: 'ASC', unique: false })
  get_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u5DF2\u7ECF\u901A\u77E5\u7528\u6237',
  })
  if_notice!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u4F18\u60E0\u91D1\u989D',
    defaultValue: '0',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u7528\u65F6\u95F4\u5F00\u59CB',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u7528\u65F6\u95F4\u7ED3\u675F',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u4F7F\u7528\u72B6\u6001\uFF1A0->\u672A\u4F7F\u7528\uFF1B1->\u5DF2\u4F7F\u7528\uFF1B2->\u5DF2\u8FC7\u671F',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_use_status',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  use_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4F7F\u7528\u65F6\u95F4',
  })
  used_time?: Date;

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
