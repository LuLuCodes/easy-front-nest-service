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
  tableName: 't_bank_transfer_service_fee',
  timestamps: false,
  comment:
    '\u5F52\u96C6\u8D26\u53F7\u6253\u5230\u652F\u4ED8\u5B9DB\u7684\u8865\u5145\u624B\u7EED\u8D39\u8868',
})
export class TBankTransferServiceFee extends Model {
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
    comment: '\u8BF7\u6C42\u652F\u4ED8\u5B9D\u65F6\u95F4',
  })
  fee_time!: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u652F\u4ED8\u5B9D\u5230\u8D26\u65F6\u95F4',
  })
  success_time?: Date;

  @Column({
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u6D41\u6C34\u53F7',
  })
  ali_sn!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '(0\u5DF2\u6253\u6B3E 1\u5DF2\u5230\u8D26 2\u5230\u8D26\u5931\u8D25)',
  })
  ali_status!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u91D1\u989D',
  })
  ali_amount!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u5904\u7406\u7ED3\u679C',
  })
  ali_remark?: string;

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
