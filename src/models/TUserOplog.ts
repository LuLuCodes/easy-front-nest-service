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
  tableName: 't_user_oplog',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户操作记录表',
})
export class TUserOplog extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '用户id' })
  @Index({ name: 'idx_user', using: 'BTREE', order: 'ASC', unique: false })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '目标类型(表名)',
  })
  @Index({ name: 'idx_target', using: 'BTREE', order: 'ASC', unique: false })
  target_type?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '目标id(表id)' })
  @Index({ name: 'idx_target', using: 'BTREE', order: 'ASC', unique: false })
  target_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '【谁】' })
  action_user?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '动作，业务定义 1-新增 2-修改 3-删除',
  })
  action_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '【干了什么】',
  })
  action_desc?: string;

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
