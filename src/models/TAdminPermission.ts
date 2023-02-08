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
  tableName: 't_admin_permission',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '后台用户权限表',
})
export class TAdminPermission extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '权限主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '父级权限id' })
  @Index({ name: 'idx_parent_id', using: 'BTREE', order: 'ASC', unique: false })
  parent_id!: number;

  @Column({ type: DataType.STRING(100), comment: '名称' })
  name!: string;

  @Column({ type: DataType.STRING(200), comment: '权限值' })
  value!: string;

  @Column({ type: DataType.STRING(500), comment: '图标' })
  icon!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '权限类型：0->目录；1->菜单；2->按钮（接口绑定权限）',
    defaultValue: '0',
  })
  type?: number;

  @Column({ type: DataType.STRING(200), comment: '前端资源路径' })
  uri!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  created_by?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  updated_by?: number;
}
