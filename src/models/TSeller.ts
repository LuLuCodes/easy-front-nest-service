import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_seller", timestamps: false, comment: "\u4F01\u4E1A\u8868" })
export class TSeller extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u540D\u79F0" })
    seller_name!: string;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u7B80\u79F0" })
    seller_short_name!: string;
    @Column({ allowNull: true, type: DataType.STRING(36), comment: "\u8D26\u6237code" })
    @Index({ name: "idx_account_code", using: "BTREE", order: "ASC", unique: false })
    account_code?: string;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u6CD5\u4EBA" })
    seller_boss!: string;
    @Column({ type: DataType.STRING(100), comment: "\u6CD5\u4EBA\u8054\u7CFB\u65B9\u5F0F" })
    seller_boss_tel!: string;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u6CE8\u518C\u5730\u5740" })
    address!: string;
    @Column({ type: DataType.STRING(100), comment: "\u6240\u5C5E\u533A\u57DF\u7F16\u7801" })
    city_code!: string;
    @Column({ type: DataType.STRING(100), comment: "\u6240\u5C5E\u533A\u57DF" })
    city!: string;
    @Column({ type: DataType.STRING(100), comment: "\u7EDF\u4E00\u793E\u4F1A\u4FE1\u7528\u4EE3\u7801" })
    license!: string;
    @Column({ type: DataType.STRING(100), comment: "\u7535\u5B50\u90AE\u7BB1" })
    email!: string;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u8D1F\u8D23\u4EBA" })
    seller_person!: string;
    @Column({ type: DataType.STRING(100), comment: "\u8D1F\u8D23\u4EBA\u8054\u7CFB\u65B9\u5F0F" })
    seller_person_tel!: string;
    @Column({ type: DataType.STRING(100), comment: "\u4F01\u4E1A\u4ECB\u7ECD" })
    remark!: string;
    @Column({ type: DataType.STRING(5000), comment: "\u9644\u4EF6" })
    files!: string;
    @Column({ type: DataType.STRING(500), comment: "\u4F01\u4E1Alogo" })
    logo!: string;
    @Column({ type: DataType.STRING(500), comment: "\u8425\u4E1A\u6267\u7167" })
    license_file!: string;
    @Column({ type: DataType.STRING(500), comment: "\u5F00\u6237\u8BB8\u53EF\u8BC1" })
    permit_file!: string;
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