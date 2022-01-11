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
  tableName: 't_customer_recharge_conf',
  timestamps: false,
  comment: '\u5BA2\u6237\u5145\u503C\u914D\u7F6E',
})
export class TCustomerRechargeConf extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '\u5E94\u7528id' })
  app_id!: number;

  @Column({ type: DataType.STRING(50), comment: '\u5145\u503C\u540D\u79F0' })
  recharge_name!: string;

  @Column({ type: DataType.STRING(255), comment: '\u5145\u503C\u56FE\u7247' })
  recharge_url!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5145\u503C\u7C7B\u578B\uFF081vip\u5145\u503C\u8BA2\u5355  2\u5145\u503C\u8C46\u8C46\u5E01 3\u5BF9\u8C61\u94B1\u5305t_object_wallet\uFF09',
  })
  recharge_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5145\u503C\u65F6\u6548\uFF0810 10\u5929\uFF0C30 \u4E00\u4E2A\u6708\uFF0C90\u4E09\u4E2A\u6708 180 \u516D\u4E2A\u6708 \uFF09',
  })
  useful_type!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5145\u503C\u91D1\u989D',
  })
  amount!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u539F\u4EF7',
    defaultValue: '0.00',
  })
  market_amount?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
