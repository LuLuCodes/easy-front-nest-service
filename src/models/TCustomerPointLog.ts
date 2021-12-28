import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_customer_point_log", timestamps: false, comment: "\u7528\u6237\u79EF\u5206\u6D41\u6C34\u8868" })
export class TCustomerPointLog extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u94B1\u5305\u7F16\u7801" })
    @Index({ name: "idx_wallet_id", using: "BTREE", order: "ASC", unique: false })
    wallet_id!: number;
    @Column({ type: DataType.INTEGER, comment: "\u79EF\u5206\u7C7B\u578B\uFF081\u8C46\u8C46\u5E01\uFF09", defaultValue: "1" })
    point_type?: number;
    @Column({ type: DataType.DECIMAL(18,4), comment: "\u6D41\u6C34\u79EF\u5206\uFF08\u6B63\u53F7\u589E\u52A0\uFF0C\u8D1F\u53F7\u51CF\u5C11\uFF09", defaultValue: "0.0000" })
    point?: string;
    @Column({ type: DataType.INTEGER, comment: "\u6D41\u6C34\u7C7B\u578B\uFF081\u5956\u52B1 2\u6D88\u8D39\uFF09" })
    log_type!: number;
    @Column({ type: DataType.STRING(200), comment: "\u6D41\u6C34\u6807\u9898" })
    log_title!: string;
    @Column({ allowNull: true, type: DataType.STRING(500), comment: "\u5185\u5BB9\u63CF\u8FF0" })
    log_desc?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6765\u6E90\uFF081\u5145\u503C\u5355 2\u7EA2\u5305\u76F8\u518C 3\u7EA6\u4F1A\u5973\u751F 4\u53D1\u5E03\u7EA6\u4F1A 5\u6295\u8BC9\u5355 6\u7EA6\u4F1A\u62D2\u7EDD 7\u7EA6\u4F1A\u5B8C\u6210 8\u7EA6\u4F1A\u660E\u7EC6\u53D6\u6D88 9\u7EA6\u4F1A\u4E3B\u8868\u53D6\u6D88 10\u79EF\u5206\u6D88\u8D39\u5355 11\u89E3\u9501\u5FAE\u4FE1\uFF0C12\u89E3\u76F8\u518C\u9501)" })
    source_type?: number;
    @Column({ allowNull: true, type: DataType.BIGINT, comment: "\u6765\u6E90\u7F16\u7801\uFF081\u5145\u503C\u5355id 2\u7EA2\u5305\u76F8\u518Cid 3\u7EA6\u4F1A\u5973\u795Eid 4\u53D1\u5E03\u7EA6\u4F1Aid 5\u6295\u8BC9\u5355id 6\u7EA6\u4F1A\u660E\u7EC6id\uFF09" })
    source_id?: number;
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