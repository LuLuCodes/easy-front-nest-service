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
  tableName: 't_order_idcard_black',
  timestamps: false,
  comment: '\u8BA2\u5355\u62A5\u7A0E\u9ED1\u540D\u5355',
})
export class TOrderIdcardBlack extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u62A5\u7A0E\u8EAB\u4EFD\u8BC1',
  })
  @Index({
    name: 'idx_tax_id_card',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  tax_id_card?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u622A\u81F3\u6B64\u65F6\u95F4\u524D\u7981\u6B62\u62A5\u7A0E',
  })
  no_use_time?: Date;

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
