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
  comment: '归集账号手工提现表',
})
export class TBankTransferCash extends Model {
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

  @Column({ type: DataType.DATE, comment: '提现时间时间' })
  cash_time!: Date;

  @Column({ type: DataType.DECIMAL(18, 2), comment: '提现金额' })
  cash_amount!: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '提现备注' })
  cash_remark?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '插入人' })
  opt_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '插入人' })
  opt_user?: string;

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
