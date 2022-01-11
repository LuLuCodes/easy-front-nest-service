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
  tableName: 't_welfare_head',
  timestamps: false,
  comment: '\u6743\u76CA\u53D1\u653E\u8868',
})
export class TWelfareHead extends Model {
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
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u9500\u552E\u6E20\u9053',
  })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6743\u76CA\u6807\u9898',
  })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u6743\u76CA\u7C7B\u578B\uFF081\u7A7A\u6295\u6743\u76CA 2\u81EA\u52A8\u9886\u53D6\u6743\u76CA\uFF09',
  })
  welfare_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6743\u76CA\u4EFD\u6570',
  })
  welfare_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u6E20\u9053\u7ED1\u5B9A\u65F6\u95F4\u6BB5\u7528\u6237\u53EF\u4EAB\u53D7\u7A7A\u6295',
  })
  bind_start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u6E20\u9053\u7ED1\u5B9A\u65F6\u95F4\u6BB5\u7528\u6237\u53EF\u4EAB\u53D7\u7A7A\u6295',
  })
  bind_end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u4EE5\u9886\u53D6\u65F6\u95F4',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7EC8\u6B62\u9886\u53D6\u65F6\u95F4',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '\u4F7F\u7528\u8BF4\u660E',
  })
  detail_remark?: string;

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
