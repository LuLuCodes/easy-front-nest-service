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
  tableName: 't_customer_moment',
  timestamps: false,
  comment: '人员动态',
})
export class TCustomerMoment extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '人员编码', defaultValue: '0' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ type: DataType.INTEGER, comment: '类型', defaultValue: '0' })
  moment_type?: number;

  @Column({ type: DataType.INTEGER, comment: '娱乐类型', defaultValue: '0' })
  play_type?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '娱乐名称' })
  play_name?: string;

  @Column({ type: DataType.STRING(250), comment: '标题' })
  moment_title!: string;

  @Column({ type: DataType.STRING(2000), comment: '内容type 1图片' })
  moment_content!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '审核状态(0未审核 1已审核 2审核不通过)',
    defaultValue: '1',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '照片或视频数量',
  })
  photo_count?: number;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '经度',
    defaultValue: '0.0000000000',
  })
  longitude?: string;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '纬度',
    defaultValue: '0.0000000000',
  })
  latitude?: string;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort_no?: number;

  @Column({ type: DataType.INTEGER, comment: '是否置顶', defaultValue: '0' })
  if_top?: number;

  @Column({ type: DataType.INTEGER, comment: '是否私密', defaultValue: '0' })
  if_private?: number;

  @Column({ type: DataType.STRING(50), comment: '城市' })
  city!: string;

  @Column({ type: DataType.STRING(50), comment: '城市代码' })
  city_code!: string;

  @Column({ type: DataType.STRING(100), comment: '地址' })
  place!: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '关联商品款' })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '关联商品sku' })
  sku_id?: number;

  @Column({ type: DataType.INTEGER, comment: '是否启用', defaultValue: '0' })
  enabled?: number;

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
