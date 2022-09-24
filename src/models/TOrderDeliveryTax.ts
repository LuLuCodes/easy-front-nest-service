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
  tableName: 't_order_delivery_tax',
  timestamps: false,
  comment: '发货报税单',
})
export class TOrderDeliveryTax extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键',
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

  @Column({ type: DataType.BIGINT, comment: '发货单编码' })
  @Index({
    name: 'idx_delivery_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '英文名称' })
  item_en_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '中文名称' })
  item_cn_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '商品sku' })
  item_sn?: string;

  @Column({ type: DataType.INTEGER, comment: '数量', defaultValue: '0' })
  item_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '申报价格（美元）',
    defaultValue: '0.00',
  })
  price?: string;

  @Column({ type: DataType.INTEGER, comment: '重量', defaultValue: '0' })
  weight?: number;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '备注' })
  note?: string;

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
