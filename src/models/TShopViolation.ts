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
  tableName: 't_shop_violation',
  timestamps: false,
  comment: '\u5E97\u94FA\u8FDD\u89C4\u5904\u7F5A\u8868',
})
export class TShopViolation extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u7801' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u8FDD\u89C4\u7F16\u53F7',
  })
  @Index({
    name: 'idx_violation_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  violation_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u8FDD\u89C4\u65F6\u95F4',
  })
  violation_time?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u8FDD\u89C4\u7C7B\u578B',
  })
  violation_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E25\u91CD\u7A0B\u5EA6',
  })
  serious_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6263\u5206',
  })
  deduction_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5904\u7F5A\u72B6\u6001',
  })
  punishment_status?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u8FDD\u89C4\u539F\u56E0',
  })
  violation_reason?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u5C0F\u4E8C\u63D0\u9192',
  })
  waiter_remind?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '\u8FDD\u89C4\u5BF9\u8C61',
  })
  violation_obj?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5F53\u524D\u72B6\u6001',
  })
  violation_status?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5269\u4F59\u65F6\u95F4',
  })
  appeal_time?: string;

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
