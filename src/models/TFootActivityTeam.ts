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
  tableName: 't_foot_activity_team',
  timestamps: false,
  comment: '徒步活动队伍表',
})
export class TFootActivityTeam extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '队伍创建人' })
  customer_id!: number;

  @Column({ type: DataType.STRING(100), comment: '队伍名称' })
  team_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '团队口号' })
  team_sign?: string;

  @Column({ type: DataType.BIGINT, comment: '历史团队步数', defaultValue: '0' })
  history_team_wx_foot?: number;

  @Column({ type: DataType.BIGINT, comment: '今日团队步数', defaultValue: '0' })
  today_team_wx_foot?: number;

  @Column({ type: DataType.INTEGER, comment: '团队人数', defaultValue: '0' })
  customer_count?: number;

  @Column({ type: DataType.STRING(500), comment: '队伍封面图' })
  team_url!: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '城市名称' })
  city_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '城市编码' })
  city_code?: string;

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
