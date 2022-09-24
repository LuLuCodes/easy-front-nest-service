import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_product_brand', timestamps: false, comment: '品牌表' })
export class TProductBrand extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '品牌id',
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
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否为品牌制造商：0->不是；1->是',
    defaultValue: '0',
  })
  factory_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '品牌logo' })
  logo_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '专区大图' })
  big_pic_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '源产地' })
  origin_place?: string;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '品牌简介' })
  brand_profile?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '品牌故事' })
  brand_story?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '黑名单渠道(JSON [{"id":1（渠道id）,"name":"渠道1"}])',
  })
  no_sale_channel_json?: object;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否热门品牌',
    defaultValue: '0',
  })
  is_hot?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否推荐品牌',
    defaultValue: '0',
  })
  is_recommend?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  @Index({ name: 'idx_sort', using: 'BTREE', order: 'ASC', unique: false })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '关联称重商品x元/克',
    defaultValue: '0',
  })
  unit_price?: string;

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
