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
  tableName: 't_activity_customer',
  timestamps: false,
  comment: '\u6D3B\u52A8\u62A5\u540D\u8868',
})
export class TActivityCustomer extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u6D3B\u52A8ID' })
  @Index({
    name: 'idx_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  activity_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4EBA\u5458id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u62A5\u540D',
    defaultValue: '0',
  })
  if_sign_up?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u62A5\u540D\u65F6\u95F4',
  })
  sign_up_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u7B7E\u5230',
    defaultValue: '0',
  })
  if_sign_in?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7B7E\u5230\u65F6\u95F4',
  })
  sign_in_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u65B9\u5F0F\uFF080\u9996\u6B21\u514D\u652F\u4ED8 1->\u652F\u4ED8\u5B9D\uFF1B2->\u5FAE\u4FE1\uFF09',
    defaultValue: '0',
  })
  paid_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u52CB\u7AE0\u7C7B\u578B',
  })
  medal_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u52CB\u7AE0url',
  })
  medal_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u652F\u4ED8\u6D41\u6C34\u53F7',
  })
  trade_no?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u9000\u5355\u53F7',
  })
  refund_no?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u9000\u6B3E\u91D1\u989D',
  })
  refund_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u652F\u4ED8\u91D1\u989D',
    defaultValue: '0.00',
  })
  field_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '\u7B7E\u5230\u7ECF\u5EA6',
  })
  longitude?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '\u7B7E\u5230\u7EAC\u5EA6',
  })
  latitude?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5206\u7EC4\u540D\u79F0',
  })
  group_name?: string;

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
