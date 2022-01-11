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
  tableName: 't_admin_login_log',
  timestamps: false,
  comment: '\u540E\u53F0\u7528\u6237\u767B\u5F55\u65E5\u5FD7\u8868',
})
export class TAdminLoginLog extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u65E5\u5FD7\u4E3B\u952E',
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
  @Index({
    name: 'idx_admin_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  admin_code!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u8FD1\u4E00\u6B21\u767B\u5F55\u65F6\u95F4',
  })
  last_login_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(36),
    comment: '\u6700\u8FD1\u4E00\u6B21\u767B\u5F55IP\u5730\u5740',
  })
  last_login_ip?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '\u6D4F\u89C8\u5668\u767B\u5F55\u7C7B\u578B',
  })
  user_agent?: string;

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
