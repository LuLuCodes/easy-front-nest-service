import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_wallet", timestamps: false, comment: "\u7528\u6237\u94B1\u5305\u8868" })
export class TCustomerWallet extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7528\u6237id" })
    @Index({ name: "customer_id_UNIQUE", using: "BTREE", order: "ASC", unique: true })
    customer_id!: number;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u94B1\u5305\u4F59\u989D", defaultValue: "0.0000" })
    amount?: string;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u51FA\u8D26\u51BB\u7ED3", defaultValue: "0.0000" })
    out_frozen_amount?: string;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u8FDB\u5E10\u51BB\u7ED3", defaultValue: "0.0000" })
    in_frozen_amount?: string;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u79EF\u5206", defaultValue: "0.0000" })
    point?: string;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u51FA\u8D26\u51BB\u7ED3", defaultValue: "0.0000" })
    out_frozen_point?: string;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u51FA\u8D26\u51BB\u7ED3", defaultValue: "0.0000" })
    in_frozen_point?: string;
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