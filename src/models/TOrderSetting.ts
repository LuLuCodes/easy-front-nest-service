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
  tableName: 't_order_setting',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '订单设置表',
})
export class TOrderSetting extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '订单设置主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '秒杀订单超时关闭时间(分)',
    defaultValue: '0',
  })
  flash_order_overtime?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '正常订单超时时间(分)',
    defaultValue: '0',
  })
  normal_order_overtime?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '发货后自动确认收货时间（天）',
    defaultValue: '0',
  })
  confirm_overtime?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '自动完成交易时间，不能申请售后（天）',
    defaultValue: '0',
  })
  finish_overtime?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '订单完成后自动好评时间（天）',
    defaultValue: '0',
  })
  comment_overtime?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
