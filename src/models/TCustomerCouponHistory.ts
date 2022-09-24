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
  tableName: 't_customer_coupon_history',
  timestamps: false,
  comment: '用户优惠券使用领取表',
})
export class TCustomerCouponHistory extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户优惠券主键(自增)',
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

  @Column({ type: DataType.STRING(36), comment: '用户昵称' })
  customer_nick!: string;

  @Column({ type: DataType.STRING(36), comment: '优惠券主键' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id!: string;

  @Column({ allowNull: true, type: DataType.STRING(36), comment: '订单主键' })
  order_id?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '获取类型：0->后台赠送；1->主动获取',
    defaultValue: '0',
  })
  @Index({ name: 'idx_get_type', using: 'BTREE', order: 'ASC', unique: false })
  get_type?: number;

  @Column({ type: DataType.INTEGER, comment: '是否已经通知用户' })
  if_notice!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '优惠金额',
    defaultValue: '0',
  })
  amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '可用时间开始' })
  start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '可用时间结束' })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '使用状态：0->未使用；1->已使用；2->已过期',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_use_status',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  use_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '使用时间' })
  used_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
