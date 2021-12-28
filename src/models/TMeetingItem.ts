import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_meeting_item", timestamps: false, comment: "\u7EA6\u4F1A\u660E\u7EC6\u8BB0\u5F55" })
export class TMeetingItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9879\u76EE\u7F16\u7801", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7EA6\u4F1A\u7F16\u7801" })
    @Index({ name: "idx_meeting_id", using: "BTREE", order: "ASC", unique: false })
    meeting_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u8D74\u7EA6\u4EBA\u7F16\u7801" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u72B6\u6001\uFF080\u7533\u8BF7\u5F85\u5BA1\u6838 1\u540C\u610F 11\u62D2\u7EDD 2\u5DF2\u8D74\u7EA6 10\u5B8C\u6210\uFF09" })
    item_status!: number;
    @Column({ type: DataType.STRING(500), comment: "\u81EA\u6211\u63A8\u8350" })
    advantage!: string;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u540C\u610F", defaultValue: "0" })
    is_agree?: number;
    @Column({ type: DataType.BIGINT, comment: "\u540C\u610F\u4EBA", defaultValue: "0" })
    agree_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u540C\u610F\u65F6\u95F4" })
    agree_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u53D6\u6D88", defaultValue: "0" })
    is_cancel?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u53D6\u6D88\u4EBA" })
    cancel_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u53D6\u6D88\u65F6\u95F4" })
    cancel_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u8D74\u7EA6", defaultValue: "0" })
    is_attend?: number;
    @Column({ type: DataType.BIGINT, comment: "\u8D74\u7EA6\u4EBA", defaultValue: "0" })
    attend_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8D74\u7EA6\u65F6\u95F4" })
    attend_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u5B8C\u6210", defaultValue: "0" })
    is_finish?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5B8C\u6210\u4EBA", defaultValue: "0" })
    finish_id?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5B8C\u6210\u65F6\u95F4" })
    finish_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u6295\u8BC9\u5165\u53E3\u5173\u95ED\uFF080\u672A\u5173 1\u5DF2\u5173\uFF09", defaultValue: "0" })
    close_complaint?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u6295\u8BC9", defaultValue: "0" })
    is_complaint?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u6295\u8BC9\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "idx_complaint_id", using: "BTREE", order: "ASC", unique: false })
    complaint_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(2000), comment: "\u6295\u8BC9\u56FE\u7247" })
    complaint_url?: string;
    @Column({ type: DataType.INTEGER, comment: "\u8BC4\u4EF7\u72B6\u6001\uFF080\u672A\u8BC4\u4EF7 1\u5DF2\u8BC4\u4EF7\uFF09", defaultValue: "0" })
    comment_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6001\u5EA6\u8BC4\u4EF7\uFF081-5\uFF09" })
    manner_point?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u771F\u4EBA\u4E0E\u7167\u7247\u76F8\u4F3C\u5EA6\uFF081\u4E0E\u76F8\u7247\u4E0D\u7B26 2\u4E0E\u76F8\u7247\u76F8\u4F3C 3\u6BD4\u76F8\u7247\u597D\u770B\uFF09" })
    photo_point?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    deleted?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time?: Date;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id?: number;
}