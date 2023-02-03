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
  tableName: 't_admin_role',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '后台用户角色表',
})
export class TAdminRole extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '角色主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(100), comment: '名称' })
  @Index({ name: 'idx_role_name', using: 'BTREE', order: 'ASC', unique: false })
  role_name!: string;

  @Column({ type: DataType.STRING(500), comment: '描述' })
  desc!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '后台用户数量',
    defaultValue: '0',
  })
  admin_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '角色来源（0平台后台 1商家后台）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({ type: DataType.BIGINT, comment: '角色来源编码', defaultValue: '0' })
  source_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否系统角色',
    defaultValue: '0',
  })
  is_system?: number;

  @Column({ type: DataType.INTEGER, comment: '是否客服', defaultValue: '0' })
  is_customer_service?: number;

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
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
