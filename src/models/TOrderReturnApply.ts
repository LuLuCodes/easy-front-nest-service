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
  tableName: 't_order_return_apply',
  timestamps: false,
  comment: '订单退货申请',
})
export class TOrderReturnApply extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '退单编号' })
  return_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退单来源编号',
  })
  @Index({
    name: 'idx_from_cps_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_sn?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '退单来源超时时间' })
  from_time_out?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '采购退单编号',
  })
  to_cps_sn?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '原始退货单爬虫同步采购退货状态（0待爬虫领取 1已领取 3爬虫处理中 2处理成功 11采购上游拒绝 12爬虫任务失败）',
    defaultValue: '0',
  })
  from_cps_sync_rma?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '原始退货单爬虫同步采购退货领取时间',
  })
  from_cps_sync_rma_pick_time?: Date;

  @Column({
    type: DataType.BIGINT,
    comment: '原始退货单爬虫同步采购退货领取人',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_from_cps_sync_rma_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_sync_rma_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '原始退货单爬虫同步采购退货上游处理备注',
  })
  from_cps_sync_rma_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方采购单是否同意退款(1同意 2不同意)',
    defaultValue: '0',
  })
  to_cps_audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方采购单退款备注',
  })
  to_cps_audit_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '三方采购单退款图片',
  })
  to_cps_audit_img?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '三方采购单退款金额',
    defaultValue: '0.00',
  })
  to_cps_return_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '三方采购单退货数量',
    defaultValue: '0',
  })
  to_cps_return_quantity?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '淘宝处理三方来源订单退款状态（0待处理 1淘宝同意退款处理成功 11淘宝同意退款处理失败）',
    defaultValue: '0',
  })
  tb_cps_rma_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝处理三方来源订单结果备注',
  })
  tb_cps_rma_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '上游退款时间' })
  tb_cps_rma_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '淘宝处理三方来源订单拒绝退款状态（0待处理 1淘宝拒绝退款处理成功 11淘宝拒绝退款处理失败）',
    defaultValue: '0',
  })
  tb_cps_norma_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝处理三方来源订单拒绝退款结果备注',
  })
  tb_cps_norma_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: '淘宝处理三方来源订单验证码',
  })
  tb_cps_rma_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '自动同意未发货未采购的退款淘宝状态（0待同步，1同意成功，2同意失败）',
    defaultValue: '0',
  })
  auto_up_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '自动同意未发货未采购的退款淘宝备注',
  })
  auto_up_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '自动同意未发货未采购的退款淘宝同步时间',
  })
  auto_up_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '点击“同意淘宝退款”任务人',
  })
  to_tb_auto_up_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '点击“同意淘宝退款”任务人',
  })
  to_tb_auto_up_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '点击“同意淘宝退款”任务时间',
  })
  to_tb_auto_up_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否下发“同意淘宝退款”任务（1下发 0未下发）',
    defaultValue: '0',
  })
  to_tb_auto_up_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '退款人' })
  customer_id?: number;

  @Column({ type: DataType.BIGINT, comment: '订单id' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({ type: DataType.BIGINT, comment: '订单明细主键' })
  @Index({
    name: 'idx_order_item_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  order_item_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键' })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品SKU主键' })
  sku_id!: number;

  @Column({
    type: DataType.TINYINT,
    comment: '退货退款类型：1->仅退款；2->退货退款；3->已发货但仅退款；',
  })
  return_type!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '退款金额',
  })
  return_amount?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '退货数量' })
  return_quantity?: number;

  @Column({
    type: DataType.TINYINT,
    comment:
      '申请状态：1->等待卖家同意退货；2->等待买家退货；3->等待卖家确认收货；4->等待卖家同意退款（只有虹运项目是“卖家拒绝退款”）；5->退款成功；  6->退款关闭；7->卖家拒绝退款',
  })
  return_status!: number;

  @Column({
    type: DataType.TINYINT,
    comment: '商品退货状态，退货退款有效（0待审核  1已到货 2丢货）',
    defaultValue: '0',
  })
  good_return_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '商品退货状态审核人',
  })
  good_return_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '商品退货审核时间' })
  good_return_time?: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '退款状态（0未退款 1已退款 2已拒绝）',
    defaultValue: '0',
  })
  money_return_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '退款审核人' })
  money_return_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '退款时间' })
  money_return_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '原因' })
  reason?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '描述' })
  description?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '凭证图片，以逗号隔开',
  })
  proof_pics?: string;

  @Column({ allowNull: true, type: DataType.STRING(30), comment: '收货人' })
  receive_person_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(30), comment: '收货人手机' })
  receive_person_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退货地址pcd code',
  })
  receive_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退货地址pcd desc',
  })
  receive_pcd_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '退货寄送地址',
  })
  receive_address?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '收货备注' })
  receive_note?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退货快递单号',
  })
  receive_sn?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '快递公司编码' })
  receive_company_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '快递公司名称',
  })
  receive_company_name?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '处理标记（0待处理 1已处理）',
    defaultValue: '0',
  })
  mark_status?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '处理人' })
  mark_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '处理备注' })
  mark_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '向上游申请退货类型（1仅退款 2退货退款）',
  })
  opt_to_return_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '向上游申请退货类型（1未收到货 2已收到货）',
  })
  opt_to_return_good_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '向上游申请退款原因',
  })
  opt_to_return_reason?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '向上游申请退款金额',
  })
  opt_to_return_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '向上游申请退款备注',
  })
  opt_to_return_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '向上游申请退款图片',
  })
  opt_to_return_imgs?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '不使用极速退款服务，授权商家填写运单号',
  })
  opt_to_return_server_type?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '向上游申请退款上传结果（1待处理  2处理中 3成功 4失败）',
  })
  opt_to_result_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '向上游申请退款上传结果',
  })
  opt_to_result_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '1同意退款 2不同意退款',
  })
  opt_to_result?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '向上游申请退款任务创建时间',
  })
  opt_to_result_create_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '向上游申请退款任务领取时间',
  })
  opt_to_result_pick_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '向上游申请退款任务上传时间',
  })
  opt_to_result_finish_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退货地址收货人',
  })
  opt_to_result_receiver?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '退货地址收货人手机号',
  })
  opt_to_result_phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '退货地址收货人地址',
  })
  opt_to_result_address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '退货地址收货人省市区',
  })
  opt_to_result_pcd?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '上游的退货说明' })
  opt_to_result_back_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '上游的退货说明(初始)',
  })
  opt_to_result_ini_back_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '上游的退货物流同步状态（1待同步 2已领取 3已同步 4同步失败）',
  })
  opt_to_result_receive_sn_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '上游的退货物流同步插件领取时间',
  })
  opt_to_result_receive_sn_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '上游的退货物流同步最后处理备注',
  })
  opt_to_result_receive_sn_deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '上游的退货物流同步最后处理时间',
  })
  opt_to_result_receive_sn_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '店铺维护上游退货退款地址任务状态（1待领取 2已领取 3已同步 4同步失败）',
  })
  opt_to_result_address_deal_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '店铺维护上游退货退款地址任务最后领取时间',
  })
  opt_to_result_address_pick_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '店铺维护上游退货退款地址任务最后处理备注',
  })
  opt_to_result_address_deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '店铺维护上游退货退款地址任务最后处理时间',
  })
  opt_to_result_address_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺维护上游退货退款地址任务后的淘宝地址id',
  })
  opt_to_result_address_cps_id?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '淘宝原始单爬虫同步退款状态（0待爬虫领取 1已领取 2处理成功 11处理失败）',
    defaultValue: '0',
  })
  tb_cps_sync_amount?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '淘宝原始单爬虫同步退款人',
    defaultValue: '0',
  })
  tb_cps_sync_amount_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝原始单爬虫同步退款处理备注',
  })
  tb_cps_sync_amount_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '插件拒绝退款申请任务状态（1待处理  2处理中 3成功 4失败）',
  })
  to_tb_refuse_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '点击“拒绝淘宝退款”任务人',
  })
  to_tb_refuse_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '点击“拒绝淘宝退款”任务人',
  })
  to_tb_refuse_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '点击“拒绝淘宝退款”任务时间',
  })
  to_tb_refuse_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '插件拒绝退款申请任务原因',
  })
  to_tb_refuse_reson?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '插件拒绝退款申请任务拒绝说明',
  })
  to_tb_refuse_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '插件拒绝退款申请任务拒绝凭证',
  })
  to_tb_refuse_files?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '插件拒绝退款申请任务建议原因',
  })
  to_tb_refuse_suggest?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '插件拒绝退款申请任务建议金额',
  })
  to_tb_refuse_suggest_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '插件拒绝退款申请任务插件处理时间',
  })
  to_tb_refuse_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '插件拒绝退款申请任务插件处理备注',
  })
  to_tb_refuse_deal_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '后台店铺同意/拒绝退货状态（1同意 2拒绝）',
    defaultValue: '0',
  })
  to_tb_good_auto_up_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '后台店铺同意/拒绝退货人',
  })
  to_tb_good_auto_up_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '后台店铺同意/拒绝退货人',
  })
  to_tb_good_auto_up_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '后台店铺同意/拒绝退货时间',
  })
  to_tb_good_auto_up_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '上游的拒绝退货说明',
  })
  to_tb_good_refuse_up_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '上游的拒绝退货说明(初始)',
  })
  to_tb_good_ini_refuse_up_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '上游的拒绝退货图片',
  })
  to_tb_good_refuse_up_img?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '上游的拒绝退货图片(初始)',
  })
  to_tb_good_ini_refuse_up_img?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '上游的拒绝退货原因',
  })
  to_tb_good_refuse_up_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '上游的拒绝退货原因(初始)',
  })
  to_tb_good_ini_refuse_up_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '上游的拒绝退货原因(淘宝拒绝id)',
  })
  to_tb_good_refuse_up_type_cps_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝退货退款dispute_id',
  })
  dispute_id?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否淘宝客服介入',
    defaultValue: '0',
  })
  if_tb_server_warning?: number;

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
