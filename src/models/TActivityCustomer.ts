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
  tableName: 't_activity_customer',
  timestamps: false,
  comment: '活动报名表',
})
export class TActivityCustomer extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '活动ID' })
  @Index({
    name: 'idx_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  activity_id!: number;

  @Column({ type: DataType.BIGINT, comment: '人员id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.INTEGER, comment: '是否报名', defaultValue: '0' })
  if_sign_up?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '报名时间' })
  sign_up_time?: Date;

  @Column({ type: DataType.INTEGER, comment: '是否签到', defaultValue: '0' })
  if_sign_in?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '签到时间' })
  sign_in_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '是否复训（1复训 0首训）',
    defaultValue: '0',
  })
  has_play?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '支付方式（0首次免支付 1->支付宝；2->微信）',
    defaultValue: '0',
  })
  paid_type?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '勋章类型' })
  medal_type?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '勋章url' })
  medal_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '支付流水号',
  })
  trade_no?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '退单号' })
  refund_no?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '退款金额',
  })
  refund_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '退还的课程费',
  })
  order_pay_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '退款审核状态（1待审核 2已审核 3审核拒绝）',
    defaultValue: '0',
  })
  refund_audit_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '退款最后审核人' })
  refund_audit_user_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '退款最后审核时间' })
  refund_audit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '退款最后申请备注',
  })
  refund_apply_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '退款最后申请时间' })
  refund_apply_time?: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '支付金额',
    defaultValue: '0.00',
  })
  field_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '签到经度',
  })
  longitude?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '签到纬度',
  })
  latitude?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '分组名称' })
  group_name?: string;

  @Column({ type: DataType.BIGINT, comment: '活动分组id', defaultValue: '0' })
  activity_group_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '标签类型 1学员 2学长 3义工',
    defaultValue: '1',
  })
  tag?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '分组学员标签（1学员 2学长）',
  })
  activity_group_tag?: number;

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
