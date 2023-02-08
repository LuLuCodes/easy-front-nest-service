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
  tableName: 't_order',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '订单表',
})
export class TOrder extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '订单主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(36), comment: '用户code' })
  @Index({
    name: 'idx_customer_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({ type: DataType.BIGINT, comment: '优惠券主键', defaultValue: '0' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id?: number;

  @Column({ type: DataType.STRING(64), comment: '订单编号' })
  @Index({ name: 'idx_order_sn', using: 'BTREE', order: 'ASC', unique: false })
  order_sn!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '订单总金额',
    defaultValue: '0.00',
  })
  total_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '应付金额（实际支付金额）',
    defaultValue: '0.00',
  })
  pay_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '运费金额',
    defaultValue: '0.00',
  })
  freight_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '促销优化金额（促销价、满减、阶梯价）',
    defaultValue: '0.00',
  })
  promotion_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '积分抵扣金额',
    defaultValue: '0.00',
  })
  integration_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '优惠券抵扣金额',
    defaultValue: '0.00',
  })
  coupon_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '管理员后台调整订单使用的折扣金额',
    defaultValue: '0.00',
  })
  discount_amount?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '支付方式：0->未支付；1->支付宝；2->微信',
    defaultValue: '0',
  })
  pay_type?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '订单来源：0->PC订单；1->app订单',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.TINYINT,
    comment:
      '订单状态：0->待付款；1->待发货；2->部分发货；3->已发货；4->已完成；5->已关闭；6->无效订单',
    defaultValue: '0',
  })
  order_status?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '订单取消状态：0->未取消；1->已取消；',
    defaultValue: '0',
  })
  cancel_status?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '订单类型：0->正常订单；1->秒杀订单',
    defaultValue: '0',
  })
  order_type?: number;

  @Column({ type: DataType.STRING(64), comment: '物流公司(配送方式)' })
  delivery_company!: string;

  @Column({ type: DataType.STRING(64), comment: '物流单号' })
  delivery_sn!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '自动确认时间（天）',
    defaultValue: '2',
  })
  auto_confirm_day?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '可以获得的积分',
    defaultValue: '0',
  })
  integration?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '可以获得的成长值',
    defaultValue: '0',
  })
  growth?: number;

  @Column({ type: DataType.STRING(100), comment: '活动信息' })
  promotion_info!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '发票类型：0->不开发票；1->电子发票；2->纸质发票',
    defaultValue: '0',
  })
  bill_type?: number;

  @Column({ type: DataType.STRING(200), comment: '发票抬头' })
  bill_header!: string;

  @Column({ type: DataType.STRING(200), comment: '发票内容' })
  bill_content!: string;

  @Column({ type: DataType.STRING(32), comment: '收票人电话' })
  bill_receiver_phone!: string;

  @Column({ type: DataType.STRING(64), comment: '收票人邮箱' })
  bill_receiver_email!: string;

  @Column({ type: DataType.STRING(100), comment: '收货人姓名' })
  receiver_name!: string;

  @Column({ type: DataType.STRING(32), comment: '收货人电话' })
  receiver_phone!: string;

  @Column({ type: DataType.STRING(32), comment: '收货人邮编' })
  receiver_post_code!: string;

  @Column({ type: DataType.STRING(32), comment: '省份/直辖市' })
  receiver_province!: string;

  @Column({ type: DataType.STRING(32), comment: '城市' })
  receiver_city!: string;

  @Column({ type: DataType.STRING(32), comment: '区' })
  receiver_region!: string;

  @Column({ type: DataType.STRING(200), comment: '详细地址' })
  receiver_detail_address!: string;

  @Column({ type: DataType.STRING(500), comment: '订单备注' })
  note!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '确认收货状态：0->未确认；1->已确认',
    defaultValue: '0',
  })
  confirm_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '下单时使用的积分',
    defaultValue: '0',
  })
  use_integration?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '支付时间' })
  payment_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发货时间' })
  delivery_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '确认收货时间' })
  receive_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '评价时间' })
  comment_time?: Date;

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
  created_by?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  updated_by?: number;
}
