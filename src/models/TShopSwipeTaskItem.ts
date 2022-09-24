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
  tableName: 't_shop_swipe_task_item',
  timestamps: false,
  comment: '店铺刷单-任务表-明细',
})
export class TShopSwipeTaskItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺主键（冗余）' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '任务主键' })
  @Index({ name: 'idx_task_id', using: 'BTREE', order: 'ASC', unique: false })
  task_id!: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '任务日期（冗余）' })
  @Index({ name: 'idx_task_day', using: 'BTREE', order: 'ASC', unique: false })
  task_day?: Date;

  @Column({ type: DataType.BIGINT, comment: '类别编码' })
  spu_category_id!: number;

  @Column({ type: DataType.BIGINT, comment: '代表商品编码' })
  spu_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '领取状态（0未领取 1已领取）',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '领取人OPEN',
  })
  @Index({
    name: 'idx_pick_user_open',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pick_user_open?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '领取人IP' })
  @Index({
    name: 'idx_pick_user_ip',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pick_user_ip?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '领取人昵称',
  })
  pick_user_name?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '领取时间' })
  pick_time?: Date;

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
