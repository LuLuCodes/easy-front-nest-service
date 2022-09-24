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
  tableName: 't_customer_recharge_conf',
  timestamps: false,
  comment: '客户充值配置',
})
export class TCustomerRechargeConf extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id' })
  app_id!: number;

  @Column({ type: DataType.STRING(50), comment: '充值名称' })
  recharge_name!: string;

  @Column({ type: DataType.STRING(255), comment: '充值图片' })
  recharge_url!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '充值类型（1vip充值订单  2充值豆豆币 3对象钱包t_object_wallet）',
  })
  recharge_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '充值时效（10 10天，30 一个月，90三个月 180 六个月 ）',
  })
  useful_type!: number;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '充值金额' })
  amount!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '原价',
    defaultValue: '0.00',
  })
  market_amount?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
