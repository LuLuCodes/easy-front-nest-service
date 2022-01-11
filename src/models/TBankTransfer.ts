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
  tableName: 't_bank_transfer',
  timestamps: false,
  comment: '\u5E97\u94FA\u53D8\u52A8\u6210\u672C',
})
export class TBankTransfer extends Model {
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

  @Column({ type: DataType.DATE, comment: '\u63D0\u4EA4\u65F6\u95F4' })
  @Index({
    name: 'idx_transfer_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  transfer_time!: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u662F\u5426\u4ECE\u7F51\u5546\u8F6C\u5230\u652F\u4ED8\u5B9Da\uFF080\u65E0\u4E8C\u7EF4\u7801 1\u4E8C\u7EF4\u7801\u751F\u6210\u4E2D 2\u4E8C\u7EF4\u7801\u751F\u6210\u6210\u529F 3\u81EA\u52A8\u6253\u6B3E\u6210\u529F 4\u81EA\u52A8\u6253\u6B3E\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  set_account_a?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment:
      '\u662F\u5426\u4ECE\u7F51\u5546\u8F6C\u5230\u652F\u4ED8\u5B9Da\u5907\u6CE8',
  })
  set_account_a_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5230\u8D26\u65F6\u95F4',
  })
  finish_time?: Date;

  @Column({ type: DataType.STRING(100), comment: '\u5355\u636E\u53F7' })
  @Index({
    name: 'idx_transfer_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  transfer_sn!: string;

  @Column({
    type: DataType.STRING(100),
    comment: '\u4ED8\u6B3E\u8D26\u6237\u516C\u53F8\u540D\u79F0',
  })
  pay_account_com!: string;

  @Column({ type: DataType.STRING(100), comment: '\u4ED8\u6B3E\u8D26\u6237' })
  pay_account!: string;

  @Column({
    type: DataType.STRING(100),
    comment: '\u6536\u6B3E\u8D26\u6237\u516C\u53F8\u540D\u79F0',
  })
  to_account_com!: string;

  @Column({ type: DataType.STRING(100), comment: '\u6536\u6B3E\u8D26\u6237' })
  to_account!: string;

  @Column({
    type: DataType.STRING(100),
    comment: '\u6536\u6B3E\u8D26\u6237\u94F6\u884C',
  })
  to_account_bank!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u4ED8\u6B3E\u603B\u989D',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u8F6C\u8D26\u91D1\u989D',
    defaultValue: '0.00',
  })
  success_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5230\u8D26\u72B6\u6001\uFF080\u8FDB\u884C\u4E2D 1\u5230\u8D26 2\u5230\u8D26\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  finish_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\uFF08\u4EE3\u8D2D\u3001\u6295\u8D44\u4EBA\u662F\u5426\u8F6C\u8D26\uFF09(1\u5DF2\u6253\u6B3E 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25)',
    defaultValue: '0',
  })
  set_account_b?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\uFF08\u6295\u8D44\u4EBA\u3001\u4EE3\u7406\u662F\u5426\u8F6C\u8D26\uFF09(1\u5DF2\u6253\u6B3E 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25)',
    defaultValue: '0',
  })
  set_account_c?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u6D41\u6C34\uFF08\u4EE3\u8D2D\u3001\u6295\u8D44\u4EBA\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  @Index({
    name: 'idx_account_b_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_b_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u91D1\u989D\uFF08\u4EE3\u8D2D\u3001\u6295\u8D44\u4EBA\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_b_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u6D41\u6C34\uFF08\u6295\u8D44\u4EBA\u3001\u4EE3\u7406\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  @Index({
    name: 'idx_account_c_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_c_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u91D1\u989D\uFF08\u6295\u8D44\u4EBA\u3001\u4EE3\u7406\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_c_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u5904\u7406\u7ED3\u679C\uFF08\u4EE3\u8D2D\u3001\u6295\u8D44\u4EBA\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_b_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u5904\u7406\u7ED3\u679C\uFF08\u6295\u8D44\u4EBA\u3001\u4EE3\u7406\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_c_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\uFF08\u5237\u5355\u662F\u5426\u8F6C\u8D26\uFF09(1\u5DF2\u6253\u6B3E 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25)',
    defaultValue: '0',
  })
  set_account_d?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u6D41\u6C34\uFF08\u5237\u5355\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  @Index({
    name: 'idx_account_d_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_d_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u91D1\u989D\uFF08\u5237\u5355\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_d_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u652F\u4ED8\u5B9D\u8F6C\u8D26\u5904\u7406\u7ED3\u679C\uFF08\u5237\u5355\u662F\u5426\u8F6C\u8D26\uFF09',
  })
  account_d_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5237\u5355\u8BA2\u5355\u8F6C\u8D26\u65F6\u95F4',
  })
  swipe_to_ali_time?: Date;

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
