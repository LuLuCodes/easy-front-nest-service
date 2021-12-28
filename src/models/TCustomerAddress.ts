import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_address", timestamps: false, comment: "\u7528\u6237\u5730\u5740\u8868" })
export class TCustomerAddress extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7528\u6237\u5730\u5740\u4E3B\u952E(\u81EA\u589E)" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7528\u6237id", defaultValue: "0" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u6536\u8D27\u4EBA\u59D3\u540D" })
    name!: string;
    @Column({ type: DataType.STRING(32), comment: "\u6536\u8D27\u4EBA\u7535\u8BDD" })
    phone!: string;
    @Column({ type: DataType.STRING(50), comment: "\u7701\u5E02\u533A\u7F16\u7801" })
    pcd_code!: string;
    @Column({ type: DataType.STRING(255), comment: "\u7701\u5E02\u533A" })
    pcd_desc!: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u8BE6\u7EC6\u5730\u5740" })
    address?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    sort?: number;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u6807\u7B7E\uFF1A\u5BB6\uFF0C\u516C\u53F8" })
    tags?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u9ED8\u8BA4\u5730\u5740", defaultValue: "0" })
    is_default?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
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