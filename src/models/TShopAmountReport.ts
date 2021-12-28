import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_amount_report", timestamps: false, comment: "\u5E97\u94FA\u6BCF\u65E5\u5206\u914D\u62A5\u8868" })
export class TShopAmountReport extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.DATE, comment: "\u62A5\u8868\u65F6\u95F4" })
    @Index({ name: "idx_report_day", using: "BTREE", order: "ASC", unique: false })
    report_day!: Date;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u7F51\u5546\u5230A\u7684\u94B1\uFF08\u6536\u5165\uFF09", defaultValue: "0.00" })
    to_ali_amount?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8D26\u6237A\u5165\u8D26(\u6280\u672F\u8FD0\u8425)", defaultValue: "0.00" })
    a_amount?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8D26\u6237b\u5165\u8D26(\u91C7\u8D2D\u6210\u672C)", defaultValue: "0.00" })
    b_amount?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8D26\u6237b\u5165\u8D26(\u6295\u8D44\u4EBA\u4EE3\u7406)", defaultValue: "0.00" })
    c_amount?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8D26\u6237d\u5165\u8D26(\u5237\u5355)", defaultValue: "0.00" })
    d_amount?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u5237\u5355\u5E73\u53F0\u8D39\u7528\u6210\u672C", defaultValue: "0.00" })
    sd_const?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u5237\u5355\u4F63\u91D1\u6210\u672C", defaultValue: "0.00" })
    sd_com_const?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5237\u5355\u4F63\u91D1\u5907\u6CE8" })
    sd_com_remark?: string;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u5176\u4ED6\u6210\u672C", defaultValue: "0.00" })
    other_const?: string;
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