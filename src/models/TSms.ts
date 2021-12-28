import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_sms", timestamps: false })
export class TSms extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(20), comment: "\u624B\u673A\u53F7" })
    @Index({ name: "idx_mobile", using: "BTREE", order: "ASC", unique: false })
    mobile?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u77ED\u4FE1\u7C7B\u578B 1\uFF1A\u6CE8\u518C 2\uFF1A\u767B\u5F55 3\uFF1A\u9A8C\u8BC1\u624B\u673A 4\uFF1A\u7ED1\u5B9A\u624B\u673A 99\u5176\u4ED6" })
    sms_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u53D1\u9001\u53C2\u6570{code:'123'}" })
    sms_param?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8FC7\u671F\u65F6\u95F4" })
    @Index({ name: "idx_mobile", using: "BTREE", order: "ASC", unique: false })
    expire_time?: Date;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "0\u672A\u9A8C\u8BC1\uFF0C1\u5DF2\u9A8C\u8BC1 11\u53D1\u9001\u5931\u8D25" })
    status?: number;
    @Column({ allowNull: true, type: DataType.STRING(128), comment: "\u53D1\u9001\u4EBAip" })
    @Index({ name: "idx_ip", using: "BTREE", order: "ASC", unique: false })
    sender_ip?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u53D1\u9001\u7ED3\u679C" })
    sender_result?: string;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    deleted?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    @Index({ name: "idx_ip", using: "BTREE", order: "ASC", unique: false })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}