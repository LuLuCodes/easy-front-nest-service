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
  tableName: 't_audit',
  timestamps: false,
  comment: '\u5BA1\u6838\u8868',
})
export class TAudit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '\u5E94\u7528id' })
  app_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BA1\u6838\u5BF9\u8C61\u7C7B\u578B\uFF081\u662F\u5426\u5973\u795E\uFF0C2\u7533\u8BF7\u79C1\u5BC6\u76F8\u518C\uFF0C3\u5FAE\u4FE1\u4FE1\u606F\u8BA4\u8BC1\uFF0C4\u76F8\u518C\u9501\uFF0C5\u4EE3\u7406\uFF0C6\u8BED\u97F3\u4FE1\u606F\u8BA4\u8BC1\uFF09',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_type!: number;

  @Column({
    type: DataType.BIGINT,
    comment:
      '\u5BA1\u6838\u5BF9\u8C61\uFF081\u5973\u795E\uFF1A\u5BA2\u6237\u7F16\u7801\uFF0C2\u79C1\u5BC6\u76F8\u518C\u5BA2\u6237\u7F16\u7801\uFF0C3\u7533\u62A5\u4EBA\u7F16\u7801\uFF09',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(5000),
    comment: '\u7533\u8BF7json\u5907\u6CE8',
  })
  source_json?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BA1\u6838\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 1\u5DF2\u5BA1\u6838 2\u5BA1\u6838\u62D2\u7EDD\uFF09',
  })
  audit_status!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5BA1\u6838\u65F6\u95F4',
  })
  audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5BA1\u6838\u4EBA\u5907\u6CE8',
  })
  audit_remark?: string;

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
