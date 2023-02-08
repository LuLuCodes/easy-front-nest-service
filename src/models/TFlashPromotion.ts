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
  tableName: 't_flash_promotion',
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  comment: '限时购活动表',
})
export class TFlashPromotion extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT, comment: '活动主键' })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({ type: DataType.STRING(50), comment: '活动名称' })
  @Index({
    name: 'idx_flash_promotion_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_name!: string;

  @Column({ type: DataType.STRING(255), comment: '活动主图url' })
  pic_url!: string;

  @Column({ type: DataType.STRING(255), comment: '活动标题' })
  @Index({ name: 'idx_title', using: 'BTREE', order: 'ASC', unique: false })
  title!: string;

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.DATE, comment: '开始时间' })
  start_time!: Date;

  @Column({ type: DataType.DATE, comment: '结束时间' })
  end_time!: Date;

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
