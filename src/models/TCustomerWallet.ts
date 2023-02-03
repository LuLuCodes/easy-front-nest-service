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
  tableName: 't_customer_wallet',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户钱包表',
})
export class TCustomerWallet extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '用户id', defaultValue: '0' })
  @Index({
    name: 'customer_id_UNIQUE',
    using: 'BTREE',
    order: 'ASC',
    unique: true,
  })
  customer_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '钱包余额',
    defaultValue: '0.0000',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '出账冻结',
    defaultValue: '0.0000',
  })
  out_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '进帐冻结',
    defaultValue: '0.0000',
  })
  in_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '积分',
    defaultValue: '0.0000',
  })
  point?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '出账冻结',
    defaultValue: '0.0000',
  })
  out_frozen_point?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '出账冻结',
    defaultValue: '0.0000',
  })
  in_frozen_point?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '积分2',
    defaultValue: '0.0000',
  })
  point2?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '出账冻结',
    defaultValue: '0.0000',
  })
  out_frozen_point2?: string;

  @Column({
    type: DataType.DECIMAL(18, 4),
    comment: '出账冻结',
    defaultValue: '0.0000',
  })
  in_frozen_point2?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  created_at!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  updated_at!: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '删除时间' })
  deleted_at?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人', defaultValue: '1' })
  creator_id?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  modifier_id?: number;
}
