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
  tableName: 't_sku_ladder',
  timestamps: false,
  comment:
    '\u5546\u54C1(SKU)\u9636\u68AF\u4EF7\u683C\u8868(\u53EA\u9488\u5BF9\u540CSKU)',
})
export class TSkuLadder extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4EF7\u683C\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '\u5546\u54C1\u4E3B\u952E' })
  @Index({ name: 'idx_sku_id', using: 'BTREE', order: 'ASC', unique: false })
  sku_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6EE1\u8DB3\u7684\u5546\u54C1\u6570\u91CF',
    defaultValue: '0',
  })
  count?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u6298\u6263',
    defaultValue: '0.00',
  })
  discount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u6298\u540E\u4EF7\u683C',
    defaultValue: '0.00',
  })
  price?: string;

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
