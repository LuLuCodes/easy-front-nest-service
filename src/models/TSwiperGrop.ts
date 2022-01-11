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
  tableName: 't_swiper_grop',
  timestamps: false,
  comment: '\u8F6E\u64AD\u56FE\u5206\u7EC4\u8282\u70B9',
})
export class TSwiperGrop extends Model {
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
    type: DataType.BIGINT,
    comment: '\u8F6E\u64AD\u56FE\u7F16\u7801',
  })
  @Index({ name: 'idx_swiper_id', using: 'BTREE', order: 'ASC', unique: false })
  swiper_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5206\u7EC4\u540D\u79F0',
  })
  grop_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u5206\u7EC4\u56FE\u7247',
  })
  grop_file?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5206\u7EC4JSON',
  })
  grop_josn?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6392\u5E8F',
    defaultValue: '0',
  })
  sort?: number;

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
