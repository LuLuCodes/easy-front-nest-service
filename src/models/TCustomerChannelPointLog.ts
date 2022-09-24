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
  tableName: 't_customer_channel_point_log',
  timestamps: false,
  comment: '人员在渠道里的积分流水',
})
export class TCustomerChannelPointLog extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '人员在渠道编码' })
  @Index({ name: 'idx_info_id', using: 'BTREE', order: 'ASC', unique: false })
  info_id!: number;

  @Column({ type: DataType.BIGINT, comment: '人员编号（冗余）' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '渠道编码（冗余）' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '积分（正数加，负数减）',
  })
  point?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '流水标题' })
  title?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '内容描述' })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '流水类型（自定义字符串，搜索用）',
  })
  type?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '抵用的钱',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '汇率（x积分抵1元）',
  })
  rate?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '来源类型（1空投 2购买订单 3发货补偿）',
  })
  source_type?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '来源去向编码' })
  source_id?: number;

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
