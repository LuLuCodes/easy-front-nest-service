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
  tableName: 't_sale_point_airdrop_item',
  timestamps: false,
  comment: '\u6E20\u9053\u79EF\u5206\u7A7A\u6295\u660E\u7EC6\u8868',
})
export class TSalePointAirdropItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u7A7A\u6295\u7F16\u7801' })
  @Index({
    name: 'idx_airdrop_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  airdrop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4EBA\u5458\u7F16\u7801' })
  customer_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u7A7A\u6295\u91D1\u989D',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u7A7A\u6295\u79EF\u5206',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u7A7A\u6295\u5907\u6CE8',
  })
  remark?: string;

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
