import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_upc_item", timestamps: false, comment: "upc\u660E\u7EC6" })
export class TUpcItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "upc\u8868\u5934\u7F16\u7801" })
    @Index({ name: "idx_upc_head_id", using: "BTREE", order: "ASC", unique: false })
    upc_head_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4F01\u4E1A\u7F16\u7801" })
    @Index({ name: "idx_seller_id", using: "BTREE", order: "ASC", unique: false })
    seller_id!: number;
    @Column({ type: DataType.STRING(100), comment: "upc\u7F16\u53F7" })
    @Index({ name: "idx_upc_code", using: "BTREE", order: "ASC", unique: false })
    upc_code!: string;
    @Column({ type: DataType.INTEGER, comment: "upc\u4F7F\u7528\u72B6\u6001\uFF080\u5F85\u4F7F\u7528 1\u5360\u7528\u4E2D 10\u5DF2\u4F7F\u7528\uFF09", defaultValue: "0" })
    upc_status?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5F53\u524D\u5360\u7528skuid", defaultValue: "0" })
    sku_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4F7F\u7528\u65F6\u95F4" })
    use_time?: Date;
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