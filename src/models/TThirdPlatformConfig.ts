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
  tableName: 't_third_platform_config',
  timestamps: false,
  comment: '三方平台配置',
})
export class TThirdPlatformConfig extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
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

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '公众号AppID',
  })
  wx_appid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '公众号AppSecret',
  })
  wx_appsecret?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '平台token(非access token)',
  })
  wx_token?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '微信小程序AppID',
  })
  wx_miniprogram_appid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '微信小程序AppSecret',
  })
  wx_miniprogram_appsecret?: string;

  @Column({ type: DataType.STRING(32), comment: '开放平台APPID' })
  wx_open_appid!: string;

  @Column({ type: DataType.STRING(255), comment: '开放平台AppSecret' })
  wx_open_appsecret!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(32),
    comment: '微信商户号ID',
  })
  wx_pay_mchid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '微信商户ApiSecret',
  })
  wx_pay_apisecret?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '微信商户ApiSecret3',
  })
  wx_pay_api3secret?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '微信支付回调地址',
  })
  wx_pay_notify_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '微信支付退款回调地址',
  })
  wx_pay_refund_notify_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '微信支付证书序列号',
  })
  wx_pay_serial_no?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '微信支付平台证书序列号',
  })
  wx_pay_plat_serial_no?: string;

  @Column({ type: DataType.STRING(255), comment: '微信充值会员支付回调地址' })
  wx_pay_recharge_notify_url!: string;

  @Column({ type: DataType.STRING(32), comment: '支付宝appid' })
  ali_pay_appid!: string;

  @Column({
    type: DataType.STRING(32),
    comment: '合作身份者ID，签约账号，以2088开头由16位纯数字组成的字符串',
  })
  ali_pay_partner!: string;

  @Column({
    type: DataType.STRING(32),
    comment:
      '收款支付宝账号，以2088开头由16位纯数字组成的字符串，一般情况下收款账号就是签约账号',
  })
  ali_pay_seller_id!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝账号姓名',
  })
  ali_pay_name?: string;

  @Column({
    type: DataType.STRING(255),
    comment:
      '服务器异步通知页面路径，需http://格式的完整路径，不能加?id=123这类自定义参数,必须外网可以正常访问',
  })
  ali_pay_notify_url!: string;

  @Column({
    type: DataType.STRING(255),
    comment:
      '服务器异步通知页面路径，需http://格式的完整路径，不能加?id=123这类自定义参数,必须外网可以正常访问',
  })
  ali_pay_recharge_notify_url!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
