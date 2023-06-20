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
  tableName: 't_sms_log',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '短信发送表',
})
export class TSmsLog extends Model {
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
    type: DataType.STRING(20),
    comment: '短信类型，业务自定义',
  })
  sms_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(20), comment: '手机号' })
  @Index({ name: 'idx_mobile', using: 'BTREE', order: 'ASC', unique: false })
  mobile?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '校验码' })
  sms_param?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '过期时间' })
  expire_time?: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '状态：1-待验证 10-已验证 11-发送失败 12-验证失败',
    defaultValue: '1',
  })
  msg_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '删除时间 null-未删除',
  })
  deleted_at?: Date;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
