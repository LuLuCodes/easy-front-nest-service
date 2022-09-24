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
  tableName: 't_activity_volunteer',
  timestamps: false,
  comment: '活动义工志愿者列表',
})
export class TActivityVolunteer extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '活动编号' })
  @Index({
    name: 'idx_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  activity_id!: number;

  @Column({ type: DataType.BIGINT, comment: '人员编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '姓名' })
  real_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '手机号' })
  phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '申请类型' })
  apply_types?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '擅长内容' })
  apply_content?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '申请状态（0待审核 1审核通过 2审核不通过）',
    defaultValue: '0',
  })
  apply_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '申请时间' })
  apply_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '审核人' })
  audit_use?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '审核人' })
  audit_use_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '审核备注' })
  audit_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '审核义工类型',
  })
  audit_types?: string;

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
