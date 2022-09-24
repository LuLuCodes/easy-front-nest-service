import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_agent_apply', timestamps: false, comment: '代理申请表' })
export class TAgentApply extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
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

  @Column({ type: DataType.BIGINT, comment: '申请来源编码' })
  @Index({ name: 'idx_apply_id', using: 'BTREE', order: 'ASC', unique: false })
  apply_id!: number;

  @Column({ type: DataType.INTEGER, comment: '申请来源（1客户表）' })
  apply_source!: number;

  @Column({ type: DataType.INTEGER, comment: '代理类型（1区县级代理）' })
  agent_type!: number;

  @Column({ type: DataType.STRING(50), comment: '代理区域' })
  agent_city!: string;

  @Column({ type: DataType.STRING(50), comment: '申请人名称' })
  apply_name!: string;

  @Column({ type: DataType.STRING(50), comment: '申请人电话' })
  apply_phone!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '代理等级（10初级、20中级、30高级、40合伙人）',
    defaultValue: '10',
  })
  level_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '申请中的代理等级（10初级、20中级、30高级、40合伙人）',
  })
  apply_level_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '申请中的代理等级最后申请时间',
  })
  apply_level_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '申请中的代理等级最后审核时间',
  })
  audit_level_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '申请中的代理等级最后审核人',
  })
  audit_level_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '申请中的代理等级最后审核人',
  })
  audit_level_user_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '审核状态（0待审核 10审核成功 11审核失败）',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '审核人' })
  audit_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '审核备注' })
  audit_remark?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

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
