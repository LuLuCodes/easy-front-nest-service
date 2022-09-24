import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_coupon', timestamps: false, comment: '优惠券表' })
export class TCoupon extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '优惠券主键',
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

  @Column({ type: DataType.STRING(63), comment: '优惠券名称' })
  @Index({
    name: 'idx_coupon_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  coupon_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(127),
    comment: '优惠券介绍，通常是显示优惠券使用限制文字',
  })
  coupon_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '使用平台：0->全部；1->移动；2->PC',
  })
  platform?: number;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '投放渠道(JSON [{"id":1（0代表全网投放）,"name":"渠道1"}])',
  })
  no_sale_channel_json?: object;

  @Column({
    allowNull: true,
    type: DataType.STRING(63),
    comment: '优惠券标签，例如新人专用',
  })
  tag?: string;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment:
      '优惠券赠送类型，0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券',
    defaultValue: '0',
  })
  @Index({ name: 'idx_type', using: 'BTREE', order: 'ASC', unique: false })
  type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '优惠券总数量，如果是0，则是无限量',
    defaultValue: '0',
  })
  count?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '优惠金额',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '每人限领张数',
    defaultValue: '1',
  })
  per_limit?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '使用门槛(最少消费金额才能使用优惠券)；0表示无门槛',
    defaultValue: '0.00',
  })
  min_point?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '使用类型：0->全场通用；1->指定分类；2->指定商品',
    defaultValue: '0',
  })
  @Index({ name: 'idx_use_type', using: 'BTREE', order: 'ASC', unique: false })
  use_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '发行数量, 0->无限量',
    defaultValue: '0',
  })
  publish_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '已使用数量',
    defaultValue: '0',
  })
  use_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '领取数量',
    defaultValue: '0',
  })
  receive_count?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '优惠码' })
  code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1200),
    comment: '可领取的会员类型主键（用逗号隔开）：空->无限制',
  })
  customer_level?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '可以领取开始时间' })
  pick_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '可以领取结束时间' })
  pick_end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment:
      '有效时间限制，如果是0，则基于领取时间的有效天数days；如果是1，则use_start_time和use_end_time是优惠券有效期；',
    defaultValue: '0',
  })
  use_time_type?: number;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment: '基于领取时间的有效天数days。',
    defaultValue: '0',
  })
  days?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '优惠券可使用开始时间',
  })
  use_start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '优惠券可使用结束时间',
  })
  use_end_time?: Date;

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

  @Column({ type: DataType.TINYINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
