import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_cart_item", timestamps: false, comment: "\u8D2D\u7269\u8F66\u8868" })
export class TCartItem extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u8D2D\u7269\u8F66\u6761\u76EE\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7528\u6237id", defaultValue: "0" })
    @Index({ name: "idx_customer_cdoe", using: "BTREE", order: "ASC", unique: false })
    customer_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    product_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1SKU\u4E3B\u952E" })
    sku_id!: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u8D2D\u4E70\u6570\u91CF" })
    quantity?: number;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u6DFB\u52A0\u5230\u8D2D\u7269\u8F66\u65F6\u7684\u4EF7\u683C" })
    price?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    @Index({ name: "idx_customer_cdoe", using: "BTREE", order: "ASC", unique: false })
    enabled?: number;
    @Column({ type: DataType.DATE, comment: "\u521B\u5EFA\u65F6\u95F4" })
    create_time!: Date;
    @Column({ type: DataType.DATE, comment: "\u66F4\u65B0\u65F6\u95F4" })
    update_time!: Date;
    @Column({ type: DataType.TINYINT, comment: "\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664", defaultValue: "0" })
    @Index({ name: "idx_customer_cdoe", using: "BTREE", order: "ASC", unique: false })
    deleted?: number;
    @Column({ type: DataType.BIGINT, comment: "\u521B\u5EFA\u4EBA" })
    creator_id!: number;
    @Column({ type: DataType.BIGINT, comment: "\u4FEE\u6539\u4EBA" })
    modifier_id!: number;
}