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
  tableName: 't_welfare_group',
  timestamps: false,
  comment: '权益分组表',
})
export class TWelfareGroup extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '权益id' })
  @Index({
    name: 'idx_welfare_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  welfare_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '分组名称' })
  group_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '兑换次数' })
  group_count?: number;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  sort_no?: number;

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
