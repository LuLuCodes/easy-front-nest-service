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
  tableName: 't_shop_cps_work',
  timestamps: false,
  comment: '三方工单记录',
})
export class TShopCpsWork extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编号' })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '工单类型' })
  work_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方工单编码',
  })
  cps_work_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '标题' })
  title?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '消息内容' })
  content?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '消息时间' })
  work_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '发起人' })
  work_user?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '截止时间' })
  end_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '处理状态（0待处理 1已处理）',
    defaultValue: '0',
  })
  deal_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '处理时间' })
  deal_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING, comment: '处理人' })
  deal_user?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '处理备注' })
  deal_remark?: string;

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
