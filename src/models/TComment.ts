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
  tableName: 't_comment',
  timestamps: false,
  comment: '\u8BC4\u8BBA\u70B9\u8D5E\u8868',
})
export class TComment extends Model {
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
    type: DataType.INTEGER,
    comment:
      '\u8BC4\u8BBA\u7C7B\u578B\uFF081\u8BC4\u8BBA 2\u70B9\u8D5E 3\u62C9\u9ED1\uFF09',
  })
  comment_type!: number;

  @Column({ type: DataType.BIGINT })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6765\u6E90\uFF081\u52A8\u6001 2\u95EE\u9898\u53CD\u9988\uFF09',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6765\u6E90\u7F16\u7801\uFF081\u52A8\u6001\u7F16\u7801\uFF09',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1500),
    comment: '\u8BC4\u8BBA\u5185\u5BB9',
  })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u56DE\u590D\u5BF9\u8C61',
  })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u56DE\u590D\u5BF9\u8C61\u6635\u79F0',
  })
  to_customer_nick?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u5DF2\u8BFB',
    defaultValue: '0',
  })
  if_read?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u662F\u6839\u8BC4\u8BBA',
    defaultValue: '1',
  })
  if_root?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
