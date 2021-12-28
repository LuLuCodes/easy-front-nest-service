import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_new", timestamps: false, comment: "\u65B0\u95FB\u516C\u544A\u8868" })
export class TNew extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u65B0\u95FB\u6807\u9898" })
    new_title!: string;
    @Column({ type: DataType.INTEGER, comment: "\u65B0\u95FB\u7C7B\u522B\uFF080\u666E\u901A\u65B0\u95FB\uFF09", defaultValue: "0" })
    new_type?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u81EA\u5B9A\u4E49\u7C7B\u522B\uFF08\u516C\u5171\u3001\u5E38\u89C1\u95EE\u9898\u7B49\uFF09" })
    new_category?: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u65B0\u95FB\u8BE6\u60C5" })
    new_content?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u6982\u8FF0" })
    new_about?: string;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u65B0\u95FB\u9644\u4EF6" })
    new_files?: string;
    @Column({ type: DataType.INTEGER, comment: "\u5C55\u793A\u65B9\u5F0F\uFF080\u666E\u901A\uFF0C1\u5F39\u7A97\uFF09", defaultValue: "0" })
    show_type?: number;
    @Column({ type: DataType.INTEGER, comment: "\u6392\u5E8F", defaultValue: "0" })
    sort?: number;
    @Column({ type: DataType.INTEGER, comment: "\u65B0\u95FB\u72B6\u6001\uFF080\u8349\u7A3F 10\u53D1\u5E03 11\u64A4\u4E0B\uFF09", defaultValue: "0" })
    new_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u6E38\u89C8\u6570", defaultValue: "0" })
    visit_count?: number;
    @Column({ type: DataType.STRING(50), comment: "\u521B\u5EFA\u4EBA\u59D3\u540D" })
    username!: string;
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