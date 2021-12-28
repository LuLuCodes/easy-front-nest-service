import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_message", timestamps: false, comment: "\u4E2A\u4EBA\u6D88\u606F\u8868" })
export class TCustomerMessage extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7528\u6237id" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u6D88\u606F\u7C7B\u578B\uFF081\u6536\u76CA\u5230\u8D26\u901A\u77E5\uFF0C2\u597D\u53CB\u4E0B\u5355\u901A\u77E5\uFF0C3\u597D\u53CB\u9000\u5355\u901A\u77E5\uFF0C4\u62C9\u65B0\u901A\u77E5\uFF0C5\u4E0B\u7EA7\u5347\u7EA7\u901A\u77E5\uFF0C6\u81EA\u8D2D\u8BA2\u5355\u901A\u77E5\uFF0C7\u81EA\u8D2D\u8BA2\u5355\u53D1\u8D27\u901A\u77E5\uFF0C8\u81EA\u8D2D\u9000\u5355\u901A\u77E5\uFF09" })
    message_type!: number;
    @Column({ type: DataType.STRING(100), comment: "\u6D88\u606F\u6807\u9898" })
    message_title!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u6D88\u606F\u5185\u5BB9" })
    message_content?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u6D88\u606F\u81EA\u5B9A\u4E49json" })
    message_json?: string;
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