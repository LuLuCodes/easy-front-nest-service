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
  tableName: 't_object_calculation',
  timestamps: false,
  comment: '计数表',
})
export class TObjectCalculation extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '计数者来源编码' })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id!: number;

  @Column({ type: DataType.INTEGER, comment: '计数者来源（1客户表, 2聊天表）' })
  source_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '计数类型（1点赞 2评论 3喜欢 4钱包提醒 5解锁聊天）',
    defaultValue: '0',
  })
  calculation_type?: number;

  @Column({ type: DataType.INTEGER, comment: '数量', defaultValue: '0' })
  calculation_count?: number;

  @Column({ type: DataType.INTEGER, comment: '目标编码', defaultValue: '0' })
  to_id?: number;

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
