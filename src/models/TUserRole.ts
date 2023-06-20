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
  tableName: 't_user_role',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '角色表',
})
export class TUserRole extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '角色主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
    defaultValue: '1',
  })
  role_type?: number;

  @Column({ type: DataType.STRING(50), comment: '角色名称' })
  @Index({ name: 'idx_role_name', using: 'BTREE', order: 'ASC', unique: false })
  role_name!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否系统角色，不可操作',
    defaultValue: '0',
  })
  is_supper?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '角色描述' })
  remark?: string;

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
