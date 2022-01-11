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
  tableName: 't_customer_withdrawal',
  timestamps: false,
  comment: '\u5E97\u94FA\u89D2\u8272\u63D0\u73B0\u8868',
})
export class TCustomerWithdrawal extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u4EBA\u5458\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.DATE, comment: '\u63D0\u73B0\u65F6\u95F4' })
  draw_time!: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u63D0\u73B0\u7C7B\u578B(1\u4EE3\u8D2D\u63D0\u73B0 2\u4EE3\u7406\u5546\u63D0\u73B0 3\u6295\u8D44\u4EBA\u63D0\u73B0)',
  })
  draw_type!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5230\u8D26\u65F6\u95F4',
  })
  finish_time?: Date;

  @Column({
    type: DataType.STRING(100),
    comment: '\u4E1A\u52A1\u5355\u636E\u53F7',
  })
  @Index({ name: 'idx_draw_sn', using: 'BTREE', order: 'ASC', unique: false })
  draw_sn!: string;

  @Column({
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u5355\u636E\u53F7',
  })
  @Index({
    name: 'idx_ali_pay_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  ali_pay_sn!: string;

  @Column({
    type: DataType.BIGINT,
    comment: '\u652F\u4ED8\u5B9D\u5E73\u53F0\u914D\u7F6E',
  })
  platform_config_id!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u63D0\u73B0\u91D1\u989D',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5230\u8D26\u91D1\u989D',
    defaultValue: '0.00',
  })
  success_amount?: string;

  @Column({
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u8D26\u53F7',
  })
  draw_ali!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5230\u8D26\u72B6\u6001\uFF080\u8FDB\u884C\u4E2D 1\u5230\u8D26 2\u5230\u8D26\u5931\u8D25\uFF09',
  })
  draw_status!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u652F\u4ED8\u5B9D\u8FD4\u56DE\u5907\u6CE8',
  })
  ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u63D0\u73B0\u4EBA\u59D3\u540D',
  })
  real_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u63D0\u73B0\u5907\u6CE8',
  })
  title?: string;

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
