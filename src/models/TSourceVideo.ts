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
  tableName: 't_source_video',
  timestamps: false,
  comment: '\u7D20\u6750\u89C6\u9891\u8868',
})
export class TSourceVideo extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '\u7D20\u6750id' })
  @Index({
    name: 'idx_source_head_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  source_head_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u539F\u59CB\u89C6\u9891\u5730\u5740',
  })
  video_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u91C7\u96C6\u540E\u7684\u89C6\u9891\u5730\u5740',
  })
  oss_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u961F\u5217\u72B6\u6001\uFF080\u5F85\u91C7\u96C6 10\u91C7\u96C6\u4E2D 20\u91C7\u96C6\u5B8C\u6BD5\u5F85 30\u91C7\u96C6\u5931\u8D25\uFF09',
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
