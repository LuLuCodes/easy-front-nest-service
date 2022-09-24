import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_admin', timestamps: false, comment: '后台用户表' })
export class TAdmin extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '后台用户主键',
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

  @Column({ type: DataType.STRING(36), comment: '后台用户code' })
  admin_code!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '账号来源（0平台后台 1商家后台 2渠道后台）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({ type: DataType.BIGINT, comment: '账号来源编码', defaultValue: '0' })
  source_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '渠道类型（0普通 1渠道）',
    defaultValue: '0',
  })
  source_class?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后登录时间' })
  last_login_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否默认住账号',
    defaultValue: '0',
  })
  is_default?: number;

  @Column({ allowNull: true, type: DataType.STRING(30), comment: '邮箱' })
  @Index({ name: 'idx_email', using: 'BTREE', order: 'ASC', unique: false })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(15), comment: '手机号' })
  @Index({ name: 'idx_phone', using: 'BTREE', order: 'ASC', unique: false })
  phone?: string;

  @Column({ type: DataType.STRING(30), comment: '用户名' })
  @Index({ name: 'idx_username', using: 'BTREE', order: 'ASC', unique: false })
  username!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '头像' })
  icon?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '昵称' })
  nick_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注信息' })
  note?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '管理员管理的销售渠道[1,3……]',
  })
  sale_channel_ids?: string;

  @Column({ type: DataType.STRING(32), comment: '密码' })
  password!: string;

  @Column({ type: DataType.STRING(32), comment: '密码盐' })
  password_salt!: string;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  createname!: string;

  @Column({ type: DataType.TINYINT, comment: '0 可用, 1 禁用, 2 注销' })
  status!: number;

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
