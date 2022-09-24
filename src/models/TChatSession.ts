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
  comment: '聊天会话表-最近联系人',
})
export class TChatSession extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '当前人id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '接受人id' })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后消息id' })
  @Index({
    name: 'idx_last_msg_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  last_msg_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '未读消息数量',
    defaultValue: '0',
  })
  no_read_count?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '朋友关系 0 1拉黑',
  })
  friend_status?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
