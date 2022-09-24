import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_swiper_item', timestamps: false, comment: '轮播图节点' })
export class TSwiperItem extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '轮播图编码' })
  @Index({ name: 'idx_swiper_id', using: 'BTREE', order: 'ASC', unique: false })
  swiper_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '分组节点' })
  grop_id?: number;

  @Column({ type: DataType.INTEGER, comment: '节点类型（1商品 2URL 3JSON）' })
  source_type!: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '节点编码' })
  source_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '节点名称' })
  source_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '节点图片' })
  source_file?: string;

  @Column({ allowNull: true, type: DataType.JSON, comment: '节点JSON' })
  source_josn?: object;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort?: number;

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
