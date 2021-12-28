import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_spu", timestamps: false, comment: "\u5546\u54C1\u8868(SPU)" })
export class TProductSpu extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u7C7B\u522B\u6765\u6E90\uFF080\u5E73\u53F0\u540E\u53F0 1\u5546\u5BB6\u540E\u53F0\uFF09", defaultValue: "0" })
    source_type?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7C7B\u522B\u6765\u6E90\u7F16\u7801", defaultValue: "0" })
    source_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5F52\u5C5E\u5E97\u94FA" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id?: number;
    @Column({ type: DataType.STRING(200), comment: "\u5546\u54C1\u540D\u79F0" })
    @Index({ name: "idx_spu_name", using: "BTREE", order: "ASC", unique: false })
    spu_name!: string;
    @Column({ allowNull: true, type: DataType.STRING(128), comment: "\u5546\u54C1\u62D3\u5C55\u540D" })
    spu_name_ext?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6240\u5C5Esku\u6570\u91CF", defaultValue: "0" })
    sku_count?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u54C1\u724C\u4E3B\u952E", defaultValue: "0" })
    @Index({ name: "idx_brand_id", using: "BTREE", order: "ASC", unique: false })
    brand_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u54C1\u724C\u540D\u79F0" })
    brand_name?: string;
    @Column({ type: DataType.BIGINT, comment: "\u7C7B\u76EE\u4E3B\u952E" })
    @Index({ name: "idx_category_id", using: "BTREE", order: "ASC", unique: false })
    category_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u7C7B\u522B\u8DEF\u5F84" })
    category_path?: string;
    @Column({ type: DataType.STRING(64), comment: "\u7C7B\u76EE\u540D\u79F0" })
    category_name!: string;
    @Column({ type: DataType.STRING(2000), comment: "\u4E3B\u56FEurl" })
    pic_url!: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u8D27\u53F7" })
    @Index({ name: "idx_product_sn", using: "BTREE", order: "ASC", unique: false })
    product_sn?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u4E0A\u67B6\u72B6\u6001\uFF1A0->\u4E0B\u67B6\uFF1B1->\u4E0A\u67B6", defaultValue: "0" })
    publish_status?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u6700\u540E\u4E00\u6B21\u4E0A\u67B6\u65F6\u95F4" })
    last_publish_time?: Date;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u65B0\u54C1\u72B6\u6001:0->\u4E0D\u662F\u65B0\u54C1\uFF1B1->\u65B0\u54C1", defaultValue: "0" })
    is_new?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u70ED\u95E8\u72B6\u6001:0->\u4E0D\u662F\u65B0\u54C1\uFF1B1->\u65B0\u54C1", defaultValue: "0" })
    is_hot?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u63A8\u8350\u72B6\u6001\uFF1B0->\u4E0D\u63A8\u8350\uFF1B1->\u63A8\u8350", defaultValue: "0" })
    is_recommend?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u5BA1\u6838\u72B6\u6001\uFF1A0->\u672A\u5BA1\u6838\uFF1B1->\u5BA1\u6838\u901A\u8FC7", defaultValue: "0" })
    verify_status?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u4E3A\u9884\u552E\u5546\u54C1\uFF1A0->\u4E0D\u662F\uFF1B1->\u662F", defaultValue: "0" })
    preview_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E93\u5B58", defaultValue: "0" })
    stock?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9884\u8B66\u5E93\u5B58", defaultValue: "0" })
    low_stock?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9501\u5B9A\u5E93\u5B58", defaultValue: "0" })
    lock_stock?: number;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7C7B\u578B", defaultValue: "\u4EBA\u6C11\u5E01" })
    currency_type?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7B26\u53F7", defaultValue: "CNY" })
    currency_code?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5E02\u573A\u4EF7(\u539F\u4EF7)", defaultValue: "0.00" })
    original_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u9500\u552E\u4EF7", defaultValue: "0.00" })
    sale_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u6210\u672C\u4EF7", defaultValue: "0.00" })
    cost_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4FC3\u9500\u4EF7", defaultValue: "0.00" })
    promotion_price?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4FC3\u9500\u5F00\u59CB\u65F6\u95F4" })
    promotion_start_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4FC3\u9500\u7ED3\u675F\u65F6\u95F4" })
    promotion_end_time?: Date;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6D3B\u52A8\u9650\u8D2D\u6570\u91CF" })
    promotion_per_limit?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4FC3\u9500\u7C7B\u578B\uFF1A0->\u6CA1\u6709\u4FC3\u9500\u4F7F\u7528\u9500\u552E\u4EF7;1->\u4F7F\u7528\u4FC3\u9500\u4EF7\uFF1B2->\u4F7F\u7528\u4F1A\u5458\u4EF7\uFF1B3->\u4F7F\u7528\u9636\u68AF\u4EF7\u683C\uFF1B4->\u4F7F\u7528\u6EE1\u51CF\u4EF7\u683C\uFF1B5->\u9650\u65F6\u8D2D" })
    price_type?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8D60\u9001\u7684\u79EF\u5206", defaultValue: "0" })
    gift_point?: number;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u526F\u6807\u9898" })
    sub_title?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5546\u54C1\u63CF\u8FF0" })
    spu_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(16), comment: "\u5355\u4F4D" })
    unit?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u91CD\u91CF(\u514B)", defaultValue: "0" })
    weight?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u4EE5\u9017\u53F7\u5206\u5272\u7684\u4EA7\u54C1\u670D\u52A1\uFF1A1->\u65E0\u5FE7\u9000\u8D27\uFF1B2->\u5FEB\u901F\u9000\u6B3E\uFF1B3->\u514D\u8D39\u5305\u90AE" })
    service_ids?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5173\u952E\u5B57" })
    keywords?: string;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u8D85\u7EA7\u5173\u952E\u5B57" })
    super_keywords?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5546\u54C1\u753B\u518C\uFF0C\u9650\u5236\u4E3A5\u5F20\uFF0C\u4EE5\u9017\u53F7\u5206\u5272" })
    album_pics?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5546\u54C1\u753B\u518C\uFF0C\u9650\u5236\u4E3A5\u5F20\uFF0C\u4EE5\u9017\u53F7\u5206\u5272(\u521D\u59CB)" })
    ori_album_pics?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u8BE6\u60C5\u6807\u9898" })
    detail_title?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u8BE6\u60C5\u63CF\u8FF0" })
    detail_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4EA7\u54C1\u8BE6\u60C5\u5BCC\u6587\u672C" })
    detail_html?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4EA7\u54C1\u8BE6\u60C5\u5BCC\u6587\u672C(\u521D\u59CB)" })
    ori_detail_html?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5546\u54C1\u8BE6\u60C5\u56FE\uFF0C\u4EE5\u9017\u53F7\u5206\u9694" })
    detail_pics?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5907\u6CE8" })
    note?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u5F02\u5E38\u8B66\u544A\uFF080\u6B63\u5E38 1\u8BE6\u60C5\u56FE\u5C0F\u4E8E3 2sku\u4EF7\u683C\u4E00\u81F4 3\u4E0A\u6E38\u5E97\u94FA\u5546\u54C1\u6570\u4E3A0\uFF09", defaultValue: "0" })
    from_cps_warning?: number;
    @Column({ allowNull: true, type: DataType.STRING(20), comment: "\u4E09\u65B9\u5F02\u5E38\u8B66\u544A" })
    from_cps_warning_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(128), comment: "\u5206\u4EAB\u6807\u9898" })
    share_title?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5206\u4EAB\u63CF\u8FF0" })
    share_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5206\u4EAB\u7F29\u7565\u56FEurl" })
    share_pic_url?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9500\u91CF", defaultValue: "0" })
    sale?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    sort?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u5546\u54C1\u72B6\u6001\uFF081\u521D\u59CB,2\u8BA4\u9886\uFF09", defaultValue: "0" })
    spu_cps_status?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA4\u9886\u540E\u7684\u5546\u54C1\u7684\u539F\u7236\u4EB2", defaultValue: "0" })
    @Index({ name: "idx_father_spu", using: "BTREE", order: "ASC", unique: false })
    father_spu?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\u7F51\u5740" })
    from_cps_url?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u5546\u54C1\u6765\u6E90\uFF081:\u6DD8\u5B9D 2:\u5929\u732B 3:1688\uFF09" })
    from_cps_type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u6765\u6E90\u662F\u5426\u5220\u9664", defaultValue: "0" })
    from_cps_isdel?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8BA4\u9886\u540E\u53BB\u5411\uFF081\u4E9A\u9A6C\u900A\u2026\u2026\uFF09" })
    to_cps_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u4E09\u65B9\u5206\u7C7B\u8282\u70B9" })
    to_cps_category?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u8BA4\u9886\u53BB\u5411\u7AD9\u70B9\u5730\u5740" })
    to_cps_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8BA4\u9886\u540E\u53BB\u5411\u7AD9\u70B9\u540D\u79F0\uFF08\u663E\u793A\u7528\uFF09" })
    to_web_country?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u8BA4\u9886\u540E\u53BB\u5411\u7AD9\u70B9\u540D\u79F0\u7F16\u53F7\uFF08\u5BF9\u63A5\u7528\uFF09" })
    to_web_country_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5236\u9020\u5546" })
    manufacturer?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u5356\u70B9\u8981\u70B9" })
    selling_point?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u751F\u4EA7\u65E5\u671F" })
    manufacture_day?: string;
    @Column({ allowNull: true, type: DataType.STRING(20), comment: "\u53D1\u8D27\u5730" })
    deliver_place?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u53D1\u8D27\u5730\u5907\u6CE8" })
    deliver_remark?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u662F\u5426\u652F\u63017\u5929\u65E0\u7406\u7531\u9000\u8D27" })
    is_rma?: number;
    @Column({ type: DataType.STRING(50), comment: "\u521B\u5EFA\u4EBA\u59D3\u540D" })
    username!: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u6570\u91CF\u500D\u6570", defaultValue: "1" })
    cps_multiple?: number;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u7C7B\u578B" })
    from_shop_type?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u540D\u79F0" })
    from_shop_name?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u8BC4\u52061" })
    from_shop_point1?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u8BC4\u52062" })
    from_shop_point2?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u8BC4\u52063" })
    from_shop_point3?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u5546\u54C1\u6570" })
    from_shop_item_count?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u5546\u54C1\u9500\u91CF" })
    from_shop_item_sale?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4E09\u65B9\u6765\u6E90\u5E97\u94FA\u5546\u54C1\u8BC4\u8BBA\u6570" })
    from_shop_item_comment?: number;
    @Column({ allowNull: true, type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u6765\u6E90\u5546\u54C1\u8BC4\u5206" })
    from_item_point?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u540C\u6B65\u4E09\u65B9\u72B6\u6001\uFF081\u6210\u529F 2\u5931\u8D25\uFF09" })
    sync_cps_status?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u540C\u6B65\u4E09\u65B9\u5907\u6CE8" })
    sync_cps_status_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u4E09\u65B9\u7CFB\u5217" })
    cps_series?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u4E09\u65B9\u89C4\u683C" })
    cps_spec?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u84DD\u6D77\u8BCD" })
    tb_key_word?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u8FD0\u8D39\u6A21\u677F\u7CFB\u7EDF\u7F16\u7801" })
    tb_freight_template_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5546\u54C1\u8FD0\u8D39\u6A21\u677F" })
    tb_freight_template?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4E0D\u53D1\u8D27\u533A\u57DF" })
    no_translate_areas?: string;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    @Index({ name: "idx_product_sn", using: "BTREE", order: "ASC", unique: false })
    deleted?: number;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}