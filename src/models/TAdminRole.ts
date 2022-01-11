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
  tableName: 't_admin_role',
  timestamps: false,
  comment: '\u540E\u53F0\u7528\u6237\u89D2\u8272\u8868',
})
export class TAdminRole extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u89D2\u8272\u4E3B\u952E',
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

  @Column({ type: DataType.STRING(100), comment: '\u540D\u79F0' })
  @Index({ name: 'idx_role_name', using: 'BTREE', order: 'ASC', unique: false })
  role_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u63CF\u8FF0',
  })
  desc?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u540E\u53F0\u7528\u6237\u6570\u91CF',
    defaultValue: '0',
  })
  admin_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u89D2\u8272\u6765\u6E90\uFF080\u5E73\u53F0\u540E\u53F0 1\u5546\u5BB6\u540E\u53F0\uFF09',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u89D2\u8272\u6765\u6E90\u7F16\u7801',
    defaultValue: '0',
  })
  source_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u7CFB\u7EDF\u89D2\u8272',
    defaultValue: '0',
  })
  is_system?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u5BA2\u670D',
    defaultValue: '0',
  })
  is_customer_ser?: number;

  @Column({
    type: DataType.STRING(50),
    comment: '\u521B\u5EFA\u4EBA\u59D3\u540D',
  })
  username!: string;

  @Column({ type: DataType.TINYINT, comment: '0 \u53EF\u7528, 1 \u7981\u7528' })
  status!: number;

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
