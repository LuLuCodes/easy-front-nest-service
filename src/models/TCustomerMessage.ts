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
  tableName: 't_customer_message',
  timestamps: false,
  comment: '个人消息表',
})
export class TCustomerMessage extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '用户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '消息类型（1收益到账通知，2好友下单通知，3好友退单通知，4拉新通知，5下级升级通知，6自购订单通知，7自购订单发货通知，8自购退单通知）',
  })
  message_type!: number;

  @Column({ type: DataType.STRING(100), comment: '消息标题' })
  message_title!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '消息内容' })
  message_content?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '消息自定义json' })
  message_json?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
