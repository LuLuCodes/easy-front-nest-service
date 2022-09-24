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
  tableName: 't_product_spu_cps_ext',
  timestamps: false,
  comment: '商品三方拓展描述表',
})
export class TProductSpuCpsExt extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统主键',
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

  @Column({ type: DataType.BIGINT, comment: '款编码' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '当前权重（越大越优先）',
    defaultValue: '0',
  })
  sort?: number;

  @Column({ type: DataType.INTEGER, comment: '是否禁用', defaultValue: '0' })
  disable?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '上游商品来源（1:淘系 3:拼多多）',
    defaultValue: '1',
  })
  from_cps_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '三方真实商品名称',
  })
  cps_spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '三方真实商品拓展名',
  })
  cps_spu_name_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '认领去向站点地址',
  })
  to_cps_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment:
      '属性别名json[{"pid":"123","key":"颜色分类”,”values":[{"vid":"456"."display":"油亮炫黑色","real":"黑色"}]}]',
  })
  properties?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '巡检：商品变化(1高亮)',
    defaultValue: '0',
  })
  isc_spu?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '巡检：商品拓展名变化(1高亮)',
    defaultValue: '0',
  })
  isc_spu_ext?: number;

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
