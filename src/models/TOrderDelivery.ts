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
  tableName: 't_order_delivery',
  timestamps: false,
  comment: '订单发货单表',
})
export class TOrderDelivery extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '发货单主键',
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

  @Column({ type: DataType.STRING(100), comment: '系统发货单号' })
  @Index({
    name: 'idx_delivery_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_code!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方发货结果ID',
  })
  feed_id?: string;

  @Column({
    type: DataType.BIGINT,
    comment: '发货单归属企业',
    defaultValue: '0',
  })
  seller_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '发货单归属店铺',
    defaultValue: '0',
  })
  shop_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '分包类型（0正常包裹）',
    defaultValue: '0',
  })
  pack_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '包裹属性（0普通 1带电）',
    defaultValue: '0',
  })
  pack_attribute?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '国际物流类型（1.第三方物流）',
    defaultValue: '0',
  })
  inter_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '国际第三方物流（1云途物流）',
    defaultValue: '0',
  })
  inter_company_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '跟踪码' })
  track_sn?: string;

  @Column({ type: DataType.INTEGER, comment: '重量（克）', defaultValue: '0' })
  pack_weight?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '入库重量（克）',
    defaultValue: '0',
  })
  in_weight?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '出库重量（克）',
    defaultValue: '0',
  })
  out_weight?: number;

  @Column({ type: DataType.INTEGER, comment: '长（cm）', defaultValue: '0' })
  pack_long?: number;

  @Column({ type: DataType.INTEGER, comment: '宽（cm）', defaultValue: '0' })
  pack_wide?: number;

  @Column({ type: DataType.INTEGER, comment: '高（cm）', defaultValue: '0' })
  pack_high?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发货日期' })
  delivery_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '采购成本',
    defaultValue: '0.00',
  })
  purchase_const?: string;

  @Column({ type: DataType.INTEGER, comment: '发货数量', defaultValue: '0' })
  total_count?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人姓名',
  })
  receiver_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人国家',
  })
  receiver_country?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址' })
  receiver_detail_address?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址2' })
  receiver_detail_address2?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址3' })
  receiver_detail_address3?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收货人电话' })
  receiver_phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收货人邮编' })
  receiver_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '收货人省份直辖市',
  })
  receiver_pcd_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '海关编码' })
  customs_sn?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '增值税号' })
  added_tax?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '欧盟税号' })
  eu_tax?: string;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '备注' })
  note?: string;

  @Column({ type: DataType.INTEGER, comment: '是否拍照', defaultValue: '0' })
  if_photo?: number;

  @Column({ type: DataType.INTEGER, comment: '是否加固', defaultValue: '0' })
  if_reinforce?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否换纸盒子',
    defaultValue: '0',
  })
  if_paper?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '对账状态（0未对账 10已对账）',
    defaultValue: '0',
  })
  confirm_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '对账时间' })
  confirm_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '对账人' })
  confirm_user?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '对账仓库费用',
    defaultValue: '0.00',
  })
  confirm_const?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '货单状态（0\b待入库 1已入库 10已出库）',
    defaultValue: '0',
  })
  pack_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '货单入库时间' })
  pack_status_intime?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '货单入库人',
  })
  pack_status_inuser?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '货单出库时间' })
  pack_status_outtime?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '货单出库人',
  })
  pack_status_outuser?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '国际物流运输方式',
  })
  inter_transport_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '国际物流运输方式',
  })
  inter_transport_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '国际第三方物流快递单号',
  })
  inter_company_sn?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递预收运费',
    defaultValue: '0.00',
  })
  inter_company_fee?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算总运费',
    defaultValue: '0.00',
  })
  inter_company_realfee?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算总运费(初始)',
    defaultValue: '0.00',
  })
  inter_company_ini_realfee?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '国际第三方物流快递结算总运费时间',
  })
  inter_company_realfee_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '国际第三方物流快递运费结算状态（0未结算 10已结算）',
    defaultValue: '0',
  })
  inter_company_feestatus?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '国际第三方物流快递结算重量',
    defaultValue: '0',
  })
  inter_company_weight?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算运费',
    defaultValue: '0.00',
  })
  inter_company_freight?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算燃油费',
    defaultValue: '0.00',
  })
  inter_company_gas?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算挂号费',
    defaultValue: '0.00',
  })
  inter_company_gh?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算处理费',
    defaultValue: '0.00',
  })
  inter_company_deal?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '国际第三方物流快递结算其他费',
    defaultValue: '0.00',
  })
  inter_company_other?: string;

  @Column({ type: DataType.BIGINT, comment: '物流公司编码' })
  @Index({
    name: 'idx_delivery_company_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_company_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '物流公司名称',
  })
  delivery_company_name?: string;

  @Column({ type: DataType.STRING(64), comment: '物流单号' })
  delivery_sn!: string;

  @Column({ type: DataType.BIGINT, comment: '订单编号' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

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

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '创建人' })
  creator_user?: string;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
