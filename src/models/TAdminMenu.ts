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
  tableName: 't_admin_menu',
  timestamps: false,
  comment: '\u540E\u53F0\u83DC\u5355\u8868',
})
export class TAdminMenu extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u83DC\u5355\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u7236\u7EA7ID' })
  @Index({ name: 'idx_parent_id', using: 'BTREE', order: 'ASC', unique: false })
  parent_id!: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u6743\u9650\u7C7B\u578B 1\u76EE\u5F55 2\u83DC\u5355 3\u6309\u94AE',
  })
  right_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u83DC\u5355\u540D\u79F0',
  })
  title?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u83DC\u5355\u7EA7\u6570',
    defaultValue: '0',
  })
  level?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u83DC\u5355\u6392\u5E8F',
    defaultValue: '0',
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u524D\u7AEF\u8DEF\u7531name',
  })
  show_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u524D\u7AEF\u56FE\u6807',
  })
  show_icon?: string;

  @Column({ type: DataType.STRING(50), comment: '\u83DC\u5355\u7F16\u7801' })
  menu_code!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u8DF3\u8F6C\u5730\u5740',
  })
  redirect?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: 'component' })
  layout?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u524D\u7AEF\u8DEF\u7531path',
  })
  show_path?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '0 \u53EF\u7528, 1 \u7981\u7528, 2 \u4E0D\u5C55\u793A',
  })
  status!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u989D\u5916\u7684\u5B57\u6BB5',
  })
  extra?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6765\u6E90',
    defaultValue: '0',
  })
  source_type?: number;

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
