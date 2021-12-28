import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_swipe_product_visit", timestamps: false, comment: "\u5E97\u94FA\u5237\u5355-\u5546\u54C1\u6574\u4F53\u8BBF\u5BA2\u699C\u8868" })
export class TShopSwipeProductVisit extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "idx_spu_id", using: "BTREE", order: "ASC", unique: false })
    spu_id!: number;
    @Column({ type: DataType.STRING(100), comment: "\u5546\u54C1\u8D27\u53F7" })
    @Index({ name: "idx_product_sn", using: "BTREE", order: "ASC", unique: false })
    product_sn!: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5546\u54C1\u540D\u79F0" })
    spu_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(2000), comment: "\u4E3B\u56FEurl" })
    pic_url?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8BBF\u5BA2\u6570", defaultValue: "0" })
    visit_count?: number;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u8BBF\u5BA2\u6570\u5360\u6BD4\uFF08%\uFF09", defaultValue: "0.00" })
    visit_rate?: string;
    @Column({ type: DataType.INTEGER, comment: "\u652F\u4ED8\u4E70\u5BB6\u6570", defaultValue: "0" })
    buy_count?: number;
    @Column({ type: DataType.DECIMAL(10,2), comment: "\u652F\u4ED8\u8F6C\u5316\u7387\uFF08%\uFF09", defaultValue: "0.00" })
    buy_rate?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5F53\u65E5\u6392\u540D" })
    sort?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u6700\u540E\u4E00\u6B21\u4E0A\u4F20\u65F6\u95F4" })
    @Index({ name: "idx_last_up_time", using: "BTREE", order: "ASC", unique: false })
    last_up_time?: Date;
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