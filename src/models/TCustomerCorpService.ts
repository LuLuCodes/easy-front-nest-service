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
  tableName: 't_customer_corp_service',
  timestamps: false,
  comment: '用户绑定企业客服记录表',
})
export class TCustomerCorpService extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '客户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '企业微信用户id(三方)',
  })
  corp_user_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '企业微信客服id(三方)',
  })
  corp_service_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '企业微信用户昵称(三方)',
  })
  corp_user_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(64) })
  union_id?: string;

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

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;
}
