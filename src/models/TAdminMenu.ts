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
  tableName: 't_admin_menu',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '后台菜单表',
})
export class TAdminMenu extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '菜单主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '父级ID' })
  @Index({ name: 'idx_parent_id', using: 'BTREE', order: 'ASC', unique: false })
  parent_id!: number;

  @Column({
    type: DataType.TINYINT,
    comment: '权限类型 0 未知 1目录 2菜单 3按钮',
    defaultValue: '0',
  })
  right_type?: number;

  @Column({ type: DataType.STRING(100), comment: '菜单名称' })
  title!: string;

  @Column({ type: DataType.INTEGER, comment: '菜单级数', defaultValue: '0' })
  level?: number;

  @Column({ type: DataType.INTEGER, comment: '菜单排序', defaultValue: '0' })
  sort_no?: number;

  @Column({ type: DataType.STRING(50), comment: '前端路由name' })
  show_name!: string;

  @Column({ type: DataType.STRING(200), comment: '前端图标' })
  show_icon!: string;

  @Column({ type: DataType.STRING(50), comment: '菜单编码' })
  menu_code!: string;

  @Column({ type: DataType.STRING(255), comment: '跳转地址' })
  redirect!: string;

  @Column({ type: DataType.STRING(50), comment: 'component' })
  layout!: string;

  @Column({ type: DataType.STRING(50), comment: '前端路由path' })
  show_path!: string;

  @Column({ type: DataType.STRING(500), comment: '额外的字段' })
  extra!: string;

  @Column({ type: DataType.INTEGER, comment: '来源', defaultValue: '0' })
  source_type?: number;

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

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
