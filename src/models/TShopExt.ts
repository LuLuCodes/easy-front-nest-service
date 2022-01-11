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
  tableName: 't_shop_ext',
  timestamps: false,
  comment: '\u5E97\u94FA\u62D3\u5C55\u8868',
})
export class TShopExt extends Model {
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
    type: DataType.DATE,
    comment: '\u6570\u636E\u770B\u677F\u722C\u866B\u5FC3\u8DF3\u65F6\u95F4',
  })
  shop_refresh_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BBF\u5BA2\u5B9E\u65F6',
    defaultValue: '0',
  })
  visitor_now_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u8BBF\u5BA2\u73AF\u6BD4\uFF08%\uFF09',
    defaultValue: '0.00',
  })
  visitor_qoq?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8BBF\u5BA2\u73AF\u6BD4\uFF081\u589E\u52A0\uFF0C2\u51CF\u5C11\uFF09',
    defaultValue: '0',
  })
  visitor_qoq_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BBF\u5BA2\u6628\u540C',
    defaultValue: '0',
  })
  visitor_yesterday_now_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BBF\u5BA2\u6628\u603B',
    defaultValue: '0',
  })
  visitor_yesterday_all_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66\u82B1\u8D39\uFF08\u5143\uFF09',
    defaultValue: '0.00',
  })
  car_spend?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66\u4F59\u989D\uFF08\u5143\uFF09',
    defaultValue: '0.00',
  })
  car_balance?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66\u4EA4\u6613\uFF08\u5143\uFF09',
    defaultValue: '0.00',
  })
  car_trade?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u76F4\u901A\u8F66\u70B9\u51FB',
    defaultValue: '0',
  })
  car_click?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66ROI',
    defaultValue: '0.00',
  })
  car_roi?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u63CF\u8FF0',
    defaultValue: '0.00',
  })
  describe_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u63CF\u8FF0\uFF081\u589E\u52A0\uFF0C2\u51CF\u5C11\uFF09',
    defaultValue: '0',
  })
  describe_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u670D\u52A1',
    defaultValue: '0.00',
  })
  service_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u670D\u52A1\uFF081\u589E\u52A0\uFF0C2\u51CF\u5C11\uFF09',
    defaultValue: '0',
  })
  service_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u7269\u6D41',
    defaultValue: '0.00',
  })
  logistics_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u7269\u6D41\uFF081\u589E\u52A0\uFF0C2\u51CF\u5C11\uFF09',
    defaultValue: '0',
  })
  logistics_point_type?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u57FA\u5206',
    defaultValue: '0.00',
  })
  shop_point?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5E74\u4EA4\u6613\uFF08\u5143\uFF09',
    defaultValue: '0.00',
  })
  shop_trade?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8FDD\u89C4',
    defaultValue: '0',
  })
  shop_violation_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8FDD\u89C4\uFF08\u4E00\u822C\uFF09',
    defaultValue: '0',
  })
  shop_violation_general?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8FDD\u89C4\uFF08\u4E25\u91CD\uFF09',
    defaultValue: '0',
  })
  shop_violation_serious?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66A\u7C7B\u8FDD\u89C4\u7D2F\u8BA1\u6263\u5206',
    defaultValue: '0.00',
  })
  car_violation_a?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66B\u7C7B\u8FDD\u89C4\u7D2F\u8BA1\u6263\u5206',
    defaultValue: '0.00',
  })
  car_violation_b?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u76F4\u901A\u8F66C\u7C7B\u8FDD\u89C4\u7D2F\u8BA1\u6263\u5206',
    defaultValue: '0.00',
  })
  car_violation_c?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u5F85\u5F00\u53D1\u7968\u6570',
    defaultValue: '0',
  })
  bill_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6295\u8BC9\u6570\u91CF',
    defaultValue: '0',
  })
  complaint_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u5E97\u94FA\u5206\u6790\u8BC4\u5206',
  })
  shop_analysis?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5E97\u94FA\u5206\u6790\u8BC4\u5206\u56FE\u7247',
  })
  shop_analysis_img?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E0A\u4F20\u65F6\u95F4',
  })
  shop_analysis_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u4EAC\u4E1C\u4E91\u5269\u4F59\u6B21\u6570',
  })
  jd_limit_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4EAC\u4E1C\u4E91\u6700\u540E\u66F4\u65B0\u65F6\u95F4',
  })
  jd_refresh_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u4E07\u90A6\u5F53\u5929\u5269\u4F59\u6B21\u6570',
  })
  wb_limit_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4E07\u90A6\u63A5\u53E3\u5230\u671F\u65F6\u95F4',
  })
  wb_limit_day?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4E07\u90A6\u6700\u540E\u66F4\u65B0\u65F6\u95F4',
  })
  wb_refresh_time?: Date;

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
