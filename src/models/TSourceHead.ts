import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_source_head', timestamps: false, comment: '素材表' })
export class TSourceHead extends Model {
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
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '上传素材人' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '素材标题' })
  source_title?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '采集地址' })
  source_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '平台' })
  platform?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '素材唯一编码' })
  @Index({
    name: 'idx_plantform_uuid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  plantform_uuid?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '素材类型（1文章 2视频）',
  })
  source_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '资源类型（1文章 2视频）',
    defaultValue: '0',
  })
  resource_type?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '行业分类' })
  industry_category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '行业分类-行业分类-行业分类',
  })
  industry_category_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '行业分类id-行业分类id-行业分类id',
  })
  industry_category_id_path?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '分类' })
  category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '分类-分类-分类',
  })
  category_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '分类id-分类id-分类id',
  })
  category_id_path?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '点赞数' })
  like_count?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '评论数' })
  comment_count?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '转发数' })
  forward_count?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '收藏数' })
  collection_count?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '作者账号' })
  author_account?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '作者头像' })
  author_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '作者获赞数' })
  author_like?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '作者粉丝数' })
  author_fans?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '素材详情' })
  detail?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '系统标签[{"id":"1","name":"搞笑"}]',
  })
  sys_tags?: object;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '标签[{"id":"1","name":"搞笑"}]',
  })
  tags?: object;

  @Column({
    type: DataType.INTEGER,
    comment:
      '队列状态（0待采集基本信息 10基本信息采集中 20基本信息采集完毕待采集视频信息 30视频信息采集中 40采集完成 50基本信息采集失败 60视频信息采集失败）',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '队列领取时间' })
  pick_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '采集备注' })
  pick_remark?: string;

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
