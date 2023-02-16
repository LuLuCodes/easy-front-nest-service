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
  tableName: 't_order_delivery_item',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class TOrderDeliveryItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '发货单明细主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '发货单主键', defaultValue: '0' })
  @Index({
    name: 'idx_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单编号', defaultValue: '0' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单明细主键', defaultValue: '0' })
  @Index({
    name: 'idx_ order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id?: number;

  @Column({ type: DataType.INTEGER, comment: '发货数量', defaultValue: '0' })
  quantity?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '称重商品最终发货sku总重量（克）',
    defaultValue: '0.00',
  })
  del_sku_weight?: string;

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

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
