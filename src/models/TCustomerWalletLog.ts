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
  tableName: 't_customer_wallet_log',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户钱包流水表',
})
export class TCustomerWalletLog extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '钱包编码', defaultValue: '0' })
  @Index({ name: 'idx_wallet_id', using: 'BTREE', order: 'ASC', unique: false })
  wallet_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '流水金额（正号增加，负号减少）',
    defaultValue: '0.0000',
  })
  amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '流水类型（1奖励 2提现 3退款……）',
    defaultValue: '0',
  })
  log_type?: number;

  @Column({ type: DataType.STRING(200), comment: '流水标题' })
  log_title!: string;

  @Column({ type: DataType.STRING(500), comment: '内容描述' })
  log_desc!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '来源（1订单，2充值单，3提现单，4豆豆转账）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '来源编码（1订单编码，2充值单编码，3提现单编码，4豆豆流水账号）',
    defaultValue: '0',
  })
  source_id?: number;

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

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
