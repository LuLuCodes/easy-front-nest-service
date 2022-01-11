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
  tableName: 't_admin',
  timestamps: false,
  comment: '\u540E\u53F0\u7528\u6237\u8868',
})
export class TAdmin extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u540E\u53F0\u7528\u6237\u4E3B\u952E',
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
    type: DataType.STRING(36),
    comment: '\u540E\u53F0\u7528\u6237code',
  })
  admin_code!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8D26\u53F7\u6765\u6E90\uFF080\u5E73\u53F0\u540E\u53F0 1\u5546\u5BB6\u540E\u53F0\uFF09',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u8D26\u53F7\u6765\u6E90\u7F16\u7801',
    defaultValue: '0',
  })
  source_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6E20\u9053\u7C7B\u578B\uFF080\u666E\u901A 1\u6E20\u9053\uFF09',
    defaultValue: '0',
  })
  source_class?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u767B\u5F55\u65F6\u95F4',
  })
  last_login_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u9ED8\u8BA4\u4F4F\u8D26\u53F7',
    defaultValue: '0',
  })
  is_default?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(30),
    comment: '\u90AE\u7BB1',
  })
  @Index({ name: 'idx_email', using: 'BTREE', order: 'ASC', unique: false })
  email?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(15),
    comment: '\u624B\u673A\u53F7',
  })
  @Index({ name: 'idx_phone', using: 'BTREE', order: 'ASC', unique: false })
  phone?: string;

  @Column({ type: DataType.STRING(30), comment: '\u7528\u6237\u540D' })
  @Index({ name: 'idx_username', using: 'BTREE', order: 'ASC', unique: false })
  username!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5934\u50CF',
  })
  icon?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u6635\u79F0',
  })
  nick_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8\u4FE1\u606F',
  })
  note?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u7BA1\u7406\u5458\u7BA1\u7406\u7684\u9500\u552E\u6E20\u9053[1,3\u2026\u2026]',
  })
  sale_channel_ids?: string;

  @Column({ type: DataType.STRING(32), comment: '\u5BC6\u7801' })
  password!: string;

  @Column({ type: DataType.STRING(32), comment: '\u5BC6\u7801\u76D0' })
  password_salt!: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u521B\u5EFA\u4EBA\u59D3\u540D',
  })
  createname!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 \u53EF\u7528, 1 \u7981\u7528, 2 \u6CE8\u9500',
  })
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
