import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_agent_apply", timestamps: false, comment: "\u4EE3\u7406\u7533\u8BF7\u8868" })
export class TAgentApply extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u7533\u8BF7\u6765\u6E90\u7F16\u7801" })
    @Index({ name: "idx_apply_id", using: "BTREE", order: "ASC", unique: false })
    apply_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u7533\u8BF7\u6765\u6E90\uFF081\u5BA2\u6237\u8868\uFF09" })
    apply_source!: number;
    @Column({ type: DataType.INTEGER, comment: "\u4EE3\u7406\u7C7B\u578B\uFF081\u533A\u53BF\u7EA7\u4EE3\u7406\uFF09" })
    agent_type!: number;
    @Column({ type: DataType.STRING(50), comment: "\u4EE3\u7406\u533A\u57DF" })
    agent_city!: string;
    @Column({ type: DataType.STRING(50), comment: "\u7533\u8BF7\u4EBA\u540D\u79F0" })
    apply_name!: string;
    @Column({ type: DataType.STRING(50), comment: "\u7533\u8BF7\u4EBA\u7535\u8BDD" })
    apply_phone!: string;
    @Column({ type: DataType.INTEGER, comment: "\u5BA1\u6838\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 10\u5BA1\u6838\u6210\u529F 11\u5BA1\u6838\u5931\u8D25\uFF09", defaultValue: "0" })
    audit_status?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u5BA1\u6838\u4EBA" })
    audit_id?: number;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "\u5BA1\u6838\u5907\u6CE8" })
    audit_remark?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u5BA1\u6838\u65F6\u95F4" })
    audit_time?: Date;
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