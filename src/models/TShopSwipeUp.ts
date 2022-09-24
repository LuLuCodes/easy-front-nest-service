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
  tableName: 't_shop_swipe_up',
  timestamps: false,
  comment: '店铺刷单-刷单上传表',
})
export class TShopSwipeUp extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺系统编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '刷单类型（1精准刷单 21拖6批量刷单）',
    defaultValue: '1',
  })
  swipe_type?: number;

  @Column({ type: DataType.DATE, comment: '上报时间（年月日）' })
  @Index({ name: 'idx_up_time', using: 'BTREE', order: 'ASC', unique: false })
  up_time!: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝订单编码',
  })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '下单人旺旺号',
  })
  @Index({ name: 'idx_nick_name', using: 'BTREE', order: 'ASC', unique: false })
  nick_name?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '款系统编码（默认取1个）',
  })
  spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '款名称（默认取1个）',
  })
  spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '款名称（默认取1个）',
  })
  product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'SKU系统编码（默认取1个）',
  })
  sku_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: 'SKU名称（默认取1个）',
  })
  sku_name?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '订单金额',
    defaultValue: '0.00',
  })
  order_amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '订单下单时间' })
  @Index({
    name: 'idx_order_create_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_create_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '订单支付时间' })
  order_payment_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '省份/直辖市',
  })
  receiver_pcd_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址' })
  receiver_detail_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人姓名',
  })
  receiver_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收货人电话' })
  receiver_phone?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '佣金',
    defaultValue: '0.00',
  })
  swipe_fee?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '结算状态（0未结算 1已结算）',
    defaultValue: '0',
  })
  settle_status?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '结算金额',
    defaultValue: '0.00',
  })
  settle_amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '结算时间' })
  settle_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '结算人' })
  settle_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '结算人' })
  settle_user?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '验证状态（0验证中 1有效 2异常）',
    defaultValue: '0',
  })
  check_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否排错（0正常 1拍错）',
    defaultValue: '0',
  })
  if_error?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注信息' })
  opt_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '同步发货状态（0待发货 1发货成功）',
    defaultValue: '0',
  })
  sync_gift_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '礼品网备注信息',
  })
  sync_gift_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '礼品网流水号',
  })
  sync_gift_sn?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '礼品网订单创建状态(0待创建 1已创建 2创建失败)',
    defaultValue: '0',
  })
  add_gift_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '礼品网订单创建备注',
  })
  add_gift_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '创建人' })
  creator_user?: string;

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
