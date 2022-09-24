import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_order_work', timestamps: false, comment: '订单工单表' })
export class TOrderWork extends Model {
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

  @Column({ type: DataType.STRING(100), comment: '三方原主单号' })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '下单人旺旺号',
  })
  nick_name?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '款系统编码（默认取1个）',
  })
  spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '款名称（默认取1个）',
  })
  spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: '款名称（默认取1个）',
  })
  product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '款主图（默认取1个）',
  })
  pic_url?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: 'SKU系统编码（默认取1个）',
  })
  sku_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(300),
    comment: 'SKU名称（默认取1个）',
  })
  sku_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '省份/直辖市',
  })
  order_receiver_pcd_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '详细地址（加密）',
  })
  order_ini_receiver_detail_address?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '订单金额',
    defaultValue: '0.00',
  })
  order_amount?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '订单下单时间' })
  order_create_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '订单支付时间' })
  order_payment_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '工单状态（1待运营处理 2待客服处理 3关闭）',
    defaultValue: '1',
  })
  work_status?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '工单备注内容' })
  work_content?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '附件（JSON）' })
  work_file?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后处理时间' })
  last_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '最后处理创建人',
  })
  last_deal_user?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '最后处理创建人' })
  last_deal_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '最后处理内容' })
  last_deal_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '最后处理附件（JSON）',
  })
  last_deal_file?: string;

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
