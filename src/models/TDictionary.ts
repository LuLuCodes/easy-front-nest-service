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
  tableName: 't_dictionary',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '基础-字典表',
})
export class TDictionary extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '字典表主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(50), comment: '字典名称' })
  field_name!: string;

  @Column({ type: DataType.STRING(50), comment: '字典key' })
  @Index({ name: 'idx_field_key', using: 'BTREE', order: 'ASC', unique: false })
  field_key!: string;

  @Column({ type: DataType.STRING(1000), comment: '字典value' })
  field_value!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否是系统变量',
    defaultValue: '1',
  })
  is_system?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否初始化时缓存',
    defaultValue: '0',
  })
  is_init_cache?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '备注' })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  sort_no?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建者id' })
  created_by!: number;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ type: DataType.BIGINT, comment: '更新者id' })
  updated_by!: number;
}
