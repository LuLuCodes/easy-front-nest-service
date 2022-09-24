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
  tableName: 't_customer_photo',
  timestamps: false,
  comment: '用户相册',
})
export class TCustomerPhoto extends Model {
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

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: 'idx_customer', using: 'BTREE', order: 'ASC', unique: false })
  customer_id?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '相册类型:0:普通 1:真人2:女神,3阅后即焚,4:付费,如果是1删除触发删出认证',
  })
  photo_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '原始相册类型',
    defaultValue: '0',
  })
  origin_photo_type?: number;

  @Column({ type: DataType.TINYINT, comment: '文件类型：1:图片2:视频' })
  file_type!: number;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '地址' })
  pic_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(255), comment: '附加地址' })
  pic_url_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '审核标记 1审核 0未审核 11审核失败 12需要人工审核',
  })
  audit_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '审核时间' })
  audit_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '审核原因' })
  audit_reason?: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  @Index({ name: 'idx_customer', using: 'BTREE', order: 'ASC', unique: false })
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
