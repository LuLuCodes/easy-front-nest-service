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
  tableName: 't_welfare_customer',
  timestamps: false,
  comment: '\u6743\u76CA\u5546\u54C1\u8868',
})
export class TWelfareCustomer extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '\u6743\u76CAid' })
  @Index({
    name: 'idx_welfare_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  welfare_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u9500\u552E\u6E20\u9053\uFF08\u5197\u4F59\uFF09',
  })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5BA2\u6237\u7F16\u7801',
  })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u5BA2\u6237\u624B\u673A\u53F7',
  })
  phone?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u9886\u53D6\u72B6\u6001\uFF080\u5F85\u9886\u53D6 1\u5F85\u4F7F\u7528 2\u5DF2\u4F7F\u7528\uFF09',
  })
  pick_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u4EE5\u9886\u53D6\u65F6\u95F4\uFF08\u5197\u4F59\uFF09',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7EC8\u6B62\u9886\u53D6\u65F6\u95F4\uFF08\u5197\u4F59\uFF09',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5151\u6362\u7684\u5546\u54C1',
  })
  product_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5151\u6362\u7684\u5546\u54C1',
  })
  sku_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5151\u6362\u65F6\u95F4',
  })
  use_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u4F7F\u7528\u7684\u8BA2\u5355',
  })
  use_order_id?: number;

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
