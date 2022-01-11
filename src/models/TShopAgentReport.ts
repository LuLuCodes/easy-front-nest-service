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
  tableName: 't_shop_agent_report',
  timestamps: false,
  comment: '\u5E97\u94FA\u4EE3\u8D2D\u65E5\u62A5\u8868',
})
export class TShopAgentReport extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u4EE3\u8D2D\u7F16\u7801' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.DATE, comment: '\u62A5\u8868\u65E5\u671F' })
  @Index({
    name: 'idx_report_day',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  report_day!: Date;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u4EE3\u8D2D\u8D5A\u53D6\u7684\u5F53\u65E5\u53EF\u5206\u4F63\u603B\u5229\u6DA6',
    defaultValue: '0.0000',
  })
  all_available_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4EE3\u8D2D\u8D5A\u53D6\u7684\u5F53\u65E5\u53EF\u5206\u4F63\u603B\u5355\u6570',
    defaultValue: '0',
  })
  all_available_count?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u8D2D\u53EF\u7528\u6536\u76CA',
    defaultValue: '0.0000',
  })
  available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u4EE3\u8D2D\u53EF\u7528\u6536\u76CA',
    defaultValue: '0.0000',
  })
  dis_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment: '\u5DF2\u7ED3\u7B97\u5230B\u8D26\u53F7\u4F63\u91D1',
  })
  set_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EE3\u8D2D\u4F63\u91D1\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u65E5\u91C7\u8D2D\u6210\u672C',
    defaultValue: '0.0000',
  })
  const_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u65E5\u91C7\u8D2D\u6210\u672C',
    defaultValue: '0.0000',
  })
  const_dis_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u65E5\u91C7\u8D2D\u6210\u672C(\u652F\u4ED8\u5B9D)',
    defaultValue: '0.0000',
  })
  const_zfb_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u65E5\u91C7\u8D2D\u6210\u672C(\u652F\u4ED8\u5B9D)',
    defaultValue: '0.0000',
  })
  const_dis_zfb_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u5DF2\u7ED3\u7B97\u5230B\u8D26\u53F7\u652F\u4ED8\u5B9D\u672C\u91D1',
  })
  set_const_dis_zfb_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u65E5\u91C7\u8D2D\u6210\u672C(\u94F6\u884C\u5361)',
    defaultValue: '0.0000',
  })
  const_yhk_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u5C55\u793A\u65E5\u91C7\u8D2D\u6210\u672C(\u94F6\u884C\u5361)',
    defaultValue: '0.0000',
  })
  const_dis_yhk_available_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 4),
    comment:
      '\u5DF2\u7ED3\u7B97\u5230B\u8D26\u53F7\u94F6\u884C\u5361\u672C\u91D1',
  })
  set_const_dis_yhk_available_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u65E5\u91C7\u8D2D\u6210\u672C\u51BB\u7ED3',
    defaultValue: '0.0000',
  })
  const_frozen_amount?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u8BA2\u5355\u6570',
    defaultValue: '0',
  })
  order_count?: number;

  @Column({
    field: 'rateB',
    type: DataType.DECIMAL(18, 4),
    comment: '\u91C7\u8D2D\u53EF\u7528\u6BD4\u7387',
    defaultValue: '0.0000',
  })
  rateb?: string;

  @Column({
    field: 'amountB',
    type: DataType.DECIMAL(18, 4),
    comment: '\u91C7\u8D2D\u53EF\u7528\u5355\u6BD4\u4F63\u91D1',
    defaultValue: '0.0000',
  })
  amountb?: string;

  @Column({
    field: 'typeB',
    type: DataType.INTEGER,
    comment:
      '\u91C7\u8D2D\u53EF\u7528\u4F63\u91D1\u8BA1\u7B97\u65B9\u5F0F(1\u6309\u6BD4\u4F8B 0\u6309\u56FA\u5B9A\u91D1\u989D)',
    defaultValue: '0',
  })
  typeb?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8D44\u91D1\u662F\u5230\u652F\u4ED8\u5B9D\u65F6\u95F4',
  })
  to_ali_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u8D44\u91D1\u6253\u5230\u652F\u4ED8\u5B9D\u65F6\u95F4(\u4F63\u91D1)',
  })
  com_to_ali_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u65F6\u95F4(\u4F63\u91D1)',
  })
  to_wallet_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u65F6\u95F4\uFF08\u6210\u672C\uFF09',
  })
  const_to_wallet_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u6D41\u6C34\uFF08\u4F63\u91D1\uFF09',
  })
  @Index({
    name: 'idx_to_wallet_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_wallet_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u91D1\u989D\uFF08\u4F63\u91D1\uFF09',
  })
  to_wallet_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u6D41\u6C34\uFF08\u6210\u672C\uFF09',
  })
  @Index({
    name: 'idx_const_to_wallet_ali_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  const_to_wallet_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u91D1\u989D\uFF08\u6210\u672C\uFF09',
  })
  const_to_wallet_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u8FD4\u56DE\u5907\u6CE8\uFF08\u4F63\u91D1\uFF09',
  })
  to_wallet_ali_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u72B6\u6001\uFF080\u672A\u6253\u6B3E 1\u6253\u6B3E\u4E2D 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25\uFF09\uFF08\u4F63\u91D1\uFF09',
    defaultValue: '0',
  })
  to_wallet_ali_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u72B6\u6001\uFF080\u672A\u6253\u6B3E 1\u6253\u6B3E\u4E2D 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25\uFF09\uFF08\u6210\u672C\uFF09',
    defaultValue: '0',
  })
  const_to_wallet_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u652F\u4ED8\u5B9D\u8FD4\u56DE\u5907\u6CE8\uFF08\u6210\u672C\uFF09',
  })
  const_to_wallet_ali_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u94F6\u884C\u5361\u65F6\u95F4\uFF08\u6210\u672C\uFF09',
  })
  const_to_card_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u94F6\u884C\u5361\u72B6\u6001\uFF080\u672A\u6253\u6B3E 1\u6253\u6B3E\u4E2D 2\u5DF2\u5230\u8D26 3\u5230\u8D26\u5931\u8D25\uFF09\uFF08\u6210\u672C\uFF09',
    defaultValue: '0',
  })
  const_to_card_ali_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u94F6\u884C\u5361\u6D41\u6C34\uFF08\u6210\u672C\uFF09',
  })
  const_to_card_ali_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u94F6\u884C\u5361\u91D1\u989D\uFF08\u6210\u672C\uFF09',
  })
  const_to_card_ali_amount?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment:
      '\u5E73\u53F0\u652F\u4ED8\u5B9D\u5230\u7528\u6237\u94F6\u884C\u5361\u8FD4\u56DE\u5907\u6CE8\uFF08\u6210\u672C\uFF09',
  })
  const_to_card_ali_remark?: string;

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
