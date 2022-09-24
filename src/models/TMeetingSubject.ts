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
  tableName: 't_meeting_subject',
  timestamps: false,
  comment: '约会主题',
})
export class TMeetingSubject extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '项目编码',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.STRING(45), comment: '约会主题' })
  title!: string;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort?: number;

  @Column({ allowNull: true, type: DataType.STRING(1500), comment: '标签图' })
  tag_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(1500), comment: 'logo图' })
  logo_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1500),
    comment: '封面默认图',
  })
  main_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '主题分类' })
  category_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '主题分类' })
  category_name?: string;

  @Column({ allowNull: true, type: DataType.TINYINT, comment: '是否精选' })
  is_boutique?: number;

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
