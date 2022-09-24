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
  tableName: 't_customer_complain',
  timestamps: false,
  comment: '举报投诉表',
})
export class TCustomerComplain extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '客户编码', defaultValue: '0' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ type: DataType.BIGINT, comment: '被举报人', defaultValue: '0' })
  to_customer_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '举报类型（1发广告，2骚扰谩骂，3虚假照片，4色情低俗，5TA是骗子）',
  })
  complain_type!: number;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '举报截图' })
  complain_content?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '补充描述' })
  complain_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '处理状态（0待处理 10已处理）',
  })
  deal_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '处理人' })
  deal_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '处理时间' })
  deal_time?: Date;

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

  @Column({ type: DataType.BIGINT, comment: '编辑人' })
  modifier_id!: number;
}
