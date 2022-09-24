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
  tableName: 't_customer_point_log',
  timestamps: false,
  comment: '用户积分流水表',
})
export class TCustomerPointLog extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
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
    type: DataType.INTEGER,
    comment: '积分类型（1豆豆币）',
    defaultValue: '1',
  })
  point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '流水积分（正号增加，负号减少）',
    defaultValue: '0.0000',
  })
  point?: string;

  @Column({ type: DataType.INTEGER, comment: '流水类型（1奖励 2消费）' })
  log_type!: number;

  @Column({ type: DataType.STRING(200), comment: '流水标题' })
  log_title!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '内容描述' })
  log_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '备注' })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '来源（1充值单 2红包相册 3约会女生 4发布约会 5投诉单 6约会拒绝 7约会完成 8约会明细取消 9约会主表取消 10积分消费单 11解锁微信，12解相册锁)',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment:
      '来源编码（1充值单id 2红包相册id 3约会女神id 4发布约会id 5投诉单id 6约会明细id）',
  })
  source_id?: number;

  @Column({ type: DataType.INTEGER, comment: '是否已读', defaultValue: '0' })
  if_read?: number;

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
