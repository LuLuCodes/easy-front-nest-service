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
  tableName: 't_order_pay_log',
  timestamps: false,
  comment: '订单支付记录表',
})
export class TOrderPayLog extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '订单系统编码' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({
    type: DataType.TINYINT,
    comment: '支付类型 （1->支付宝；2->微信；3->钱包余额）',
  })
  pay_type!: number;

  @Column({
    type: DataType.STRING(200),
    comment: '第三方支付流水号（唯一、退款用，余额支付可存guid）',
  })
  @Index({ name: 'idx_trade_no', using: 'BTREE', order: 'ASC', unique: false })
  trade_no!: string;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '支付金额' })
  pay_amount!: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '三方流水账面金额',
  })
  trade_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '第三方支付成功时间',
  })
  pay_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment:
      '备注用户支付的账号，仅后期查账用（支付宝、微信账号，余额支付可存钱包id）',
  })
  buyer_no?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

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
