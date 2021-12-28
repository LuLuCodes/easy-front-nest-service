import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

@Table({ tableName: "t_product_sku", timestamps: false, comment: "\u5546\u54C1SKU\u8868" })
export class TProductSku extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT, comment: "\u5546\u54C1SKU\u4E3B\u952E" })
    @Index({ name: "PRIMARY", using: "BTREE", order: "ASC", unique: true })
    id?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E94\u7528id", defaultValue: "10000" })
    app_id?: number;
    @Column({ type: DataType.BIGINT, comment: "\u5546\u54C1\u4E3B\u952E" })
    @Index({ name: "idx_product_id", using: "BTREE", order: "ASC", unique: false })
    product_id!: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "sku\u7F16\u7801" })
    @Index({ name: "idx_sku_code", using: "BTREE", order: "ASC", unique: false })
    sku_code?: string;
    @Column({ type: DataType.STRING(200), comment: "sku\u540D\u79F0" })
    sku_name!: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "sku\u540D\u79F0(\u521D\u59CB)" })
    ori_sku_name?: string;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "sku\u53F7" })
    sku_sn?: string;
    @Column({ allowNull: true, type: DataType.STRING(200), comment: "SKU\u5C5E\u6027\u7EC4id\uFF08pid1:vid1;pid2:vid2)" })
    properties_id?: string;
    @Column({ type: DataType.BIGINT, comment: "\u8BA4\u9886\u540E\u7684\u5546\u54C1\u7684\u539F\u7236\u4EB2", defaultValue: "0" })
    @Index({ name: "idx_father_sku", using: "BTREE", order: "ASC", unique: false })
    father_sku?: number;
    @Column({ allowNull: true, type: DataType.STRING(64), comment: "\u4E09\u65B9upc" })
    @Index({ name: "idx_to_cps_upc", using: "BTREE", order: "ASC", unique: false })
    to_cps_upc?: string;
    @Column({ type: DataType.INTEGER, comment: "\u91CD\u91CF\uFF08\u514B\uFF09", defaultValue: "0" })
    weight?: number;
    @Column({ allowNull: true, type: DataType.STRING(255), comment: "\u4E3B\u56FEurl" })
    pic_url?: string;
    @Column({ allowNull: true, type: DataType.STRING, comment: "sku\u753B\u518C\u56FE\uFF0C\u9017\u53F7\u5206\u9694" })
    album_pics?: string;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u5E93\u5B58", defaultValue: "0" })
    stock?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9884\u8B66\u5E93\u5B58", defaultValue: "0" })
    low_stock?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9501\u5B9A\u5E93\u5B58", defaultValue: "0" })
    lock_stock?: number;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7C7B\u578B", defaultValue: "\u4EBA\u6C11\u5E01" })
    currency_type?: string;
    @Column({ type: DataType.STRING(50), comment: "\u8D27\u5E01\u7B26\u53F7", defaultValue: "CNY" })
    currency_code?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u5E02\u573A\u4EF7", defaultValue: "0.00" })
    original_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u9500\u552E\u4EF7", defaultValue: "0.00" })
    sale_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u6210\u672C\u4EF7", defaultValue: "0.00" })
    cost_price?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u4FC3\u9500\u4EF7", defaultValue: "0.00" })
    promotion_price?: string;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4FC3\u9500\u5F00\u59CB\u65F6\u95F4" })
    promotion_start_time?: Date;
    @Column({ allowNull: true, type: DataType.DATE, comment: "\u4FC3\u9500\u7ED3\u675F\u65F6\u95F4" })
    promotion_end_time?: Date;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u6D3B\u52A8\u9650\u8D2D\u6570\u91CF" })
    promotion_per_limit?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u4FC3\u9500\u7C7B\u578B\uFF1A0->\u6CA1\u6709\u4FC3\u9500\u4F7F\u7528\u9500\u552E\u4EF7;1->\u4F7F\u7528\u4FC3\u9500\u4EF7\uFF1B2->\u4F7F\u7528\u4F1A\u5458\u4EF7\uFF1B3->\u4F7F\u7528\u9636\u68AF\u4EF7\u683C\uFF1B4->\u4F7F\u7528\u6EE1\u51CF\u4EF7\u683C\uFF1B5->\u9650\u65F6\u8D2D" })
    price_type?: number;
    @Column({ allowNull: true, type: DataType.INTEGER, comment: "\u9500\u91CF", defaultValue: "0" })
    sale?: number;
    @Column({ allowNull: true, type: DataType.STRING(1000), comment: "sku\u5C5E\u6027\uFF0Cjson\u683C\u5F0F" })
    sp_data?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7EA7\u5DEE\u5956\u52B1\uFF08\u597D\u7269\u4F53\u9A8C\u5B98\uFF09" })
    reward_hw?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7EA7\u5DEE\u5956\u52B1\uFF08\u9996\u5E2D\u5206\u4EAB\u5B98\uFF09" })
    reward_sx?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7206\u5355\u5956\u52B1\uFF08\u4E00\u7EA7\uFF09" })
    reward_bd1?: string;
    @Column({ allowNull: true, type: DataType.DECIMAL(10,2), comment: "\u7206\u5355\u5956\u52B1\uFF08\u4E8C\u7EA7\uFF09" })
    reward_bd2?: string;
    @Column({ allowNull: true, type: DataType.TINYINT, comment: "\u662F\u5426\u542F\u7528 1:\u542F\u7528", defaultValue: "0" })
    enabled?: number;
    @Column({ type: DataType.INTEGER, comment: "\u662F\u5426\u81EA\u52A8\u9690\u85CF\uFF080\u672A\u9690\u85CF 1\u81EA\u52A8\u9690\u85CF 2\u624B\u52A8\u9690\u85CF\uFF09", defaultValue: "0" })
    auto_disable?: number;
    @Column({ type: DataType.INTEGER, comment: "\u4E09\u65B9\u91C7\u8D2D\u6570\u91CF\u500D\u6570", defaultValue: "1" })
    cps_multiple?: number;
    @Column({ type: DataType.INTEGER, comment: "\u5DE1\u68C0\uFF1ASKU\u53D8\u5316(1\u9AD8\u4EAE)", defaultValue: "0" })
    isc_sku?: number;
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