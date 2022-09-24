import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_dictionary', timestamps: false, comment: '基础-字典表' })
export class TDictionary extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '字典表主键',
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

  @Column({ type: DataType.STRING(50), comment: '字典名称' })
  field_name!: string;

  @Column({ type: DataType.STRING(50), comment: '字典key' })
  field_key!: string;

  @Column({ type: DataType.STRING(1000), comment: '字典value' })
  field_value!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否是系统变量',
    defaultValue: '1',
  })
  is_system?: number;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '备注' })
  remark?: string;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort_no?: number;

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
