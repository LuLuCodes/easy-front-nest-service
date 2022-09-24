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
  tableName: 't_shop_amount_report',
  timestamps: false,
  comment: '店铺每日分配报表',
})
export class TShopAmountReport extends Model {
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
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '网商到A的钱（收入）',
    defaultValue: '0.00',
  })
  to_ali_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '账户A入账(技术运营)',
    defaultValue: '0.00',
  })
  a_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '账户b入账(采购成本)',
    defaultValue: '0.00',
  })
  b_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '账户b入账(投资人代理)',
    defaultValue: '0.00',
  })
  c_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '账户d入账(刷单)',
    defaultValue: '0.00',
  })
  d_amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '刷单平台费用成本',
    defaultValue: '0.00',
  })
  sd_const?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '刷单佣金成本',
    defaultValue: '0.00',
  })
  sd_com_const?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '刷单佣金备注',
  })
  sd_com_remark?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '其他成本',
    defaultValue: '0.00',
  })
  other_const?: string;

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
