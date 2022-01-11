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
  tableName: 't_customer',
  timestamps: false,
  comment: '\u7528\u6237\u8868',
})
export class TCustomer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7528\u6237\u4E3B\u952E',
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

  @Column({ type: DataType.STRING(36), comment: '\u8D26\u6237code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(36), comment: '\u7528\u6237code' })
  @Index({
    name: 'idx_customer_cdoe',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BA2\u6237\u6765\u6E90\uFF080\u666E\u901A\u5BA2\u6237 1\u4EE3\u8D2D\u4EBA\u5458  2\u4EE3\u7406\u5546 3\u770B\u677F\u7BA1\u7406\u8005\uFF09',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u6027\u522B\uFF1A0 \u672A\u77E5\uFF0C 1\u7537\uFF0C 2 \u5973',
    defaultValue: '0',
  })
  @Index({ name: 'idx_gender', using: 'BTREE', order: 'ASC', unique: false })
  gender?: number;

  @Column({ allowNull: true, type: DataType.DATEONLY, comment: '\u751F\u65E5' })
  birthday?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u6635\u79F0',
  })
  @Index({ name: 'idx_nick', using: 'BTREE', order: 'ASC', unique: false })
  nick_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u59D3\u540D',
  })
  @Index({ name: 'idx_name', using: 'BTREE', order: 'ASC', unique: false })
  real_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u5934\u50CF\u5730\u5740',
  })
  avatar_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '\u624B\u673A\u53F7\u7801',
  })
  phone?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u7528\u6237\u7B49\u7EA7',
    defaultValue: '0',
  })
  @Index({ name: 'idx_level', using: 'BTREE', order: 'ASC', unique: false })
  level?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: '\u9080\u8BF7\u7801',
  })
  invitation_code?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: 'VIP\u8FC7\u671F\u65F6\u95F4',
  })
  vip_expire?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: 'VIP\u84C4\u6C34\u65F6\u95F4\uFF08\u5929\uFF09',
    defaultValue: '0',
  })
  vip_save_days?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u6E38\u5BA2',
    defaultValue: '0',
  })
  is_tour?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u9500\u552E\u6E20\u9053',
  })
  sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5F85\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053',
  })
  wait_audit_sale_channel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u65F6\u95F4',
  })
  audit_sale_channel_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u4EBA\u5458',
  })
  audit_sale_channel_user?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment:
      '\u6700\u540E\u5BA1\u6838\u7684\u9500\u552E\u6E20\u9053\u4EBA\u5458',
  })
  audit_sale_channel_user_id?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u5728\u7EBF\u72B6\u6001\uFF080\u79BB\u7EBF 1\u5728\u7EBF\uFF09',
    defaultValue: '0',
  })
  online_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u5FC3\u8DF3\u65F6\u95F4',
  })
  beet_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u767B\u5F55\u72B6\u6001\uFF080\u767B\u51FA 1\u767B\u5165\uFF09',
    defaultValue: '0',
  })
  login_status?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E0B\u7EBF\u65F6\u95F4',
  })
  offline_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: 'app_key' })
  app_key?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: 'app_secret',
  })
  app_secret?: string;

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
