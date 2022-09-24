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
  tableName: 't_source_video',
  timestamps: false,
  comment: '素材视频表',
})
export class TSourceVideo extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '素材id' })
  @Index({
    name: 'idx_source_head_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  source_head_id?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '原始视频地址' })
  video_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '采集后的视频地址',
  })
  oss_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '队列状态（0待采集 10采集中 20采集完毕待 30采集失败）',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '队列领取时间' })
  pick_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '采集备注' })
  pick_remark?: string;

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
