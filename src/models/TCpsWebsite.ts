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
  tableName: 't_cps_website',
  timestamps: false,
  comment: 'cps\u7AD9\u70B9\u548C\u6C47\u7387\u8868',
})
export class TCpsWebsite extends Model {
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

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E97\u94FA\u7C7B\u578B\uFF081\u4E9A\u9A6C\u900A\u2026\u2026\uFF09',
  })
  cps_type!: number;

  @Column({
    type: DataType.STRING(50),
    comment: '\u7AD9\u70B9\u540D\u79F0\uFF08\u663E\u793A\u7528\uFF09',
  })
  web_country!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment:
      '\u7AD9\u70B9\u540D\u79F0\u7F16\u53F7\uFF08\u5BF9\u63A5\u7528\uFF09',
  })
  web_country_code?: string;

  @Column({ type: DataType.STRING(50), comment: '\u8D27\u5E01\u7C7B\u578B' })
  currency_type!: string;

  @Column({ type: DataType.STRING(50), comment: '\u8D27\u5E01\u7B26\u53F7' })
  currency_code!: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '\u4EBA\u6C11\u5E01\u6C47\u7387',
  })
  exchange_rate!: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u5E73\u53F0\u4F63\u91D1',
    defaultValue: '0.00',
  })
  plant_rate?: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u4E91\u56FE\u56FD\u9645\u7269\u6D41\u56FD\u5BB6\u7B80\u7801',
  })
  express_code!: string;

  @Column({
    field: 'marketplaceId',
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E9A\u9A6C\u900AMarketplaceId',
  })
  marketplaceid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8FDE\u63A5\u5730\u5740',
  })
  link_url?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

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
