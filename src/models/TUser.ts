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
  tableName: 't_user',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户基础信息表',
})
export class TUser extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '用户名称' })
  nick?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '用户头像' })
  avatar?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '手机号' })
  phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '用户标签' })
  tag?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '备注' })
  note?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
    defaultValue: '1',
  })
  role_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '账户状态 1-正常 11-禁用 12-注销',
  })
  user_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '删除时间 null-未删除',
  })
  deleted_at?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
