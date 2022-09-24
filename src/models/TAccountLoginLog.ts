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
  tableName: 't_account_login_log',
  timestamps: false,
  comment: '用户登录日志表',
})
export class TAccountLoginLog extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '日志主键',
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

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最近一次登录时间' })
  last_login_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(36),
    comment: '最近一次登录IP地址',
  })
  last_login_ip?: string;

  @Column({ allowNull: true, type: DataType.STRING(600), comment: '浏览器UA' })
  user_agent?: string;

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
