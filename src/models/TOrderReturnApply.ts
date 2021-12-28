import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_return_apply", timestamps: false, comment: "\u8BA2\u5355\u9000\u8D27\u7533\u8BF7" })
export class TOrderReturnApply extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9000\u5355\u7F16\u53F7" })
    return_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9000\u5355\u6765\u6E90\u7F16\u53F7" })
    @Index({ name: "idx_from_cps_sn", using: "BTREE", order: "ASC", unique: false })
    from_cps_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u91C7\u8D2D\u9000\u5355\u7F16\u53F7" })
    to_cps_sn?: string;
    @Column({ type: DataType.INTEGER, comment: "\u539F\u59CB\u9000\u8D27\u5355\u722C\u866B\u540C\u6B65\u91C7\u8D2D\u9000\u8D27\u72B6\u6001\uFF080\u5F85\u722C\u866B\u9886\u53D6 1\u5DF2\u9886\u53D6 3\u722C\u866B\u5904\u7406\u4E2D 2\u5904\u7406\u6210\u529F 11\u91C7\u8D2D\u4E0A\u6E38\u62D2\u7EDD\uFF09", defaultValue: "0" })
    from_cps_sync_rma?: number;
    @Column({ type: DataType.BIGINT, comment: "\u539F\u59CB\u9000\u8D27\u5355\u722C\u866B\u540C\u6B65\u91C7\u8D2D\u9000\u8D27\u9886\u53D6\u4EBA", defaultValue: "0" })
    @Index({ name: "idx_from_cps_sync_rma_id", using: "BTREE", order: "ASC", unique: false })
    from_cps_sync_rma_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u539F\u59CB\u9000\u8D27\u5355\u722C\u866B\u540C\u6B65\u91C7\u8D2D\u9000\u8D27\u4E0A\u6E38\u5904\u7406\u5907\u6CE8" })
    from_cps_sync_rma_remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u662F\u5426\u540C\u610F\u9000\u6B3E(1\u540C\u610F 2\u4E0D\u540C\u610F)", defaultValue: "0" })
    to_cps_audit_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u9000\u6B3E\u5907\u6CE8" })
    to_cps_audit_remark?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u9000\u6B3E\u91D1\u989D", defaultValue: "0.00" })
    to_cps_return_amount?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u5355\u9000\u8D27\u6570\u91CF", defaultValue: "0" })
    to_cps_return_quantity?: number;
    @Column({ type: DataType.INTEGER, comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u9000\u6B3E\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u6DD8\u5B9D\u540C\u610F\u9000\u6B3E\u5904\u7406\u6210\u529F 11\u6DD8\u5B9D\u540C\u610F\u9000\u6B3E\u5904\u7406\u5931\u8D25\uFF09", defaultValue: "0" })
    tb_cps_rma_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u7ED3\u679C\u5907\u6CE8" })
    tb_cps_rma_remark?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4E0A\u6E38\u9000\u6B3E\u65F6\u95F4" })
    tb_cps_rma_time?: Date;
    @Column({ type: DataType.INTEGER, comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u62D2\u7EDD\u9000\u6B3E\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u6DD8\u5B9D\u62D2\u7EDD\u9000\u6B3E\u5904\u7406\u6210\u529F 11\u6DD8\u5B9D\u62D2\u7EDD\u9000\u6B3E\u5904\u7406\u5931\u8D25\uFF09", defaultValue: "0" })
    tb_cps_norma_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u62D2\u7EDD\u9000\u6B3E\u7ED3\u679C\u5907\u6CE8" })
    tb_cps_norma_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING(10), comment: "\u6DD8\u5B9D\u5904\u7406\u4E09\u65B9\u6765\u6E90\u8BA2\u5355\u9A8C\u8BC1\u7801" })
    tb_cps_rma_code?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u9000\u6B3E\u4EBA" })
    customer_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355id" })
    @Index({ name: "idx_order_id", using: "BTREE", order: "ASC", unique: false })
    order_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u660E\u7EC6\u4E3B\u952E" })
    @Index({ name: "idx_order_item_id", using: "BTREE", order: "ASC", unique: false })
    order_item_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    product_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1SKU\u4E3B\u952E" })
    sku_id!: number;
    @Column({ type: DataType.TINYINT, comment: "\u9000\u8D27\u9000\u6B3E\u7C7B\u578B\uFF1A1->\u4EC5\u9000\u6B3E\uFF1B2->\u9000\u8D27\u9000\u6B3E\uFF1B3->\u5DF2\u53D1\u8D27\u4F46\u4EC5\u9000\u6B3E\uFF1B" })
    return_type!: number;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u9000\u6B3E\u91D1\u989D" })
    return_amount?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9000\u8D27\u6570\u91CF" })
    return_quantity?: number;
    @Column({ type: DataType.TINYINT, comment: "\u7533\u8BF7\u72B6\u6001\uFF1A1->\u7B49\u5F85\u5356\u5BB6\u540C\u610F\u9000\u8D27\uFF1B2->\u7B49\u5F85\u4E70\u5BB6\u9000\u8D27\uFF1B3->\u7B49\u5F85\u5356\u5BB6\u786E\u8BA4\u6536\u8D27\uFF1B4->\u7B49\u5F85\u5356\u5BB6\u540C\u610F\u9000\u6B3E\uFF08\u53EA\u6709\u8679\u8FD0\u9879\u76EE\u662F\u201C\u5356\u5BB6\u62D2\u7EDD\u9000\u6B3E\u201D\uFF09\uFF1B5->\u9000\u6B3E\u6210\u529F\uFF1B  6->\u9000\u6B3E\u5173\u95ED\uFF1B7->\u5356\u5BB6\u62D2\u7EDD\u9000\u6B3E" })
    return_status!: number;
    @Column({ type: DataType.TINYINT, comment: "\u5546\u54C1\u9000\u8D27\u72B6\u6001\uFF0C\u9000\u8D27\u9000\u6B3E\u6709\u6548\uFF080\u5F85\u5BA1\u6838  1\u5DF2\u5230\u8D27 2\u4E22\u8D27\uFF09", defaultValue: "0" })
    good_return_status?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u9000\u8D27\u72B6\u6001\u5BA1\u6838\u4EBA" })
    good_return_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5546\u54C1\u9000\u8D27\u5BA1\u6838\u65F6\u95F4" })
    good_return_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u9000\u6B3E\u72B6\u6001\uFF080\u672A\u9000\u6B3E 1\u5DF2\u9000\u6B3E 2\u5DF2\u62D2\u7EDD\uFF09", defaultValue: "0" })
    money_return_status?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u9000\u6B3E\u5BA1\u6838\u4EBA" })
    money_return_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u9000\u6B3E\u65F6\u95F4" })
    money_return_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u539F\u56E0" })
    reason?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u63CF\u8FF0" })
    description?: string;
    @Column({ allowNull: true, type: DataType.STRING(2000), comment: "\u51ED\u8BC1\u56FE\u7247\uFF0C\u4EE5\u9017\u53F7\u9694\u5F00" })
    proof_pics?: string;
    @Column({ allowNull: true, type: DataType.STRING(30), comment: "\u6536\u8D27\u4EBA" })
    receive_person_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(30), comment: "\u6536\u8D27\u4EBA\u624B\u673A" })
    receive_person_phone?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9000\u8D27\u5730\u5740pcd code" })
    receive_pcd_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9000\u8D27\u5730\u5740pcd desc" })
    receive_pcd_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u9000\u8D27\u5BC4\u9001\u5730\u5740" })
    receive_address?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u6536\u8D27\u5907\u6CE8" })
    receive_note?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9000\u8D27\u5FEB\u9012\u5355\u53F7" })
    receive_sn?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5FEB\u9012\u516C\u53F8\u7F16\u7801" })
    receive_company_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5FEB\u9012\u516C\u53F8\u540D\u79F0" })
    receive_company_name?: string;
    @Column({ type: DataType.INTEGER, comment: "\u5904\u7406\u6807\u8BB0\uFF080\u5F85\u5904\u7406 1\u5DF2\u5904\u7406\uFF09", defaultValue: "0" })
    mark_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5904\u7406\u4EBA" })
    mark_user_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5904\u7406\u5907\u6CE8" })
    mark_remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6DD8\u5B9D\u539F\u59CB\u5355\u722C\u866B\u540C\u6B65\u9000\u6B3E\u72B6\u6001\uFF080\u5F85\u722C\u866B\u9886\u53D6 1\u5DF2\u9886\u53D6 2\u5904\u7406\u6210\u529F 11\u5904\u7406\u5931\u8D25\uFF09", defaultValue: "0" })
    tb_cps_sync_amount?: number;
    @Column({ type: DataType.BIGINT, comment: "\u6DD8\u5B9D\u539F\u59CB\u5355\u722C\u866B\u540C\u6B65\u9000\u6B3E\u4EBA", defaultValue: "0" })
    tb_cps_sync_amount_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u539F\u59CB\u5355\u722C\u866B\u540C\u6B65\u9000\u6B3E\u5904\u7406\u5907\u6CE8" })
    tb_cps_sync_amount_remark?: string;
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