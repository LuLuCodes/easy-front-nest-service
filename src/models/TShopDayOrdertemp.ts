import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_day_ordertemp", timestamps: false, comment: "\u5E97\u94FA\u8BA2\u5355\u5168\u91CF\u4E34\u65F6\u8868" })
export class TShopDayOrdertemp extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(200), comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: string;
    @Column({ type: DataType.STRING(200), comment: "\u8BA2\u5355\u7F16\u53F7" })
    order_sn!: string;
    @Column({ type: DataType.STRING(200), comment: "\u5B50\u8BA2\u5355\u7F16\u53F7" })
    order_child_sn!: string;
    @Column({ type: DataType.STRING(500), comment: "\u6807\u9898" })
    product_name!: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5B9E\u4ED8\u4EF7\u683C", defaultValue: "0.00" })
    total_amount?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u91C7\u8D2D\u5355\u53F7" })
    purchase_sn?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u91C7\u8D2D\u6210\u672C", defaultValue: "0.00" })
    purchase_amount?: string;
    @Column({ type: DataType.STRING(45), comment: "\u8BA2\u5355\u72B6\u6001" })
    order_status!: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4ED8\u6B3E\u65F6\u95F4" })
    pay_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u53D1\u8D27\u65F6\u95F4" })
    deliver_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u786E\u8BA4\u6536\u8D27\u65F6\u95F4" })
    receive_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(45), comment: "\u552E\u540E" })
    rma_status?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u552E\u540E\u65F6\u95F4" })
    rma_time?: Date;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u9000\u6B3E\u91D1\u989D", defaultValue: "0.00" })
    rma_amount?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u4E0A\u6E38\u9000\u6B3E\u91D1\u989D", defaultValue: "0.00" })
    rma_const?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5176\u4ED6\u6210\u672C", defaultValue: "0.00" })
    other_const?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u9884\u652F\u5229\u6DA6", defaultValue: "0.00" })
    pre_profit?: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u771F\u5B9E\u5229\u6DA6", defaultValue: "0.00" })
    set_profit?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5907\u6CE8" })
    remark?: string;
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