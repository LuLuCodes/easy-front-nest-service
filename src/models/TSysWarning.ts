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
  tableName: 't_sys_warning',
  timestamps: false,
  comment: '系统异常警告表',
})
export class TSysWarning extends Model {
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

  @Column({ type: DataType.INTEGER, comment: '警告类型（1重复采购）' })
  warning_type!: number;

  @Column({ type: DataType.BIGINT, comment: '来源编码' })
  source_id!: number;

  @Column({ type: DataType.INTEGER, comment: '来源表（1订单明细表）' })
  source_type!: number;

  @Column({ type: DataType.STRING(100), comment: '警告标题' })
  warning_title!: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '警告备注' })
  remark?: string;

  @Column({ type: DataType.INTEGER, comment: '处理状态（0待处理 1已处理）' })
  deal_status!: number;

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
