import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_group", timestamps: false, comment: "\u5546\u54C1\u5206\u7EC4\u8868" })
export class TProductGroup extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5206\u7EC4\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u5206\u7EC4\u540D\u79F0" })
    @Index({ name: "idx_group_name", using: "BTREE", order: "ASC", unique: false })
    group_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(32), comment: "\u663E\u793A\u4F4D\u7F6E" })
    position_code?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5206\u7EC4\u63CF\u8FF0" })
    group_desc?: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5206\u7EC4\u753B\u518C\uFF0C\u9650\u5236\u4E3A5\u5F20\uFF0C\u4EE5\u9017\u53F7\u5206\u5272" })
    album_pics?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6392\u5E8F" })
    @Index({ name: "idx_group_name", using: "BTREE", order: "ASC", unique: false })
    @Index({ name: "idx_sort", using: "BTREE", order: "ASC", unique: false })
    sort?: number;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
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