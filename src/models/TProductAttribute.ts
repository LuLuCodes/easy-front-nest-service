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
  timestamps: false,
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

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.INTEGER, comment: '商品属性分类主键' })
  @Index({
    name: 'idx_product_attribute_category_id_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_attribute_category_id!: number;

  @Column({ type: DataType.STRING(64), comment: '商品属性名称' })
  attribute_name!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '属性选择类型：0->输入框；1->单选；2->多选',
    defaultValue: '0',
  })
  select_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '属性录入方式(暂不需要)：0->手工录入；1->从列表中选取',
    defaultValue: '0',
  })
  input_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: 'input_type是1时生效，可选值列表，以逗号隔开',
  })
  input_list?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否支持手动新增；0->不支持；1->支持',
    defaultValue: '0',
  })
  hand_add_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_product_attribute_category_id_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
