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
  tableName: 't_order_item',
  timestamps: false,
  comment: '订单中所包含的商品',
})
export class TOrderItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
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

  @Column({ type: DataType.BIGINT, comment: '商品主键' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键' })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: 'sku号' })
  sku_sn?: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: 'sku编码' })
  sku_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '三方upc' })
  to_cps_upc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '三方商品来源网址',
  })
  from_cps_url?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方商品来源（1:淘宝 2:天猫 3:1688）',
  })
  from_cps_type?: number;

  @Column({ type: DataType.STRING(100), comment: '三方商品来源子单号' })
  @Index({
    name: 'idx_from_cps_oid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_oid!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '三方采购状态（0待采购 1采购中 2已采购 11采购失败 12人为干预关闭 13任务暂停）',
    defaultValue: '0',
  })
  from_cps_sync_purchase?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '三方采购爬虫领取时间',
  })
  from_cps_sync_purchase_time?: Date;

  @Column({
    type: DataType.BIGINT,
    comment: '三方采购创建人',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_from_cps_sync_purchase_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_sync_purchase_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '三方采购状态结果备注',
  })
  from_cps_sync_purchase_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方发货时间超时是否强制采购',
    defaultValue: '0',
  })
  ignore_over_time?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '处理采购人',
  })
  deal_purchase_user?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '处理采购人' })
  deal_purchase_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '临时三方支付单号',
  })
  @Index({
    name: 'idx_temp_to_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  temp_to_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '临时三方支付单号失败备注',
  })
  temp_to_cps_tid_remark?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '采购数量' })
  purchase_quantity?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '采购商品名称',
  })
  purchase_spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '采购商品sku',
  })
  purchase_sku_properties_name?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '采购地址' })
  purchase_cps_url?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '采购上游图片' })
  purchase_album_pics?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '采购上游单价',
  })
  purchase_const?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '三方来源店铺类型',
  })
  purchase_from_shop_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方来源店铺名称',
  })
  purchase_from_shop_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '三方来源商品编码',
  })
  purchase_from_product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '三方商品跳转地址',
  })
  to_cps_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '上游商品来源（1:淘系 3:拼多多）',
    defaultValue: '1',
  })
  father_from_cps_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方采购单号',
  })
  @Index({
    name: 'idx_to_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方支付单号',
  })
  @Index({
    name: 'idx_to_cps_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_cps_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方支付单号失败备注',
  })
  to_cps_ali_remark?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '三方采购单总金额',
    defaultValue: '0.00',
  })
  to_cps_total_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '淘宝处理三方来源订单发货状态（0待处理 1淘宝处理成功 11淘宝处理失败）',
    defaultValue: '0',
  })
  tb_cps_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '采购支付方式(1花呗 2信用卡 3余额 4储蓄卡)',
    defaultValue: '0',
  })
  tb_cps_paytype?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '采购支付时间' })
  tb_cps_paytime?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '淘宝处理三方来源订单发货备注',
  })
  tb_cps_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '商品主图, 可以是spu主图，或者sku主图',
  })
  product_pic_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(400), comment: '商品名称' })
  product_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '主图url' })
  sku_pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: 'sku属性，json格式',
  })
  sku_sp_data?: string;

  @Column({ type: DataType.STRING(500), comment: 'SKU属性描述（文本）' })
  sku_properties_name!: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '下单时的价格（如果使用优惠券，需扣除优惠券的金额）',
  })
  price?: string;

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
    comment: '关联称重商品x元/克',
  })
  weight_unit_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '称重商品下单初始sku总重量（克）',
  })
  ini_sku_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '称重商品最终发货sku总重量（克）',
  })
  del_sku_weight?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '加工费' })
  machining_price?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '购买数量' })
  quantity?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '已发货数量（冗余）',
    defaultValue: '0',
  })
  delivery_quantity?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '商品促销名称',
  })
  promotion_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '商品促销分解金额',
  })
  promotion_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '优惠券优惠分解金额',
  })
  coupon_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '积分优惠分解金额',
  })
  integration_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '该商品经过优惠后的分解金额',
  })
  real_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '赠送的积分',
    defaultValue: '0',
  })
  gift_integration?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '赠送的成长值',
    defaultValue: '0',
  })
  gift_growth?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment:
      '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  })
  product_attr?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '级差奖励（好物体验官）',
  })
  reward_hw?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '级差奖励（首席分享官）',
  })
  reward_sx?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '爆单奖励（一级）',
  })
  reward_bd1?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '爆单奖励（二级）',
  })
  reward_bd2?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '三方真实商品名称',
  })
  cps_spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment:
      '属性别名json[{"key":"颜色分类","values":[{"display":"油亮炫黑色","real":"黑色"}]}]',
  })
  properties?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方采购数量倍数',
  })
  multiple?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: 'ioss编码' })
  ioss_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否需要超级采购账号采购',
    defaultValue: '0',
  })
  if_supper_buy?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '是否赔付采购误采的刷单成本（0无处理 1从支付宝a打款到支付宝b（进行中） 2从支付宝a打款到支付宝b（已完成） 3从支付宝b打款到采购（进行中）4从支付宝b打款到采购（已经完成）5支付宝a->b失败 6支付宝b->采购失败）',
    defaultValue: '0',
  })
  error_purchase?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '赔付采购误采的刷单成本',
    defaultValue: '0.00',
  })
  error_purchase_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝a->支付宝b流水号',
  })
  error_purchase_ali_sn_a?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '支付宝a->支付宝b备注',
  })
  error_purchase_ali_sn_aremark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝b->采购流水号',
  })
  error_purchase_ali_sn_b?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '支付宝b->采购流水号',
  })
  error_purchase_ali_sn_bremark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '赔付采购误采的上游退款时间',
  })
  error_purchase_const_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '赔付采购误采的上游退款金额',
    defaultValue: '0.00',
  })
  error_purchase_const_rma?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  @Index({
    name: 'idx_create_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
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
