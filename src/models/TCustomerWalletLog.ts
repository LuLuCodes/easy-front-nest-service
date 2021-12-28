import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_wallet_log", timestamps: false, comment: "\u7528\u6237\u94B1\u5305\u6D41\u6C34\u8868" })
export class TCustomerWalletLog extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u94B1\u5305\u7F16\u7801" })
    @Index({ name: "idx_wallet_id", using: "BTREE", order: "ASC", unique: false })
    wallet_id!: number;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u6D41\u6C34\u91D1\u989D\uFF08\u6B63\u53F7\u589E\u52A0\uFF0C\u8D1F\u53F7\u51CF\u5C11\uFF09", defaultValue: "0.0000" })
    amount?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6D41\u6C34\u7C7B\u578B\uFF081\u5956\u52B1 2\u63D0\u73B0 3\u9000\u6B3E\u2026\u2026\uFF09" })
    log_type!: number;
    @Column({ type: DataType.STRING(200), comment: "\u6D41\u6C34\u6807\u9898" })
    log_title!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5185\u5BB9\u63CF\u8FF0" })
    log_desc?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6765\u6E90\uFF081\u8BA2\u5355\uFF0C2\u5145\u503C\u5355\uFF0C3\u63D0\u73B0\u5355\uFF0C4\u8C46\u8C46\u8F6C\u8D26\uFF09" })
    source_type?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u6765\u6E90\u7F16\u7801\uFF081\u8BA2\u5355\u7F16\u7801\uFF0C2\u5145\u503C\u5355\u7F16\u7801\uFF0C3\u63D0\u73B0\u5355\u7F16\u7801\uFF0C4\u8C46\u8C46\u6D41\u6C34\u8D26\u53F7\uFF09" })
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