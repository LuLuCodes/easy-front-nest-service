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
  tableName: 't_user_right',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '权限表',
})
export class TUserRight extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '权限主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.BIGINT, comment: '权限父级ID', defaultValue: '0' })
  @Index({ name: 'idx_parent_id', using: 'BTREE', order: 'ASC', unique: false })
  parent_id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '角色类型 1-平台端角色 其他根据业务自己定义',
    defaultValue: '1',
  })
  role_type?: number;

  @Column({ type: DataType.TINYINT, comment: '权限类型 1-菜单 2-按钮' })
  right_type!: number;

  @Column({ type: DataType.STRING(50), comment: '菜单编码' })
  right_code!: string;

  @Column({ type: DataType.STRING(50), comment: '权限名称' })
  right_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '排序字段 0-最大 默认0',
    defaultValue: '0',
  })
  sort_no?: number;

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
