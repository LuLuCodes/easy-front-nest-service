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
  comment: '\u7C7B\u522B\u6620\u5C04\u8868',
})
export class TShopCategoryMapping extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
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
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6765\u6E90\u5E97\u7C7B\u578B\uFF08pdd\uFF09',
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
    comment: '\u6765\u6E90\u5E97\u7C7B\u522Bid',
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
    comment: '\u6765\u6E90\u5E97\u7C7B\u522B',
  })
  from_cname?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6765\u6E90\u5E97\u7C7B\u522B\u5C42\u7EA7',
  })
  from_clevel?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u6765\u6E90\u5E97\u7C7B\u522B\u4E0A\u7EA7id',
  })
  from_pid?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u6DD8\u5B9D\u7C7B\u522Bid',
  })
  tb_cid?: string;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
