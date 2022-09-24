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
  tableName: 't_foot_activity',
  timestamps: false,
  comment: '徒步活动表',
})
export class TFootActivity extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '活动主题' })
  activity_name?: string;

  @Column({ type: DataType.INTEGER, comment: '团队数', defaultValue: '0' })
  team_count?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '活动图片' })
  activity_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '活动勋章' })
  medal_url?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '活动介绍' })
  activity_detail?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '活动开始时间' })
  start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '活动结束时间' })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '活动目标（公里）',
  })
  target?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '活动目标别名',
  })
  target_name?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '签到类型（1不需要现场签到 2现场签到）',
  })
  sign_in_type!: number;

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

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '签到地址' })
  sign_in_address?: string;

  @Column({ type: DataType.INTEGER, comment: '是否归属城市' })
  city_type!: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '城市名称' })
  city_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '城市编码' })
  city_code?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '0待上架 1上架 2下架',
    defaultValue: '0',
  })
  activity_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后上架时间' })
  onsale_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后上架人' })
  onsale_user_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后下架时间' })
  downsale_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后下架人' })
  downsale_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后下架备注',
  })
  downsale_remark?: string;

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
