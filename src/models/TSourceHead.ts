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
  tableName: 't_source_head',
  timestamps: false,
  comment: '\u7D20\u6750\u8868',
})
export class TSourceHead extends Model {
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
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u4E0A\u4F20\u7D20\u6750\u4EBA',
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
    type: DataType.STRING(200),
    comment: '\u7D20\u6750\u6807\u9898',
  })
  source_title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u91C7\u96C6\u5730\u5740',
  })
  source_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5E73\u53F0',
  })
  platform?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u7D20\u6750\u7C7B\u578B\uFF081\u6587\u7AE0 2\u89C6\u9891\uFF09',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u884C\u4E1A\u5206\u7C7B',
  })
  industry_category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment:
      '\u884C\u4E1A\u5206\u7C7B-\u884C\u4E1A\u5206\u7C7B-\u884C\u4E1A\u5206\u7C7B',
  })
  industry_category_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment:
      '\u884C\u4E1A\u5206\u7C7Bid-\u884C\u4E1A\u5206\u7C7Bid-\u884C\u4E1A\u5206\u7C7Bid',
  })
  industry_category_id_path?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '\u5206\u7C7B' })
  category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5206\u7C7B-\u5206\u7C7B-\u5206\u7C7B',
  })
  category_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5206\u7C7Bid-\u5206\u7C7Bid-\u5206\u7C7Bid',
  })
  category_id_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u70B9\u8D5E\u6570',
  })
  like_count?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8BC4\u8BBA\u6570',
  })
  comment_count?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8F6C\u53D1\u6570',
  })
  forward_count?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u6536\u85CF\u6570',
  })
  collection_count?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4F5C\u8005\u8D26\u53F7',
  })
  author_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u4F5C\u8005\u5934\u50CF',
  })
  author_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u4F5C\u8005\u83B7\u8D5E\u6570',
  })
  author_like?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u4F5C\u8005\u7C89\u4E1D\u6570',
  })
  author_fans?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u7D20\u6750\u8BE6\u60C5',
  })
  detail?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
  })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '\u7CFB\u7EDF\u6807\u7B7E[{"id":"1","name":"\u641E\u7B11"}]',
  })
  sys_tags?: object;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '\u6807\u7B7E[{"id":"1","name":"\u641E\u7B11"}]',
  })
  tags?: object;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u961F\u5217\u72B6\u6001\uFF080\u5F85\u91C7\u96C6\u57FA\u672C\u4FE1\u606F 10\u57FA\u672C\u4FE1\u606F\u91C7\u96C6\u4E2D 20\u57FA\u672C\u4FE1\u606F\u91C7\u96C6\u5B8C\u6BD5\u5F85\u91C7\u96C6\u89C6\u9891\u4FE1\u606F 30\u89C6\u9891\u4FE1\u606F\u91C7\u96C6\u4E2D 40\u91C7\u96C6\u5B8C\u6210 50\u57FA\u672C\u4FE1\u606F\u91C7\u96C6\u5931\u8D25 60\u89C6\u9891\u4FE1\u606F\u91C7\u96C6\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u961F\u5217\u9886\u53D6\u65F6\u95F4',
  })
  pick_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u91C7\u96C6\u5907\u6CE8',
  })
  pick_remark?: string;

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
