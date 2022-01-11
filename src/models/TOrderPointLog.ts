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
  tableName: 't_order_point_log',
  timestamps: false,
  comment: '\u8BA2\u5355\u79EF\u5206\u4F7F\u7528\u6D41\u6C34\u8BB0\u5F55',
})
export class TOrderPointLog extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '\u8BA2\u5355\u7F16\u7801' })
  @Index({ name: 'idx_order_id', using: 'BTREE', order: 'ASC', unique: false })
  order_id!: number;

  @Column({
    type: DataType.BIGINT,
    comment: '\u4EBA\u5458\u5728\u6E20\u9053\u7F16\u7801',
  })
  info_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u6E20\u9053\u7F16\u7801' })
  sale_channel_id!: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment:
      '\u79EF\u5206\uFF08\u6B63\u6570\u52A0\uFF0C\u8D1F\u6570\u51CF\uFF09',
  })
  point?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u62B5\u7528\u7684\u94B1',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u6C47\u7387\uFF08x\u79EF\u5206\u62B51\u5143\uFF09',
  })
  rate?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5907\u6CE8',
  })
  remark?: string;

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
