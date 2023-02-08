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
  tableName: 't_customer',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '用户表',
})
export class TCustomer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code!: string;

  @Column({ type: DataType.STRING(36), comment: '用户code' })
  @Index({
    name: 'idx_customer_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_code!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '性别：0 未知， 1男， 1 女',
    defaultValue: '0',
  })
  @Index({ name: 'idx_gender', using: 'BTREE', order: 'ASC', unique: false })
  gender?: number;

  @Column({ allowNull: true, type: DataType.DATEONLY, comment: '生日' })
  birthday?: string;

  @Column({ type: DataType.STRING(20), comment: '昵称' })
  @Index({ name: 'idx_nick', using: 'BTREE', order: 'ASC', unique: false })
  nick!: string;

  @Column({ type: DataType.STRING(20), comment: '姓名' })
  @Index({ name: 'idx_name', using: 'BTREE', order: 'ASC', unique: false })
  name!: string;

  @Column({ type: DataType.STRING(500), comment: '头像地址' })
  avatar!: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '用户等级',
    defaultValue: '0',
  })
  @Index({ name: 'idx_level', using: 'BTREE', order: 'ASC', unique: false })
  level?: number;

  @Column({ type: DataType.STRING(10), comment: '邀请码' })
  invitation_code!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用, 2 注销',
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
  created_by?: number;

  @Column({ type: DataType.BIGINT, comment: '修改人', defaultValue: '1' })
  updated_by?: number;
}
