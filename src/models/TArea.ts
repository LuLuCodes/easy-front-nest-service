import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_area', timestamps: false, comment: '基础-省市区' })
export class TArea extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '省市区主键',
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

  @Column({ type: DataType.STRING(20), comment: '省市区编码' })
  @Index({
    name: 'idx_pcd_code_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pcd_code!: string;

  @Column({ type: DataType.STRING(50), comment: '省市区名称' })
  @Index({
    name: 'idx_pcd_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pcd_name!: string;

  @Column({ type: DataType.INTEGER, comment: '级别 100 省 1000市 10000区' })
  @Index({
    name: 'idx_level_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  level!: number;

  @Column({ type: DataType.STRING(20), comment: '父级id' })
  @Index({
    name: 'idx_parent_code_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  parent_code!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(10),
    comment: '简写，用于搜索北京 bj',
  })
  initials?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '名称拼音 beijing',
  })
  pinyin?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否是直辖市',
    defaultValue: '0',
  })
  is_municipality?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '排序',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_level_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_parent_code_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_pcd_code_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_pcd_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '热门城市',
    defaultValue: '0',
  })
  is_hot?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '1',
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
