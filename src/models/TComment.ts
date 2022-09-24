import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_comment', timestamps: false, comment: '评论点赞表' })
export class TComment extends Model {
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

  @Column({ type: DataType.INTEGER, comment: '评论类型（1评论 2点赞 3拉黑）' })
  comment_type!: number;

  @Column({ type: DataType.BIGINT })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '来源（1动态 2问题反馈）',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_type?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '来源编码（1动态编码）',
  })
  @Index({ name: 'idx_source_id', using: 'BTREE', order: 'ASC', unique: false })
  source_id?: number;

  @Column({ type: DataType.BIGINT, comment: '原评论id', defaultValue: '0' })
  old_comment_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(1500), comment: '评论内容' })
  content?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '回复对象' })
  @Index({
    name: 'idx_to_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  to_customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '回复对象昵称',
  })
  to_customer_nick?: string;

  @Column({ type: DataType.TINYINT, comment: '是否已读', defaultValue: '0' })
  if_read?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否是根评论',
    defaultValue: '1',
  })
  if_root?: number;

  @Column({ type: DataType.INTEGER, comment: '是否启用', defaultValue: '0' })
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
