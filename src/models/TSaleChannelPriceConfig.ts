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
  tableName: 't_sale_channel_price_config',
  timestamps: false,
  comment: '渠道价格比例配置表',
})
export class TSaleChannelPriceConfig extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '渠道编码' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '配置名称' })
  conf_name?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '价格类型(1向上取整 2保留2位)',
    defaultValue: '0',
  })
  conf_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '价格比例(百分比)',
  })
  price_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '商品类型数组',
  })
  spu_class?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

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
