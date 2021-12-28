import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_moment", timestamps: false, comment: "\u4EBA\u5458\u52A8\u6001" })
export class TCustomerMoment extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u4EBA\u5458\u7F16\u7801", defaultValue: "0" })
    @Index({ name: "idx_customer_id", using: "BTREE", order: "ASC", unique: false })
    customer_id?: number;
    @Column({ type: DataType.STRING(250), comment: "\u6807\u9898" })
    moment_title!: string;
    @Column({ type: DataType.STRING(2000), comment: "\u5185\u5BB9type 1\u56FE\u7247" })
    moment_content!: string;
    @Column({ type: DataType.INTEGER, comment: "\u5BA1\u6838\u72B6\u6001(0\u672A\u5BA1\u6838 1\u5DF2\u5BA1\u6838 2\u5BA1\u6838\u4E0D\u901A\u8FC7)", defaultValue: "1" })
    audit_status?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u7167\u7247\u6216\u89C6\u9891\u6570\u91CF" })
    photo_count?: number;
    @Column({ type: DataType.DECIMAL(28,10), comment: "\u7ECF\u5EA6", defaultValue: "0.0000000000" })
    longitude?: string;
    @Column({ type: DataType.DECIMAL(28,10), comment: "\u7EAC\u5EA6", defaultValue: "0.0000000000" })
    latitude?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    sort_no?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u7F6E\u9876", defaultValue: "0" })
    if_top?: number;
    @Column({ type: DataType.STRING(50), comment: "\u57CE\u5E02" })
    city!: string;
    @Column({ type: DataType.STRING(50), comment: "\u57CE\u5E02\u4EE3\u7801" })
    city_code!: string;
    @Column({ type: DataType.STRING(100), comment: "\u5730\u5740" })
    place!: string;
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