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
  tableName: 't_shop_violation',
  timestamps: false,
  comment: '店铺违规处罚表',
})
export class TShopViolation extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '违规编号' })
  @Index({
    name: 'idx_violation_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  violation_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '违规时间' })
  violation_time?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '违规类型' })
  violation_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '严重程度' })
  serious_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '扣分' })
  deduction_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '处罚状态' })
  punishment_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '违规原因' })
  violation_reason?: string;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '小二提醒' })
  waiter_remind?: string;

  @Column({ allowNull: true, type: DataType.STRING(300), comment: '违规对象' })
  violation_obj?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '当前状态' })
  violation_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '剩余时间' })
  appeal_time?: string;

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
