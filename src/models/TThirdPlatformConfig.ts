import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_third_platform_config", timestamps: false, comment: "\u4E09\u65B9\u5E73\u53F0\u914D\u7F6E" })
export class TThirdPlatformConfig extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, comment: "\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u516C\u4F17\u53F7AppID" })
    wx_appid?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u516C\u4F17\u53F7AppSecret" })
    wx_appsecret?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u5E73\u53F0token(\u975Eaccess token)" })
    wx_token?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8FAppID" })
    wx_miniprogram_appid?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8FAppSecret" })
    wx_miniprogram_appsecret?: string;
    @Column({ type: DataType.STRING(32), comment: "\u5F00\u653E\u5E73\u53F0APPID" })
    wx_open_appid!: string;
    @Column({ type: DataType.STRING(255), comment: "\u5F00\u653E\u5E73\u53F0AppSecret" })
    wx_open_appsecret!: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u5FAE\u4FE1\u5546\u6237\u53F7ID" })
    wx_pay_mchid?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u5546\u6237ApiSecret" })
    wx_pay_apisecret?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u5546\u6237ApiSecret3" })
    wx_pay_api3secret?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u652F\u4ED8\u56DE\u8C03\u5730\u5740" })
    wx_pay_notify_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u652F\u4ED8\u9000\u6B3E\u56DE\u8C03\u5730\u5740" })
    wx_pay_refund_notify_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5FAE\u4FE1\u652F\u4ED8\u8BC1\u4E66\u5E8F\u5217\u53F7" })
    wx_pay_serial_no?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5FAE\u4FE1\u652F\u4ED8\u5E73\u53F0\u8BC1\u4E66\u5E8F\u5217\u53F7" })
    wx_pay_plat_serial_no?: string;
    @Column({ type: DataType.STRING(255), comment: "\u5FAE\u4FE1\u5145\u503C\u4F1A\u5458\u652F\u4ED8\u56DE\u8C03\u5730\u5740" })
    wx_pay_recharge_notify_url!: string;
    @Column({ type: DataType.STRING(32), comment: "\u652F\u4ED8\u5B9Dappid" })
    ali_pay_appid!: string;
    @Column({ type: DataType.STRING(32), comment: "\u5408\u4F5C\u8EAB\u4EFD\u8005ID\uFF0C\u7B7E\u7EA6\u8D26\u53F7\uFF0C\u4EE52088\u5F00\u5934\u753116\u4F4D\u7EAF\u6570\u5B57\u7EC4\u6210\u7684\u5B57\u7B26\u4E32" })
    ali_pay_partner!: string;
    @Column({ type: DataType.STRING(32), comment: "\u6536\u6B3E\u652F\u4ED8\u5B9D\u8D26\u53F7\uFF0C\u4EE52088\u5F00\u5934\u753116\u4F4D\u7EAF\u6570\u5B57\u7EC4\u6210\u7684\u5B57\u7B26\u4E32\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\u6536\u6B3E\u8D26\u53F7\u5C31\u662F\u7B7E\u7EA6\u8D26\u53F7" })
    ali_pay_seller_id!: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u652F\u4ED8\u5B9D\u8D26\u53F7\u59D3\u540D" })
    ali_pay_name?: string;
    @Column({ type: DataType.STRING(255), comment: "\u670D\u52A1\u5668\u5F02\u6B65\u901A\u77E5\u9875\u9762\u8DEF\u5F84\uFF0C\u9700http://\u683C\u5F0F\u7684\u5B8C\u6574\u8DEF\u5F84\uFF0C\u4E0D\u80FD\u52A0?id=123\u8FD9\u7C7B\u81EA\u5B9A\u4E49\u53C2\u6570,\u5FC5\u987B\u5916\u7F51\u53EF\u4EE5\u6B63\u5E38\u8BBF\u95EE" })
    ali_pay_notify_url!: string;
    @Column({ type: DataType.STRING(255), comment: "\u670D\u52A1\u5668\u5F02\u6B65\u901A\u77E5\u9875\u9762\u8DEF\u5F84\uFF0C\u9700http://\u683C\u5F0F\u7684\u5B8C\u6574\u8DEF\u5F84\uFF0C\u4E0D\u80FD\u52A0?id=123\u8FD9\u7C7B\u81EA\u5B9A\u4E49\u53C2\u6570,\u5FC5\u987B\u5916\u7F51\u53EF\u4EE5\u6B63\u5E38\u8BBF\u95EE" })
    ali_pay_recharge_notify_url!: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    deleted?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}