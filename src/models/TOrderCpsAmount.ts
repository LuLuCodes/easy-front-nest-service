import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_cps_amount", timestamps: false, comment: "\u8BA2\u5355\u4E09\u65B9\u7ED3\u7B97\u8D44\u91D1" })
export class TOrderCpsAmount extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u652F\u4ED8\u5B9D\u6D41\u6C34\u53F7" })
    @Index({ name: "idx_cps_sn", using: "BTREE", order: "ASC", unique: false })
    cps_sn!: string;
    @Column({ type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u6765\u6E90\u7F16\u53F7" })
    @Index({ name: "idx_from_cps_tid", using: "BTREE", order: "ASC", unique: false })
    from_cps_tid!: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6DD8\u5B9D\u6765\u6E90\u5B50\u7F16\u53F7" })
    @Index({ name: "idx_from_cps_oid", using: "BTREE", order: "ASC", unique: false })
    from_cps_oid?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u5F02\u5E38\u5355\u8B66\u544A\uFF082\u6570\u91CF\u8B66\u544A 1\u91D1\u989D\u8B66\u544A 0\u6B63\u5E38\uFF09", defaultValue: "0" })
    from_cps_warning?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u8BA2\u5355\u7F16\u7801" })
    @Index({ name: "idx_order_id", using: "BTREE", order: "ASC", unique: false })
    order_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u8BA2\u5355\u660E\u7EC6\u7F16\u7801" })
    @Index({ name: "idx_order_item_id", using: "BTREE", order: "ASC", unique: false })
    order_item_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u4EA4\u6613\u7C7B\u578B" })
    cps_amount_type!: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u5546\u54C1\u540D\u79F0" })
    title?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5B8C\u6210\u65F6\u95F4" })
    @Index({ name: "idx_finish_time", using: "BTREE", order: "ASC", unique: false })
    finish_time?: Date;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u91D1\u989D\uFF08\u5E26\u7B26\u53F7\uFF09", defaultValue: "0.00" })
    amount?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8BA1\u7B97\u72B6\u6001\uFF080\u672A\u8BA1\u7B97 1\u5DF2\u8BA1\u7B97\uFF09", defaultValue: "0" })
    set_status?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u652F\u4ED8\u5B9DD\u65F6\u95F4\uFF08\u5237\u5355\u6210\u672C\uFF09" })
    swipe_to_ali_time?: Date;
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