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
  tableName: 't_customer_photo_opt',
  timestamps: false,
  comment: '人员游览相片权限',
})
export class TCustomerPhotoOpt extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '照片所有人', defaultValue: '0' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({ type: DataType.BIGINT, comment: '相册编码' })
  @Index({
    name: 'idx_opt_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  photo_id!: number;

  @Column({
    type: DataType.TINYINT,
    comment:
      '操作类型:1阅后即焚（当存在此记录时，当前人无法再查看照片）2付款查看（当存在此记录时，当前人才可以查看照片）',
  })
  @Index({
    name: 'idx_opt_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  opt_type!: number;

  @Column({ type: DataType.BIGINT, comment: '操作人' })
  @Index({
    name: 'idx_opt_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  opt_customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '是否后台删除',
    defaultValue: '0',
  })
  if_super_del?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_opt_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
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
