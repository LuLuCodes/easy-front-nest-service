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
  tableName: 't_sale_point_airdrop_item',
  timestamps: false,
  comment: '渠道积分空投明细表',
})
export class TSalePointAirdropItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '空投编码' })
  @Index({
    name: 'idx_airdrop_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  airdrop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '人员编码' })
  customer_id!: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '空投金额',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '空投积分',
  })
  point?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '空投备注' })
  remark?: string;

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
