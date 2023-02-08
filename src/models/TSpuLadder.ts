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
  tableName: 't_spu_ladder',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品(SPU)阶梯价格表(只针对同SPU)',
})
export class TSpuLadder extends Model {
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
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '满足的商品数量',
    defaultValue: '0',
  })
  count?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '折扣',
    defaultValue: '0.00',
  })
  discount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '折后价格',
    defaultValue: '0.00',
  })
  price?: string;

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
