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
  tableName: 't_admin_menu_relation',
  timestamps: false,
  comment: '后台用户和权限关系表(除角色中定义的权限以外的加减权限)',
})
export class TAdminMenuRelation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '关系主键',
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

  @Column({ type: DataType.BIGINT, comment: 'admin_id' })
  @Index({
    name: 'idx_admin_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  admin_id!: number;

  @Column({ type: DataType.BIGINT, comment: '权限主键' })
  menu_id!: number;

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
