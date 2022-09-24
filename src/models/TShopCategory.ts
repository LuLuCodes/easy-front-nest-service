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
  tableName: 't_shop_category',
  timestamps: false,
  comment: '店铺对应的类目',
})
export class TShopCategory extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '上传的店铺id' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.STRING(50), comment: '叶子节点' })
  cid!: string;

  @Column({ type: DataType.STRING(100), comment: '叶子名称' })
  cname!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '叶子路径（根节点-中间节点-叶子节点）',
  })
  cid_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '叶子名称路径（根节点-中间节点-叶子节点）',
  })
  cname_path?: string;

  @Column({ type: DataType.INTEGER, comment: '是否授权', defaultValue: '0' })
  is_grant?: number;

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
