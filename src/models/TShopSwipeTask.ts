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
  tableName: 't_shop_swipe_task',
  timestamps: false,
  comment: '店铺刷单-任务表',
})
export class TShopSwipeTask extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺主键' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '刷手代理' })
  lead_admin_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '刷手代理' })
  lead_username?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '任务日期' })
  @Index({ name: 'idx_task_day', using: 'BTREE', order: 'ASC', unique: false })
  task_day?: Date;

  @Column({ allowNull: true, type: DataType.STRING, comment: '类别编码JSON' })
  spu_category_json?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '创建人姓名' })
  username?: string;

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
