import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_shop', timestamps: false, comment: '店铺表' })
export class TShop extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '企业编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.STRING(100), comment: '店铺名称' })
  shop_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否展示在运营端',
    defaultValue: '0',
  })
  if_show_yy?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(36),
    comment: '归属代理商account_code',
  })
  @Index({
    name: 'idx_agent_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  agent_account_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '店铺类型（1亚马逊,2淘宝,3天猫……）',
    defaultValue: '0',
  })
  cps_type?: number;

  @Column({ type: DataType.STRING(100), comment: '店铺账号' })
  cps_account!: string;

  @Column({ type: DataType.STRING(100), comment: '卖家ID' })
  cps_appid!: string;

  @Column({ type: DataType.STRING(100), comment: '授权码' })
  cps_secret!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '授权码过期时间' })
  cps_secret_overtime?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '授权码更新时间' })
  cps_secret_updatetime?: Date;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '三方品牌' })
  cps_brand?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '运费模版' })
  cps_postage_id?: string;

  @Column({ type: DataType.STRING(500), comment: '站点（逗号分隔）' })
  web_countrys!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '已授权站点（逗号分隔）',
  })
  haskey_web_countrys?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝appid',
  })
  ali_pay_appid?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '允许售卖的最贵商品价格',
    defaultValue: '300',
  })
  max_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '允许售卖的最便宜商品价格',
    defaultValue: '10',
  })
  min_price?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启刷单',
    defaultValue: '1',
  })
  if_open_swipe?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '刷单商品' })
  swipe_product?: string;

  @Column({
    type: DataType.STRING(100),
    comment: '刷单时间区间',
    defaultValue: '{"start_time":"16:00:00","end_time":"23:59:59"}',
  })
  swipe_time_array?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '系统刷单商品' })
  sys_swipe_product?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '触发刷单预警明细条数',
    defaultValue: '4',
  })
  min_swipe_count?: number;

  @Column({
    type: DataType.STRING(50),
    comment: '刷单默认发货人',
    defaultValue: '沈女士',
  })
  swipe_send_name?: string;

  @Column({
    type: DataType.STRING(50),
    comment: '刷单默认发货人手机号',
    defaultValue: '15657308109',
  })
  swipe_send_mobile?: string;

  @Column({ type: DataType.INTEGER, comment: '是否拉订单', defaultValue: '1' })
  if_pull_order?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '大额订单预警金额',
    defaultValue: '300.00',
  })
  warning_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开通归集',
    defaultValue: '0',
  })
  if_up_bank_transfer?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '开通网商后，是否提现到网商',
    defaultValue: '0',
  })
  if_open_bank_transfer?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '开通网商后，提现到网商的星期（1，2，3……7）',
  })
  day_of_open_bank_transfer?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: '开通网商后，提现到网商的具体时间点00:00:00',
  })
  time_of_open_bank_transfer?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺资金支付宝',
  })
  ali_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺资金支付宝支付密码',
  })
  ali_pay_pass?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺资金支付宝登录密码',
  })
  ali_log_pass?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺资金支付宝登录安全问题',
  })
  ali_log_ask?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '数据看板显示开店时间',
  })
  report_start_date?: Date;

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
