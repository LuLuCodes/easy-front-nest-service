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
  tableName: 't_spu_check_log',
  timestamps: false,
  comment: '系统异常警告表',
})
export class TSpuCheckLog extends Model {
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
    comment: '应用id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.STRING(100), comment: '淘宝商品编码' })
  product_sn!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '类型（1商品更新 2运费模板更新 3不可售区域更新 4店铺更新）',
  })
  action_type!: number;

  @Column({ type: DataType.INTEGER, comment: '是否成功（1成功 0失败）' })
  if_success!: number;

  @Column({ allowNull: true, type: DataType.STRING, comment: '失败备注' })
  remark?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '请求内容' })
  json_req?: string;

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
