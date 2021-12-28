import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_item", timestamps: false, comment: "\u8BA2\u5355\u4E2D\u6240\u5305\u542B\u7684\u5546\u54C1" })
export class TOrderItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u7F16\u53F7" })
    @Index({ name: "idx_order_id", using: "BTREE", order: "ASC", unique: false })
    order_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "idx_product_id", using: "BTREE", order: "ASC", unique: false })
    product_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1SKU\u4E3B\u952E" })
    @Index({ name: "idx_sku_id", using: "BTREE", order: "ASC", unique: false })
    sku_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "sku\u53F7" })
    sku_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "sku\u7F16\u7801" })
    sku_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u4E09\u65B9upc" })
    to_cps_upc?: string;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\u7F51\u5740" })
    from_cps_url?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\uFF081:\u6DD8\u5B9D 2:\u5929\u732B 3:1688\uFF09" })
    from_cps_type?: number;
    @Column({ type: DataType.STRING(100), comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\u5B50\u5355\u53F7" })
    @Index({ name: "idx_from_cps_oid", using: "BTREE", order: "ASC", unique: false })
    from_cps_oid!: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u72B6\u6001\uFF080\u5F85\u91C7\u8D2D 1\u91C7\u8D2D\u4E2D 2\u5DF2\u91C7\u8D2D 11\u91C7\u8D2D\u5931\u8D25 12\u4EBA\u4E3A\u5E72\u9884\u5173\u95ED 13\u4EFB\u52A1\u6682\u505C\uFF09", defaultValue: "0" })
    from_cps_sync_purchase?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4E09\u65B9\u91C7\u8D2D\u722C\u866B\u9886\u53D6\u65F6\u95F4" })
    from_cps_sync_purchase_time?: Date;
    @Column({ type: DataType.BIGINT, comment: "\u4E09\u65B9\u91C7\u8D2D\u64CD\u4F5C\u4EBA", defaultValue: "0" })
    @Index({ name: "idx_from_cps_sync_purchase_id", using: "BTREE", order: "ASC", unique: false })
    from_cps_sync_purchase_id?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4E09\u65B9\u91C7\u8D2D\u72B6\u6001\u7ED3\u679C\u5907\u6CE8" })
    from_cps_sync_purchase_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E34\u65F6\u4E09\u65B9\u652F\u4ED8\u5355\u53F7" })
    temp_to_cps_tid?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E34\u65F6\u4E09\u65B9\u652F\u4ED8\u5355\u53F7\u5931\u8D25\u5907\u6CE8" })
    temp_to_cps_tid_remark?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u91C7\u8D2D\u6570\u91CF" })
    purchase_quantity?: number;
    @Column({ allowNull: true, type: DataType.STRING(128), comment: "\u91C7\u8D2D\u5546\u54C1\u540D\u79F0" })
    purchase_spu_name?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u91C7\u8D2D\u5730\u5740" })
    purchase_cps_url?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u91C7\u8D2D\u4E0A\u6E38\u56FE\u7247" })
    purchase_album_pics?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(18,2), comment: "\u91C7\u8D2D\u4E0A\u6E38\u5355\u4EF7" })
    purchase_const?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4E09\u65B9\u5546\u54C1\u8DF3\u8F6C\u5730\u5740" })
    to_cps_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u53F7" })
    @Index({ name: "idx_to_cps_tid", using: "BTREE", order: "ASC", unique: false })
    to_cps_tid?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u652F\u4ED8\u5355\u53F7" })
    @Index({ name: "idx_to_cps_ali_sn", using: "BTREE", order: "ASC", unique: false })
    to_cps_ali_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u652F\u4ED8\u5355\u53F7\u5931\u8D25\u5907\u6CE8" })
    to_cps_ali_remark?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u603B\u91D1\u989D", defaultValue: "0.00" })
    to_cps_total_amount?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u53D1\u8D27\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u6DD8\u5B9D\u5904\u7406\u6210\u529F 11\u6DD8\u5B9D\u5904\u7406\u5931\u8D25\uFF09", defaultValue: "0" })
    tb_cps_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u91C7\u8D2D\u652F\u4ED8\u65B9\u5F0F(1\u82B1\u5457 2\u4FE1\u7528\u5361 3\u4F59\u989D 4\u50A8\u84C4\u5361)", defaultValue: "0" })
    tb_cps_paytype?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u91C7\u8D2D\u652F\u4ED8\u65F6\u95F4" })
    tb_cps_paytime?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u53D1\u8D27\u5907\u6CE8" })
    tb_cps_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5546\u54C1\u4E3B\u56FE, \u53EF\u4EE5\u662Fspu\u4E3B\u56FE\uFF0C\u6216\u8005sku\u4E3B\u56FE" })
    product_pic_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(400), comment: "\u5546\u54C1\u540D\u79F0" })
    product_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u4E3B\u56FEurl" })
    sku_pic_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "sku\u5C5E\u6027\uFF0Cjson\u683C\u5F0F" })
    sku_sp_data?: string;
    @Column({ type: DataType.STRING(500), comment: "SKU\u5C5E\u6027\u63CF\u8FF0\uFF08\u6587\u672C\uFF09" })
    sku_properties_name!: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4E0B\u5355\u65F6\u7684\u4EF7\u683C\uFF08\u5982\u679C\u4F7F\u7528\u4F18\u60E0\u5238\uFF0C\u9700\u6263\u9664\u4F18\u60E0\u5238\u7684\u91D1\u989D\uFF09" })
    price?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7C7B\u578B", defaultValue: "\u4EBA\u6C11\u5E01" })
    currency_type?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7B26\u53F7", defaultValue: "CNY" })
    currency_code?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8D2D\u4E70\u6570\u91CF" })
    quantity?: number;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u5546\u54C1\u4FC3\u9500\u540D\u79F0" })
    promotion_name?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5546\u54C1\u4FC3\u9500\u5206\u89E3\u91D1\u989D" })
    promotion_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4F18\u60E0\u5238\u4F18\u60E0\u5206\u89E3\u91D1\u989D" })
    coupon_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u79EF\u5206\u4F18\u60E0\u5206\u89E3\u91D1\u989D" })
    integration_amount?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u8BE5\u5546\u54C1\u7ECF\u8FC7\u4F18\u60E0\u540E\u7684\u5206\u89E3\u91D1\u989D" })
    real_amount?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8D60\u9001\u7684\u79EF\u5206", defaultValue: "0" })
    gift_integration?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8D60\u9001\u7684\u6210\u957F\u503C", defaultValue: "0" })
    gift_growth?: number;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u5546\u54C1\u9500\u552E\u5C5E\u6027:[{\"key\":\"\u989C\u8272\",\"value\":\"\u989C\u8272\"},{\"key\":\"\u5BB9\u91CF\",\"value\":\"4G\"}]" })
    product_attr?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7EA7\u5DEE\u5956\u52B1\uFF08\u597D\u7269\u4F53\u9A8C\u5B98\uFF09" })
    reward_hw?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7EA7\u5DEE\u5956\u52B1\uFF08\u9996\u5E2D\u5206\u4EAB\u5B98\uFF09" })
    reward_sx?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7206\u5355\u5956\u52B1\uFF08\u4E00\u7EA7\uFF09" })
    reward_bd1?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7206\u5355\u5956\u52B1\uFF08\u4E8C\u7EA7\uFF09" })
    reward_bd2?: string;
    @Column({ allowNull: true, type: DataType.STRING(128), comment: "\u4E09\u65B9\u771F\u5B9E\u5546\u54C1\u540D\u79F0" })
    cps_spu_name?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5C5E\u6027\u522B\u540Djson[{\"key\":\"\u989C\u8272\u5206\u7C7B\",\"values\":[{\"display\":\"\u6CB9\u4EAE\u70AB\u9ED1\u8272\",\"real\":\"\u9ED1\u8272\"}]}]" })
    properties?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u6570\u91CF\u500D\u6570" })
    multiple?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "ioss\u7F16\u7801" })
    ioss_code?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u9700\u8981\u8D85\u7EA7\u91C7\u8D2D\u8D26\u53F7\u91C7\u8D2D", defaultValue: "0" })
    if_supper_buy?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u8D54\u4ED8\u91C7\u8D2D\u8BEF\u91C7\u7684\u5237\u5355\u6210\u672C\uFF080\u65E0\u5904\u7406 1\u4ECE\u652F\u4ED8\u5B9Da\u6253\u6B3E\u5230\u652F\u4ED8\u5B9Db\uFF08\u8FDB\u884C\u4E2D\uFF09 2\u4ECE\u652F\u4ED8\u5B9Da\u6253\u6B3E\u5230\u652F\u4ED8\u5B9Db\uFF08\u5DF2\u5B8C\u6210\uFF09 3\u4ECE\u652F\u4ED8\u5B9Db\u6253\u6B3E\u5230\u91C7\u8D2D\uFF08\u8FDB\u884C\u4E2D\uFF094\u4ECE\u652F\u4ED8\u5B9Db\u6253\u6B3E\u5230\u91C7\u8D2D\uFF08\u5DF2\u7ECF\u5B8C\u6210\uFF095\u652F\u4ED8\u5B9Da->b\u5931\u8D25 6\u652F\u4ED8\u5B9Db->\u91C7\u8D2D\u5931\u8D25\uFF09", defaultValue: "0" })
    error_purchase?: number;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u8D54\u4ED8\u91C7\u8D2D\u8BEF\u91C7\u7684\u5237\u5355\u6210\u672C", defaultValue: "0.00" })
    error_purchase_amount?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u652F\u4ED8\u5B9Da->\u652F\u4ED8\u5B9Db\u6D41\u6C34\u53F7" })
    error_purchase_ali_sn_a?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u652F\u4ED8\u5B9Da->\u652F\u4ED8\u5B9Db\u5907\u6CE8" })
    error_purchase_ali_sn_aremark?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u652F\u4ED8\u5B9Db->\u91C7\u8D2D\u6D41\u6C34\u53F7" })
    error_purchase_ali_sn_b?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u652F\u4ED8\u5B9Db->\u91C7\u8D2D\u6D41\u6C34\u53F7" })
    error_purchase_ali_sn_bremark?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8D54\u4ED8\u91C7\u8D2D\u8BEF\u91C7\u7684\u4E0A\u6E38\u9000\u6B3E\u65F6\u95F4" })
    error_purchase_const_time?: Date;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u8D54\u4ED8\u91C7\u8D2D\u8BEF\u91C7\u7684\u4E0A\u6E38\u9000\u6B3E\u91D1\u989D", defaultValue: "0.00" })
    error_purchase_const_rma?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    @Index({ name: "idx_create_time", using: "BTREE", order: "ASC", unique: false })
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