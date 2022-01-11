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
    comment: '\u53D1\u8D27\u5355\u660E\u7EC6\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '\u53D1\u8D27\u5355\u4E3B\u952E' })
  @Index({
    name: 'idx_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u8BA2\u5355\u7F16\u53F7' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u8BA2\u5355\u660E\u7EC6\u4E3B\u952E',
  })
  @Index({
    name: 'idx_ order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({ type: DataType.INTEGER, comment: '\u53D1\u8D27\u6570\u91CF' })
  quantity!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment:
      '\u79F0\u91CD\u5546\u54C1\u6700\u7EC8\u53D1\u8D27sku\u603B\u91CD\u91CF\uFF08\u514B\uFF09',
  })
  del_sku_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
