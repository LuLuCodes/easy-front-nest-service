import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_sms', timestamps: false })
export class TSms extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '手机号' })
  @Index({ name: 'idx_mobile', using: 'BTREE', order: 'ASC', unique: false })
  mobile?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '短信类型 1：注册 2：登录 3：验证手机 4：绑定手机 99其他',
  })
  sms_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: "发送参数{code:'123'}",
  })
  sms_param?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '过期时间' })
  @Index({ name: 'idx_mobile', using: 'BTREE', order: 'ASC', unique: false })
  expire_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '0未验证，1已验证 11发送失败',
  })
  status?: number;

  @Column({ allowNull: true, type: DataType.STRING(128), comment: '发送人ip' })
  @Index({ name: 'idx_ip', using: 'BTREE', order: 'ASC', unique: false })
  sender_ip?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '发送结果' })
  sender_result?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  @Index({ name: 'idx_ip', using: 'BTREE', order: 'ASC', unique: false })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
