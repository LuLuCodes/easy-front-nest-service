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
  tableName: 't_spu_up_item_his',
  timestamps: false,
  comment: '\u5546\u54C1\u4E0A\u4F20\u4EFB\u52A1\u660E\u7EC6\u8868\u5386\u53F2',
})
export class TSpuUpItemHis extends Model {
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
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u4E0A\u4F20\u4EFB\u52A1\u5B50\u8868\u660E\u7EC6',
  })
  item_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FAid' })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4EFB\u52A1\u4E3B\u952E' })
  head_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: 'url\u91C7\u96C6\u7684\u6B3E\u4FE1\u606F',
  })
  spu_id!: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u4E0A\u4F20\u6210\u529F\u540E\u7684\u6B3E\u4FE1\u606F',
  })
  new_spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u4E09\u65B9\u5546\u54C1\u7F16\u7801',
  })
  new_product_sn?: string;

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
