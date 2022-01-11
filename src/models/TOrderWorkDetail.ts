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
  tableName: 't_order_work_detail',
  timestamps: false,
  comment: '\u8BA2\u5355\u5DE5\u5355\u660E\u7EC6\u8868',
})
export class TOrderWorkDetail extends Model {
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
    comment: '\u5DE5\u5355\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({ name: 'idx_work_id', using: 'BTREE', order: 'ASC', unique: false })
  work_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5904\u7406\u5185\u5BB9',
  })
  deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5904\u7406\u9644\u4EF6',
  })
  deal_file?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u521B\u5EFA\u4EBA',
  })
  create_user?: string;

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
