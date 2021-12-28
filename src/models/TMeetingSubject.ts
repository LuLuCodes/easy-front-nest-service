import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_meeting_subject", timestamps: false, comment: "\u7EA6\u4F1A\u4E3B\u9898" })
export class TMeetingSubject extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9879\u76EE\u7F16\u7801", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(45), comment: "\u7EA6\u4F1A\u4E3B\u9898" })
    title!: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F" })
    sort?: number;
    @Column({ allowNull: true, type: DataType.STRING(1500), comment: "\u6807\u7B7E\u56FE" })
    tag_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(1500), comment: "logo\u56FE" })
    logo_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(1500), comment: "\u5C01\u9762\u9ED8\u8BA4\u56FE" })
    main_url?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u4E3B\u9898\u5206\u7C7B" })
    category_id?: string;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u4E3B\u9898\u5206\u7C7B" })
    category_name?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u7CBE\u9009" })
    is_boutique?: number;
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