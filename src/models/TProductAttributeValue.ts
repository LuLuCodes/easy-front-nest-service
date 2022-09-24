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
  tableName: 't_product_attribute_value',
  timestamps: false,
  comment: '商品属性值表',
})
export class TProductAttributeValue extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(36),
    comment: '商品属性值主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '商品主键' })
  @Index({
    name: 'idx_product_attribute_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({ type: DataType.BIGINT, comment: '商品属性主键' })
  @Index({
    name: 'idx_product_attribute_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_attribute_id!: number;

  @Column({ type: DataType.STRING(128), comment: '属性值，多个时以逗号隔开' })
  value!: string;

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
