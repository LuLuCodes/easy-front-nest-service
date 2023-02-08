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
  tableName: 't_product_category',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '基础-类目表',
})
export class TProductCategory extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '类目主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '上级分类的编号：0表示一级分类',
    defaultValue: '0',
  })
  @Index({ name: 'idx_pid', using: 'BTREE', order: 'ASC', unique: false })
  pid?: number;

  @Column({ type: DataType.STRING(64), comment: '名称' })
  @Index({
    name: 'idx_category_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  category_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '类目类型，1->商品',
    defaultValue: '1',
  })
  type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '类目级别：0->1级；1->2级',
    defaultValue: '0',
  })
  @Index({ name: 'idx_level', using: 'BTREE', order: 'ASC', unique: false })
  level?: number;

  @Column({ type: DataType.INTEGER, comment: '商品数量', defaultValue: '0' })
  product_count?: number;

  @Column({ type: DataType.STRING(64), comment: '商品单位' })
  product_unit!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否显示在导航：0->不显示；1->显示',
    defaultValue: '1',
  })
  nav_status?: number;

  @Column({ type: DataType.STRING(500), comment: '类目描述' })
  category_desc!: string;

  @Column({ type: DataType.STRING(500), comment: '类目图片url' })
  pic_url!: string;

  @Column({
    type: DataType.STRING(2000),
    comment: '分类地址{pid}-{child_id}-...',
  })
  sub_path!: string;

  @Column({ type: DataType.STRING(255), comment: '关键字' })
  keywords!: string;

  @Column({ type: DataType.INTEGER, comment: '排序', defaultValue: '0' })
  @Index({
    name: 'idx_category_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({ name: 'idx_level', using: 'BTREE', order: 'ASC', unique: false })
  @Index({ name: 'idx_pid', using: 'BTREE', order: 'ASC', unique: false })
  @Index({ name: 'idx_sort', using: 'BTREE', order: 'ASC', unique: false })
  sort_no?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '0 禁用, 1 可用',
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
