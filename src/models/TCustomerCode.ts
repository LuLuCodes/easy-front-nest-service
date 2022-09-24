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
  tableName: 't_customer_code',
  timestamps: false,
  comment: '客户号码表',
})
export class TCustomerCode extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '客户编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.INTEGER, comment: '是否是孩子', defaultValue: '0' })
  if_son?: number;

  @Column({ type: DataType.STRING(50), comment: 'code类型(几号人)' })
  code_type!: string;

  @Column({ type: DataType.STRING(50), comment: '客户号码名称' })
  code_name!: string;

  @Column({ allowNull: true, type: DataType.DATEONLY, comment: '生日' })
  code_birthday?: string;

  @Column({ type: DataType.STRING(500), comment: '客户号码（钻数字）' })
  code!: string;

  @Column({ type: DataType.STRING(500), comment: '客户号码备注（联合数字）' })
  code_remark!: string;

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
