import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_account", timestamps: false, comment: "\u8D26\u6237\u8868" })
export class TAccount extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u8D26\u6237\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(36), comment: "\u8D26\u6237code" })
    @Index({ name: "idx_account_code", using: "BTREE", order: "ASC", unique: false })
    account_code!: string;
    @Column({ allowNull: true, type: DataType.STRING(30), comment: "\u90AE\u7BB1" })
    @Index({ name: "idx_email", using: "BTREE", order: "ASC", unique: false })
    email?: string;
    @Column({ allowNull: true, type: DataType.STRING(15), comment: "\u624B\u673A\u53F7" })
    @Index({ name: "idx_phone", using: "BTREE", order: "ASC", unique: false })
    phone?: string;
    @Column({ type: DataType.STRING(30), comment: "\u7528\u6237\u540D" })
    @Index({ name: "idx_username", using: "BTREE", order: "ASC", unique: false })
    username!: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u5BC6\u7801" })
    password?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u5BC6\u7801\u76D0" })
    password_salt?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8D26\u53F7\u6765\u6E90\uFF080\u666E\u901A\u5BA2\u6237 1\u4EE3\u8D2D\u4EBA  2\u4EE3\u7406\u5546  3\u770B\u677F\u7BA1\u7406\u8005\uFF09", defaultValue: "0" })
    source_type?: number;
    @Column({ type: DataType.TINYINT, comment: "0 \u7981\u7528,1 \u53EF\u7528, 2 \u6CE8\u9500" })
    status!: number;
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