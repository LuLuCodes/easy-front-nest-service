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
  tableName: 't_foot_activity_customer',
  timestamps: false,
  comment: '徒步活动队伍人员表',
})
export class TFootActivityCustomer extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '活动编码' })
  @Index({
    name: 'idx_activity_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  activity_id!: number;

  @Column({ type: DataType.BIGINT, comment: '徒步活动队伍编码' })
  @Index({ name: 'idx_team_id', using: 'BTREE', order: 'ASC', unique: false })
  team_id!: number;

  @Column({ type: DataType.BIGINT, comment: '人员编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '人员类型（1管理员 0普通人）',
  })
  item_type?: number;

  @Column({ type: DataType.BIGINT, comment: '历史步数', defaultValue: '0' })
  history_customer_wx_foot?: number;

  @Column({ type: DataType.BIGINT, comment: '今日步数', defaultValue: '0' })
  today_customer_wx_foot?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '昵称' })
  nick_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '头像' })
  avatar_url?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '第一次玩的时间' })
  first_in_time?: Date;

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
