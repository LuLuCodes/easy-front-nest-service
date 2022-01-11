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
  tableName: 't_customer_extra',
  timestamps: false,
  comment: 'customer\u6269\u5C55\u8868',
})
export class TCustomerExtra extends Model {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    comment: '\u7528\u6237\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(36),
    comment: '\u8D26\u6237code',
  })
  account_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u5FAE\u4FE1\u53F7',
  })
  weixin_no?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '\u5FAE\u4FE1\u662F\u5426\u5C55\u793A',
    defaultValue: '0',
  })
  weixin_enable?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5FAE\u4FE1\u5BA1\u6838\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 1\u5DF2\u5BA1\u6838 2\u5BA1\u6838\u4E0D\u901A\u8FC7\uFF09',
    defaultValue: '0',
  })
  weixin_audit?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(1000),
    comment: '\u5FAE\u4FE1\u4E8C\u7EF4\u7801\u5730\u5740',
  })
  weixin_url?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5FAE\u4FE1\u89E3\u9501\u8C46\u8C46\u8D39\u7528',
    defaultValue: '0.0000',
  })
  weixin_doudou?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u8BED\u97F3url',
  })
  voice_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BED\u97F3\u65F6\u957F',
    defaultValue: '0',
  })
  voice_duration?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u8BED\u97F3\u5BA1\u6838\u72B6\u6001\uFF080\u5F85\u5BA1\u6838 1\u5DF2\u5BA1\u6838 2\u5BA1\u6838\u4E0D\u901A\u8FC7\uFF09',
    defaultValue: '0',
  })
  voice_audit?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u6BCF\u5206\u949F\u8BED\u97F3\u8C46\u8C46\u8D39\u7528',
    defaultValue: '2',
  })
  voice_doudou?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u6BCF\u5206\u949F\u89C6\u9891\u8C46\u8C46\u8D39\u7528',
    defaultValue: '6',
  })
  video_doudou?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u804C\u4E1A\uFF1A\u5B57\u5178\u8868\u5BF9\u5E94\u7684key',
  })
  post_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u804C\u4E1A,\u5197\u4F59',
  })
  post?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: 'cm',
    defaultValue: '0',
  })
  height?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u5B66\u5386\uFF1A\u5B57\u5178\u8868\u5BF9\u5E94\u7684key',
  })
  degree_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u5B66\u5386,\u5197\u4F59',
  })
  degree?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8EAB\u578B\uFF1A\u5B57\u5178\u8868\u5BF9\u5E94\u7684key',
  })
  body_type_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u8EAB\u578B,\u5197\u4F59',
  })
  body_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment:
      '\u5BFB\u627E\u5173\u7CFB\uFF1A\u5B57\u5178\u8868\u5BF9\u5E94\u7684key',
  })
  relationship_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u5BFB\u627E\u5173\u7CFB',
  })
  relationship?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u57CE\u5E02\u4EE3\u7801',
  })
  city_code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u57CE\u5E02',
  })
  city?: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u5F53\u524D\u6240\u5728\u57CE\u5E02',
  })
  now_city!: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u6CE8\u518C\u6240\u5728\u5730',
  })
  reg_city!: string;

  @Column({ type: DataType.STRING(50), comment: '\u5145\u503C\u57CE\u5E02' })
  pay_city!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u4E2A\u6027\u7B7E\u540D',
  })
  sign_title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u7C4D\u8D2F',
  })
  birth_place?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u4E2A\u4EBA\u7B80\u4ECB',
  })
  profile?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u6DFB\u52A0\u4F01\u4E1A\u5BA2\u670D',
  })
  added_qy_service?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u8BA4\u8BC1\u72B6\u6001:0:\u672A\u8BA4\u8BC1 1:\u5DF2\u8BA4\u8BC1',
  })
  audit_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u53D1\u5E03\u8FC7\u7EA6\u4F1A',
    defaultValue: '0',
  })
  if_public_meeting?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u5F00\u542F\u8BED\u97F3',
    defaultValue: '1',
  })
  if_open_voice?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u5F00\u542F\u89C6\u9891',
    defaultValue: '1',
  })
  if_open_video?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u662F\u5426\u9996\u9875\u53EF\u89C1\uFF080\u53EF\u89C1 1\u4E0D\u53EF\u89C1\uFF09',
    defaultValue: '0',
  })
  show_in_index?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u5973\u795E\u8BA4\u8BC1:0:\u672A\u8BA4\u8BC1 1:\u5DF2\u8BA4\u8BC1',
  })
  goddess_audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u673A\u5668\u4EBA',
    defaultValue: '0',
  })
  is_robot?: number;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '\u7EAC\u5EA6',
    defaultValue: '0.0000000000',
  })
  latitude?: string;

  @Column({
    type: DataType.DECIMAL(28, 10),
    comment: '\u7ECF\u5EA6',
    defaultValue: '0.0000000000',
  })
  longitude?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u9690\u85CF\u8DDD\u79BB',
    defaultValue: '0',
  })
  hidden_distance?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u5728\u7EA6\u4F1A\u4E2D',
    defaultValue: '0',
  })
  date_status?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u65F6\u5019\u79C1\u76F8\u518C 0 \u5F00\u653E 1\u79C1\u5BC6 2\u76F8\u518C\u9501',
    defaultValue: '0',
  })
  private_photo?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u5E73\u5747\u6001\u5EA6\u8BC4\u4EF7',
    defaultValue: '0.00',
  })
  manner_point?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u7D2F\u8BA1\u6001\u5EA6\u8BC4\u4EF7\u5206\u6570',
    defaultValue: '0',
  })
  manner_point_total?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u7D2F\u8BA1\u6001\u5EA6\u8BC4\u4EF7\u6B21\u6570',
    defaultValue: '0',
  })
  manner_point_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u771F\u4EBA\u4E0E\u7167\u7247\u76F8\u4F3C\u5EA6\u8BC4\u4EF7\uFF081\u4E0E\u7167\u7247\u4E0D\u7B26\uFF09',
    defaultValue: '0',
  })
  photo_point_1?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u771F\u4EBA\u4E0E\u7167\u7247\u76F8\u4F3C\u5EA6\u8BC4\u4EF7\uFF082\u4E0E\u7167\u7247\u76F8\u4F3C\uFF09',
    defaultValue: '0',
  })
  photo_point_2?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u771F\u4EBA\u4E0E\u7167\u7247\u76F8\u4F3C\u5EA6\u8BC4\u4EF7\uFF083\u6BD4\u7167\u7247\u597D\u770B\uFF09',
    defaultValue: '0',
  })
  photo_point_3?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u7D2F\u8BA1\u622A\u5C4F\u6B21\u6570',
    defaultValue: '0',
  })
  screen_cut?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '\u4F53\u91CD(kg)',
    defaultValue: '0.00',
  })
  weight?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6BCF\u65E5\u67E5\u770B\u8D44\u6599',
    defaultValue: '0',
  })
  view_inf_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u67E5\u770B\u8D44\u6599\u65E5\u671F',
  })
  view_inf_day?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u652F\u4ED8\u5BC6\u7801',
  })
  ali_pay_pass?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u652F\u4ED8\u8D26\u53F7',
  })
  ali_pay_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u652F\u4ED8\u5B9D\u63D0\u73B0\u8D26\u53F7',
  })
  ali_set_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u94F6\u884C\u5361\u63D0\u73B0\u8D26\u53F7',
  })
  bank_set_account?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u884C\u4E1A\u6807\u7B7EJSON [category_id,category_id]',
  })
  industry_tag?: string;

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
