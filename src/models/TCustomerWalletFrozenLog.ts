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
  tableName: 't_customer_wallet_frozen_log',
  timestamps: false,
  comment: '用户钱包冻结流水表',
})
export class TCustomerWalletFrozenLog extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '钱包编码' })
  @Index({ name: 'idx_wallet_id', using: 'BTREE', order: 'ASC', unique: false })
  wallet_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '流水金额（正号增加，负号减少）',
    defaultValue: '0.0000',
  })
  amount?: string;

  @Column({ type: DataType.INTEGER, comment: '流水类型（1奖励）' })
  log_type!: number;

  @Column({ type: DataType.STRING(200), comment: '流水标题' })
  log_title!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '内容描述' })
  log_desc?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '来源（1订单）' })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '来源编码（1订单编码）',
  })
  source_id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
