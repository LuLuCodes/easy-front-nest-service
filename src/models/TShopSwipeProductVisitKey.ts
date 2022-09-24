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
  tableName: 't_shop_swipe_product_visit_key',
  timestamps: false,
  comment: '店铺刷单-商品整体访客榜表-明细-后台人员设置关键词',
})
export class TShopSwipeProductVisitKey extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
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

  @Column({ type: DataType.BIGINT, comment: '店铺系统编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品系统编码' })
  @Index({ name: 'idx_spu_id', using: 'BTREE', order: 'ASC', unique: false })
  spu_id!: number;

  @Column({ type: DataType.STRING(100), comment: '商品货号' })
  @Index({
    name: 'idx_product_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_sn!: string;

  @Column({ type: DataType.STRING(200), comment: '设置关键词' })
  key_word!: string;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  @Index({
    name: 'idx_create_time',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
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
