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
  tableName: 't_area',
  timestamps: false,
  comment: '\u57FA\u7840-\u7701\u5E02\u533A',
})
export class TArea extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '\u7701\u5E02\u533A\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    type: DataType.STRING(20),
    comment: '\u7701\u5E02\u533A\u7F16\u7801',
  })
  @Index({
    name: 'idx_pcd_code_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pcd_code!: string;

  @Column({
    type: DataType.STRING(50),
    comment: '\u7701\u5E02\u533A\u540D\u79F0',
  })
  @Index({
    name: 'idx_pcd_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  pcd_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u7EA7\u522B 100 \u7701 1000\u5E02 10000\u533A',
  })
  @Index({
    name: 'idx_level_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  level!: number;

  @Column({ type: DataType.STRING(20), comment: '\u7236\u7EA7id' })
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
    comment: '\u7B80\u5199\uFF0C\u7528\u4E8E\u641C\u7D22\u5317\u4EAC bj',
  })
  initials?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u540D\u79F0\u62FC\u97F3 beijing',
  })
  pinyin?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u662F\u76F4\u8F96\u5E02',
    defaultValue: '0',
  })
  is_municipality?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6392\u5E8F',
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
    comment: '\u70ED\u95E8\u57CE\u5E02',
    defaultValue: '0',
  })
  is_hot?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '1',
  })
  enabled?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
