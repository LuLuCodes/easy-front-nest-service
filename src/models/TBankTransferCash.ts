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
  tableName: 't_bank_transfer_cash',
  timestamps: false,
  comment: '\u5F52\u96C6\u8D26\u53F7\u624B\u5DE5\u63D0\u73B0\u8868',
})
export class TBankTransferCash extends Model {
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

  @Column({
    type: DataType.DATE,
    comment: '\u63D0\u73B0\u65F6\u95F4\u65F6\u95F4',
  })
  cash_time!: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u63D0\u73B0\u91D1\u989D',
  })
  cash_amount!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u63D0\u73B0\u5907\u6CE8',
  })
  cash_remark?: string;

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
