import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_meeting", timestamps: false, comment: "\u7EA6\u4F1A\u8868" })
export class TMeeting extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9879\u76EE\u7F16\u7801", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5BA2\u6237\u7F16\u7801" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id!: number;
    @Column({ type: DataType.TINYINT, comment: "\u6027\u522B\uFF1A1\u7537\u7EA6\u5973\uFF0C 2\u5973\u7EA6\u7537" })
    gender!: number;
    @Column({ type: DataType.BIGINT, comment: "\u7EA6\u4F1A\u4E3B\u9898\u7F16\u7801" })
    subject_id!: number;
    @Column({ type: DataType.STRING(100), comment: "\u7EA6\u4F1A\u4E3B\u9898" })
    subject_title!: string;
    @Column({ type: DataType.STRING(500), comment: "\u4E3B\u9898\u56FE\u7247" })
    meeting_url!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u7EA6\u4F1A\u6587\u6848" })
    meeting_content?: string;
    @Column({ type: DataType.INTEGER, comment: "\u7EA6\u4F1A\u7C7B\u578B\uFF081\u77ED\u671F 2\u957F\u671F 3\u70B9\u5BF9\u70B9\uFF09" })
    meeting_type!: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u70B9\u5BF9\u70B9\u9080\u7EA6\u4EBA\u7F16\u7801" })
    to_customer_id?: number;
    @Column({ type: DataType.STRING(45), comment: "\u5730\u70B9" })
    city_code!: string;
    @Column({ type: DataType.STRING(45), comment: "\u5730\u70B9" })
    city!: string;
    @Column({ type: DataType.STRING(200), comment: "\u5730\u70B9" })
    address!: string;
    @Column({ type: DataType.DECIMAL(28,10), comment: "\u7EAC\u5EA6" })
    latitude!: string;
    @Column({ type: DataType.DECIMAL(28,10), comment: "\u7ECF\u5EA6" })
    longitude!: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7EA6\u4F1A\u5F00\u59CB\u65F6\u95F4" })
    meeting_time?: Date;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u65F6\u957F\uFF0890 1.5\u5C0F\u65F6 120 2\u5C0F\u65F6 150 2.5\u5C0F\u65F6\uFF09" })
    duration?: number;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u6253\u8D4F\u8C46\u8C46\u5E01\u503C" })
    point?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5B9A\u91D1\u652F\u4ED8\u5360\u6BD4(\u767E\u5206\u6BD4)" })
    deposit_rate?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5B9A\u91D1\u652F\u4ED8" })
    deposit_point?: string;
    @Column({ type: DataType.TINYINT, comment: "\u8C46\u8C46\u5E01\u652F\u4ED8\u72B6\u6001\uFF080\u5F85\u652F\u4ED8 1\u6709\u4EBA\u652F\u4ED8\uFF09", defaultValue: "0" })
    pay_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u5B58\u5728\u540C\u610F\u8D74\u7EA6\uFF080\u4E0D\u5B58\u5728 1\u5B58\u5728\uFF09", defaultValue: "0" })
    agree_status?: number;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u53D6\u6D88", defaultValue: "0" })
    is_cancel?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u53D6\u6D88\u65F6\u95F4" })
    cancel_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u8C46\u8C46\u5E01\u652F\u4ED8\u6700\u65E9\u652F\u4ED8\u65F6\u95F4" })
    pay_time?: Date;
    @Column({ type: DataType.TINYINT, comment: "\u7EA6\u4F1A\u662F\u5426\u7ED3\u675F", defaultValue: "0" })
    is_finish?: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u7EA6\u4F1A\u7ED3\u675F\u65F6\u95F4" })
    finish_time?: Date;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u6211\u7684\u4F18\u52BF" })
    advantage?: string;
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