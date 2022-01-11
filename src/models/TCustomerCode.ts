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
  tableName: 't_customer_code',
  timestamps: false,
  comment: '\u5BA2\u6237\u53F7\u7801\u8868',
})
export class TCustomerCode extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5BA2\u6237\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u662F\u5B69\u5B50',
    defaultValue: '0',
  })
  if_son?: number;

  @Column({
    type: DataType.STRING(50),
    comment: 'code\u7C7B\u578B(\u51E0\u53F7\u4EBA)',
  })
  code_type!: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u5BA2\u6237\u53F7\u7801\u540D\u79F0',
  })
  code_name!: string;

  @Column({ allowNull: true, type: DataType.DATEONLY, comment: '\u751F\u65E5' })
  code_birthday?: string;

  @Column({
    type: DataType.STRING(500),
    comment: '\u5BA2\u6237\u53F7\u7801\uFF08\u94BB\u6570\u5B57\uFF09',
  })
  code!: string;

  @Column({
    type: DataType.STRING(500),
    comment:
      '\u5BA2\u6237\u53F7\u7801\u5907\u6CE8\uFF08\u8054\u5408\u6570\u5B57\uFF09',
  })
  code_remark!: string;

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
