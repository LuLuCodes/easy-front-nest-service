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
  tableName: 't_sku_full_reduction',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品(SKU)满减表(只针对同SKU)',
})
export class TSkuFullReduction extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '价格主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键', defaultValue: '0' })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '满多少',
    defaultValue: '0.00',
  })
  full_price?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '减多少',
    defaultValue: '0.00',
  })
  reduce_price?: string;

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
