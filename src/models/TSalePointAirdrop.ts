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
  tableName: 't_sale_point_airdrop',
  timestamps: false,
  comment: '渠道积分空投主表',
})
export class TSalePointAirdrop extends Model {
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

  @Column({ type: DataType.INTEGER, comment: '空投人数', defaultValue: '0' })
  total_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '空投总金额',
    defaultValue: '0.00',
  })
  total_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '积分汇率（x积分抵1元）',
  })
  point_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '空投总积分',
  })
  total_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '充值状态(0待验证发放 10到账完成 11到账失败)',
    defaultValue: '0',
  })
  drop_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '验证人' })
  drop_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '验证人' })
  drop_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '验证投放时间' })
  drop_time?: Date;

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
