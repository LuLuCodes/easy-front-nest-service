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
  tableName: 't_spu_check_log',
  timestamps: false,
  comment: '\u7CFB\u7EDF\u5F02\u5E38\u8B66\u544A\u8868',
})
export class TSpuCheckLog extends Model {
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
    type: DataType.STRING(100),
    comment: '\u6DD8\u5B9D\u5546\u54C1\u7F16\u7801',
  })
  product_sn!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u7C7B\u578B\uFF081\u5546\u54C1\u66F4\u65B0 2\u8FD0\u8D39\u6A21\u677F\u66F4\u65B0 3\u4E0D\u53EF\u552E\u533A\u57DF\u66F4\u65B0 4\u5E97\u94FA\u66F4\u65B0\uFF09',
  })
  action_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u6210\u529F\uFF081\u6210\u529F 0\u5931\u8D25\uFF09',
  })
  if_success!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5931\u8D25\u5907\u6CE8',
  })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8BF7\u6C42\u5185\u5BB9',
  })
  json_req?: string;

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
