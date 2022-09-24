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
  tableName: 't_welfare_customer',
  timestamps: false,
  comment: '权益商品表',
})
export class TWelfareCustomer extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '权益id' })
  @Index({
    name: 'idx_welfare_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  welfare_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '销售渠道（冗余）',
  })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '客户手机号' })
  phone?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '领取状态（0待领取 1待使用 2已使用）',
  })
  pick_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '可以领取时间（冗余）',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '终止领取时间（冗余）',
  })
  end_time?: Date;

  @Column({ type: DataType.INTEGER, comment: '权益天数', defaultValue: '0' })
  welfare_days?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '兑换的商品' })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '兑换的商品' })
  sku_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '兑换时间' })
  use_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '使用的订单' })
  use_order_id?: number;

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
