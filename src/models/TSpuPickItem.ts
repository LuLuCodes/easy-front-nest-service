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
  tableName: 't_spu_pick_item',
  timestamps: false,
  comment: '商品采集明细表',
})
export class TSpuPickItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '采集主表主键' })
  @Index({ name: 'idx_head_id', using: 'BTREE', order: 'ASC', unique: false })
  head_id!: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '采集地址' })
  url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '采集状态（0待采集 1采集中 2采集成功 11采集失败）',
    defaultValue: '0',
  })
  pick_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '采集备注' })
  pick_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '采集成功后的款信息',
  })
  spu_id?: number;

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
