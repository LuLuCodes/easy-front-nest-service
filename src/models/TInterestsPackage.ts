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
  tableName: 't_interests_package',
  timestamps: false,
  comment: '商品权益包表',
})
export class TInterestsPackage extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '权益包名称',
  })
  package_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '权益包价格',
  })
  price?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '权益包可定天数',
  })
  package_day?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '0待上架 1上架 2下架',
  })
  onsale_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后上架时间' })
  last_onsale_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后上架人' })
  last_onsale_user_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后下架时间' })
  last_downsale_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后下架人' })
  last_downsale_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '销售渠道(JSON [{"id":1（0代表全网）,"name":"渠道1"}])',
  })
  sale_channel_json?: object;

  @Column({ allowNull: true, type: DataType.STRING, comment: '详情描述' })
  detail?: string;

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
