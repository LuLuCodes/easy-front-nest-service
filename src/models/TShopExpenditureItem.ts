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
  tableName: 't_shop_expenditure_item',
  timestamps: false,
  comment: '\u5E97\u94FA\u989D\u5916\u5F00\u652F\u8868\u660E\u7EC6\u8868',
})
export class TShopExpenditureItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u4E3B\u952E',
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
    comment: '\u5E97\u94FA\u7F16\u7801\uFF08\u5197\u4F59\uFF09',
  })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u5E97\u94FA\u989D\u5916\u5F00\u652F\u8868\u5934',
  })
  @Index({
    name: 'idx_shop_expenditure_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  shop_expenditure_id!: number;

  @Column({
    type: DataType.DATE,
    comment:
      '\u5F00\u652F\u8D77\u59CB\u65F6\u95F4\uFF08\u5305\u62EC\u8FD9\u4E2A\u70B9\uFF09',
  })
  start_time!: Date;

  @Column({
    type: DataType.DATE,
    comment:
      '\u5F00\u652F\u7ED3\u675F\u65F6\u95F4\uFF08\u4E0D\u5305\u62EC\u8FD9\u4E2A\u70B9\uFF09',
  })
  end_time!: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u91D1\u989D',
    defaultValue: '0.00',
  })
  const?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5907\u6CE8\u8BF4\u660E',
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
