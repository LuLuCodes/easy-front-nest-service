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
  tableName: 't_product_brand',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '品牌表',
})
export class TProductBrand extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '品牌id' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(64), comment: '品牌名称' })
  @Index({
    name: 'idx_brand_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  brand_name!: string;

  @Column({ type: DataType.STRING(8), comment: '首字母' })
  first_letter!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否为品牌制造商：0->不是；1->是',
    defaultValue: '0',
  })
  factory_status?: number;

  @Column({ type: DataType.STRING(500), comment: '品牌logo' })
  logo!: string;

  @Column({ type: DataType.STRING(255), comment: '专区大图' })
  big_pic!: string;

  @Column({ type: DataType.STRING(32), comment: '源产地' })
  origin_place!: string;

  @Column({ type: DataType.STRING(2000), comment: '品牌简介' })
  brand_profile!: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '品牌故事' })
  brand_story?: string;

  @Column({ type: DataType.INTEGER, comment: '商品数量', defaultValue: '0' })
  product_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '商品评论数量',
    defaultValue: '0',
  })
  product_comment_count?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否热门品牌',
    defaultValue: '0',
  })
  is_hot?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否推荐品牌',
    defaultValue: '0',
  })
  is_recommend?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  @Index({ name: 'idx_sort', using: 'BTREE', order: 'ASC', unique: false })
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
  created_by?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  updated_by?: number;
}
