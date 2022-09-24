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
  tableName: 't_spu_up_item',
  timestamps: false,
  comment: '商品上传任务主表',
})
export class TSpuUpItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺id' })
  shop_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '任务商品来源（1:淘系 3:拼多多）',
    defaultValue: '1',
  })
  from_cps_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '上传选品（1后台人工选取，2智能自动选取）',
    defaultValue: '1',
  })
  up_type?: number;

  @Column({ type: DataType.BIGINT, comment: '任务主键' })
  @Index({ name: 'idx_head_id', using: 'BTREE', order: 'ASC', unique: false })
  head_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '上传状态（0待上传 1上传中 2上传成功 11上传失败）',
    defaultValue: '0',
  })
  up_status?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '上传备注' })
  up_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '同步规格html' })
  up_schema?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '同步商品html' })
  up_spu?: string;

  @Column({ type: DataType.BIGINT, comment: 'url采集的款信息' })
  spu_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(128), comment: '商品名称' })
  spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '上游商品类目主键',
  })
  spu_category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '上传成功后的款信息',
  })
  @Index({
    name: 'idx_new_spu_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  new_spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '三方商品编码',
  })
  @Index({
    name: 'id_new_product_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  new_product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '新商品价格',
  })
  new_spu_sale_price?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '新商品创建时间' })
  new_spu_create_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '三方商品销量',
    defaultValue: '0',
  })
  new_spu_sale?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '有销量的商品处理状态（0待处理 1已处理）',
    defaultValue: '0',
  })
  new_spu_sale_deal?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '有销量的商品处理人',
  })
  new_spu_sale_deal_use_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '有销量的商品处理时间',
  })
  new_spu_sale_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方商品销售状态',
  })
  new_spu_cps_onsale?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方终审状态(0待审核 10审核通过 11审核拒绝  )',
    defaultValue: '0',
  })
  super_audit_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '三方终审核人' })
  super_audit_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方终审核人',
  })
  super_audit_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '三方终审时间' })
  super_audit_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '审核状态(0待审核 1审核中 10审核通过 11审核拒绝  12挂起)',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '审核人' })
  audit_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '审核人' })
  audit_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '上下架状态(0待上架 1上架 2下架)',
    defaultValue: '0',
  })
  onsale_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '下架备注' })
  onsale_remark?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '上下架人' })
  onsale_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '上下架人' })
  onsale_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '上下架时间' })
  onsale_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '上游商品状态获取已完成',
    defaultValue: '0',
  })
  sync_is_finish?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否巡检警告',
    defaultValue: '0',
  })
  isc_warning?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '巡检警告' })
  isc_warning_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '巡检警告异常时间' })
  isc_warning_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '最后警告清除人',
  })
  isc_warning_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后警告清除人',
  })
  isc_warning_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '清除巡检警告异常时间',
  })
  isc_warning_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '最后商品编辑人',
  })
  edit_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后商品编辑人',
  })
  edit_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后商品编辑时间' })
  edit_user_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '图片是否审核(0待巡查 1正常 2异常)',
    defaultValue: '0',
  })
  if_img_check?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '异常图片审核人',
  })
  audit_img_check_username?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '异常图片审核时间' })
  audit_img_check_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '图片审核备注',
  })
  img_check_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '图片审核时间' })
  img_check_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否设置公益（0未设置 1已设置）',
    defaultValue: '0',
  })
  is_gonyi?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '设置公益时间' })
  is_gonyi_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否设置直通车',
    defaultValue: '0',
  })
  is_car?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '设置直通车时间' })
  is_car_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后下架直通车时间',
  })
  off_car_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否永久关闭直通车',
    defaultValue: '0',
  })
  close_car?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '自定义类别系统编码',
  })
  @Index({
    name: 'idx_category_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '自定义类别三方淘宝编码',
  })
  category_cps_cid?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后巡检时间' })
  last_inspect?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后巡检UUID',
  })
  @Index({
    name: 'idx_last_inspect_uuid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  last_inspect_uuid?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '最后一次巡检是否失败',
    defaultValue: '0',
  })
  if_last_inspect_fail?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '最后一次巡检失败理由',
  })
  last_inspect_fail_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后一次巡检失败时间',
  })
  last_inspect_fail_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后一次有流量时间',
  })
  last_flow_time?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '访客数' })
  visitor_count?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '支付买家数' })
  payuser_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后下发巡检模版时间',
  })
  last_freight_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '商品运费模板',
  })
  tb_freight_template?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '不发货区域' })
  no_translate_areas?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '商品运费模板系统编码',
  })
  @Index({
    name: 'idx_tb_freight_template_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  tb_freight_template_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '商品不发货区域模板',
  })
  tb_translate_template?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '商品不发货区域模板系统编码',
  })
  tb_translate_template_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '商品不发货区域模板是否同步',
  })
  tb_translate_template_is_sync?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '上游图片url',
  })
  desc_url_json?: string;

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
