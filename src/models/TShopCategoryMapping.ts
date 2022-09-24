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
  tableName: 't_shop_category_mapping',
  timestamps: false,
  comment: '类别映射表',
})
export class TShopCategoryMapping extends Model {
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
    type: DataType.INTEGER,
    comment: '来源店类型（pdd）',
  })
  @Index({
    name: 'idx_from_type_cid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '来源店类别id',
  })
  @Index({
    name: 'idx_from_type_cid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  from_cid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '来源店类别',
  })
  from_cname?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '来源店类别层级',
  })
  from_clevel?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '来源店类别上级id',
  })
  from_pid?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '淘宝类别id' })
  tb_cid?: string;

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
