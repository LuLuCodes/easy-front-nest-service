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
  tableName: 't_coupon_product_relation',
  timestamps: false,
  comment: '优惠券和商品的关系表',
})
export class TCouponProductRelation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '优惠券商品主键(自增)',
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

  @Column({ type: DataType.STRING(36), comment: '优惠券主键' })
  @Index({ name: 'idx_coupon_id', using: 'BTREE', order: 'ASC', unique: false })
  coupon_id!: string;

  @Column({ type: DataType.STRING(36), comment: '商品主键' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: string;

  @Column({ type: DataType.STRING(128), comment: '商品名称' })
  product_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '货号' })
  product_sn?: string;

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
