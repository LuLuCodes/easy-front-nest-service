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
  tableName: 't_customer_address',
  timestamps: false,
  comment: '用户地址表',
})
export class TCustomerAddress extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户地址主键(自增)',
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

  @Column({ type: DataType.BIGINT, comment: '用户id', defaultValue: '0' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ type: DataType.STRING(100), comment: '收货人姓名' })
  name!: string;

  @Column({ type: DataType.STRING(32), comment: '收货人电话' })
  phone!: string;

  @Column({ type: DataType.STRING(50), comment: '省市区编码' })
  pcd_code!: string;

  @Column({ type: DataType.STRING(255), comment: '省市区' })
  pcd_desc!: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '详细地址' })
  address?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '标签：家，公司',
  })
  tags?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否默认地址',
    defaultValue: '0',
  })
  is_default?: number;

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
