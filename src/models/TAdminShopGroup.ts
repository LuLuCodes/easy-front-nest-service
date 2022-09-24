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
  tableName: 't_admin_shop_group',
  timestamps: false,
  comment: '店铺分组',
})
export class TAdminShopGroup extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '店铺分组名称',
  })
  group_name?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '是否指定店铺可见（1指定店铺可见 0所有店铺可见）',
  })
  if_select_shop?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '指定店铺列表（JSON）',
  })
  shop_ids?: string;

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
