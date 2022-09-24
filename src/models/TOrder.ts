import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_order', timestamps: false, comment: '订单表' })
export class TOrder extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '订单主键',
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

  @Column({
    type: DataType.BIGINT,
    comment: '订单归属企业编码',
    defaultValue: '0',
  })
  seller_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '订单归属店铺编码',
    defaultValue: '0',
  })
  shop_id?: number;

  @Column({ type: DataType.BIGINT, comment: '客户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '销售渠道（客户表冗余）',
  })
  sale_channel_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '客户昵称' })
  nick_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '客户姓名' })
  real_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '客户电子邮件',
  })
  email?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '优惠券主键' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '订单编号' })
  @Index({ name: 'idx_order_sn', using: 'BTREE', order: 'ASC', unique: true })
  order_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '预支付交易会话标识',
  })
  prepay_id?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '订单总金额',
  })
  total_amount?: string;

  @Column({
    type: DataType.STRING(50),
    comment: '货币类型',
    defaultValue: '人民币',
  })
  currency_type?: string;

  @Column({
    type: DataType.STRING(50),
    comment: '货币符号',
    defaultValue: 'CNY',
  })
  currency_code?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '应付金额（实际支付金额）',
  })
  pay_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '运费金额',
  })
  freight_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '促销优化金额（促销价、满减、阶梯价）',
  })
  promotion_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '积分抵扣金额',
  })
  integration_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '优惠券抵扣金额',
  })
  coupon_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '管理员后台调整订单使用的折扣金额',
  })
  discount_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '支付方式：0->未支付；1->支付宝；2->微信；3->钱包余额',
  })
  pay_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '订单来源：0->PC订单；1->app订单  3->系统同步  4权益包兑换（t_interests_order）',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '订单状态：0->待付款；10->待发货；20->部分发货；30->已发货；35->部分签收； 40->已完成；50->已关闭；60->无效订单；70->已结算',
  })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '订单取消状态：0->未取消；1->已取消；',
    defaultValue: '0',
  })
  cancel_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '订单类型：0->正常订单；1->秒杀订单  2->报关订单  3->卡券订单 4->酒店订单 5->直冲商品 6->称重订单 7->核销二维码订单',
  })
  order_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '物流公司(配送方式)',
  })
  delivery_company?: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '物流单号' })
  @Index({
    name: 'idx_delivery_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '爬虫抓的上游快递单号',
  })
  ini_delivery_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '爬虫抓的上游快递公司',
  })
  ini_delivery_company?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '快递是否揽收',
    defaultValue: '0',
  })
  delivery_is_start?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '快递揽收时间' })
  @Index({
    name: 'idx_delivery_start_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  delivery_start_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '揽收超时处理人' })
  delivery_start_deal_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '揽收超时处理备注',
  })
  delivery_start_deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '是否是爬虫发货',
  })
  is_reptile_delivery?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '自动确认时间（天）',
  })
  auto_confirm_day?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '可以获得的积分',
  })
  integration?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '可以获得的成长值',
  })
  growth?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '活动信息' })
  promotion_info?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '发票类型：0->不开发票；1->电子发票；2->纸质发票',
  })
  bill_type?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '发票抬头' })
  bill_header?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '发票内容' })
  bill_content?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收票人电话' })
  bill_receiver_phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '收票人邮箱' })
  bill_receiver_email?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '发票邮寄邮编',
  })
  bill_receiver_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '发票邮寄省市区',
  })
  bill_receiver_pcd_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '发票邮寄地址',
  })
  bill_receiver_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '发票邮寄人',
  })
  bill_receiver_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '发票号' })
  bill_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '编辑收货信息状态（0未编辑 1已编辑待处理 2已处理）',
    defaultValue: '0',
  })
  edit_address_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '编辑收货信息处理人',
    defaultValue: '0',
  })
  edit_address_user?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '编辑收货信息处理备注',
  })
  edit_address_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '编辑收货信息时间' })
  edit_address_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人姓名',
  })
  receiver_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '编辑收货人姓名',
  })
  edit_receiver_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人姓名（加密）',
  })
  ini_receiver_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收货人电话' })
  receiver_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '编辑收货人电话（加密）',
  })
  edit_receiver_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '收货人电话（加密）',
  })
  ini_receiver_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '收货人国家',
  })
  receiver_country?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '收货人邮编' })
  receiver_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '编辑收货人邮编',
  })
  edit_receiver_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '省份/直辖市',
  })
  receiver_pcd_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '编辑省份/直辖市',
  })
  edit_receiver_pcd_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址' })
  receiver_detail_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '编辑详细地址',
  })
  edit_receiver_detail_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '详细地址（加密）',
  })
  ini_receiver_detail_address?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址2' })
  receiver_detail_address2?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '详细地址3' })
  receiver_detail_address3?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '订单备注' })
  note?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '备注是否需人工处理（1需处理 0已处理）',
    defaultValue: '0',
  })
  note_wait_deal?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '初始订单备注',
  })
  ini_note?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '确认收货状态：0->未确认；1->已确认',
  })
  confirm_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '下单时使用的积分',
  })
  use_integration?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '三方商品来源网址',
  })
  from_cps_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方异常单警告（3订单备注警告 2数量警告 1金额警告 0正常）',
    defaultValue: '0',
  })
  from_cps_warning?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '三方异常单警告备注',
  })
  from_cps_warning_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方商品来源（1:淘宝 2:天猫 3:1688）',
  })
  from_cps_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '三方原单号填充地址状态（0待填充 1填充中 2已填充 11填充失败）',
    defaultValue: '0',
  })
  from_cps_sync_address?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '地址同步结果',
  })
  from_cps_sync_address_remark?: string;

  @Column({
    type: DataType.BIGINT,
    comment: '三方原单号填充地址操作人',
    defaultValue: '0',
  })
  from_cps_sync_address_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方原主单号',
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
    type: DataType.STRING(100),
    comment: '三方原子单号',
  })
  @Index({
    name: 'idx_from_cps_oid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_oid?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '认领去向（1亚马逊……）',
  })
  to_cps_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '认领去向订单号',
  })
  to_cps_order_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '认领去向站点名称（显示用）',
  })
  to_web_country?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '认领去向站点名称编号（对接用）',
  })
  to_web_country_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '认领后平发货台同步状态（0待同步 10同步成功 11同步失败）',
    defaultValue: '0',
  })
  to_cps_sync_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '认领平发货台最后同步时间',
  })
  to_cps_sync_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '认领去向订单配送方式',
  })
  to_cps_delivery_type?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '支付时间' })
  payment_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发货时间' })
  delivery_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '确认收货时间' })
  receive_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '评价时间' })
  comment_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: 'ioss编码' })
  ioss_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '报税手机号(初始)',
  })
  ini_tax_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '报税姓名(初始)',
  })
  ini_tax_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '报税身份证(初始)',
  })
  ini_tax_id_card?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '报税手机号',
  })
  tax_phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '报税姓名' })
  tax_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '报税身份证',
  })
  tax_id_card?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '入住开始时间' })
  start_server_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '入住结束时间' })
  start_server_end?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '服务码' })
  server_code?: string;

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
