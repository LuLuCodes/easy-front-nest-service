import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_chat", timestamps: false, comment: "\u804A\u5929\u8BB0\u5F55\u8868" })
export class TChat extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u53D1\u9001\u4EBAid" })
    @Index({ name: "idx_sender_id", using: "BTREE", order: "ASC", unique: false })
    sender_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u63A5\u53D7\u4EBAid" })
    @Index({ name: "idx_receive_id", using: "BTREE", order: "ASC", unique: false })
    receive_id?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u9605\u8BFB\u72B6\u6001(0\u672A\u8BFB 1\u5DF2\u8BFB)" })
    read_status?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u6D88\u606F\u7C7B\u578B 1\u6587\u672C 2\u56FE\u50CF 3\u4F4D\u7F6E 4\u8BED\u97F3 5\u89C6\u9891 6\u79C1\u5BC6\u76F8\u518C\u8BF7\u6C42 7\u5FAE\u4FE1\u67E5\u770B\u7533\u8BF7" })
    msg_type?: number;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u6D88\u606F\u5185\u5BB9" })
    msg_content?: string;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u63A8\u9001", defaultValue: "0" })
    is_push?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5BA1\u6838id" })
    audit_id?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u5E94\u7B54\u72B6\u6001 1 \u540C\u610F 2\u62D2\u7EDD" })
    agree_status?: number;
    @Column({ type: DataType.INTEGER, comment: "send\u662F\u5426\u5220\u9664", defaultValue: "0" })
    sender_id_del?: number;
    @Column({ type: DataType.INTEGER, comment: "receive_id\u662F\u5426\u5220\u9664", defaultValue: "0" })
    receive_id_del?: number;
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