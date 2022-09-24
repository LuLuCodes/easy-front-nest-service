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
  tableName: 't_flash_promotion_product',
  timestamps: false,
  comment: '限时购商品表',
})
export class TFlashPromotionProduct extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '关系主键(自增)',
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

  @Column({ type: DataType.BIGINT, comment: '限时购主键' })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_id!: number;

  @Column({ type: DataType.BIGINT, comment: '限时购场次主键' })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_session_id!: number;

  @Column({ type: DataType.BIGINT, comment: '活动商品(SPU)主键' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '活动SKU主键' })
  sku_id!: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '上架状态：0->下架；1->上架',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_publish_status',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  publish_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '活动价格',
    defaultValue: '0.00',
  })
  active_price?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '参加活动的库存',
    defaultValue: '0',
  })
  active_stock?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '每人限购数据量',
    defaultValue: '0',
  })
  num_limit?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
