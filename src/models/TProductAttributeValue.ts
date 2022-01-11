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
  comment: '\u5546\u54C1\u5C5E\u6027\u503C\u8868',
})
export class TProductAttributeValue extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING(36),
    comment: '\u5546\u54C1\u5C5E\u6027\u503C\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '\u5546\u54C1\u4E3B\u952E' })
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

  @Column({
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u5C5E\u6027\u4E3B\u952E',
  })
  @Index({
    name: 'idx_product_attribute_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_attribute_id!: number;

  @Column({
    type: DataType.STRING(128),
    comment:
      '\u5C5E\u6027\u503C\uFF0C\u591A\u4E2A\u65F6\u4EE5\u9017\u53F7\u9694\u5F00',
  })
  value!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
