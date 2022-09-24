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
  comment: '客户提现表',
})
export class TCustomerCashout extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键(自增)',
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

  @Column({ type: DataType.BIGINT, comment: '用户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '钱包编码' })
  @Index({ name: 'idx_wallet_id', using: 'BTREE', order: 'ASC', unique: false })
  wallet_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '钱包类型（0t_customer_wallet钱包 1t_object_wallet钱包）',
    defaultValue: '0',
  })
  wallet_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '商户提现流水号',
  })
  cash_no?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '提现账号类型（1微信 2支付宝 3银行卡）',
  })
  cash_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '提现目标账号（微信open_id,支付宝账号,银行卡号）',
  })
  cash_account?: string;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '申请提现金额' })
  amount!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '最终到账金额（扣除手续费）',
  })
  success_amount!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '状态（0已申请 1提现中 10已到账 11失败）',
    defaultValue: '0',
  })
  out_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '申请备注' })
  apply_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '审核状态（0未审核 10已审核 11审核不通过）',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '审核人' })
  audit_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '审核备注（第三方打款失败也保存在这里）',
  })
  deal_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '处理完成时间' })
  finish_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(45), comment: '实名认证' })
  real_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '身份证号' })
  idcard?: string;

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
