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
  tableName: 't_welfare_record',
  timestamps: false,
  comment: '权益使用记录表',
})
export class TWelfareRecord extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '权益用户id' })
  @Index({
    name: 'idx_welfare_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  welfare_customer_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '权益id' })
  @Index({
    name: 'idx_welfare_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  welfare_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '分组id' })
  group_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

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
