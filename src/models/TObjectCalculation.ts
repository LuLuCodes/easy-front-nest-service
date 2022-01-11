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
  tableName: 't_object_calculation',
  timestamps: false,
  comment: '\u8BA1\u6570\u8868',
})
export class TObjectCalculation extends Model {
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
    comment: '\u8BA1\u6570\u8005\u6765\u6E90\u7F16\u7801',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8BA1\u6570\u8005\u6765\u6E90\uFF081\u5BA2\u6237\u8868, 2\u804A\u5929\u8868\uFF09',
  })
  source_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8BA1\u6570\u7C7B\u578B\uFF081\u70B9\u8D5E 2\u8BC4\u8BBA 3\u559C\u6B22 4\u94B1\u5305\u63D0\u9192 5\u89E3\u9501\u804A\u5929\uFF09',
    defaultValue: '0',
  })
  calculation_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6570\u91CF',
    defaultValue: '0',
  })
  calculation_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u76EE\u6807\u7F16\u7801',
    defaultValue: '0',
  })
  to_id?: number;

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
