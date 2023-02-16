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
  tableName: 't_coupon_product_category_relation',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '优惠券和商品类目关系表',
})
export class TCouponProductCategoryRelation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '优惠券商品主键(自增)',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '优惠券主键' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id!: string;

  @Column({ type: DataType.STRING(36), comment: '类目主键' })
  @Index({
    name: 'idx_product_category_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_category_id!: string;

  @Column({ type: DataType.STRING(64), comment: '类目名称' })
  product_category_name!: string;

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

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
