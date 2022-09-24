import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_swiper', timestamps: false, comment: '轮播图表' })
export class TSwiper extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '轮播图主键',
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

  @Column({ type: DataType.STRING(64), comment: '轮播图名字' })
  @Index({
    name: 'idx_swiper_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  swiper_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否集合页轮播图',
    defaultValue: '0',
  })
  is_active?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否\b\b弹屏',
    defaultValue: '0',
  })
  is_popup?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '\b\b弹屏JSON' })
  popup_json?: string;

  @Column({ type: DataType.STRING(255), comment: '轮播图图片url' })
  url!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: 'banner图片',
  })
  banner?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '链接类型 1:小程序链接 2:站内链接3:图片 4:集合页',
  })
  link_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '轮播图跳转链接地址',
  })
  link?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment:
      '销售渠道(JSON [{"id":1（0代表全网）,"name":"渠道1","colour":"颜色","background":"背景"}])',
  })
  sale_channel_ids?: object;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '轮播图位置: home首页 goods-list商品列表页',
  })
  @Index({
    name: 'idx_position_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  position?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '轮播图展示开始时间',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '轮播图展示结束时间',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_position_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_swiper_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '备注' })
  remark?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: 'json备注' })
  josn_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
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
