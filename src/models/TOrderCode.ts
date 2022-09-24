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
  tableName: 't_order_code',
  timestamps: false,
  comment: '订单核销表备注',
})
export class TOrderCode extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '订单编号' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单明细编号' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单款编号' })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单sku编号' })
  sku_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '券码' })
  @Index({
    name: 'idx_order_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否核销(0待核销 1已核销 2退款取消)',
    defaultValue: '0',
  })
  settle_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '核销时间' })
  settle_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '核销人' })
  @Index({
    name: 'idx_settle_user_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  settle_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '核销人' })
  settle_user?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '核销备注' })
  settle_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '处理备注' })
  remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '创建人' })
  create_user?: string;

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
