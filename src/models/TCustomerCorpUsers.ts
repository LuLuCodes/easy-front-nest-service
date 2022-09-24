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
  tableName: 't_customer_corp_users',
  timestamps: false,
  comment: '企业微信客服列表',
})
export class TCustomerCorpUsers extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '企业微信成员名称',
  })
  user_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '企业微信成员UserID',
  })
  @Index({ name: 'idx_user_id', using: 'BTREE', order: 'ASC', unique: true })
  user_id?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment: '企业微信手机号',
  })
  @Index({ name: 'mobile_index', using: 'BTREE', order: 'ASC', unique: true })
  mobile?: string;

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
