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
  tableName: 't_spu_pick_head',
  timestamps: false,
  comment: '商品采集主表',
})
export class TSpuPickHead extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键',
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '待爬取文件名',
  })
  title?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '采集状态（0待采集 1采集中 2采集全部成功 11采集全部失败 12部分失败）',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '待爬取总url数',
    defaultValue: '0',
  })
  total_count?: number;

  @Column({ type: DataType.INTEGER, comment: '成功爬取数', defaultValue: '0' })
  success_count?: number;

  @Column({ type: DataType.INTEGER, comment: '失败爬取数', defaultValue: '0' })
  fail_count?: number;

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
