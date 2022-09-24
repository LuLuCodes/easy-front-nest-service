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
  timestamps: false,
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

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(64), comment: '分组名称' })
  @Index({
    name: 'idx_group_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  group_name?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment: '销售渠道(JSON [{"id":1（0代表全网）,"name":"渠道1"}])',
  })
  sale_channel_ids?: object;

  @Column({ allowNull: true, type: DataType.STRING, comment: 'json备注' })
  josn_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(32), comment: '显示位置' })
  position_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '分组描述' })
  group_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '分组画册，限制为5张，以逗号分割',
  })
  album_pics?: string;

  @Column({ allowNull: true, type: DataType.INTEGER, comment: '排序' })
  @Index({
    name: 'idx_group_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({ name: 'idx_sort', using: 'BTREE', order: 'ASC', unique: false })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

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
