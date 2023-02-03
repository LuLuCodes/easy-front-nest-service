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
  tableName: 't_order_return_apply',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '订单退货申请',
})
export class TOrderReturnApply extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单id', defaultValue: '0' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '收货地址表主键',
    defaultValue: '0',
  })
  customer_address_id?: number;

  @Column({ type: DataType.BIGINT, comment: '退货商品主键', defaultValue: '0' })
  product_id?: number;

  @Column({ type: DataType.STRING(64), comment: '订单编号' })
  @Index({ name: 'idx_order_sn', using: 'BTREE', order: 'ASC', unique: false })
  order_sn!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '退款金额',
    defaultValue: '0.00',
  })
  return_amount?: string;

  @Column({ type: DataType.STRING(100), comment: '退货人姓名' })
  return_name!: string;

  @Column({ type: DataType.STRING(100), comment: '退货人电话' })
  return_phone!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝',
    defaultValue: '0',
  })
  return_status?: number;

  @Column({ type: DataType.STRING(500), comment: '商品图片' })
  product_pic!: string;

  @Column({ type: DataType.STRING(200), comment: '商品名称' })
  product_name!: string;

  @Column({ type: DataType.STRING(1000), comment: '商品销售属性' })
  product_attr!: string;

  @Column({ type: DataType.INTEGER, comment: '退货数量', defaultValue: '0' })
  product_count?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '商品单价',
    defaultValue: '0.00',
  })
  product_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '商品实际支付单价',
    defaultValue: '0.00',
  })
  product_real_price?: string;

  @Column({ type: DataType.STRING(200), comment: '原因' })
  reason!: string;

  @Column({ type: DataType.STRING(500), comment: '描述' })
  description!: string;

  @Column({ type: DataType.STRING(1000), comment: '凭证图片，以逗号隔开' })
  proof_pics!: string;

  @Column({ type: DataType.STRING(500), comment: '处理备注' })
  handle_note!: string;

  @Column({ type: DataType.STRING(100), comment: '处理人员' })
  handle_man!: string;

  @Column({ type: DataType.STRING(100), comment: '收货人' })
  receive_man!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '收货时间' })
  receive_time?: Date;

  @Column({ type: DataType.STRING(500), comment: '收货备注' })
  receive_note!: string;

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
