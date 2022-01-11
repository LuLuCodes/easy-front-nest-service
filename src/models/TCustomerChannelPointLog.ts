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
  tableName: 't_customer_channel_point_log',
  timestamps: false,
  comment: '\u4EBA\u5458\u5728\u6E20\u9053\u91CC\u7684\u79EF\u5206\u6D41\u6C34',
})
export class TCustomerChannelPointLog extends Model {
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
    comment: '\u4EBA\u5458\u5728\u6E20\u9053\u7F16\u7801',
  })
  @Index({ name: 'idx_info_id', using: 'BTREE', order: 'ASC', unique: false })
  info_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u4EBA\u5458\u7F16\u53F7\uFF08\u5197\u4F59\uFF09',
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
    comment: '\u6E20\u9053\u7F16\u7801\uFF08\u5197\u4F59\uFF09',
  })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u79EF\u5206\uFF08\u6B63\u6570\u52A0\uFF0C\u8D1F\u6570\u51CF\uFF09',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6D41\u6C34\u6807\u9898',
  })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5185\u5BB9\u63CF\u8FF0',
  })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u6D41\u6C34\u7C7B\u578B\uFF08\u81EA\u5B9A\u4E49\u5B57\u7B26\u4E32\uFF0C\u641C\u7D22\u7528\uFF09',
  })
  type?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u62B5\u7528\u7684\u94B1',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u6C47\u7387\uFF08x\u79EF\u5206\u62B51\u5143\uFF09',
  })
  rate?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u6765\u6E90\u7C7B\u578B\uFF081\u7A7A\u6295 2\u8D2D\u4E70\u8BA2\u5355 3\u53D1\u8D27\u8865\u507F\uFF09',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6765\u6E90\u53BB\u5411\u7F16\u7801',
  })
  source_id?: number;

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
