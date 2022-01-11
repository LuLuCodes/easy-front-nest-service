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
  tableName: 't_sale_channel',
  timestamps: false,
  comment: '\u9500\u552E\u6E20\u9053',
})
export class TSaleChannel extends Model {
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
    comment: '\u6E20\u9053\u540D\u79F0',
  })
  channel_name?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u6E20\u9053\u7C7B\u578B\uFF081\u4F01\u4E1A\u6E20\u9053 2\u4F1A\u5458\u6E20\u9053\uFF09',
  })
  sale_channel_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6E20\u9053\u552F\u4E00\u7F16\u7801',
  })
  channel_uuid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u6E20\u9053\u56FE\u6807',
  })
  channel_ico?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8D1F\u8D23\u4EBA\u624B\u673A',
  })
  phone?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u81EA\u52A8\u5BA1\u6838',
    defaultValue: '0',
  })
  auto_audit?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u662F\u5E73\u53F0',
    defaultValue: '0',
  })
  is_plant?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u65B0\u8D2D\u5206\u6DA6(%)',
    defaultValue: '0.00',
  })
  first_buy_split?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u7EE7\u8D2D\u5206\u6DA6(%)',
    defaultValue: '0.00',
  })
  second_buy_split?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u542F\u7528\u79EF\u5206',
    defaultValue: '0',
  })
  if_open_point?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u79EF\u5206\u6C47\u7387\uFF08x\u79EF\u5206\u62B51\u5143\uFF09',
    defaultValue: '0.00',
  })
  point_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u79EF\u5206\u522B\u540D',
  })
  point_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u53D1\u79EF\u5206\u9A8C\u8BC1\u624B\u673A\u53F7',
  })
  point_check_phone?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u79EF\u5206\u9884\u5145\u503C\u4F59\u989D',
    defaultValue: '0.00',
  })
  point_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u72B6\u6001 0 \u53EF\u7528, 1 \u7981\u7528, 2 \u6CE8\u9500',
    defaultValue: '0',
  })
  status?: number;

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
