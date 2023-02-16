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
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '后台用户登录日志表',
})
export class TAdminLoginLog extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '日志主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '后台用户code' })
  @Index({
    name: 'idx_admin_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  admin_code!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最近一次登录时间' })
  last_login_time?: Date;

  @Column({ type: DataType.STRING(36), comment: '最近一次登录IP地址' })
  last_login_ip!: string;

  @Column({ type: DataType.STRING(300), comment: '浏览器登录类型' })
  user_agent!: string;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
