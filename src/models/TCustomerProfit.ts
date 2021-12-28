import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_profit", timestamps: false, comment: "\u5206\u4F63\u8868" })
export class TCustomerProfit extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7528\u6237id" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u5206\u4F63\u72B6\u6001\uFF080\u521D\u59CB\u51BB\u7ED3\u4E2D\uFF0C10\u5DF2\u7ED3\u7B97\uFF09" })
    profit_status!: number;
    @Column({ type: DataType.INTEGER, comment: "\u5206\u4F63\u7C7B\u578B\uFF08100\u7EA7\u5DEE\u81EA\u8D2D\u7701  200\u7EA7\u5DEE\u5956\u52B1  300\u7206\u5355\u5956\u52B1\uFF09" })
    profit_type!: number;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5206\u4F63\u91D1\u989D" })
    profit_amount!: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7ED3\u7B97\u5230\u94B1\u5305\u65F6\u95F4" })
    settle_time?: Date;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6765\u6E90\uFF081\u8BA2\u5355\u5956\u52B1\uFF09" })
    source_type?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u6765\u6E90\u7CFB\u7EDF\u7F16\u7801" })
    source_id?: number;
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