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
  tableName: 't_product_spu_day_report',
  timestamps: false,
  comment: '商品转化率点击率报表',
})
export class TProductSpuDayReport extends Model {
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

  @Column({ type: DataType.DATE, comment: '报表时间' })
  @Index({
    name: 'idx_product_sn_report_day',
    using: 'BTREE',
    order: 'ASC',
    unique: true,
  })
  report_day!: Date;

  @Column({ type: DataType.STRING(255), comment: '商品编码' })
  @Index({
    name: 'idx_product_sn_report_day',
    using: 'BTREE',
    order: 'ASC',
    unique: true,
  })
  product_sn!: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '商品系统编码' })
  spu_id?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '展现量' })
  view_count?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '点击量' })
  click_count?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '点击率' })
  click_rate?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '花费' })
  const?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '投入产出比',
  })
  input_output_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '总成交金额',
  })
  order_total?: string;

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
