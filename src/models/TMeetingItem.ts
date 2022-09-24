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
  tableName: 't_meeting_item',
  timestamps: false,
  comment: '约会明细记录',
})
export class TMeetingItem extends Model {
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
    comment: '项目编码',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.BIGINT, comment: '约会编码' })
  @Index({
    name: 'idx_meeting_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  meeting_id!: number;

  @Column({ type: DataType.BIGINT, comment: '赴约人编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '状态（0申请待审核 1同意 11拒绝 2已赴约 10完成）',
  })
  item_status!: number;

  @Column({ type: DataType.STRING(500), comment: '自我推荐' })
  advantage!: string;

  @Column({ type: DataType.TINYINT, comment: '是否同意', defaultValue: '0' })
  is_agree?: number;

  @Column({ type: DataType.BIGINT, comment: '同意人', defaultValue: '0' })
  agree_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '同意时间' })
  agree_time?: Date;

  @Column({ type: DataType.TINYINT, comment: '是否取消', defaultValue: '0' })
  is_cancel?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '取消人' })
  cancel_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '取消时间' })
  cancel_time?: Date;

  @Column({ type: DataType.TINYINT, comment: '是否赴约', defaultValue: '0' })
  is_attend?: number;

  @Column({ type: DataType.BIGINT, comment: '赴约人', defaultValue: '0' })
  attend_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '赴约时间' })
  attend_time?: Date;

  @Column({ type: DataType.TINYINT, comment: '是否完成', defaultValue: '0' })
  is_finish?: number;

  @Column({ type: DataType.BIGINT, comment: '完成人', defaultValue: '0' })
  finish_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '完成时间' })
  finish_time?: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '投诉入口关闭（0未关 1已关）',
    defaultValue: '0',
  })
  close_complaint?: number;

  @Column({ type: DataType.TINYINT, comment: '是否投诉', defaultValue: '0' })
  is_complaint?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '投诉系统编码' })
  @Index({
    name: 'idx_complaint_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  complaint_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(2000), comment: '投诉图片' })
  complaint_url?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '评价状态（0未评价 1已评价）',
    defaultValue: '0',
  })
  comment_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '态度评价（1-5）',
  })
  manner_point?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '真人与照片相似度（1与相片不符 2与相片相似 3比相片好看）',
  })
  photo_point?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '创建时间' })
  create_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '更新时间' })
  update_time?: Date;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '创建人' })
  creator_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '修改人' })
  modifier_id?: number;
}
