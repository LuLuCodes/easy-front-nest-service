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
  tableName: 't_report_money',
  timestamps: false,
  comment: '\u8D22\u52A1\u8868',
})
export class TReportMoney extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u8D26\u6237\u4E3B\u952E',
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

  @Column({ type: DataType.DATE, comment: '\u62A5\u8868\u65F6\u95F4' })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u4F1A\u5458\u8D39\u603B\u6536\u5165',
  })
  vip_in!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5145\u503C\u8C46\u8C46\u5E01\u603B\u6536\u5165',
    defaultValue: '0.00',
  })
  doudou_in?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u7EA6\u4F1A\u624B\u7EED\u8D39\u603B\u6536\u5165',
  })
  meeting_in!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u76F8\u518C\u624B\u7EED\u8D39\u603B\u6536\u5165',
  })
  photo_in!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u804A\u5929\u624B\u7EED\u8D39\u603B\u6536\u5165',
    defaultValue: '0.00',
  })
  chat_in?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5206\u4EAB\u83B7\u76CA\u652F\u51FA',
  })
  share_out!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u63D0\u73B0\u603B\u652F\u51FA',
    defaultValue: '0.00',
  })
  cash_out?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5E73\u53F0\u6536\u76CA',
    defaultValue: '0.00',
  })
  plant_in?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u63A8\u5E7F\u6536\u76CA',
    defaultValue: '0.00',
  })
  push_in?: string;

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
