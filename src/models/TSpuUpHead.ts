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
  tableName: 't_spu_up_head',
  timestamps: false,
  comment: '\u5546\u54C1\u4E0A\u4F20\u4EFB\u52A1\u4E3B\u8868',
})
export class TSpuUpHead extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u7801' })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4F01\u4E1A\u7F16\u7801' })
  seller_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4EFB\u52A1\u540D\u79F0',
  })
  title?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E0A\u4F20\u9009\u54C1\uFF081\u540E\u53F0\u4EBA\u5DE5\u9009\u53D6\uFF0C2\u667A\u80FD\u81EA\u52A8\u9009\u53D6\uFF0C3\u6309\u5E97\u94FA\u6388\u6743\u7C7B\u9009\u53D6\uFF09',
    defaultValue: '1',
  })
  up_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment:
      '\u6DD8\u5B9D\u7C7B\u522B\u6570\u7EC4\uFF08\u2018,\u2019\u5206\u9694\uFF09',
  })
  category_ids?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u7C7B\u522B\u8DEF\u5F84',
  })
  category_path?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E0A\u4F20\u72B6\u6001\uFF080\u5F85\u4E0A\u4F20 1\u4E0A\u4F20\u4E2D 2\u5168\u90E8\u4E0A\u4F20\u6210\u529F 11\u5168\u90E8\u4E0A\u4F20\u5931\u8D25 12\u90E8\u5206\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  up_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u4E0A\u4F20\u603B\u6570',
    defaultValue: '0',
  })
  total_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u4E0A\u4F20\u6210\u529F\u6570',
    defaultValue: '0',
  })
  success_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u4E0A\u4F20\u5931\u8D25\u6570',
    defaultValue: '0',
  })
  fail_count?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u7236\u4EFB\u52A1\u7F16\u7801',
    defaultValue: '0',
  })
  father_head?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u52A0\u4EF7\u7C7B\u578B\uFF081\u767E\u5206\u6BD4 2\u56FA\u5B9A\u503C\uFF09',
  })
  price_up_type!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u52A0\u4EF7\u503C\uFF08\u767E\u5206\u6BD4\u6216\u5143\uFF09',
  })
  price_up!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6293\u53D6\u6307\u4EE4\u662F\u5426\u4E0B\u53D1\u5931\u8D25\uFF080\u6210\u529F 1\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  has_error?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6293\u53D6\u6307\u4EE4\u5931\u8D25\u5907\u6CE8',
  })
  error_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6293\u53D6\u662F\u5426\u5B8C\u6210',
    defaultValue: '0',
  })
  if_pick_finish?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8F93\u5165\u6293\u53D6\u539F\u59CB\u6570\u91CF',
    defaultValue: '0',
  })
  input_total_count?: number;

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
