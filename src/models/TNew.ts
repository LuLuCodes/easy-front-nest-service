import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_new', timestamps: false, comment: '新闻公告表' })
export class TNew extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键',
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

  @Column({ type: DataType.STRING(100), comment: '新闻标题' })
  new_title!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '新闻类别（0普通新闻）',
    defaultValue: '0',
  })
  new_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '自定义类别（公共、常见问题等）',
  })
  new_category?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '新闻详情' })
  new_content?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '概述' })
  new_about?: string;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '新闻附件' })
  new_files?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '展示方式（0普通，1弹窗）',
    defaultValue: '0',
  })
  show_type?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '新闻状态（0草稿 10发布 11撤下）',
    defaultValue: '0',
  })
  new_status?: number;

  @Column({ type: DataType.INTEGER, comment: '游览数', defaultValue: '0' })
  visit_count?: number;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  username!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '发布时间' })
  publish_time?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
