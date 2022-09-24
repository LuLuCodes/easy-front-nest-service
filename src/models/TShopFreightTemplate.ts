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
  tableName: 't_shop_freight_template',
  timestamps: false,
  comment: '运费配置表',
})
export class TShopFreightTemplate extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '淘宝运费编码',
  })
  tb_template_id?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '运费配置JSON' })
  freight_json?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '运费配置JSON_Hash',
  })
  @Index({
    name: 'idx_freight_json_hash',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  freight_json_hash?: string;

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
