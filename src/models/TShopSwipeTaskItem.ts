import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_shop_swipe_task_item", timestamps: false, comment: "\u5E97\u94FA\u5237\u5355-\u4EFB\u52A1\u8868-\u660E\u7EC6" })
export class TShopSwipeTaskItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u4E3B\u952E\uFF08\u5197\u4F59\uFF09" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4EFB\u52A1\u4E3B\u952E" })
    @Index({ name: "idx_task_id", using: "BTREE", order: "ASC", unique: false })
    task_id!: number;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4EFB\u52A1\u65E5\u671F\uFF08\u5197\u4F59\uFF09" })
    @Index({ name: "idx_task_day", using: "BTREE", order: "ASC", unique: false })
    task_day?: Date;
    @Column({ type: DataType.BIGINT, comment: "\u7C7B\u522B\u7F16\u7801" })
    spu_category_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4EE3\u8868\u5546\u54C1\u7F16\u7801" })
    spu_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u9886\u53D6\u72B6\u6001\uFF080\u672A\u9886\u53D6 1\u5DF2\u9886\u53D6\uFF09", defaultValue: "0" })
    pick_status?: number;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9886\u53D6\u4EBAOPEN" })
    @Index({ name: "idx_pick_user_open", using: "BTREE", order: "ASC", unique: false })
    pick_user_open?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9886\u53D6\u4EBAIP" })
    @Index({ name: "idx_pick_user_ip", using: "BTREE", order: "ASC", unique: false })
    pick_user_ip?: string;
    @Column({ allowNull: true, type: DataType.STRING(100), comment: "\u9886\u53D6\u4EBA\u6635\u79F0" })
    pick_user_name?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u9886\u53D6\u65F6\u95F4" })
    pick_time?: Date;
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