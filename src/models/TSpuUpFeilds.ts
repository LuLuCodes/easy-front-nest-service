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
  tableName: 't_spu_up_feilds',
  timestamps: false,
  comment:
    '商品同步的部分结果记录表，用于保存同步部分成功的字段，下次可以跳过成功的部分，减少开销',
})
export class TSpuUpFeilds extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '上传的店铺id' })
  @Index({
    name: 'idx_spu_sync_img_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  shop_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '上传的商品id' })
  product_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '货号' })
  @Index({
    name: 'idx_spu_sync_img_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_sn?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '淘宝商品图' })
  item_imgs?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '淘宝详情图' })
  detail_html?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '原始图片的md5值',
  })
  origin_item_imgs_hash?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '原始图片的md5值',
  })
  origin_detail_html_hash?: string;

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
