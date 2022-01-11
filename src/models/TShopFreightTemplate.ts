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
  comment: '\u8FD0\u8D39\u914D\u7F6E\u8868',
})
export class TShopFreightTemplate extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u7F16\u7801' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6DD8\u5B9D\u8FD0\u8D39\u7F16\u7801',
  })
  tb_template_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8FD0\u8D39\u914D\u7F6EJSON',
  })
  freight_json?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u8FD0\u8D39\u914D\u7F6EJSON_Hash',
  })
  @Index({
    name: 'idx_freight_json_hash',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  freight_json_hash?: string;

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
