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
  tableName: 't_welfare_head',
  timestamps: false,
  comment: '权益发放表',
})
export class TWelfareHead extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '销售渠道' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '权益标题' })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '权益类型（1空投权益 2自动领取权益）',
  })
  welfare_type?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '权益份数' })
  welfare_count?: number;

  @Column({ type: DataType.INTEGER, comment: '权益天数', defaultValue: '0' })
  welfare_days?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '渠道绑定时间段用户可享受空投',
  })
  bind_start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '渠道绑定时间段用户可享受空投',
  })
  bind_end_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '可以领取时间' })
  start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '终止领取时间' })
  end_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1000), comment: '使用说明' })
  detail_remark?: string;

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
