import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_audit', timestamps: false, comment: '审核表' })
export class TAudit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id' })
  app_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '审核对象类型（1是否女神，2申请私密相册，3微信信息认证，4相册锁，5代理，6语音信息认证）',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_type!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '审核对象（1女神：客户编码，2私密相册客户编码，3申报人编码）',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(5000),
    comment: '申请json备注',
  })
  source_json?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '审核状态（0待审核 1已审核 2审核拒绝）',
  })
  audit_status!: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '审核人' })
  audit_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '审核人备注',
  })
  audit_remark?: string;

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
