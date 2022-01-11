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
  tableName: 't_sale_point_recharge',
  timestamps: false,
  comment: '\u6E20\u9053\u9884\u5145\u503C\u7BA1\u7406',
})
export class TSalePointRecharge extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u6E20\u9053\u7F16\u7801' })
  @Index({
    name: 'idx_sale_channel_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sale_channel_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5145\u503C\u91D1\u989D',
  })
  amount!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5145\u503C\u72B6\u6001(0\u5F85\u9A8C\u8BC1 10\u5230\u8D26\u5B8C\u6210 11\u5230\u8D26\u5931\u8D25)',
    defaultValue: '0',
  })
  recharge_status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u9A8C\u8BC1\u4EBA',
  })
  recharge_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u9A8C\u8BC1\u4EBA',
  })
  recharge_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u9A8C\u8BC1\u6295\u653E\u65F6\u95F4',
  })
  recharge_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
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
