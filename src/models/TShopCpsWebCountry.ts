import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_cps_web_country", timestamps: false, comment: "\u5E97\u94FA\u7AD9\u70B9\u8868" })
export class TShopCpsWebCountry extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u4F01\u4E1A\u7F16\u7801" })
    @Index({ name: "idx_seller_id", using: "BTREE", order: "ASC", unique: false })
    seller_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.STRING(50), comment: "\u7AD9\u70B9\u540D\u79F0\uFF08\u663E\u793A\u7528\uFF09" })
    web_country!: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u7AD9\u70B9\u540D\u79F0\u7F16\u53F7\uFF08\u5BF9\u63A5\u7528\uFF09" })
    web_country_code?: string;
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