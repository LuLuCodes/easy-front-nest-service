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
  tableName: 't_account',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '账户表',
})
export class TAccount extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '账户主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(30), comment: '邮箱' })
  @Index({ name: 'idx_email', using: 'BTREE', order: 'ASC', unique: false })
  email!: string;

  @Column({ type: DataType.STRING(15), comment: '手机号' })
  @Index({ name: 'idx_phone', using: 'BTREE', order: 'ASC', unique: false })
  phone!: string;

  @Column({ type: DataType.STRING(30), comment: '用户名' })
  @Index({ name: 'idx_username', using: 'BTREE', order: 'ASC', unique: false })
  username!: string;

  @Column({ type: DataType.STRING(32), comment: '密码' })
  password!: string;

  @Column({ type: DataType.STRING(32), comment: '密码盐' })
  password_salt!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用, 2 注销',
    defaultValue: '1',
  })
  enabled?: number;

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
