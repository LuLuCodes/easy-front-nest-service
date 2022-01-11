import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({
  tableName: 't_customer_converse_fee',
  timestamps: false,
  comment: '\u8BED\u97F3\u89C6\u9891\u6D88\u8D39\u8BB0\u5F55',
})
export class TCustomerConverseFee extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u53D1\u8D77\u4EBA\u5BA2\u6237\u7F16\u7801',
  })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u63A5\u542C\u4EBA\u5BA2\u6237\u7F16\u7801',
  })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u7C7B\u578B(1\u8BED\u97F3 2\u89C6\u9891)',
  })
  type!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u6D88\u8017\u8C46\u8C46\u5E01',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u6BCF\u5206\u949F\u8D39\u7528',
  })
  point_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u5E73\u53F0\u5206\u6DA6',
  })
  plant_point?: string;

  @Column({ type: DataType.BIGINT, comment: '\u65F6\u957F', defaultValue: '0' })
  duration?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
  })
  remark?: string;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
