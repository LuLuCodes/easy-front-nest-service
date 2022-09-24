import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_bill_info', timestamps: false, comment: '代开发票表' })
export class TBillInfo extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '店铺编码' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '订单信息' })
  @Index({
    name: 'idx_from_cps_tid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cps_tid?: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '申请时间' })
  apply_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '剩余时间' })
  limit_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '发票类型' })
  bill_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '发票抬头' })
  bill_title?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '购方税号' })
  @Index({
    name: 'idx_bill_to_no',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  bill_to_no?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '发票金额',
  })
  amount?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '收票地址' })
  address?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '店铺备注' })
  remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '状态（0待开 1已开）',
    defaultValue: '0',
  })
  bill_status?: number;

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
