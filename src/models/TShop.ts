import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop", timestamps: false, comment: "\u5E97\u94FA\u8868" })
export class TShop extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u4F01\u4E1A\u7F16\u7801" })
    @Index({ name: "idx_seller_id", using: "BTREE", order: "ASC", unique: false })
    seller_id!: number;
    @Column({ type: DataType.STRING(100), comment: "\u5E97\u94FA\u540D\u79F0" })
    shop_name!: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u5C55\u793A\u5728\u8FD0\u8425\u7AEF", defaultValue: "0" })
    if_show_yy?: number;
    @Column({ allowNull: true, type: DataType.STRING(36), comment: "\u5F52\u5C5E\u4EE3\u7406\u5546account_code" })
    @Index({ name: "idx_agent_account_code", using: "BTREE", order: "ASC", unique: false })
    agent_account_code?: string;
    @Column({ type: DataType.INTEGER, comment: "\u5E97\u94FA\u7C7B\u578B\uFF081\u4E9A\u9A6C\u900A,2\u6DD8\u5B9D,3\u5929\u732B\u2026\u2026\uFF09" })
    cps_type!: number;
    @Column({ type: DataType.STRING(100), comment: "\u5E97\u94FA\u8D26\u53F7" })
    cps_account!: string;
    @Column({ type: DataType.STRING(100), comment: "\u5356\u5BB6ID" })
    cps_appid!: string;
    @Column({ type: DataType.STRING(100), comment: "\u6388\u6743\u7801" })
    cps_secret!: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u4E09\u65B9\u54C1\u724C" })
    cps_brand?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8FD0\u8D39\u6A21\u7248" })
    cps_postage_id?: string;
    @Column({ type: DataType.STRING(500), comment: "\u7AD9\u70B9\uFF08\u9017\u53F7\u5206\u9694\uFF09" })
    web_countrys!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5DF2\u6388\u6743\u7AD9\u70B9\uFF08\u9017\u53F7\u5206\u9694\uFF09" })
    haskey_web_countrys?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u652F\u4ED8\u5B9Dappid" })
    ali_pay_appid?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u5141\u8BB8\u552E\u5356\u7684\u6700\u8D35\u5546\u54C1\u4EF7\u683C", defaultValue: "300" })
    max_price?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u5F00\u542F\u5237\u5355", defaultValue: "1" })
    if_open_swipe?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5237\u5355\u5546\u54C1" })
    swipe_product?: string;
    @Column({ type: DataType.STRING(100), comment: "\u5237\u5355\u65F6\u95F4\u533A\u95F4", defaultValue: "{\"start_time\":\"16:00:00\",\"end_time\":\"23:59:59\"}" })
    swipe_time_array?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u7CFB\u7EDF\u5237\u5355\u5546\u54C1" })
    sys_swipe_product?: string;
    @Column({ type: DataType.INTEGER, comment: "\u89E6\u53D1\u5237\u5355\u9884\u8B66\u660E\u7EC6\u6761\u6570", defaultValue: "4" })
    min_swipe_count?: number;
    @Column({ type: DataType.STRING(50), comment: "\u5237\u5355\u9ED8\u8BA4\u53D1\u8D27\u4EBA", defaultValue: "\u6C88\u5973\u58EB" })
    swipe_send_name?: string;
    @Column({ type: DataType.STRING(50), comment: "\u5237\u5355\u9ED8\u8BA4\u53D1\u8D27\u4EBA\u624B\u673A\u53F7", defaultValue: "15657308109" })
    swipe_send_mobile?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u62C9\u8BA2\u5355", defaultValue: "1" })
    if_pull_order?: number;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5927\u989D\u8BA2\u5355\u9884\u8B66\u91D1\u989D", defaultValue: "300.00" })
    warning_amount?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u5F00\u901A\u5F52\u96C6", defaultValue: "0" })
    if_up_bank_transfer?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5E97\u94FA\u8D44\u91D1\u652F\u4ED8\u5B9D" })
    ali_account?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5E97\u94FA\u8D44\u91D1\u652F\u4ED8\u5B9D\u652F\u4ED8\u5BC6\u7801" })
    ali_pay_pass?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5E97\u94FA\u8D44\u91D1\u652F\u4ED8\u5B9D\u767B\u5F55\u5BC6\u7801" })
    ali_log_pass?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5E97\u94FA\u8D44\u91D1\u652F\u4ED8\u5B9D\u767B\u5F55\u5B89\u5168\u95EE\u9898" })
    ali_log_ask?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u6570\u636E\u770B\u677F\u663E\u793A\u5F00\u5E97\u65F6\u95F4" })
    report_start_date?: Date;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    deleted?: number;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}