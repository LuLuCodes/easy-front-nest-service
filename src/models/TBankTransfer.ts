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
  comment: '店铺变动成本',
})
export class TBankTransfer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.DATE, comment: '提交时间' })
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
      '是否从网商转到支付宝a（0无二维码 1二维码生成中 2二维码生成成功 3自动打款成功 4自动打款失败）',
    defaultValue: '0',
  })
  set_account_a?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '是否从网商转到支付宝a备注',
  })
  set_account_a_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '到账时间' })
  finish_time?: Date;

  @Column({ type: DataType.STRING(100), comment: '单据号' })
  @Index({
    name: 'idx_transfer_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  transfer_sn!: string;

  @Column({ type: DataType.STRING(100), comment: '付款账户公司名称' })
  pay_account_com!: string;

  @Column({ type: DataType.STRING(100), comment: '付款账户' })
  pay_account!: string;

  @Column({ type: DataType.STRING(100), comment: '收款账户公司名称' })
  to_account_com!: string;

  @Column({ type: DataType.STRING(100), comment: '收款账户' })
  to_account!: string;

  @Column({ type: DataType.STRING(100), comment: '收款账户银行' })
  to_account_bank!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '付款总额',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '转账金额',
    defaultValue: '0.00',
  })
  success_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '到账状态（0进行中 1到账 2到账失败）',
    defaultValue: '0',
  })
  finish_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '支付宝转账（代购、投资人是否转账）(1已打款 2已到账 3到账失败)',
    defaultValue: '0',
  })
  set_account_b?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '支付宝转账（投资人、代理是否转账）(1已打款 2已到账 3到账失败)',
    defaultValue: '0',
  })
  set_account_c?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝转账流水（代购、投资人是否转账）',
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
    comment: '支付宝转账金额（代购、投资人是否转账）',
  })
  account_b_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝转账流水（投资人、代理是否转账）',
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
    comment: '支付宝转账金额（投资人、代理是否转账）',
  })
  account_c_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '支付宝转账处理结果（代购、投资人是否转账）',
  })
  account_b_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '支付宝转账处理结果（投资人、代理是否转账）',
  })
  account_c_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '支付宝转账（刷单是否转账）(1已打款 2已到账 3到账失败)',
    defaultValue: '0',
  })
  set_account_d?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝转账流水（刷单是否转账）',
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
    comment: '支付宝转账金额（刷单是否转账）',
  })
  account_d_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '支付宝转账处理结果（刷单是否转账）',
  })
  account_d_ali_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '刷单订单转账时间' })
  swipe_to_ali_time?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
