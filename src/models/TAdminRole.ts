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
  timestamps: false,
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

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.STRING(100), comment: '名称' })
  @Index({ name: 'idx_role_name', using: 'BTREE', order: 'ASC', unique: false })
  role_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '描述' })
  desc?: string;

  @Column({
    allowNull: true,
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
  is_customer_ser?: number;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  username!: string;

  @Column({ type: DataType.TINYINT, comment: '0 可用, 1 禁用' })
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
