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
  comment: '归集账号打到支付宝B的补充手续费表',
})
export class TBankTransferServiceFee extends Model {
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

  @Column({ type: DataType.DATE, comment: '请求支付宝时间' })
  fee_time!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '支付宝到账时间' })
  success_time?: Date;

  @Column({ type: DataType.STRING(100), comment: '支付宝流水号' })
  ali_sn!: string;

  @Column({ type: DataType.INTEGER, comment: '(0已打款 1已到账 2到账失败)' })
  ali_status!: number;

  @Column({ type: DataType.DECIMAL(18, 2), comment: '支付宝转账金额' })
  ali_amount!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '支付宝转账处理结果',
  })
  ali_remark?: string;

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
