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
  tableName: 't_object_wallet',
  timestamps: false,
  comment: '对象钱包表',
})
export class TObjectWallet extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '对象编码（商家编码，渠道编码）' })
  @Index({ name: 'idx_object_id', using: 'BTREE', order: 'ASC', unique: false })
  object_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '对象类型（1商家seller 2渠道sale_channel）',
  })
  object_type!: number;

  @Column({ type: DataType.INTEGER, comment: '钱包类型(1普通钱包)' })
  wallet_type!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '钱包余额',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '出账冻结',
    defaultValue: '0.00',
  })
  out_frozen_amount?: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '进帐冻结',
    defaultValue: '0.00',
  })
  in_frozen_amount?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
