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
  tableName: 't_spu_up_item_his',
  timestamps: false,
  comment: '商品上传任务明细表历史',
})
export class TSpuUpItemHis extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '商品上传任务子表明细' })
  item_id!: number;

  @Column({ type: DataType.BIGINT, comment: '店铺id' })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '任务主键' })
  head_id!: number;

  @Column({ type: DataType.BIGINT, comment: 'url采集的款信息' })
  spu_id!: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '上传成功后的款信息',
  })
  new_spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '三方商品编码',
  })
  new_product_sn?: string;

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
