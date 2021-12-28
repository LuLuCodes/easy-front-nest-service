import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_swipe_up", timestamps: false, comment: "\u5E97\u94FA\u5237\u5355-\u5237\u5355\u4E0A\u4F20\u8868" })
export class TShopSwipeUp extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u5237\u5355\u7C7B\u578B\uFF081\u7CBE\u51C6\u5237\u5355 21\u62D66\u6279\u91CF\u5237\u5355\uFF09", defaultValue: "1" })
    swipe_type?: number;
    @Column({ type: DataType.DATE, comment: "\u4E0A\u62A5\u65F6\u95F4\uFF08\u5E74\u6708\u65E5\uFF09" })
    @Index({ name: "idx_up_time", using: "BTREE", order: "ASC", unique: false })
    up_time!: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u8BA2\u5355\u7F16\u7801" })
    @Index({ name: "idx_from_cps_tid", using: "BTREE", order: "ASC", unique: false })
    from_cps_tid?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u4E0B\u5355\u4EBA\u65FA\u65FA\u53F7" })
    @Index({ name: "idx_nick_name", using: "BTREE", order: "ASC", unique: false })
    nick_name?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u6B3E\u7CFB\u7EDF\u7F16\u7801\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09" })
    spu_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(300), comment: "\u6B3E\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09" })
    spu_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(300), comment: "\u6B3E\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09" })
    product_sn?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "SKU\u7CFB\u7EDF\u7F16\u7801\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09" })
    sku_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(300), comment: "SKU\u540D\u79F0\uFF08\u9ED8\u8BA4\u53D61\u4E2A\uFF09" })
    sku_name?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8BA2\u5355\u91D1\u989D", defaultValue: "0.00" })
    order_amount?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8BA2\u5355\u4E0B\u5355\u65F6\u95F4" })
    @Index({ name: "idx_order_create_time", using: "BTREE", order: "ASC", unique: false })
    order_create_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8BA2\u5355\u652F\u4ED8\u65F6\u95F4" })
    order_payment_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u7701\u4EFD/\u76F4\u8F96\u5E02" })
    receiver_pcd_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u5740" })
    receiver_detail_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u59D3\u540D" })
    receiver_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u7535\u8BDD" })
    receiver_phone?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u4F63\u91D1", defaultValue: "0.00" })
    swipe_fee?: string;
    @Column({ type: DataType.INTEGER, comment: "\u7ED3\u7B97\u72B6\u6001\uFF080\u672A\u7ED3\u7B97 1\u5DF2\u7ED3\u7B97\uFF09", defaultValue: "0" })
    settle_status?: number;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u7ED3\u7B97\u91D1\u989D", defaultValue: "0.00" })
    settle_amount?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7ED3\u7B97\u65F6\u95F4" })
    settle_time?: Date;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u7ED3\u7B97\u4EBA" })
    settle_user_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u7ED3\u7B97\u4EBA" })
    settle_user?: string;
    @Column({ type: DataType.INTEGER, comment: "\u9A8C\u8BC1\u72B6\u6001\uFF080\u9A8C\u8BC1\u4E2D 1\u6709\u6548 2\u5F02\u5E38\uFF09", defaultValue: "0" })
    check_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u6392\u9519\uFF080\u6B63\u5E38 1\u62CD\u9519\uFF09", defaultValue: "0" })
    if_error?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5907\u6CE8\u4FE1\u606F" })
    opt_remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u540C\u6B65\u53D1\u8D27\u72B6\u6001\uFF080\u5F85\u53D1\u8D27 1\u53D1\u8D27\u6210\u529F\uFF09", defaultValue: "0" })
    sync_gift_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u793C\u54C1\u7F51\u5907\u6CE8\u4FE1\u606F" })
    sync_gift_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u793C\u54C1\u7F51\u6D41\u6C34\u53F7" })
    sync_gift_sn?: string;
    @Column({ type: DataType.INTEGER, comment: "\u793C\u54C1\u7F51\u8BA2\u5355\u521B\u5EFA\u72B6\u6001(0\u5F85\u521B\u5EFA 1\u5DF2\u521B\u5EFA 2\u521B\u5EFA\u5931\u8D25)", defaultValue: "0" })
    add_gift_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u793C\u54C1\u7F51\u8BA2\u5355\u521B\u5EFA\u5907\u6CE8" })
    add_gift_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u521B\u5EFA\u4EBA" })
    creator_user?: string;
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