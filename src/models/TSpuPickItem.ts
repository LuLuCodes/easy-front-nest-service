import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_spu_pick_item", timestamps: false, comment: "\u5546\u54C1\u91C7\u96C6\u660E\u7EC6\u8868" })
export class TSpuPickItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u91C7\u96C6\u4E3B\u8868\u4E3B\u952E" })
    @Index({ name: "idx_head_id", using: "BTREE", order: "ASC", unique: false })
    head_id!: number;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u91C7\u96C6\u5730\u5740" })
    url?: string;
    @Column({ type: DataType.INTEGER, comment: "\u91C7\u96C6\u72B6\u6001\uFF080\u5F85\u91C7\u96C6 1\u91C7\u96C6\u4E2D 2\u91C7\u96C6\u6210\u529F 11\u91C7\u96C6\u5931\u8D25\uFF09", defaultValue: "0" })
    pick_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(50), comment: "\u91C7\u96C6\u5907\u6CE8" })
    pick_remark?: string;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u91C7\u96C6\u6210\u529F\u540E\u7684\u6B3E\u4FE1\u606F" })
    spu_id?: number;
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