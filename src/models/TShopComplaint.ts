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
  tableName: 't_shop_complaint',
  timestamps: false,
  comment: '店铺投诉表',
})
export class TShopComplaint extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺id' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '投诉编号' })
  @Index({
    name: 'idx_complaint_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  complaint_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '订单号' })
  from_cps_tid?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '商品编码' })
  product_sn?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '赔付金额' })
  amount?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '申请时间' })
  reply_time?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '投诉时间' })
  complaint_time?: string;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '投诉原因' })
  complaint_reason?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '投诉状态' })
  complaint_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '剩余时间' })
  appeal_time?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '处理状态',
    defaultValue: "_utf8mb4\\'\\'",
  })
  deal_status?: string;

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
