import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_bank_transfer_qrcode", timestamps: false, comment: "\u5E97\u94FA\u5F52\u96C6\u8D44\u91D1\u4E8C\u7EF4\u7801\u8868" })
export class TBankTransferQrcode extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u7CFB\u7EDF\u7F16\u7801" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5E97\u94FA\u7F16\u7801" })
    @Index({ name: "idx_shop_id", using: "BTREE", order: "ASC", unique: false })
    shop_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u83B7\u53D6\u72B6\u6001\uFF081\u83B7\u53D6\u4E2D 2\u5DF2\u83B7\u53D6 3\u83B7\u53D6\u5931\u8D25\uFF09" })
    pull_status!: number;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "\u83B7\u53D6\u5907\u6CE8" })
    pull_remark?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "\u4E8C\u7EF4\u7801" })
    qr_code?: string;
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