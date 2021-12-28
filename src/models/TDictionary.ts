import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_dictionary", timestamps: false, comment: "\u57FA\u7840-\u5B57\u5178\u8868" })
export class TDictionary extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, comment: "\u5B57\u5178\u8868\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(50), comment: "\u5B57\u5178\u540D\u79F0" })
    field_name!: string;
    @Column({ type: DataType.STRING(50), comment: "\u5B57\u5178key" })
    field_key!: string;
    @Column({ type: DataType.STRING(1000), comment: "\u5B57\u5178value" })
    field_value!: string;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u662F\u7CFB\u7EDF\u53D8\u91CF", defaultValue: "1" })
    is_system?: number;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u5907\u6CE8" })
    remark?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    sort_no?: number;
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