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
  tableName: 't_customer_view_log',
  timestamps: false,
  comment: '\u7528\u6237\u8868\u67E5\u770B\u8868',
})
export class TCustomerViewLog extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7528\u6237\u4E3B\u952E',
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

  @Column({ type: DataType.INTEGER, comment: '\u7528\u6237\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.INTEGER, comment: '\u67E5\u770B\u5BF9\u8C61' })
  to_object_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u67E5\u770B\u5BF9\u8C61\u7C7B\u578B\uFF081\u5973\u6027\u8D44\u6599\uFF09',
  })
  to_object_type!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u67E5\u770B\u65F6\u95F4',
  })
  last_view?: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
