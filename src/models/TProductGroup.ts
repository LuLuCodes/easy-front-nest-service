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
  tableName: 't_product_group',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '商品分组表',
})
export class TProductGroup extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '分组主键',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(64), comment: '分组名称' })
  @Index({
    name: 'idx_group_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  group_name!: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '销售渠道(JSON [{"id":1（0代表全网）,"name":"渠道1"}])',
  })
  sale_channel_ids?: object;

  @Column({ allowNull: true, type: DataType.STRING, comment: 'json备注' })
  josn_remark?: string;

  @Column({ type: DataType.STRING(32), comment: '显示位置' })
  position_code!: string;

  @Column({ type: DataType.STRING(500), comment: '分组描述' })
  group_desc!: string;

  @Column({
    type: DataType.STRING(500),
    comment: '分组画册，限制为5张，以逗号分割',
  })
  album_pics!: string;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  @Index({
    name: 'idx_group_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({ name: 'idx_sort', using: 'BTREE', order: 'ASC', unique: false })
  sort_no?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
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
