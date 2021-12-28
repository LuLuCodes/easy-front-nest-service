import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_spu_up_feilds", timestamps: false, comment: "\u5546\u54C1\u540C\u6B65\u7684\u90E8\u5206\u7ED3\u679C\u8BB0\u5F55\u8868\uFF0C\u7528\u4E8E\u4FDD\u5B58\u540C\u6B65\u90E8\u5206\u6210\u529F\u7684\u5B57\u6BB5\uFF0C\u4E0B\u6B21\u53EF\u4EE5\u8DF3\u8FC7\u6210\u529F\u7684\u90E8\u5206\uFF0C\u51CF\u5C11\u5F00\u9500" })
export class TSpuUpFeilds extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u4E0A\u4F20\u7684\u5E97\u94FAid" })
    @Index({ name: "idx_spu_sync_img_sn", using: "BTREE", order: "ASC", unique: false })
    shop_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u4E0A\u4F20\u7684\u5546\u54C1id" })
    product_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u8D27\u53F7" })
    @Index({ name: "idx_spu_sync_img_sn", using: "BTREE", order: "ASC", unique: false })
    product_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u6DD8\u5B9D\u5546\u54C1\u56FE" })
    item_imgs?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u6DD8\u5B9D\u8BE6\u60C5\u56FE" })
    detail_html?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u539F\u59CB\u56FE\u7247\u7684md5\u503C" })
    origin_item_imgs_hash?: string;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u539F\u59CB\u56FE\u7247\u7684md5\u503C" })
    origin_detail_html_hash?: string;
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