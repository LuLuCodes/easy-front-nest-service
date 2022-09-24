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
  tableName: 't_product_spu_cant_down',
  timestamps: false,
  comment: '巡检后有销量不能下架商品',
})
export class TProductSpuCantDown extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '商品编码' })
  @Index({ name: 'idx_spu_id', using: 'BTREE', order: 'ASC', unique: false })
  spu_id!: number;

  @Column({ type: DataType.STRING(64), comment: '商品条码' })
  product_sn!: string;

  @Column({ type: DataType.DATE, comment: '最后巡检时间' })
  lastcheck_time!: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '下架原因备注',
  })
  pick_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '是否已处理（0未处理 1已处理）',
    defaultValue: '0',
  })
  deal_flag?: number;

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
