import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_day_counttemp", timestamps: false, comment: "\u5E97\u94FA\u65E5\u65E5\u5E38\u6570\u636E\u4E34\u65F6\u8868" })
export class TShopDayCounttemp extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(200), comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: string;
    @Column({ type: DataType.DATE, comment: "\u62A5\u8868\u65E5\u671F" })
    report_day!: Date;
    @Column({ type: DataType.INTEGER, comment: "\u8BA2\u5355\u6570", defaultValue: "0" })
    order_count?: number;
    @Column({ type: DataType.INTEGER, comment: "\u6D41\u91CF", defaultValue: "0" })
    pv_count?: number;
    @Column({ type: DataType.INTEGER, comment: "\u8BBF\u5BA2\u6570", defaultValue: "0" })
    visit_count?: number;
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