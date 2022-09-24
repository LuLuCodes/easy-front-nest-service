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
  tableName: 't_purchase_report',
  timestamps: false,
  comment: '采购记录报表',
})
export class TPurchaseReport extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING(10), comment: '采购人员' })
  purchase_name?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '采购时间' })
  purchase_time?: Date;

  @Column({ type: DataType.BIGINT, comment: '关联订单' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '归属商家编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '店铺名称' })
  shop_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '采购渠道' })
  way_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '采购订单号' })
  purchase_sn?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '采购金额',
    defaultValue: '0.00',
  })
  purchase_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '采购备用金',
    defaultValue: '0.00',
  })
  purchase_amount_bak?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '采购凭证' })
  file_url?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '备注' })
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
