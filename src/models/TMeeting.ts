import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_meeting', timestamps: false, comment: '约会表' })
export class TMeeting extends Model {
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
    comment: '项目编码',
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

  @Column({ type: DataType.TINYINT, comment: '性别：1男约女， 2女约男' })
  gender!: number;

  @Column({ type: DataType.BIGINT, comment: '约会主题编码' })
  subject_id!: number;

  @Column({ type: DataType.STRING(100), comment: '约会主题' })
  subject_title!: string;

  @Column({ type: DataType.STRING(500), comment: '主题图片' })
  meeting_url!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '约会文案' })
  meeting_content?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '约会类型（1短期 2长期 3点对点）',
  })
  meeting_type!: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '点对点邀约人编码',
  })
  to_customer_id?: number;

  @Column({ type: DataType.STRING(45), comment: '地点' })
  city_code!: string;

  @Column({ type: DataType.STRING(45), comment: '地点' })
  city!: string;

  @Column({ type: DataType.STRING(200), comment: '地点' })
  address!: string;

  @Column({ type: DataType.DECIMAL(28, 10), comment: '纬度' })
  latitude!: string;

  @Column({ type: DataType.DECIMAL(28, 10), comment: '经度' })
  longitude!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '约会开始时间' })
  meeting_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '时长（90 1.5小时 120 2小时 150 2.5小时）',
  })
  duration?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '打赏豆豆币值',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '定金支付占比(百分比)',
  })
  deposit_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '定金支付',
  })
  deposit_point?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '豆豆币支付状态（0待支付 1有人支付）',
    defaultValue: '0',
  })
  pay_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否存在同意赴约（0不存在 1存在）',
    defaultValue: '0',
  })
  agree_status?: number;

  @Column({ type: DataType.TINYINT, comment: '是否取消', defaultValue: '0' })
  is_cancel?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '取消时间' })
  cancel_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '豆豆币支付最早支付时间',
  })
  pay_time?: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '约会是否结束',
    defaultValue: '0',
  })
  is_finish?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '约会结束时间' })
  finish_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '我的优势' })
  advantage?: string;

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
