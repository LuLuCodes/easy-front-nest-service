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
  comment: 'cps站点和汇率表',
})
export class TCpsWebsite extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.INTEGER, comment: '店铺类型（1亚马逊……）' })
  cps_type!: number;

  @Column({ type: DataType.STRING(50), comment: '站点名称（显示用）' })
  web_country!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '站点名称编号（对接用）',
  })
  web_country_code?: string;

  @Column({ type: DataType.STRING(50), comment: '货币类型' })
  currency_type!: string;

  @Column({ type: DataType.STRING(50), comment: '货币符号' })
  currency_code!: string;

  @Column({ type: DataType.DECIMAL(18, 4), comment: '人民币汇率' })
  exchange_rate!: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '平台佣金',
    defaultValue: '0.00',
  })
  plant_rate?: string;

  @Column({ type: DataType.STRING(50), comment: '云图国际物流国家简码' })
  express_code!: string;

  @Column({
    field: 'marketplaceId',
    allowNull: true,
    type: DataType.STRING(100),
    comment: '亚马逊MarketplaceId',
  })
  marketplaceid?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '连接地址' })
  link_url?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
