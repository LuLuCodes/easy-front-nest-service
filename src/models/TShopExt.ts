import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_shop_ext', timestamps: false, comment: '店铺拓展表' })
export class TShopExt extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '数据看板爬虫心跳时间',
  })
  shop_refresh_time?: Date;

  @Column({ type: DataType.INTEGER, comment: '访客实时', defaultValue: '0' })
  visitor_now_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '访客环比（%）',
    defaultValue: '0.00',
  })
  visitor_qoq?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '访客环比（1增加，2减少）',
    defaultValue: '0',
  })
  visitor_qoq_type?: number;

  @Column({ type: DataType.INTEGER, comment: '访客昨同', defaultValue: '0' })
  visitor_yesterday_now_count?: number;

  @Column({ type: DataType.INTEGER, comment: '访客昨总', defaultValue: '0' })
  visitor_yesterday_all_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车花费（元）',
    defaultValue: '0.00',
  })
  car_spend?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车余额（元）',
    defaultValue: '0.00',
  })
  car_balance?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车交易（元）',
    defaultValue: '0.00',
  })
  car_trade?: string;

  @Column({ type: DataType.INTEGER, comment: '直通车点击', defaultValue: '0' })
  car_click?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车ROI',
    defaultValue: '0.00',
  })
  car_roi?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '描述',
    defaultValue: '0.00',
  })
  describe_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '描述（1增加，2减少）',
    defaultValue: '0',
  })
  describe_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '服务',
    defaultValue: '0.00',
  })
  service_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '服务（1增加，2减少）',
    defaultValue: '0',
  })
  service_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '物流',
    defaultValue: '0.00',
  })
  logistics_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '物流（1增加，2减少）',
    defaultValue: '0',
  })
  logistics_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '基分',
    defaultValue: '0.00',
  })
  shop_point?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '年交易（元）',
    defaultValue: '0.00',
  })
  shop_trade?: string;

  @Column({ type: DataType.INTEGER, comment: '违规', defaultValue: '0' })
  shop_violation_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '违规（一般）',
    defaultValue: '0',
  })
  shop_violation_general?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '违规（严重）',
    defaultValue: '0',
  })
  shop_violation_serious?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车A类违规累计扣分',
    defaultValue: '0.00',
  })
  car_violation_a?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车B类违规累计扣分',
    defaultValue: '0.00',
  })
  car_violation_b?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '直通车C类违规累计扣分',
    defaultValue: '0.00',
  })
  car_violation_c?: string;

  @Column({ type: DataType.INTEGER, comment: '待开发票数', defaultValue: '0' })
  bill_count?: number;

  @Column({ type: DataType.INTEGER, comment: '投诉数量', defaultValue: '0' })
  complaint_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '店铺分析评分',
  })
  shop_analysis?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '店铺分析评分图片',
  })
  shop_analysis_img?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后上传时间' })
  shop_analysis_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '京东云剩余次数',
  })
  jd_limit_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '京东云最后更新时间',
  })
  jd_refresh_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '万邦当天剩余次数',
  })
  wb_limit_count?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '万邦接口到期时间' })
  wb_limit_day?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '万邦最后更新时间' })
  wb_refresh_time?: Date;

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
