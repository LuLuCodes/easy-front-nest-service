import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order", timestamps: false, comment: "\u8BA2\u5355\u8868" })
export class TOrder extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u8BA2\u5355\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u5F52\u5C5E\u4F01\u4E1A\u7F16\u7801", defaultValue: "0" })
    seller_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u5F52\u5C5E\u5E97\u94FA\u7F16\u7801", defaultValue: "0" })
    shop_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5BA2\u6237id" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5BA2\u6237\u6635\u79F0" })
    nick_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5BA2\u6237\u59D3\u540D" })
    real_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5BA2\u6237\u7535\u5B50\u90AE\u4EF6" })
    email?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u4F18\u60E0\u5238\u4E3B\u952E" })
    @Index({ name: "idx_coupon_id", using: "BTREE", order: "ASC", unique: false })
    coupon_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u8BA2\u5355\u7F16\u53F7" })
    @Index({ name: "idx_order_sn", using: "BTREE", order: "ASC", unique: true })
    order_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u9884\u652F\u4ED8\u4EA4\u6613\u4F1A\u8BDD\u6807\u8BC6" })
    prepay_id?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u8BA2\u5355\u603B\u91D1\u989D" })
    total_amount?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7C7B\u578B", defaultValue: "\u4EBA\u6C11\u5E01" })
    currency_type?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7B26\u53F7", defaultValue: "CNY" })
    currency_code?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5E94\u4ED8\u91D1\u989D\uFF08\u5B9E\u9645\u652F\u4ED8\u91D1\u989D\uFF09" })
    pay_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u8FD0\u8D39\u91D1\u989D" })
    freight_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4FC3\u9500\u4F18\u5316\u91D1\u989D\uFF08\u4FC3\u9500\u4EF7\u3001\u6EE1\u51CF\u3001\u9636\u68AF\u4EF7\uFF09" })
    promotion_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u79EF\u5206\u62B5\u6263\u91D1\u989D" })
    integration_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4F18\u60E0\u5238\u62B5\u6263\u91D1\u989D" })
    coupon_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7BA1\u7406\u5458\u540E\u53F0\u8C03\u6574\u8BA2\u5355\u4F7F\u7528\u7684\u6298\u6263\u91D1\u989D" })
    discount_amount?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u652F\u4ED8\u65B9\u5F0F\uFF1A0->\u672A\u652F\u4ED8\uFF1B1->\u652F\u4ED8\u5B9D\uFF1B2->\u5FAE\u4FE1\uFF1B3->\u94B1\u5305\u4F59\u989D" })
    pay_type?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u8BA2\u5355\u6765\u6E90\uFF1A0->PC\u8BA2\u5355\uFF1B1->app\u8BA2\u5355  3->\u7CFB\u7EDF\u540C\u6B65" })
    source_type?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u8BA2\u5355\u72B6\u6001\uFF1A0->\u5F85\u4ED8\u6B3E\uFF1B10->\u5F85\u53D1\u8D27\uFF1B20->\u90E8\u5206\u53D1\u8D27\uFF1B30->\u5DF2\u53D1\u8D27\uFF1B40->\u5DF2\u5B8C\u6210\uFF1B50->\u5DF2\u5173\u95ED\uFF1B60->\u65E0\u6548\u8BA2\u5355\uFF1B70->\u5DF2\u7ED3\u7B97" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    order_status?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u8BA2\u5355\u53D6\u6D88\u72B6\u6001\uFF1A0->\u672A\u53D6\u6D88\uFF1B1->\u5DF2\u53D6\u6D88\uFF1B", defaultValue: "0" })
    cancel_status?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u8BA2\u5355\u7C7B\u578B\uFF1A0->\u6B63\u5E38\u8BA2\u5355\uFF1B1->\u79D2\u6740\u8BA2\u5355" })
    order_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u7269\u6D41\u516C\u53F8(\u914D\u9001\u65B9\u5F0F)" })
    delivery_company?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u7269\u6D41\u5355\u53F7" })
    delivery_sn?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u662F\u5426\u662F\u722C\u866B\u53D1\u8D27" })
    is_reptile_delivery?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u81EA\u52A8\u786E\u8BA4\u65F6\u95F4\uFF08\u5929\uFF09" })
    auto_confirm_day?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u53EF\u4EE5\u83B7\u5F97\u7684\u79EF\u5206" })
    integration?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u53EF\u4EE5\u83B7\u5F97\u7684\u6210\u957F\u503C" })
    growth?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6D3B\u52A8\u4FE1\u606F" })
    promotion_info?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u53D1\u7968\u7C7B\u578B\uFF1A0->\u4E0D\u5F00\u53D1\u7968\uFF1B1->\u7535\u5B50\u53D1\u7968\uFF1B2->\u7EB8\u8D28\u53D1\u7968" })
    bill_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u53D1\u7968\u62AC\u5934" })
    bill_header?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u53D1\u7968\u5185\u5BB9" })
    bill_content?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u7968\u4EBA\u7535\u8BDD" })
    bill_receiver_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u6536\u7968\u4EBA\u90AE\u7BB1" })
    bill_receiver_email?: string;
    @Column({ type: DataType.INTEGER, comment: "\u7F16\u8F91\u6536\u8D27\u4FE1\u606F\u72B6\u6001\uFF080\u672A\u7F16\u8F91 1\u5DF2\u7F16\u8F91\u5F85\u5904\u7406 2\u5DF2\u5904\u7406\uFF09", defaultValue: "0" })
    edit_address_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u7F16\u8F91\u6536\u8D27\u4FE1\u606F\u5904\u7406\u4EBA", defaultValue: "0" })
    edit_address_user?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u7F16\u8F91\u6536\u8D27\u4FE1\u606F\u5904\u7406\u5907\u6CE8" })
    edit_address_remark?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7F16\u8F91\u6536\u8D27\u4FE1\u606F\u65F6\u95F4" })
    edit_address_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u59D3\u540D" })
    receiver_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u7F16\u8F91\u6536\u8D27\u4EBA\u59D3\u540D" })
    edit_receiver_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u59D3\u540D\uFF08\u52A0\u5BC6\uFF09" })
    ini_receiver_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u7535\u8BDD" })
    receiver_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u7F16\u8F91\u6536\u8D27\u4EBA\u7535\u8BDD\uFF08\u52A0\u5BC6\uFF09" })
    edit_receiver_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u7535\u8BDD\uFF08\u52A0\u5BC6\uFF09" })
    ini_receiver_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u56FD\u5BB6" })
    receiver_country?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u90AE\u7F16" })
    receiver_pcd_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u7F16\u8F91\u6536\u8D27\u4EBA\u90AE\u7F16" })
    edit_receiver_pcd_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u7701\u4EFD/\u76F4\u8F96\u5E02" })
    receiver_pcd_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u7F16\u8F91\u7701\u4EFD/\u76F4\u8F96\u5E02" })
    edit_receiver_pcd_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u5740" })
    receiver_detail_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u7F16\u8F91\u8BE6\u7EC6\u5730\u5740" })
    edit_receiver_detail_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u5740\uFF08\u52A0\u5BC6\uFF09" })
    ini_receiver_detail_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u57402" })
    receiver_detail_address2?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u57403" })
    receiver_detail_address3?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u8BA2\u5355\u5907\u6CE8" })
    note?: string;
    @Column({ type: DataType.INTEGER, comment: "\u5907\u6CE8\u662F\u5426\u9700\u4EBA\u5DE5\u5904\u7406\uFF081\u9700\u5904\u7406 0\u5DF2\u5904\u7406\uFF09", defaultValue: "0" })
    note_wait_deal?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u521D\u59CB\u8BA2\u5355\u5907\u6CE8" })
    ini_note?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u786E\u8BA4\u6536\u8D27\u72B6\u6001\uFF1A0->\u672A\u786E\u8BA4\uFF1B1->\u5DF2\u786E\u8BA4" })
    confirm_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E0B\u5355\u65F6\u4F7F\u7528\u7684\u79EF\u5206" })
    use_integration?: number;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\u7F51\u5740" })
    from_cps_url?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u5F02\u5E38\u5355\u8B66\u544A\uFF083\u8BA2\u5355\u5907\u6CE8\u8B66\u544A 2\u6570\u91CF\u8B66\u544A 1\u91D1\u989D\u8B66\u544A 0\u6B63\u5E38\uFF09", defaultValue: "0" })
    from_cps_warning?: number;
    @Column({ allowNull: true, type: DataType.STRING(20), comment: "\u4E09\u65B9\u5F02\u5E38\u5355\u8B66\u544A\u5907\u6CE8" })
    from_cps_warning_remark?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\uFF081:\u6DD8\u5B9D 2:\u5929\u732B 3:1688\uFF09" })
    from_cps_type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u539F\u5355\u53F7\u586B\u5145\u5730\u5740\u72B6\u6001\uFF080\u5F85\u586B\u5145 1\u586B\u5145\u4E2D 2\u5DF2\u586B\u5145 11\u586B\u5145\u5931\u8D25\uFF09", defaultValue: "0" })
    from_cps_sync_address?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5730\u5740\u540C\u6B65\u7ED3\u679C" })
    from_cps_sync_address_remark?: string;
    @Column({ type: DataType.BIGINT, comment: "\u4E09\u65B9\u539F\u5355\u53F7\u586B\u5145\u5730\u5740\u64CD\u4F5C\u4EBA", defaultValue: "0" })
    from_cps_sync_address_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u539F\u4E3B\u5355\u53F7" })
    @Index({ name: "idx_from_cps_tid", using: "BTREE", order: "ASC", unique: false })
    from_cps_tid?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u539F\u5B50\u5355\u53F7" })
    @Index({ name: "idx_from_cps_oid", using: "BTREE", order: "ASC", unique: false })
    from_cps_oid?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8BA4\u9886\u53BB\u5411\uFF081\u4E9A\u9A6C\u900A\u2026\u2026\uFF09" })
    to_cps_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u8BA4\u9886\u53BB\u5411\u8BA2\u5355\u53F7" })
    to_cps_order_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8BA4\u9886\u53BB\u5411\u7AD9\u70B9\u540D\u79F0\uFF08\u663E\u793A\u7528\uFF09" })
    to_web_country?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8BA4\u9886\u53BB\u5411\u7AD9\u70B9\u540D\u79F0\u7F16\u53F7\uFF08\u5BF9\u63A5\u7528\uFF09" })
    to_web_country_code?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8BA4\u9886\u540E\u5E73\u53D1\u8D27\u53F0\u540C\u6B65\u72B6\u6001\uFF080\u5F85\u540C\u6B65 10\u540C\u6B65\u6210\u529F 11\u540C\u6B65\u5931\u8D25\uFF09", defaultValue: "0" })
    to_cps_sync_status?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8BA4\u9886\u5E73\u53D1\u8D27\u53F0\u6700\u540E\u540C\u6B65\u65F6\u95F4" })
    to_cps_sync_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8BA4\u9886\u53BB\u5411\u8BA2\u5355\u914D\u9001\u65B9\u5F0F" })
    to_cps_delivery_type?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u652F\u4ED8\u65F6\u95F4" })
    payment_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u53D1\u8D27\u65F6\u95F4" })
    delivery_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u786E\u8BA4\u6536\u8D27\u65F6\u95F4" })
    receive_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8BC4\u4EF7\u65F6\u95F4" })
    comment_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "ioss\u7F16\u7801" })
    ioss_code?: string;
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