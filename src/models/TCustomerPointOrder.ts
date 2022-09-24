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
  tableName: 't_customer_point_order',
  timestamps: false,
  comment: '客户豆豆购买表',
})
export class TCustomerPointOrder extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
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

  @Column({ type: DataType.INTEGER, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '豆豆币',
    defaultValue: '0.00',
  })
  point?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '收款豆豆币（除掉手续费）',
    defaultValue: '0',
  })
  to_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '消费类型（1购买聊天 2购买微信信息）',
  })
  consumption_type!: number;

  @Column({ type: DataType.BIGINT, comment: '关联编码', defaultValue: '0' })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id?: number;

  @Column({ type: DataType.INTEGER, comment: '购买份数', defaultValue: '0' })
  count?: number;

  @Column({ type: DataType.INTEGER, comment: '是否查看', defaultValue: '0' })
  if_check?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '支付时间' })
  pay_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '结算标记（0待结算 1已结算）',
    defaultValue: '0',
  })
  is_settle?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '结算时间' })
  settle_time?: Date;

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
