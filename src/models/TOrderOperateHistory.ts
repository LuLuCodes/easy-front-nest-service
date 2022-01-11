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
  tableName: 't_order_operate_history',
  timestamps: false,
  comment: '\u8BA2\u5355\u64CD\u4F5C\u5386\u53F2\u8BB0\u5F55',
})
export class TOrderOperateHistory extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u8BB0\u5F55\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u8BA2\u5355id' })
  order_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u539F\u59CB\u8BA2\u5355json',
  })
  old_order?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6700\u65B0\u8BA2\u5355json',
  })
  order?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
  })
  note?: string;

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
