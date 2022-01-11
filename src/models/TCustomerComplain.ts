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
  tableName: 't_customer_complain',
  timestamps: false,
  comment: '\u4E3E\u62A5\u6295\u8BC9\u8868',
})
export class TCustomerComplain extends Model {
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
    comment: '\u5BA2\u6237\u7F16\u7801',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u88AB\u4E3E\u62A5\u4EBA',
    defaultValue: '0',
  })
  to_customer_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E3E\u62A5\u7C7B\u578B\uFF081\u53D1\u5E7F\u544A\uFF0C2\u9A9A\u6270\u8C29\u9A82\uFF0C3\u865A\u5047\u7167\u7247\uFF0C4\u8272\u60C5\u4F4E\u4FD7\uFF0C5TA\u662F\u9A97\u5B50\uFF09',
  })
  complain_type!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u4E3E\u62A5\u622A\u56FE',
  })
  complain_content?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u8865\u5145\u63CF\u8FF0',
  })
  complain_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u5904\u7406\u72B6\u6001\uFF080\u5F85\u5904\u7406 10\u5DF2\u5904\u7406\uFF09',
  })
  deal_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5904\u7406\u4EBA',
  })
  deal_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5904\u7406\u65F6\u95F4',
  })
  deal_time?: Date;

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

  @Column({ type: DataType.BIGINT, comment: '\u7F16\u8F91\u4EBA' })
  modifier_id!: number;
}
