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
  tableName: 't_swiper',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '轮播图表',
})
export class TSwiper extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '轮播图主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(64), comment: '轮播图名字' })
  @Index({
    name: 'idx_swiper_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  swiper_name!: string;

  @Column({ type: DataType.STRING(255), comment: '轮播图图片url' })
  url!: string;

  @Column({ type: DataType.STRING(255), comment: '轮播图跳转链接地址' })
  link!: string;

  @Column({
    type: DataType.STRING(20),
    comment: '轮播图位置: home首页 goods-list商品列表页',
  })
  @Index({
    name: 'idx_position_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  position!: string;

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

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
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
  sort_no?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
