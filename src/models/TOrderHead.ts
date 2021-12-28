import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_order_head", timestamps: false, comment: "\u8BA2\u5355\u4E3B\u8868\u9644\u5C5E" })
export class TOrderHead extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u4E09\u65B9\u539F\u4E3B\u5355\u53F7" })
    @Index({ name: "idx_from_cps_tid", using: "BTREE", order: "ASC", unique: false })
    from_cps_tid!: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u8BA2\u5355\u5546\u54C1\u91D1\u989D" })
    total_fee!: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u7CFB\u7EDF\u4F18\u60E0\u91D1\u989D" })
    discount_fee!: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u90AE\u8D39" })
    post_fee!: string;
    @Column({ type: DataType.DECIMAL(18,2), comment: "\u5B9E\u4ED8\u91D1\u989D" })
    payment!: string;
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