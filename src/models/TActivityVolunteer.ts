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
  tableName: 't_activity_volunteer',
  timestamps: false,
  comment: '\u6D3B\u52A8\u4E49\u5DE5\u5FD7\u613F\u8005\u5217\u8868',
})
export class TActivityVolunteer extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u6D3B\u52A8\u7F16\u53F7' })
  @Index({
    name: 'idx_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  activity_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4EBA\u5458\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u59D3\u540D',
  })
  real_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u624B\u673A\u53F7',
  })
  phone?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u7533\u8BF7\u7C7B\u578B',
  })
  apply_types?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u64C5\u957F\u5185\u5BB9',
  })
  apply_content?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u7533\u8BF7\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 1\u5BA1\u6838\u901A\u8FC7 2\u5BA1\u6838\u4E0D\u901A\u8FC7\uFF09',
    defaultValue: '0',
  })
  apply_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7533\u8BF7\u65F6\u95F4',
  })
  apply_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5BA1\u6838\u65F6\u95F4',
  })
  audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_use?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_use_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5BA1\u6838\u5907\u6CE8',
  })
  audit_remark?: string;

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
