import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_activity', timestamps: false, comment: '活动表' })
export class TActivity extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '活动标题' })
  act_title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '活动副标题',
  })
  act_title_ext?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '活动图片' })
  act_file?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '活动拓展图片',
  })
  act_file_ext?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '活动详情' })
  act_detail?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '活动开始时间' })
  start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '活动开始时间' })
  end_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '报名截止时间' })
  sign_up_end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '签到范围（米）',
  })
  sign_array?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '上课地点' })
  act_address?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(18, 10), comment: '经度' })
  longitude?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(18, 10), comment: '纬度' })
  latitude?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '活动可报名人数',
    defaultValue: '0',
  })
  limit_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '活动已报名人数',
    defaultValue: '0',
  })
  sign_up_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '活动已签到人数',
    defaultValue: '0',
  })
  sign_in_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '活动状态 0 待发布,1发布 2撤下',
    defaultValue: '0',
  })
  status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '活动关联的课程商品',
  })
  spu_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '场地费用',
    defaultValue: '0.00',
  })
  field_fee?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '早鸟费用',
    defaultValue: '0.00',
  })
  early_field_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '早鸟价享受终止天数（距离活动结束时间）',
  })
  early_end_day?: number;

  @Column({ allowNull: true, type: DataType.JSON, comment: '退款阶梯配置' })
  refund_config?: object;

  @Column({
    type: DataType.INTEGER,
    comment: '是否隐藏价格',
    defaultValue: '0',
  })
  hidden_price?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort?: number;

  @Column({ type: DataType.INTEGER, comment: '分组次数', defaultValue: '0' })
  group_count?: number;

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
