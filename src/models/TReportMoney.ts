import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_report_money', timestamps: false, comment: '财务表' })
export class TReportMoney extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '账户主键',
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
  report_day!: Date;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '会员费总收入' })
  vip_in!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '充值豆豆币总收入',
    defaultValue: '0.00',
  })
  doudou_in?: string;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '约会手续费总收入' })
  meeting_in!: string;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '相册手续费总收入' })
  photo_in!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '聊天手续费总收入',
    defaultValue: '0.00',
  })
  chat_in?: string;

  @Column({ type: DataType.DECIMAL(10, 2), comment: '分享获益支出' })
  share_out!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '提现总支出',
    defaultValue: '0.00',
  })
  cash_out?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '平台收益',
    defaultValue: '0.00',
  })
  plant_in?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '推广收益',
    defaultValue: '0.00',
  })
  push_in?: string;

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
