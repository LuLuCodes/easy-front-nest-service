import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_admin_shop_group", timestamps: false, comment: "\u5E97\u94FA\u5206\u7EC4" })
export class TAdminShopGroup extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5E97\u94FA\u5206\u7EC4\u540D\u79F0" })
    group_name?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u662F\u5426\u6307\u5B9A\u5E97\u94FA\u53EF\u89C1\uFF081\u6307\u5B9A\u5E97\u94FA\u53EF\u89C1 0\u6240\u6709\u5E97\u94FA\u53EF\u89C1\uFF09" })
    if_select_shop?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u6307\u5B9A\u5E97\u94FA\u5217\u8868\uFF08JSON\uFF09" })
    shop_ids?: string;
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