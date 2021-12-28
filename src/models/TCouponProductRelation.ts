import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_coupon_product_relation", timestamps: false, comment: "\u4F18\u60E0\u5238\u548C\u5546\u54C1\u7684\u5173\u7CFB\u8868" })
export class TCouponProductRelation extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u4F18\u60E0\u5238\u5546\u54C1\u4E3B\u952E(\u81EA\u589E)" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(36), comment: "\u4F18\u60E0\u5238\u4E3B\u952E" })
    @Index({ name: "idx_coupon_id", using: "BTREE", order: "ASC", unique: false })
    coupon_id!: string;
    @Column({ type: DataType.STRING(36), comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "idx_product_id", using: "BTREE", order: "ASC", unique: false })
    product_id!: string;
    @Column({ type: DataType.STRING(128), comment: "\u5546\u54C1\u540D\u79F0" })
    product_name!: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u8D27\u53F7" })
    product_sn?: string;
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