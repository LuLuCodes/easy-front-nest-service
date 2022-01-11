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
  tableName: 't_shop_cps_work',
  timestamps: false,
  comment: '\u4E09\u65B9\u5DE5\u5355\u8BB0\u5F55',
})
export class TShopCpsWork extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u53F7' })
  shop_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5DE5\u5355\u7C7B\u578B',
  })
  work_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E09\u65B9\u5DE5\u5355\u7F16\u7801',
  })
  cps_work_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u6807\u9898',
  })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6D88\u606F\u5185\u5BB9',
  })
  content?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6D88\u606F\u65F6\u95F4',
  })
  work_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u53D1\u8D77\u4EBA',
  })
  work_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u622A\u6B62\u65F6\u95F4',
  })
  end_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5904\u7406\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u5DF2\u5904\u7406\uFF09',
    defaultValue: '0',
  })
  deal_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5904\u7406\u65F6\u95F4',
  })
  deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5904\u7406\u4EBA',
  })
  deal_user?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5904\u7406\u5907\u6CE8',
  })
  deal_remark?: string;

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
