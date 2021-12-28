import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_account_platform", timestamps: false, comment: "\u7B2C\u4E09\u65B9\u7528\u6237\u4FE1\u606F" })
export class TAccountPlatform extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u81EA\u589Eid" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(36), comment: "\u8D26\u6237code" })
    @Index({ name: "idx_account_code", using: "BTREE", order: "ASC", unique: false })
    account_code!: string;
    @Column({ type: DataType.STRING(60), comment: "\u5E73\u53F0id\uFF0C\u591A\u4E2Aapp\u5171\u540C\u4E00\u4E2A\u8D26\u53F7" })
    @Index({ name: "idx_platform_id", using: "BTREE", order: "ASC", unique: false })
    platform_id!: string;
    @Column({ type: DataType.STRING(60), comment: "\u5E73\u53F0access_token" })
    platform_token!: string;
    @Column({ type: DataType.TINYINT, comment: "\u5E73\u53F0\u7C7B\u578B 0-\u672A\u77E5,1-\u5FAE\u4FE1\u516C\u4F17\u53F7 2-\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F 3-\u5FAE\u4FE1\u5F00\u653E\u5E73\u53F0", defaultValue: "0" })
    type?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u6027\u522B\uFF1A0 \u672A\u77E5\uFF0C 1\u7537\uFF0C 2 \u5973", defaultValue: "0" })
    gender?: number;
    @Column({ type: DataType.STRING(60), comment: "\u6635\u79F0" })
    nick_name!: string;
    @Column({ type: DataType.STRING(255), comment: "\u5934\u50CF" })
    avatar_url!: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5FAE\u4FE1\u767B\u5F55openid" })
    wx_openid?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5FAE\u4FE1\u767B\u5F55unionid" })
    @Index({ name: "idx_wx_unionid", using: "BTREE", order: "ASC", unique: false })
    wx_unionid?: string;
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