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
  tableName: 't_shop_amount_month_report',
  timestamps: false,
  comment: '店铺每月分配报表',
})
export class TShopAmountMonthReport extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.DATE, comment: '报表时间' })
  @Index({
    name: 'idx_report_day',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  report_month!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '刷单成本本月抵扣',
    defaultValue: '0.00',
  })
  has_sd_const?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '刷单成本未抵扣',
    defaultValue: '0.00',
  })
  wait_sd_const?: string;

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
