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
  tableName: 't_customer_favorite',
  timestamps: false,
  comment: '用户收藏表',
})
export class TCustomerFavorite extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户收藏主键(自增)',
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

  @Column({ type: DataType.BIGINT, comment: '用户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.INTEGER, comment: '收藏类型，0商品，1品牌，2人' })
  @Index({ name: 'idx_target_id', using: 'BTREE', order: 'ASC', unique: false })
  target_type!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '如果target_type=0，则是商品ID，如果target_type=1，则是品牌ID',
  })
  @Index({ name: 'idx_target_id', using: 'BTREE', order: 'ASC', unique: false })
  target_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '一些附加信息',
  })
  extra?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '平台端是否删除（仅用于标记日志记录）',
    defaultValue: '0',
  })
  if_super_del?: number;

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
