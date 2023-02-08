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
  tableName: 't_product_attribute',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品属性表',
})
export class TProductAttribute extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品属性主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '商品属性分类主键',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_product_attribute_category_id_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_attribute_category_id?: number;

  @Column({ type: DataType.STRING(64), comment: '商品属性名称' })
  attribute_name!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '属性选择类型：0->唯一；1->单选；2->多选',
    defaultValue: '0',
  })
  select_type?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '属性录入方式：0->手工录入；1->从列表中选取',
    defaultValue: '0',
  })
  input_type?: number;

  @Column({
    type: DataType.STRING(255),
    comment: 'input_type是1时生效，可选值列表，以逗号隔开',
  })
  input_list!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否支持手动新增；0->不支持；1->支持',
    defaultValue: '0',
  })
  hand_add_status?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  @Index({
    name: 'idx_product_attribute_category_id_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort_no?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  created_by?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  updated_by?: number;
}
