import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_photo_opt", timestamps: false, comment: "\u4EBA\u5458\u6E38\u89C8\u76F8\u7247\u6743\u9650" })
export class TCustomerPhotoOpt extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7167\u7247\u6240\u6709\u4EBA", defaultValue: "0" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u76F8\u518C\u7F16\u7801" })
    @Index({ name: "idx_opt_customer_id", using: "BTREE", order: "ASC", unique: false })
    photo_id!: number;
    @Column({ type: DataType.TINYINT, comment: "\u64CD\u4F5C\u7C7B\u578B:1\u9605\u540E\u5373\u711A\uFF08\u5F53\u5B58\u5728\u6B64\u8BB0\u5F55\u65F6\uFF0C\u5F53\u524D\u4EBA\u65E0\u6CD5\u518D\u67E5\u770B\u7167\u7247\uFF092\u4ED8\u6B3E\u67E5\u770B\uFF08\u5F53\u5B58\u5728\u6B64\u8BB0\u5F55\u65F6\uFF0C\u5F53\u524D\u4EBA\u624D\u53EF\u4EE5\u67E5\u770B\u7167\u7247\uFF09" })
    @Index({ name: "idx_opt_customer_id", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_to_customer_id", using: "BTREE", order: "ASC", unique: false })
    opt_type!: number;
    @Column({ type: DataType.BIGINT, comment: "\u64CD\u4F5C\u4EBA" })
    @Index({ name: "idx_opt_customer_id", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_to_customer_id", using: "BTREE", order: "ASC", unique: false })
    opt_customer_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u540E\u53F0\u5220\u9664", defaultValue: "0" })
    if_super_del?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    @Index({ name: "idx_opt_customer_id", using: "BTREE", order: "ASC", unique: false })
    deleted?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}