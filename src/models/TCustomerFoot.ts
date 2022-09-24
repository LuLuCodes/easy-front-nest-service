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
  tableName: 't_customer_foot',
  timestamps: false,
  comment: '客户脚步表',
})
export class TCustomerFoot extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '脚本类型（1普通线上脚步 2线下活动脚步）',
  })
  foot_type!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '线下活动ID' })
  @Index({
    name: 'idx_sign_in_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sign_in_activity_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '脚步时间' })
  @Index({
    name: 'idx_foot_of_day',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  foot_of_day?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '签到GPS经度',
  })
  sign_in_gps_longitude?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '签到GPS纬度',
  })
  sign_in_gps_latitude?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '首次签到时间' })
  fist_sign_in_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '首次签退时间' })
  fist_sign_off_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '签到时的微信步数',
  })
  fist_wx_foot?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '最后心跳微信步数',
  })
  last_wx_foot?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '有效微信步数' })
  useful_wx_foot?: number;

  @Column({ type: DataType.INTEGER, comment: '是否黑名单', defaultValue: '0' })
  is_black?: number;

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
