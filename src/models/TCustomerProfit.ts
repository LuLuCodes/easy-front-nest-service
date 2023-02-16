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
  tableName: 't_customer_profit',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '分佣表',
})
export class TCustomerProfit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '用户id', defaultValue: '0' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '分佣状态（0初始冻结中，10已结算）',
    defaultValue: '0',
  })
  profit_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '分佣类型（100级差自购省  200级差奖励  300爆单奖励）',
    defaultValue: '0',
  })
  profit_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '分佣金额',
    defaultValue: '0.00',
  })
  profit_amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '结算到钱包时间' })
  settle_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '来源（1订单奖励）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({ type: DataType.BIGINT, comment: '来源系统编码', defaultValue: '0' })
  source_id?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort_no?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
