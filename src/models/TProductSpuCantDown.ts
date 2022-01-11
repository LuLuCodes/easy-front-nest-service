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
  tableName: 't_product_spu_cant_down',
  timestamps: false,
  comment:
    '\u5DE1\u68C0\u540E\u6709\u9500\u91CF\u4E0D\u80FD\u4E0B\u67B6\u5546\u54C1',
})
export class TProductSpuCantDown extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5546\u54C1\u7F16\u7801' })
  @Index({ name: 'idx_spu_id', using: 'BTREE', order: 'ASC', unique: false })
  spu_id!: number;

  @Column({ type: DataType.STRING(64), comment: '\u5546\u54C1\u6761\u7801' })
  product_sn!: string;

  @Column({
    type: DataType.DATE,
    comment: '\u6700\u540E\u5DE1\u68C0\u65F6\u95F4',
  })
  lastcheck_time!: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E0B\u67B6\u539F\u56E0\u5907\u6CE8',
  })
  pick_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u662F\u5426\u5DF2\u5904\u7406\uFF080\u672A\u5904\u7406 1\u5DF2\u5904\u7406\uFF09',
    defaultValue: '0',
  })
  deal_flag?: number;

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
