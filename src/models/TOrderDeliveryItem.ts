import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_order_delivery_item', timestamps: false })
export class TOrderDeliveryItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '发货单明细主键',
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

  @Column({ type: DataType.BIGINT, comment: '发货单主键' })
  @Index({
    name: 'idx_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单编号' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单明细主键' })
  @Index({
    name: 'idx_ order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({ type: DataType.INTEGER, comment: '发货数量' })
  quantity!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '称重商品最终发货sku总重量（克）',
  })
  del_sku_weight?: string;

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
