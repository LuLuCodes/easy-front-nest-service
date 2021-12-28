import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_category", timestamps: false, comment: "\u5E97\u94FA\u5BF9\u5E94\u7684\u7C7B\u76EE" })
export class TShopCategory extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u4E0A\u4F20\u7684\u5E97\u94FAid" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.STRING(50), comment: "\u53F6\u5B50\u8282\u70B9" })
    cid!: string;
    @Column({ type: DataType.STRING(100), comment: "\u53F6\u5B50\u540D\u79F0" })
    cname!: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u53F6\u5B50\u8DEF\u5F84\uFF08\u6839\u8282\u70B9-\u4E2D\u95F4\u8282\u70B9-\u53F6\u5B50\u8282\u70B9\uFF09" })
    cid_path?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u53F6\u5B50\u540D\u79F0\u8DEF\u5F84\uFF08\u6839\u8282\u70B9-\u4E2D\u95F4\u8282\u70B9-\u53F6\u5B50\u8282\u70B9\uFF09" })
    cname_path?: string;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u6388\u6743", defaultValue: "0" })
    is_grant?: number;
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