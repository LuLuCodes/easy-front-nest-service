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
  tableName: 't_product_spu',
  timestamps: false,
  comment: '商品表(SPU)',
})
export class TProductSpu extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
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
    type: DataType.INTEGER,
    comment: '类别来源（0平台后台 1商家后台）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({ type: DataType.BIGINT, comment: '类别来源编码', defaultValue: '0' })
  source_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '归属店铺' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '商品类型（0普通商品 1课程商品 2报关商品 3福禄卡券商品 4酒店商品 5直冲商品 6称重商品 7核销二维码商品 8奈雪卡券商品）',
    defaultValue: '0',
  })
  spu_class?: number;

  @Column({ type: DataType.STRING(200), comment: '商品名称' })
  @Index({ name: 'idx_spu_name', using: 'BTREE', order: 'ASC', unique: false })
  spu_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(264),
    comment: '品牌商品名称',
  })
  brand_spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '商品拓展名',
  })
  spu_name_ext?: string;

  @Column({ type: DataType.INTEGER, comment: '所属sku数量', defaultValue: '0' })
  sku_count?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '品牌主键',
    defaultValue: '0',
  })
  @Index({ name: 'idx_brand_id', using: 'BTREE', order: 'ASC', unique: false })
  brand_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '品牌名称' })
  brand_name?: string;

  @Column({ type: DataType.BIGINT, comment: '类目主键', defaultValue: '0' })
  @Index({
    name: 'idx_category_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  category_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '类别路径' })
  category_path?: string;

  @Column({ type: DataType.STRING(200), comment: '类目名称' })
  category_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '条形码' })
  spu_barcode?: string;

  @Column({ type: DataType.STRING(2000), comment: '主图url' })
  pic_url!: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '货号' })
  @Index({
    name: 'idx_product_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '上架状态：0->下架；1->上架',
    defaultValue: '0',
  })
  publish_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后一次上架时间' })
  last_publish_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '新品状态:0->不是新品；1->新品',
    defaultValue: '0',
  })
  is_new?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '热门状态:0->不是新品；1->新品',
    defaultValue: '0',
  })
  is_hot?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '推荐状态；0->不推荐；1->推荐',
    defaultValue: '0',
  })
  is_recommend?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '审核状态：0->未审核；1->审核通过',
    defaultValue: '0',
  })
  verify_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否为预售商品：0->不是；1->是',
    defaultValue: '0',
  })
  preview_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '库存',
    defaultValue: '0',
  })
  stock?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '预警库存',
    defaultValue: '0',
  })
  low_stock?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '锁定库存',
    defaultValue: '0',
  })
  lock_stock?: number;

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
    comment: '市场价(原价)',
    defaultValue: '0.00',
  })
  original_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '销售价',
    defaultValue: '0.00',
  })
  sale_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '成本价',
    defaultValue: '0.00',
  })
  cost_price?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '运费',
    defaultValue: '0.00',
  })
  freight_price?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '加工费' })
  machining_price?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment:
      '销售渠道(JSON [{"id":1（0代表全网）,"name":"渠道1","sale_type":"1钱包或积分 2钱包且积分","sale_price":"内购价格","sale_point":"内购积分"}])',
  })
  sale_channel_json?: object;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '促销价',
    defaultValue: '0.00',
  })
  promotion_price?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销开始时间' })
  promotion_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销结束时间' })
  promotion_end_time?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '活动限购数量' })
  promotion_per_limit?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '促销类型：0->没有促销使用销售价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  price_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '赠送的积分',
    defaultValue: '0',
  })
  gift_point?: number;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '副标题' })
  sub_title?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '商品描述' })
  spu_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING(16), comment: '单位' })
  unit?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '重量(克)',
    defaultValue: '0',
  })
  weight?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  service_ids?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '关键字' })
  keywords?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '超级关键字',
  })
  super_keywords?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '商品画册，限制为5张，以逗号分割',
  })
  album_pics?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '商品画册，限制为5张，以逗号分割(初始)',
  })
  ori_album_pics?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '详情标题' })
  detail_title?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '详情描述' })
  detail_desc?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '产品详情富文本' })
  detail_html?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '产品详情富文本(初始)',
  })
  ori_detail_html?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '商品详情图，以逗号分隔',
  })
  detail_pics?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '备注' })
  note?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '三方异常警告（0正常 1详情图小于3 2sku价格一致 3上游店铺商品数为0）',
    defaultValue: '0',
  })
  from_cps_warning?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '三方异常警告',
  })
  from_cps_warning_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(128), comment: '分享标题' })
  share_title?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '分享描述' })
  share_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '分享缩略图url',
  })
  share_pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '销量',
    defaultValue: '0',
  })
  sale?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '预埋销量' })
  ini_sale?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '三方商品状态（1初始,2认领）',
    defaultValue: '0',
  })
  spu_cps_status?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '认领后的商品的原父亲',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_father_spu',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  father_spu?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '三方商品来源网址',
  })
  from_cps_url?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方商品来源（1:淘宝 2:天猫 3:1688）',
  })
  from_cps_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '三方来源是否删除',
    defaultValue: '0',
  })
  from_cps_isdel?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '认领后去向（1亚马逊……）',
  })
  to_cps_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '三方分类节点',
  })
  to_cps_category?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '认领去向站点地址',
  })
  to_cps_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '认领后去向站点名称（显示用）',
  })
  to_web_country?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '认领后去向站点名称编号（对接用）',
  })
  to_web_country_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '制造商' })
  manufacturer?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '卖点要点' })
  selling_point?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '生产日期' })
  manufacture_day?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '发货地' })
  deliver_place?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '拼多多商品是否同步发货地(1已领取 2同步成功 3同步失败)',
  })
  sync_deliver_place_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '拼多多商品同步发货地失败原因',
  })
  sync_deliver_place_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '发货地备注' })
  deliver_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '是否支持7天无理由退货',
  })
  is_rma?: number;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  username!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方采购数量倍数',
    defaultValue: '1',
  })
  cps_multiple?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '三方来源店铺类型',
  })
  from_shop_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方来源店铺名称',
  })
  from_shop_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '三方来源店铺评分1',
  })
  from_shop_point1?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '三方来源店铺评分2',
  })
  from_shop_point2?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '三方来源店铺评分3',
  })
  from_shop_point3?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方来源店铺商品数',
  })
  from_shop_item_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方来源店铺商品销量',
  })
  from_shop_item_sale?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '三方来源店铺商品评论数',
  })
  from_shop_item_comment?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '三方来源商品评分',
  })
  from_item_point?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '同步三方状态（1成功 2失败）',
  })
  sync_cps_status?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '同步三方备注' })
  sync_cps_status_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '三方系列' })
  cps_series?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '三方规格' })
  cps_spec?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '蓝海词' })
  tb_key_word?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '商品运费模板系统编码',
  })
  tb_freight_template_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '商品运费模板',
  })
  tb_freight_template?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '不发货区域' })
  no_translate_areas?: string;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_product_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
