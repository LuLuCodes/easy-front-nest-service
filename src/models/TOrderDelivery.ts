import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_delivery", timestamps: false, comment: "\u8BA2\u5355\u53D1\u8D27\u5355\u8868" })
export class TOrderDelivery extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u53D1\u8D27\u5355\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u7CFB\u7EDF\u53D1\u8D27\u5355\u53F7" })
    delivery_code!: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u53D1\u8D27\u7ED3\u679CID" })
    feed_id?: string;
    @Column({ type: DataType.BIGINT, comment: "\u53D1\u8D27\u5355\u5F52\u5C5E\u4F01\u4E1A", defaultValue: "0" })
    seller_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u53D1\u8D27\u5355\u5F52\u5C5E\u5E97\u94FA", defaultValue: "0" })
    shop_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5206\u5305\u7C7B\u578B\uFF080\u6B63\u5E38\u5305\u88F9\uFF09", defaultValue: "0" })
    pack_type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5305\u88F9\u5C5E\u6027\uFF080\u666E\u901A 1\u5E26\u7535\uFF09", defaultValue: "0" })
    pack_attribute?: number;
    @Column({ type: DataType.INTEGER, comment: "\u56FD\u9645\u7269\u6D41\u7C7B\u578B\uFF081.\u7B2C\u4E09\u65B9\u7269\u6D41\uFF09", defaultValue: "0" })
    inter_type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\uFF081\u4E91\u9014\u7269\u6D41\uFF09", defaultValue: "0" })
    inter_company_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u8DDF\u8E2A\u7801" })
    track_sn?: string;
    @Column({ type: DataType.INTEGER, comment: "\u91CD\u91CF\uFF08\u514B\uFF09", defaultValue: "0" })
    pack_weight?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5165\u5E93\u91CD\u91CF\uFF08\u514B\uFF09", defaultValue: "0" })
    in_weight?: number;
    @Column({ type: DataType.INTEGER, comment: "\u51FA\u5E93\u91CD\u91CF\uFF08\u514B\uFF09", defaultValue: "0" })
    out_weight?: number;
    @Column({ type: DataType.INTEGER, comment: "\u957F\uFF08cm\uFF09", defaultValue: "0" })
    pack_long?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5BBD\uFF08cm\uFF09", defaultValue: "0" })
    pack_wide?: number;
    @Column({ type: DataType.INTEGER, comment: "\u9AD8\uFF08cm\uFF09", defaultValue: "0" })
    pack_high?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u53D1\u8D27\u65E5\u671F" })
    delivery_time?: Date;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u91C7\u8D2D\u6210\u672C", defaultValue: "0.00" })
    purchase_const?: string;
    @Column({ type: DataType.INTEGER, comment: "\u53D1\u8D27\u6570\u91CF", defaultValue: "0" })
    total_count?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u59D3\u540D" })
    receiver_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u56FD\u5BB6" })
    receiver_country?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u5740" })
    receiver_detail_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u57402" })
    receiver_detail_address2?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u8BE6\u7EC6\u5730\u57403" })
    receiver_detail_address3?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u7535\u8BDD" })
    receiver_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u90AE\u7F16" })
    receiver_pcd_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u6536\u8D27\u4EBA\u7701\u4EFD\u76F4\u8F96\u5E02" })
    receiver_pcd_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6D77\u5173\u7F16\u7801" })
    customs_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u589E\u503C\u7A0E\u53F7" })
    added_tax?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6B27\u76DF\u7A0E\u53F7" })
    eu_tax?: string;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u5907\u6CE8" })
    note?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u62CD\u7167", defaultValue: "0" })
    if_photo?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u52A0\u56FA", defaultValue: "0" })
    if_reinforce?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u6362\u7EB8\u76D2\u5B50", defaultValue: "0" })
    if_paper?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5BF9\u8D26\u72B6\u6001\uFF080\u672A\u5BF9\u8D26 10\u5DF2\u5BF9\u8D26\uFF09", defaultValue: "0" })
    confirm_status?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5BF9\u8D26\u65F6\u95F4" })
    confirm_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5BF9\u8D26\u4EBA" })
    confirm_user?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5BF9\u8D26\u4ED3\u5E93\u8D39\u7528", defaultValue: "0.00" })
    confirm_const?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8D27\u5355\u72B6\u6001\uFF080\b\u5F85\u5165\u5E93 1\u5DF2\u5165\u5E93 10\u5DF2\u51FA\u5E93\uFF09", defaultValue: "0" })
    pack_status?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8D27\u5355\u5165\u5E93\u65F6\u95F4" })
    pack_status_intime?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u8D27\u5355\u5165\u5E93\u4EBA" })
    pack_status_inuser?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8D27\u5355\u51FA\u5E93\u65F6\u95F4" })
    pack_status_outtime?: Date;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u8D27\u5355\u51FA\u5E93\u4EBA" })
    pack_status_outuser?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u56FD\u9645\u7269\u6D41\u8FD0\u8F93\u65B9\u5F0F" })
    inter_transport_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u56FD\u9645\u7269\u6D41\u8FD0\u8F93\u65B9\u5F0F" })
    inter_transport_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u5355\u53F7" })
    inter_company_sn?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u9884\u6536\u8FD0\u8D39", defaultValue: "0.00" })
    inter_company_fee?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u603B\u8FD0\u8D39", defaultValue: "0.00" })
    inter_company_realfee?: string;
    @Column({ type: DataType.INTEGER, comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u8FD0\u8D39\u7ED3\u7B97\u72B6\u6001\uFF080\u672A\u7ED3\u7B97 10\u5DF2\u7ED3\u7B97\uFF09", defaultValue: "0" })
    inter_company_feestatus?: number;
    @Column({ type: DataType.INTEGER, comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u91CD\u91CF", defaultValue: "0" })
    inter_company_weight?: number;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u8FD0\u8D39", defaultValue: "0.00" })
    inter_company_freight?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u71C3\u6CB9\u8D39", defaultValue: "0.00" })
    inter_company_gas?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u6302\u53F7\u8D39", defaultValue: "0.00" })
    inter_company_gh?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u5904\u7406\u8D39", defaultValue: "0.00" })
    inter_company_deal?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u56FD\u9645\u7B2C\u4E09\u65B9\u7269\u6D41\u5FEB\u9012\u7ED3\u7B97\u5176\u4ED6\u8D39", defaultValue: "0.00" })
    inter_company_other?: string;
    @Column({ type: DataType.BIGINT, comment: "\u7269\u6D41\u516C\u53F8\u7F16\u7801" })
    @Index({ name: "idx_delivery_company_id", using: "BTREE", order: "ASC", unique: false })
    delivery_company_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u7269\u6D41\u516C\u53F8\u540D\u79F0" })
    delivery_company_name?: string;
    @Column({ type: DataType.STRING(64), comment: "\u7269\u6D41\u5355\u53F7" })
    delivery_sn!: string;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u7F16\u53F7" })
    @Index({ name: "idx_order_id", using: "BTREE", order: "ASC", unique: false })
    order_id!: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    deleted?: number;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u521B\u5EFA\u4EBA" })
    creator_user?: string;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}