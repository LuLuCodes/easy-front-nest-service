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
  tableName: 't_customer_relation',
  timestamps: false,
  comment: '用户关系(上下级关系)表',
})
export class TCustomerRelation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '用户关系主键(自增)',
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

  @Column({ type: DataType.BIGINT, comment: '用户id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.BIGINT, comment: '邀请人用户主键' })
  @Index({
    name: 'idx_inviter_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  inviter_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '邀请备注' })
  invite_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(4000), comment: '层级路径' })
  sub_path?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
