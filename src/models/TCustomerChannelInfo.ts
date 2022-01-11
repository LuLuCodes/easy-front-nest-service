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
  tableName: 't_customer_channel_info',
  timestamps: false,
  comment: '\u4EBA\u5458\u5728\u6E20\u9053\u91CC\u7684\u4FE1\u606F\u5217\u8868',
})
export class TCustomerChannelInfo extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u4EBA\u5458\u7F16\u53F7' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u6E20\u9053\u7F16\u7801' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u6E20\u9053\u7C7B\u578B\uFF081\u4F01\u4E1A\u6E20\u9053 2\u4F1A\u5458\u6E20\u9053\uFF09',
  })
  sale_channel_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6E20\u9053\u662F\u5426\u7981\u7528\uFF080\u542F\u7528 1\u7981\u7528\uFF09',
    defaultValue: '0',
  })
  if_disable?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6700\u540E\u5BA1\u6838\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 1\u5BA1\u6838\u901A\u8FC7 2\u5BA1\u6838\u5C45\u5BB6\uFF09',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u6700\u540E\u5BA1\u6838\u5907\u6CE8',
  })
  audit_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u65F6\u95F4',
  })
  audit_sale_channel_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u4EBA\u5458',
  })
  audit_sale_channel_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u4EBA\u5458',
  })
  audit_sale_channel_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u7B2C\u4E00\u6B21\u7ED1\u5B9A\u6B21\u6E20\u9053\u7684\u65F6\u95F4',
  })
  first_join_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u4EBA\u5458\u5728\u6B64\u6E20\u9053\u4E0B\u7684\u79EF\u5206',
  })
  point?: string;

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
