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
  tableName: 't_customer_extra',
  timestamps: false,
  comment: 'customer扩展表',
})
export class TCustomerExtra extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '用户主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(36), comment: '账户code' })
  account_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '微信号' })
  weixin_no?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '微信是否展示',
    defaultValue: '0',
  })
  weixin_enable?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '微信审核状态（0待审核 1已审核 2审核不通过）',
    defaultValue: '0',
  })
  weixin_audit?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '微信二维码地址',
  })
  weixin_url?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '微信解锁豆豆费用',
    defaultValue: '0.0000',
  })
  weixin_doudou?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '语音url' })
  voice_url?: string;

  @Column({ type: DataType.INTEGER, comment: '语音时长', defaultValue: '0' })
  voice_duration?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '语音审核状态（0待审核 1已审核 2审核不通过）',
    defaultValue: '0',
  })
  voice_audit?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '每分钟语音豆豆费用',
    defaultValue: '2',
  })
  voice_doudou?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '每分钟视频豆豆费用',
    defaultValue: '6',
  })
  video_doudou?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '职业：字典表对应的key',
  })
  post_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '职业,冗余' })
  post?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'cm',
    defaultValue: '0',
  })
  height?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '学历：字典表对应的key',
  })
  degree_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '学历,冗余' })
  degree?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '身型：字典表对应的key',
  })
  body_type_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '身型,冗余' })
  body_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '寻找关系：字典表对应的key',
  })
  relationship_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '寻找关系' })
  relationship?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '学生证' })
  student_idcard?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '学校id' })
  college_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '学校名称' })
  college?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '学校审核状态' })
  college_audit?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '专业' })
  major?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '班级' })
  class?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '城市代码' })
  city_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '城市' })
  city?: string;

  @Column({ type: DataType.STRING(50), comment: '当前所在城市' })
  now_city!: string;

  @Column({ type: DataType.STRING(50), comment: '注册所在地' })
  reg_city!: string;

  @Column({ type: DataType.STRING(50), comment: '充值城市' })
  pay_city!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '个性签名' })
  sign_title?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '籍贯' })
  birth_place?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '个人简介' })
  profile?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否添加企业客服',
  })
  added_qy_service?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '认证状态:0:未认证 1:已认证',
  })
  audit_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否发布过约会',
    defaultValue: '0',
  })
  if_public_meeting?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启语音',
    defaultValue: '1',
  })
  if_open_voice?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启视频',
    defaultValue: '1',
  })
  if_open_video?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否首页可见（0可见 1不可见）',
    defaultValue: '0',
  })
  show_in_index?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '女神认证:0:未认证 1:已认证',
  })
  goddess_audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否机器人',
    defaultValue: '0',
  })
  is_robot?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启通知提醒',
    defaultValue: '1',
  })
  if_open_notice?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否接收App聊天消息',
    defaultValue: '1',
  })
  if_receive_chat?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启铃声',
    defaultValue: '0',
  })
  if_open_ring?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启提示音',
    defaultValue: '0',
  })
  if_open_tips?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否开启语音视频通话提醒',
    defaultValue: '1',
  })
  if_open_call?: number;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '纬度',
    defaultValue: '0.0000000000',
  })
  latitude?: string;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '经度',
    defaultValue: '0.0000000000',
  })
  longitude?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否隐藏距离',
    defaultValue: '0',
  })
  hidden_distance?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否在约会中',
    defaultValue: '0',
  })
  date_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '时候私相册 0 开放 1私密 2相册锁',
    defaultValue: '0',
  })
  private_photo?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '平均态度评价',
    defaultValue: '0.00',
  })
  manner_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '累计态度评价分数',
    defaultValue: '0',
  })
  manner_point_total?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '累计态度评价次数',
    defaultValue: '0',
  })
  manner_point_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '真人与照片相似度评价（1与照片不符）',
    defaultValue: '0',
  })
  photo_point_1?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '真人与照片相似度评价（2与照片相似）',
    defaultValue: '0',
  })
  photo_point_2?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '真人与照片相似度评价（3比照片好看）',
    defaultValue: '0',
  })
  photo_point_3?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '累计截屏次数',
    defaultValue: '0',
  })
  screen_cut?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '体重(kg)',
    defaultValue: '0.00',
  })
  weight?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '每日查看资料',
    defaultValue: '0',
  })
  view_inf_count?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后查看资料日期' })
  view_inf_day?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝支付密码',
  })
  ali_pay_pass?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝支付账号',
  })
  ali_pay_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '支付宝提现账号',
  })
  ali_set_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '银行卡提现账号',
  })
  bank_set_account?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '银行名称' })
  bank_set_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '支行名称' })
  bank_set_name_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '行业标签JSON [category_id,category_id]',
  })
  industry_tag?: string;

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
