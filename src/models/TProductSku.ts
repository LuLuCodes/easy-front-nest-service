import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_product_sku', timestamps: false, comment: '商品SKU表' })
export class TProductSku extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品SKU主键',
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

  @Column({ type: DataType.BIGINT, comment: '商品主键' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: 'sku编码' })
  @Index({ name: 'idx_sku_code', using: 'BTREE', order: 'ASC', unique: false })
  sku_code?: string;

  @Column({ type: DataType.STRING(200), comment: 'sku名称' })
  sku_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: 'sku名称(初始)',
  })
  ori_sku_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: 'sku号' })
  sku_sn?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '条形码' })
  sku_barcode?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: 'SKU属性组id（pid1:vid1;pid2:vid2)',
  })
  properties_id?: string;

  @Column({
    type: DataType.BIGINT,
    comment: '认领后的商品的原父亲',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_father_sku',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  father_sku?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '三方upc' })
  @Index({
    name: 'idx_to_cps_upc',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_cps_upc?: string;

  @Column({ type: DataType.INTEGER, comment: '重量（克）', defaultValue: '0' })
  weight?: number;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '主图url' })
  pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'sku画册图，逗号分隔',
  })
  album_pics?: string;

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
    comment: '市场价',
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
    comment: '销量',
    defaultValue: '0',
  })
  sale?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '预埋销量' })
  ini_sale?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: 'sku属性，json格式',
  })
  sp_data?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '通用text' })
  common_data?: string;

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
    type: DataType.DECIMAL(10, 2),
    comment: '称重商品SKU重量（克）',
  })
  sku_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否自动隐藏（0未隐藏 1自动隐藏 2手动隐藏）',
    defaultValue: '0',
  })
  auto_disable?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '三方采购数量倍数',
    defaultValue: '1',
  })
  cps_multiple?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '巡检：SKU变化(1高亮)',
    defaultValue: '0',
  })
  isc_sku?: number;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment:
      'sku的定价类型[{"price_type":"客户员工福利价","price_type_id":1,"calculation":1(按件)2(按克),"discount":2(折扣元)}]',
  })
  prict_type_infos?: object;

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
