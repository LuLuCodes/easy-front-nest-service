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
  timestamps: false,
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

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '秒杀订单超时关闭时间(分)',
  })
  flash_order_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '正常订单超时时间(分)',
  })
  normal_order_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '发货后自动确认收货时间（天）',
  })
  confirm_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '自动完成交易时间，不能申请售后（天）',
  })
  finish_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '订单完成后自动好评时间（天）',
  })
  comment_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
