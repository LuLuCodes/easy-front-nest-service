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
  tableName: 't_interests_order',
  timestamps: false,
  comment: '商品权益兑换单',
})
export class TInterestsOrder extends Model {
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

  @Column({ type: DataType.INTEGER, comment: '所属渠道编码' })
  sale_channel_id!: number;

  @Column({ type: DataType.BIGINT, comment: '权益包系统编码' })
  package_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '权益包名称',
  })
  package_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '客户手机号',
  })
  phone?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '客户姓名' })
  customer_name?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '权益包价格',
  })
  price?: string;

  @Column({ type: DataType.INTEGER, comment: '权益包可定天数' })
  package_day!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '权益已使用天数',
    defaultValue: '0',
  })
  used_day?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '权益兑换单状态（0待行权，10部分行权 20行权完毕 30已取消）',
    defaultValue: '0',
  })
  order_status?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '取消状态（0正常 1已取消）',
    defaultValue: '0',
  })
  cancel_status?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '取消人' })
  cancel_user_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '取消时间' })
  cancel_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '创建人' })
  create_user?: string;

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
