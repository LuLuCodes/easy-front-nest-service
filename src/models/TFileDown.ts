import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_file_down", timestamps: false, comment: "\u6587\u4EF6\u8868" })
export class TFileDown extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5F52\u5C5E\uFF080\u5E73\u53F0\u540E\u53F0 1\u5546\u5BB6\u540E\u53F0\uFF09", defaultValue: "0" })
    own_type?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5F52\u5C5E\u7F16\u7801", defaultValue: "0" })
    @Index({ name: "idx_own_id", using: "BTREE", order: "ASC", unique: false })
    own_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u6587\u4EF6\u540D\u79F0" })
    file_name!: string;
    @Column({ type: DataType.STRING(500), comment: "\u6587\u4EF6\u8DEF\u5F84" })
    file_path!: string;
    @Column({ type: DataType.INTEGER, comment: "\u6587\u4EF6\u72B6\u6001\uFF080\u751F\u6210\u4E2D 10\u5DF2\u751F\u6210 11\u751F\u6210\u5931\u8D25\uFF09", defaultValue: "0" })
    file_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5907\u6CE8" })
    remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u4E0B\u8F7D\u6B21\u6570", defaultValue: "0" })
    down_count?: number;
    @Column({ type: DataType.STRING(50), comment: "\u521B\u5EFA\u4EBA\u59D3\u540D" })
    username!: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u6700\u540E\u4E0B\u8F7D\u65F6\u95F4" })
    last_down_time?: Date;
    @Column({ type: DataType.INTEGER, comment: "\u6765\u6E90\uFF081spu 2t_order 3obj_wallet_log 4\u53D1\u8D27\u51BB\u7ED3 5upc\u5BFC\u51FA 6\u53D1\u8D27\u5355 7\u8FD0\u8425\u62A5\u8868 8\u7269\u6D41\u8FD0\u8D39\u62A5\u8868 9\u8679\u8FD0\u652F\u4ED8\u5B9DC\u8D44\u91D1 10\u8679\u8FD0\u652F\u4ED8\u5B9DB\u8D44\u91D1 11\u8679\u8FD0\u652F\u4ED8\u5B9DA\u8D44\u91D1 12\u8679\u8FD0\u4E0D\u53D1\u8D27\u533A\u57DF 13\u5E97\u94FA\u6388\u6743\u7C7B\u76EE 14\u5237\u5355\u5546\u54C1 15\u5237\u5355\u4EFB\u52A1\u660E\u7EC6 16\u5237\u5355\u8BA2\u5355\u8868 17\u5237\u5355\u5F02\u5E38\u8BA2\u5355 18\u8D22\u52A1\u62A5\u8868\u603B\u8868 19\u8D22\u52A1\u62A5\u8868\u65E5\u8868\uFF09", defaultValue: "0" })
    source_type?: number;
    @Column({ type: DataType.BIGINT, comment: "\u6765\u6E90\u7F16\u7801(1spu\u7F16\u7801 2\u8BA2\u5355\u7F16\u7801)", defaultValue: "0" })
    source_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u6765\u6E90\u7C7B\u522B(0\u666E\u901A 1\u4E9A\u9A6C\u900A\u5BFC\u5165\u6587\u4EF6)", defaultValue: "0" })
    source_class?: number;
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