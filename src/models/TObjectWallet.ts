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
  tableName: 't_object_wallet',
  timestamps: false,
  comment: '\u5BF9\u8C61\u94B1\u5305\u8868',
})
export class TObjectWallet extends Model {
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
    comment:
      '\u5BF9\u8C61\u7F16\u7801\uFF08\u5546\u5BB6\u7F16\u7801\uFF0C\u6E20\u9053\u7F16\u7801\uFF09',
  })
  @Index({ name: 'idx_object_id', using: 'BTREE', order: 'ASC', unique: false })
  object_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BF9\u8C61\u7C7B\u578B\uFF081\u5546\u5BB6seller 2\u6E20\u9053sale_channel\uFF09',
  })
  object_type!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u94B1\u5305\u7C7B\u578B(1\u666E\u901A\u94B1\u5305)',
  })
  wallet_type!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u94B1\u5305\u4F59\u989D',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u51FA\u8D26\u51BB\u7ED3',
    defaultValue: '0.00',
  })
  out_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u8FDB\u5E10\u51BB\u7ED3',
    defaultValue: '0.00',
  })
  in_frozen_amount?: string;

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
