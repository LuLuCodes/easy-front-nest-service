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
  tableName: 't_chat_session',
  timestamps: false,
  comment: '\u804A\u5929\u4F1A\u8BDD\u8868-\u6700\u8FD1\u8054\u7CFB\u4EBA',
})
export class TChatSession extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
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
    comment: '\u5F53\u524D\u4EBAid',
  })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u63A5\u53D7\u4EBAid',
  })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6700\u540E\u6D88\u606Fid',
  })
  @Index({
    name: 'idx_last_msg_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  last_msg_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u672A\u8BFB\u6D88\u606F\u6570\u91CF',
    defaultValue: '0',
  })
  no_read_count?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u670B\u53CB\u5173\u7CFB 0 1\u62C9\u9ED1',
  })
  friend_status?: number;

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
