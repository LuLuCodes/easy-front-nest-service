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
  tableName: 't_meeting_complain',
  timestamps: false,
  comment: '\u7EA6\u4F1A\u6295\u8BC9\u8868',
})
export class TMeetingComplain extends Model {
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
    type: DataType.BIGINT,
    comment: '\u9879\u76EE\u7F16\u7801',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '\u6295\u8BC9\u4EBA' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u88AB\u6295\u8BC9\u4EBA' })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6295\u8BC9\u7C7B\u578B\uFF081\u5BF9\u65B9\u723D\u7EA6 2\u7167\u7247\u4E0E\u672C\u4EBA\u5DEE\u8DDD\u8FC7\u5927 3\u8BC8\u9A97\u7B49\u8FDD\u6CD5\u884C\u4E3A\uFF09',
    defaultValue: '0',
  })
  complain_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u662F\u5426\u9000\u6B3E\uFF08\u94B1\u662F\u5426\u5DF2\u81EA\u52A8\u9000\u7ED9\u7537\u58EB\uFF09',
  })
  is_rma?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u6295\u8BC9\u5185\u5BB9',
  })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u6295\u8BC9\u622A\u56FE',
  })
  url_obj?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u6295\u8BC9\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u5973\u65B9\u80DC 2\u7537\u65B9\u80DC\uFF09',
  })
  com_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5904\u7406\u4EBA',
  })
  del_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5904\u7406\u65F6\u95F4',
  })
  del_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5904\u7406\u5907\u6CE8',
  })
  del_remark?: string;

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
