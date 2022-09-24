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
  tableName: 't_order_cps_rma_set',
  timestamps: false,
  comment: '订单三方结算手工售后表',
})
export class TOrderCpsRmaSet extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单编码' })
  order_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '订单明细编码' })
  order_item_id?: number;

  @Column({ type: DataType.DATE, comment: '上报时间' })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '售后金额',
    defaultValue: '0.00',
  })
  rma_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '售后成本',
    defaultValue: '0.00',
  })
  rma_const?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '订单流水号' })
  order_sn?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '计算状态（0未计算 1已计算）',
    defaultValue: '0',
  })
  set_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '插入人' })
  opt_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '插入人' })
  opt_user?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

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
