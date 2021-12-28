import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_brand", timestamps: false, comment: "\u54C1\u724C\u8868" })
export class TProductBrand extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u54C1\u724Cid" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(64), comment: "\u54C1\u724C\u540D\u79F0" })
    @Index({ name: "idx_brand_name", using: "BTREE", order: "ASC", unique: false })
    brand_name!: string;
    @Column({ type: DataType.STRING(8), comment: "\u9996\u5B57\u6BCD" })
    first_letter!: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u4E3A\u54C1\u724C\u5236\u9020\u5546\uFF1A0->\u4E0D\u662F\uFF1B1->\u662F", defaultValue: "0" })
    factory_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u54C1\u724Clogo" })
    logo_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u4E13\u533A\u5927\u56FE" })
    big_pic_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u6E90\u4EA7\u5730" })
    origin_place?: string;
    @Column({ allowNull: true, type: DataType.STRING(2000), comment: "\u54C1\u724C\u7B80\u4ECB" })
    brand_profile?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u54C1\u724C\u6545\u4E8B" })
    brand_story?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u70ED\u95E8\u54C1\u724C", defaultValue: "0" })
    is_hot?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u63A8\u8350\u54C1\u724C", defaultValue: "0" })
    is_recommend?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    @Index({ name: "idx_sort", using: "BTREE", order: "ASC", unique: false })
    sort?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
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