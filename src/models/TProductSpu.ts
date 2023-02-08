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
  tableName: 't_product_spu',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品表(SPU)',
})
export class TProductSpu extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '商品主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(128), comment: '商品名称' })
  @Index({ name: 'idx_spu_name', using: 'BTREE', order: 'ASC', unique: false })
  spu_name!: string;

  @Column({ type: DataType.BIGINT, comment: '品牌主键', defaultValue: '0' })
  @Index({ name: 'idx_brand_id', using: 'BTREE', order: 'ASC', unique: false })
  brand_id?: number;

  @Column({ type: DataType.STRING(64), comment: '品牌名称' })
  brand_name!: string;

  @Column({ type: DataType.BIGINT, comment: '类目主键', defaultValue: '0' })
  @Index({
    name: 'idx_category_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  category_id?: number;

  @Column({ type: DataType.STRING(64), comment: '类目名称' })
  category_name!: string;

  @Column({ type: DataType.STRING(255), comment: '主图url' })
  pic_url!: string;

  @Column({ type: DataType.STRING(64), comment: '货号' })
  product_sn!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '上架状态：0->下架；1->上架',
    defaultValue: '0',
  })
  publish_status?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '新品状态:0->不是新品；1->新品',
    defaultValue: '0',
  })
  is_new?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '推荐状态；0->不推荐；1->推荐',
    defaultValue: '0',
  })
  is_recommand?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '审核状态：0->未审核；1->审核通过',
    defaultValue: '0',
  })
  verify_status?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否为预售商品：0->不是；1->是',
    defaultValue: '0',
  })
  preview_status?: number;

  @Column({ type: DataType.INTEGER, comment: '库存', defaultValue: '0' })
  stock?: number;

  @Column({ type: DataType.INTEGER, comment: '预警库存', defaultValue: '0' })
  low_stock?: number;

  @Column({ type: DataType.INTEGER, comment: '锁定库存', defaultValue: '0' })
  lock_stock?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '市场价(原价)',
    defaultValue: '0.00',
  })
  original_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '销售价',
    defaultValue: '0.00',
  })
  sale_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '成本价',
    defaultValue: '0.00',
  })
  cost_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '促销价',
    defaultValue: '0.00',
  })
  promotion_price?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销开始时间' })
  promotion_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '促销结束时间' })
  promotion_end_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '活动限购数量',
    defaultValue: '1',
  })
  promotion_per_limit?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '促销类型：0->没有促销使用销售价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
    defaultValue: '0',
  })
  price_type?: number;

  @Column({ type: DataType.INTEGER, comment: '赠送的积分', defaultValue: '0' })
  gift_point?: number;

  @Column({ type: DataType.STRING(255), comment: '副标题' })
  sub_title!: string;

  @Column({ type: DataType.STRING(2000), comment: '商品描述' })
  spu_desc!: string;

  @Column({ type: DataType.STRING(16), comment: '单位' })
  unit!: string;

  @Column({ type: DataType.INTEGER, comment: '重量(克)', defaultValue: '0' })
  weight?: number;

  @Column({
    type: DataType.STRING(64),
    comment: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  service_ids!: string;

  @Column({ type: DataType.STRING(255), comment: '关键字' })
  keywords!: string;

  @Column({
    type: DataType.STRING(255),
    comment: '商品画册，限制为5张，以逗号分割',
  })
  album_pics!: string;

  @Column({ type: DataType.STRING(255), comment: '详情标题' })
  detail_title!: string;

  @Column({ type: DataType.STRING(2000), comment: '详情描述' })
  detail_desc!: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '产品详情富文本' })
  detail_html?: string;

  @Column({ type: DataType.STRING(255), comment: '备注' })
  note!: string;

  @Column({ type: DataType.STRING(128), comment: '分享标题' })
  share_title!: string;

  @Column({ type: DataType.STRING(2000), comment: '分享描述' })
  share_desc!: string;

  @Column({ type: DataType.STRING(255), comment: '分享缩略图url' })
  share_pic_url!: string;

  @Column({ type: DataType.INTEGER, comment: '销量', defaultValue: '0' })
  sale_num?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
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
