import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_category", timestamps: false, comment: "\u57FA\u7840-\u7C7B\u76EE\u8868" })
export class TProductCategory extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7C7B\u76EE\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u4E0A\u7EA7\u5206\u7C7B\u7684\u7F16\u53F7\uFF1A0\u8868\u793A\u4E00\u7EA7\u5206\u7C7B", defaultValue: "0" })
    @Index({ name: "idx_pid", using: "BTREE", order: "ASC", unique: false })
    pid?: number;
    @Column({ type: DataType.STRING(64), comment: "\u540D\u79F0" })
    @Index({ name: "idx_category_name", using: "BTREE", order: "ASC", unique: false })
    category_name!: string;
    @Column({ type: DataType.INTEGER, comment: "\u7C7B\u76EE\u7C7B\u578B\uFF0C1->\u5546\u54C1", defaultValue: "1" })
    type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u7C7B\u522B\u6765\u6E90\uFF080\u5E73\u53F0\u540E\u53F0 1\u5546\u5BB6\u540E\u53F0 2\u5E97\u94FAshop\uFF09", defaultValue: "0" })
    source_type?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7C7B\u522B\u6765\u6E90\u7F16\u7801", defaultValue: "0" })
    source_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u7C7B\u76EE\u7EA7\u522B\uFF1A0->1\u7EA7\uFF1B1->2\u7EA7", defaultValue: "1" })
    @Index({ name: "idx_level", using: "BTREE", order: "ASC", unique: false })
    level?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5546\u54C1\u6570\u91CF", defaultValue: "0" })
    product_count?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5546\u54C1\u5355\u4F4D" })
    product_unit?: string;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u663E\u793A\u5728\u5BFC\u822A\uFF1A0->\u4E0D\u663E\u793A\uFF1B1->\u663E\u793A", defaultValue: "1" })
    nav_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u7C7B\u76EE\u63CF\u8FF0" })
    category_desc?: string;
    @Column({ type: DataType.STRING(500), comment: "\u7C7B\u76EE\u56FE\u7247url" })
    pic_url!: string;
    @Column({ type: DataType.STRING(4000), comment: "\u5206\u7C7B\u5730\u5740{pid}-{child_id}-..." })
    sub_path!: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u5173\u952E\u5B57" })
    keywords?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    @Index({ name: "idx_category_name", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_level", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_pid", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_sort", using: "BTREE", order: "ASC", unique: false })
    sort?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u81EA\u5B9A\u4E49\u7C7B\u522B\u4E09\u65B9\u6DD8\u5B9D\u7F16\u7801" })
    cps_cid?: string;
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