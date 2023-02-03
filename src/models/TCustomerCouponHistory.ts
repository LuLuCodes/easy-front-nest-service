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
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(36), comment: '用户code' })
  @Index({
    name: 'idx_customer_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({ type: DataType.STRING(36), comment: '用户昵称' })
  customer_nick!: string;

  @Column({ type: DataType.BIGINT, comment: '优惠券主键', defaultValue: '0' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单主键', defaultValue: '0' })
  order_id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '获取类型：0->后台赠送；1->主动获取',
    defaultValue: '0',
  })
  @Index({ name: 'idx_get_type', using: 'BTREE', order: 'ASC', unique: false })
  get_type?: number;

  @Column({
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
