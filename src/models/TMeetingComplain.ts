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
  tableName: 't_meeting_complain',
  timestamps: false,
  comment: '约会投诉表',
})
export class TMeetingComplain extends Model {
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
    type: DataType.BIGINT,
    comment: '项目编码',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '投诉人' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '被投诉人' })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '投诉类型（1对方爽约 2照片与本人差距过大 3诈骗等违法行为）',
    defaultValue: '0',
  })
  complain_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '是否退款（钱是否已自动退给男士）',
  })
  is_rma?: number;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '投诉内容' })
  content?: string;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '投诉截图' })
  url_obj?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '投诉状态（0待处理 1女方胜 2男方胜）',
  })
  com_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '处理人' })
  del_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '处理时间' })
  del_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '处理备注' })
  del_remark?: string;

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
