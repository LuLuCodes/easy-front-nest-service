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
  tableName: 't_customer_cashout',
  timestamps: false,
  comment: '\u5BA2\u6237\u63D0\u73B0\u8868',
})
export class TCustomerCashout extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4E3B\u952E(\u81EA\u589E)',
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

  @Column({ type: DataType.BIGINT, comment: '\u94B1\u5305\u7F16\u7801' })
  @Index({ name: 'idx_wallet_id', using: 'BTREE', order: 'ASC', unique: false })
  wallet_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u94B1\u5305\u7C7B\u578B\uFF080t_customer_wallet\u94B1\u5305 1t_object_wallet\u94B1\u5305\uFF09',
    defaultValue: '0',
  })
  wallet_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5546\u6237\u63D0\u73B0\u6D41\u6C34\u53F7',
  })
  cash_no?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u63D0\u73B0\u8D26\u53F7\u7C7B\u578B\uFF081\u5FAE\u4FE1 2\u652F\u4ED8\u5B9D 3\u94F6\u884C\u5361\uFF09',
  })
  cash_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment:
      '\u63D0\u73B0\u76EE\u6807\u8D26\u53F7\uFF08\u5FAE\u4FE1open_id,\u652F\u4ED8\u5B9D\u8D26\u53F7,\u94F6\u884C\u5361\u53F7\uFF09',
  })
  cash_account?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u7533\u8BF7\u63D0\u73B0\u91D1\u989D',
  })
  amount!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment:
      '\u6700\u7EC8\u5230\u8D26\u91D1\u989D\uFF08\u6263\u9664\u624B\u7EED\u8D39\uFF09',
  })
  success_amount!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u72B6\u6001\uFF080\u5DF2\u7533\u8BF7 1\u63D0\u73B0\u4E2D 10\u5DF2\u5230\u8D26 11\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  out_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u7533\u8BF7\u5907\u6CE8',
  })
  apply_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BA1\u6838\u72B6\u6001\uFF080\u672A\u5BA1\u6838 10\u5DF2\u5BA1\u6838 11\u5BA1\u6838\u4E0D\u901A\u8FC7\uFF09',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5BA1\u6838\u65F6\u95F4',
  })
  audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5BA1\u6838\u5907\u6CE8\uFF08\u7B2C\u4E09\u65B9\u6253\u6B3E\u5931\u8D25\u4E5F\u4FDD\u5B58\u5728\u8FD9\u91CC\uFF09',
  })
  deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5904\u7406\u5B8C\u6210\u65F6\u95F4',
  })
  finish_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(45),
    comment: '\u5B9E\u540D\u8BA4\u8BC1',
  })
  real_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8EAB\u4EFD\u8BC1\u53F7',
  })
  idcard?: string;

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
