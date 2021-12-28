import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_corp_users", timestamps: false, comment: "\u4F01\u4E1A\u5FAE\u4FE1\u5BA2\u670D\u5217\u8868" })
export class TCustomerCorpUsers extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4F01\u4E1A\u5FAE\u4FE1\u6210\u5458\u540D\u79F0" })
    user_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u4F01\u4E1A\u5FAE\u4FE1\u6210\u5458UserID" })
    @Index({ name: "idx_user_id", using: "BTREE", order: "ASC", unique: true })
    user_id?: string;
    @Column({ allowNull: true, type: DataType.STRING(20), comment: "\u4F01\u4E1A\u5FAE\u4FE1\u624B\u673A\u53F7" })
    @Index({ name: "mobile_index", using: "BTREE", order: "ASC", unique: true })
    mobile?: string;
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
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
}