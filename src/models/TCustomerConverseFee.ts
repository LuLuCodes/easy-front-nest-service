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
  tableName: 't_customer_converse_fee',
  timestamps: false,
  comment: '语音视频消费记录',
})
export class TCustomerConverseFee extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '发起人客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '接听人客户编码' })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '类型(1语音 2视频)' })
  type!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '消耗豆豆币',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '每分钟费用',
  })
  point_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '平台分润',
  })
  plant_point?: string;

  @Column({ type: DataType.BIGINT, comment: '时长', defaultValue: '0' })
  duration?: number;

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
