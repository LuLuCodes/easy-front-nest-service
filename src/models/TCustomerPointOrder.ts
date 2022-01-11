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
  tableName: 't_customer_point_order',
  timestamps: false,
  comment: '\u5BA2\u6237\u8C46\u8C46\u8D2D\u4E70\u8868',
})
export class TCustomerPointOrder extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
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

  @Column({ type: DataType.INTEGER, comment: '\u5BA2\u6237\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u8C46\u8C46\u5E01',
    defaultValue: '0.00',
  })
  point?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u6536\u6B3E\u8C46\u8C46\u5E01\uFF08\u9664\u6389\u624B\u7EED\u8D39\uFF09',
    defaultValue: '0',
  })
  to_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6D88\u8D39\u7C7B\u578B\uFF081\u8D2D\u4E70\u804A\u5929 2\u8D2D\u4E70\u5FAE\u4FE1\u4FE1\u606F\uFF09',
  })
  consumption_type!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u5173\u8054\u7F16\u7801',
    defaultValue: '0',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8D2D\u4E70\u4EFD\u6570',
    defaultValue: '0',
  })
  count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u67E5\u770B',
    defaultValue: '0',
  })
  if_check?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u652F\u4ED8\u65F6\u95F4',
  })
  pay_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u7ED3\u7B97\u6807\u8BB0\uFF080\u5F85\u7ED3\u7B97 1\u5DF2\u7ED3\u7B97\uFF09',
    defaultValue: '0',
  })
  is_settle?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7ED3\u7B97\u65F6\u95F4',
  })
  settle_time?: Date;

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
