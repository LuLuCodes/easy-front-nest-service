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
  comment: '上传图片路径',
})
export class TImgUpload extends Model {
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

  @Column({ allowNull: true, type: DataType.STRING, comment: '原始路径' })
  img_path?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '请求json' })
  req_json?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '最终图片' })
  res_url?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '当时的http状态',
  })
  res_stats?: number;

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
