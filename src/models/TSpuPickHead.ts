import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_spu_pick_head", timestamps: false, comment: "\u5546\u54C1\u91C7\u96C6\u4E3B\u8868" })
export class TSpuPickHead extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u5F85\u722C\u53D6\u6587\u4EF6\u540D" })
    title?: string;
    @Column({ type: DataType.INTEGER, comment: "\u91C7\u96C6\u72B6\u6001\uFF080\u5F85\u91C7\u96C6 1\u91C7\u96C6\u4E2D 2\u91C7\u96C6\u5168\u90E8\u6210\u529F 11\u91C7\u96C6\u5168\u90E8\u5931\u8D25 12\u90E8\u5206\u5931\u8D25\uFF09", defaultValue: "0" })
    pick_status?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5F85\u722C\u53D6\u603Burl\u6570", defaultValue: "0" })
    total_count?: number;
    @Column({ type: DataType.INTEGER, comment: "\u6210\u529F\u722C\u53D6\u6570", defaultValue: "0" })
    success_count?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5931\u8D25\u722C\u53D6\u6570", defaultValue: "0" })
    fail_count?: number;
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