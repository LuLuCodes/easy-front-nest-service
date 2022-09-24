import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_chat', timestamps: false, comment: '聊天记录表' })
export class TChat extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '发送人id' })
  @Index({ name: 'idx_sender_id', using: 'BTREE', order: 'ASC', unique: false })
  sender_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '接受人id' })
  @Index({
    name: 'idx_receive_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  receive_id?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '消息类型 1文本 2图像 3位置 4语音 5视频 6私密相册请求 7微信查看申请',
  })
  msg_type?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '阅读状态(0未读 1已读)',
    defaultValue: '0',
  })
  read_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '消息内容' })
  msg_content?: string;

  @Column({ type: DataType.TINYINT, comment: '是否推送', defaultValue: '0' })
  is_push?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '审核id' })
  audit_id?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '应答状态 1 同意 2拒绝',
  })
  agree_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'send是否删除',
    defaultValue: '0',
  })
  sender_id_del?: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'receive_id是否删除',
    defaultValue: '0',
  })
  receive_id_del?: number;

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
