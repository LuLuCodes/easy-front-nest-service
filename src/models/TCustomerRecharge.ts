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
  tableName: 't_customer_recharge',
  timestamps: false,
  comment: '\u5BA2\u6237\u5145\u503C',
})
export class TCustomerRecharge extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
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

  @Column({ type: DataType.INTEGER, comment: '\u5BA2\u6237\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8D26\u53F7\u6765\u6E90\uFF080customer 1seller\uFF09',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5145\u503C\u91D1\u989D',
  })
  amount!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5145\u503C\u7C7B\u578B\uFF081vip\u5145\u503C\u8BA2\u5355 2\u8C46\u8C46\u5E01 3\u5BF9\u8C61\u94B1\u5305t_object_wallet\uFF09',
  })
  recharge_type!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u5145\u503C\u65F6\u6548\uFF0810 10\u5929\uFF0C30 \u4E00\u4E2A\u6708\uFF0C90\u4E09\u4E2A\u6708 180 \u516D\u4E2A\u6708 \uFF09',
  })
  useful_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5145\u503C\u7C7B\u578B\uFF080\u65B0\u8D2D 1\u7EED\u8D39\uFF09',
  })
  oper_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u4E09\u65B9\u652F\u4ED8\u6D41\u6C34\u53F7',
  })
  @Index({ name: 'idx_trade_no', using: 'BTREE', order: 'ASC', unique: true })
  trade_no?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u7C7B\u578B \uFF081->\u652F\u4ED8\u5B9D\uFF1B2->\u5FAE\u4FE1\uFF1B3->\u94B1\u5305\u4F59\u989D\uFF09',
  })
  pay_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u72B6\u6001\uFF080\u5F85\u652F\u4ED8 10\u5DF2\u652F\u4ED8 11\u5DF2\u5173\u95ED\uFF09',
  })
  pay_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u652F\u4ED8\u65F6\u95F4',
  })
  pay_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u5145\u503C\u57CE\u5E02',
  })
  pay_city?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u8C46\u8C46\u5E01',
    defaultValue: '0.00',
  })
  point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u5206\u6DA6\u7C7B\u578B',
    defaultValue: '0',
  })
  split_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u9996\u51B2\u5206\u6DA6',
    defaultValue: '0.00',
  })
  first_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5E73\u53F0\u5206\u6DA6',
    defaultValue: '0.00',
  })
  plant_split?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6240\u5C5E\u6E20\u9053',
  })
  sale_channel_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u6240\u5C5E\u6E20\u9053\u5206\u6DA6',
    defaultValue: '0.00',
  })
  sale_channel_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5206\u7ED9\u4EE3\u7406\u7684\u94B1',
    defaultValue: '0.00',
  })
  agent_split?: string;

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
