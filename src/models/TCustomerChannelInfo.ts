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
  tableName: 't_customer_channel_info',
  timestamps: false,
  comment: '人员在渠道里的信息列表',
})
export class TCustomerChannelInfo extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '人员编号' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '渠道编码' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '渠道类型（1企业渠道 2会员渠道）',
  })
  sale_channel_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '渠道是否禁用（0启用 1禁用）',
    defaultValue: '0',
  })
  if_disable?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '最后审核状态（0待审核 1审核通过 2审核居家）',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '最后审核备注',
  })
  audit_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '最后审核的销售渠道时间',
  })
  audit_sale_channel_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后审核的销售渠道人员',
  })
  audit_sale_channel_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '最后审核的销售渠道人员',
  })
  audit_sale_channel_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '第一次绑定次渠道的时间',
  })
  first_join_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '人员在此渠道下的积分',
  })
  point?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '身份证正面' })
  id_card_front?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '身份证反面' })
  id_card_back?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '身份证号' })
  id_card_no?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '身份证识别状态(0待维护，1已上传待三方确认，2三方审核通过)',
  })
  id_card_status?: number;

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
