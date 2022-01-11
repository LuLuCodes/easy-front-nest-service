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
  tableName: 't_img_upload',
  timestamps: false,
  comment: '\u4E0A\u4F20\u56FE\u7247\u8DEF\u5F84',
})
export class TImgUpload extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
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
    type: DataType.STRING,
    comment: '\u539F\u59CB\u8DEF\u5F84',
  })
  img_path?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8BF7\u6C42json',
  })
  req_json?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6700\u7EC8\u56FE\u7247',
  })
  res_url?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5F53\u65F6\u7684http\u72B6\u6001',
  })
  res_stats?: number;

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
