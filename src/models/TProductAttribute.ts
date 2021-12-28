import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_attribute", timestamps: false, comment: "\u5546\u54C1\u5C5E\u6027\u8868" })
export class TProductAttribute extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u5C5E\u6027\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5546\u54C1\u5C5E\u6027\u5206\u7C7B\u4E3B\u952E" })
    @Index({ name: "idx_product_attribute_category_id_sort", using: "BTREE", order: "ASC", unique: false })
    product_attribute_category_id!: number;
    @Column({ type: DataType.STRING(64), comment: "\u5546\u54C1\u5C5E\u6027\u540D\u79F0" })
    attribute_name!: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u5C5E\u6027\u9009\u62E9\u7C7B\u578B\uFF1A0->\u8F93\u5165\u6846\uFF1B1->\u5355\u9009\uFF1B2->\u591A\u9009", defaultValue: "0" })
    select_type?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u5C5E\u6027\u5F55\u5165\u65B9\u5F0F(\u6682\u4E0D\u9700\u8981)\uFF1A0->\u624B\u5DE5\u5F55\u5165\uFF1B1->\u4ECE\u5217\u8868\u4E2D\u9009\u53D6", defaultValue: "0" })
    input_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "input_type\u662F1\u65F6\u751F\u6548\uFF0C\u53EF\u9009\u503C\u5217\u8868\uFF0C\u4EE5\u9017\u53F7\u9694\u5F00" })
    input_list?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u652F\u6301\u624B\u52A8\u65B0\u589E\uFF1B0->\u4E0D\u652F\u6301\uFF1B1->\u652F\u6301", defaultValue: "0" })
    hand_add_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    @Index({ name: "idx_product_attribute_category_id_sort", using: "BTREE", order: "ASC", unique: false })
    sort?: number;
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
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}