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
  tableName: 't_shop_day_report',
  timestamps: false,
  comment: '\u5E97\u94FA\u65E5\u62A5\u8868',
})
export class TShopDayReport extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u4F01\u4E1A\u7F16\u7801' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.DATE, comment: '\u62A5\u8868\u65E5\u671F' })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5E97\u94FA\u5F53\u65E5\u53EF\u5206\u4F63\u603B\u5229\u6DA6',
    defaultValue: '0.0000',
  })
  all_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u53EF\u7528\u6536\u76CA',
    defaultValue: '0.0000',
  })
  available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u7A7A\u6295',
    defaultValue: '0.0000',
  })
  air_drop_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u53EF\u7528\u6536\u76CA',
    defaultValue: '0.0000',
  })
  dis_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u5DF2\u7ED3\u7B97\u5230C\u8D26\u53F7\u5E97\u94FA\u5F53\u65E5\u53EF\u5206\u4F63\u603B\u5229\u6DA6',
  })
  set_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u4F63\u91D1\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u51BB\u7ED3\u7A7A\u6295',
    defaultValue: '0.0000',
  })
  air_drop_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u5546\u53EF\u7528',
    defaultValue: '0.0000',
  })
  agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u7A7A\u6295',
    defaultValue: '0.0000',
  })
  air_drop_agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u4EE3\u7406\u5546\u53EF\u7528',
    defaultValue: '0.0000',
  })
  dis_agent_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u5DF2\u7ED3\u7B97\u5230C\u8D26\u53F7\u4EE3\u7406\u5546\u53EF\u7528',
  })
  set_dis_agent_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u5546\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  agent_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u51BB\u7ED3\u7A7A\u6295',
    defaultValue: '0.0000',
  })
  air_drop_agent_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u8D2D\u4F63\u91D1\u53EF\u7528',
    defaultValue: '0.0000',
  })
  buy_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u4EE3\u8D2D\u4F63\u91D1\u53EF\u7528',
    defaultValue: '0.0000',
  })
  dis_buy_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u8D2D\u4F63\u91D1\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  buy_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6280\u672F\u53EF\u7528',
    defaultValue: '0.0000',
  })
  it_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u6280\u672F\u53EF\u7528',
    defaultValue: '0.0000',
  })
  dis_it_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6280\u672F\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  it_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u8FD0\u8425\u53EF\u7528',
    defaultValue: '0.0000',
  })
  ser_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u8FD0\u8425\u53EF\u7528',
    defaultValue: '0.0000',
  })
  dis_ser_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u8FD0\u8425\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  ser_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6253\u7ED9\u4EE3\u8D2D\u7684\u91C7\u8D2D\u6210\u672C',
    defaultValue: '0.0000',
  })
  give_buy_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BA2\u5355\u6570',
    defaultValue: '0',
  })
  order_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BBF\u5BA2\u6570',
    defaultValue: '0',
  })
  visit_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6D41\u91CF',
    defaultValue: '0',
  })
  pv_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5E97\u94FA\u989D\u5916\u5F00\u652F',
    defaultValue: '0.0000',
  })
  shop_const?: string;

  @Column({
    field: 'rateX',
    type: DataType.DECIMAL(18, 4),
    comment: '\u5E97\u4E3B\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  ratex?: string;

  @Column({
    field: 'frozen_rateX',
    type: DataType.DECIMAL(18, 4),
    comment: '\u5E97\u4E3B\u53EF\u7528\u6BD4\u4F8B\uFF08\u51BB\u7ED3\uFF09',
    defaultValue: '0.0000',
  })
  frozen_ratex?: string;

  @Column({
    field: 'rateY',
    type: DataType.DECIMAL(18, 4),
    comment: '\u4F9B\u5E94\u5546\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  ratey?: string;

  @Column({
    field: 'frozen_rateY',
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u4F9B\u5E94\u5546\u53EF\u7528\u6BD4\u4F8B\uFF08\u51BB\u7ED3\uFF09',
    defaultValue: '0.0000',
  })
  frozen_ratey?: string;

  @Column({
    field: 'rateZ',
    type: DataType.DECIMAL(18, 4),
    comment: '\u6280\u672F\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  ratez?: string;

  @Column({
    field: 'frozen_rateZ',
    type: DataType.DECIMAL(18, 4),
    comment: '\u6280\u672F\u53EF\u7528\u6BD4\u4F8B\uFF08\u51BB\u7ED3\uFF09',
    defaultValue: '0.0000',
  })
  frozen_ratez?: string;

  @Column({
    field: 'rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '\u8FD0\u8425\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  ratea?: string;

  @Column({
    field: 'frozen_rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '\u8FD0\u8425\u53EF\u7528\u6BD4\u4F8B\uFF08\u51BB\u7ED3\uFF09',
    defaultValue: '0.0000',
  })
  frozen_ratea?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u548C\u4EE3\u7406\u4FDD\u5E95',
    defaultValue: '0.0000',
  })
  minimum_amount?: string;

  @Column({
    field: 'minimum_rateA',
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u4FDD\u5E95\u6BD4\u4F8B',
    defaultValue: '0.0000',
  })
  minimum_ratea?: string;

  @Column({
    field: 'minimum_rateB',
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u4FDD\u5E95\u6BD4\u4F8B',
    defaultValue: '0.0000',
  })
  minimum_rateb?: string;

  @Column({
    field: 'rateA_plus',
    type: DataType.DECIMAL(18, 4),
    comment: '\u8FD0\u8425\u989D\u5916\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  ratea_plus?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u6295\u8D44\u4EBA\u548C\u4EE3\u7406\u4FDD\u5E95\u9884\u8B66\u503C',
    defaultValue: '0.0000',
  })
  minimum_safe?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u5E97\u94FA\u5229\u6DA6\u5927\u4E8E\u9884\u8B66\uFF0C\u6295\u8D44\u4EBA\u548C\u4EE3\u7406\u7684\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  minimum_safe_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '\u6295\u8D44\u4EBA\u6700\u5927\u53EF\u7528\u6536\u76CA',
  })
  maxavailable_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u7406\u5546\u6700\u5927\u53EF\u7528\u6536\u76CA',
  })
  maxagent_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u6295\u8D44\u4EBA\u8D85\u8FC7\u6700\u5927\u7684\u9644\u52A0\u6536\u76CA',
  })
  maxavailable_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u6295\u8D44\u4EBA\u8D85\u8FC7\u6700\u5927\u7684\u9644\u52A0\u6536\u76CA(\u51BB\u7ED3)',
  })
  maxavailable_frozen_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u4EE3\u7406\u5546\u8D85\u8FC7\u6700\u5927\u7684\u9644\u52A0\u6536\u76CA',
  })
  maxagent_available_amount_plus?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8D44\u91D1\u662F\u5230\u652F\u4ED8\u5B9D\u65F6\u95F4',
  })
  to_ali_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u6295\u8D44\u4EBA\u652F\u4ED8\u5B9D\u72B6\u6001\uFF080\u672A\u6253\u6B3E 1\u6253\u6B3E\u4E2D 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  available_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u6295\u8D44\u4EBA\u652F\u4ED8\u5B9D\u6D41\u6C34',
  })
  @Index({
    name: 'idx_available_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  available_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u6295\u8D44\u4EBA\u652F\u4ED8\u5B9D\u8FD4\u56DE\u5907\u6CE8',
  })
  available_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u4EE3\u7406\u652F\u4ED8\u5B9D\u72B6\u6001\uFF080\u672A\u6253\u6B3E 1\u6253\u6B3E\u4E2D 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  agent_available_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u4EE3\u7406\u652F\u4ED8\u5B9D\u6D41\u6C34',
  })
  @Index({
    name: 'idx_agent_available_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  agent_available_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u4EE3\u7406\u652F\u4ED8\u5B9D\u8FD4\u56DE\u5907\u6CE8',
  })
  agent_available_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u6295\u8D44\u4EBA\u652F\u4ED8\u5B9D\u91D1\u989D',
  })
  available_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u4EE3\u7406\u652F\u4ED8\u5B9D\u91D1\u989D',
  })
  agent_available_ali_amount?: string;

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
