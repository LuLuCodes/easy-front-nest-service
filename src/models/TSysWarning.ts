import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_sys_warning", timestamps: false, comment: "\u7CFB\u7EDF\u5F02\u5E38\u8B66\u544A\u8868" })
export class TSysWarning extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.INTEGER, comment: "\u8B66\u544A\u7C7B\u578B\uFF081\u91CD\u590D\u91C7\u8D2D\uFF09" })
    warning_type!: number;
    @Column({ type: DataType.BIGINT, comment: "\u6765\u6E90\u7F16\u7801" })
    source_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u6765\u6E90\u8868\uFF081\u8BA2\u5355\u660E\u7EC6\u8868\uFF09" })
    source_type!: number;
    @Column({ type: DataType.STRING(100), comment: "\u8B66\u544A\u6807\u9898" })
    warning_title!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u8B66\u544A\u5907\u6CE8" })
    remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u5904\u7406\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u5DF2\u5904\u7406\uFF09" })
    deal_status!: number;
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