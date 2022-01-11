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
  tableName: 't_bill_info',
  timestamps: false,
  comment: '\u4EE3\u5F00\u53D1\u7968\u8868',
})
export class TBillInfo extends Model {
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
    type: DataType.BIGINT,
    comment: '\u5E97\u94FA\u7F16\u7801',
  })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u8BA2\u5355\u4FE1\u606F',
  })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u7533\u8BF7\u65F6\u95F4',
  })
  apply_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5269\u4F59\u65F6\u95F4',
  })
  limit_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u53D1\u7968\u7C7B\u578B',
  })
  bill_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u53D1\u7968\u62AC\u5934',
  })
  bill_title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u8D2D\u65B9\u7A0E\u53F7',
  })
  @Index({
    name: 'idx_bill_to_no',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  bill_to_no?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u53D1\u7968\u91D1\u989D',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u6536\u7968\u5730\u5740',
  })
  address?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5E97\u94FA\u5907\u6CE8',
  })
  remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u72B6\u6001\uFF080\u5F85\u5F00 1\u5DF2\u5F00\uFF09',
    defaultValue: '0',
  })
  bill_status?: number;

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
