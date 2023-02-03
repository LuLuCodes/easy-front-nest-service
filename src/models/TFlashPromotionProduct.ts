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
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '限时购主键', defaultValue: '0' })
  @Index({
    name: 'idx_flash_promotion_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '限时购场次主键',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_flash_promotion_session_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_session_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '活动商品(SPU)主键',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id?: number;

  @Column({ type: DataType.BIGINT, comment: '活动SKU主键', defaultValue: '0' })
  sku_id?: number;

  @Column({
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
    type: DataType.DECIMAL(10, 2),
    comment: '活动价格',
    defaultValue: '0.00',
  })
  active_price?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '参加活动的库存',
    defaultValue: '0',
  })
  active_stock?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '每人限购数据量',
    defaultValue: '0',
  })
  num_limit?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
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
