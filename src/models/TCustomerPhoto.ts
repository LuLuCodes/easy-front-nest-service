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
  tableName: 't_customer_photo',
  timestamps: false,
  comment: '\u7528\u6237\u76F8\u518C',
})
export class TCustomerPhoto extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: 'idx_customer', using: 'BTREE', order: 'ASC', unique: false })
  customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u76F8\u518C\u7C7B\u578B:0:\u666E\u901A 1:\u771F\u4EBA2:\u5973\u795E,3\u9605\u540E\u5373\u711A,4:\u4ED8\u8D39,\u5982\u679C\u662F1\u5220\u9664\u89E6\u53D1\u5220\u51FA\u8BA4\u8BC1',
  })
  photo_type?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u6587\u4EF6\u7C7B\u578B\uFF1A1:\u56FE\u72472:\u89C6\u9891',
  })
  file_type!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u5730\u5740',
  })
  pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u9644\u52A0\u5730\u5740',
  })
  pic_url_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u5BA1\u6838\u6807\u8BB0 1\u5BA1\u6838 0\u672A\u5BA1\u6838 11\u5BA1\u6838\u5931\u8D25 12\u9700\u8981\u4EBA\u5DE5\u5BA1\u6838',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5BA1\u6838\u65F6\u95F4',
  })
  audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u5BA1\u6838\u539F\u56E0',
  })
  audit_reason?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  @Index({ name: 'idx_customer', using: 'BTREE', order: 'ASC', unique: false })
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
