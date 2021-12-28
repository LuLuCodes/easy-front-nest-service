import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_pay_log", timestamps: false, comment: "\u8BA2\u5355\u652F\u4ED8\u8BB0\u5F55\u8868" })
export class TOrderPayLog extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8BA2\u5355\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "idx_order_id", using: "BTREE", order: "ASC", unique: false })
    order_id!: number;
    @Column({ type: DataType.TINYINT, comment: "\u652F\u4ED8\u7C7B\u578B \uFF081->\u652F\u4ED8\u5B9D\uFF1B2->\u5FAE\u4FE1\uFF1B3->\u94B1\u5305\u4F59\u989D\uFF09" })
    pay_type!: number;
    @Column({ type: DataType.STRING(200), comment: "\u7B2C\u4E09\u65B9\u652F\u4ED8\u6D41\u6C34\u53F7\uFF08\u552F\u4E00\u3001\u9000\u6B3E\u7528\uFF0C\u4F59\u989D\u652F\u4ED8\u53EF\u5B58guid\uFF09" })
    @Index({ name: "trade_no_UNIQUE", using: "BTREE", order: "ASC", unique: true })
    trade_no!: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u652F\u4ED8\u91D1\u989D" })
    pay_amount!: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7B2C\u4E09\u65B9\u652F\u4ED8\u6210\u529F\u65F6\u95F4" })
    pay_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u5907\u6CE8\u7528\u6237\u652F\u4ED8\u7684\u8D26\u53F7\uFF0C\u4EC5\u540E\u671F\u67E5\u8D26\u7528\uFF08\u652F\u4ED8\u5B9D\u3001\u5FAE\u4FE1\u8D26\u53F7\uFF0C\u4F59\u989D\u652F\u4ED8\u53EF\u5B58\u94B1\u5305id\uFF09" })
    buyer_no?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5907\u6CE8" })
    remark?: string;
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