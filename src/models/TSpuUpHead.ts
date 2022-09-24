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
  tableName: 't_spu_up_head',
  timestamps: false,
  comment: '商品上传任务主表',
})
export class TSpuUpHead extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '主键',
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码' })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '企业编码' })
  seller_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment: '任务商品来源（1:淘系 3:拼多多）',
    defaultValue: '1',
  })
  from_cps_type?: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '任务名称' })
  title?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '上传选品（1后台人工选取，2智能自动选取，3按店铺授权类选取）',
    defaultValue: '1',
  })
  up_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '淘宝类别数组（‘,’分隔）',
  })
  category_ids?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '类别路径' })
  category_path?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '上传状态（0待上传 1上传中 2全部上传成功 11全部上传失败 12部分失败）',
    defaultValue: '0',
  })
  up_status?: number;

  @Column({ type: DataType.INTEGER, comment: '上传总数', defaultValue: '0' })
  total_count?: number;

  @Column({ type: DataType.INTEGER, comment: '上传成功数', defaultValue: '0' })
  success_count?: number;

  @Column({ type: DataType.INTEGER, comment: '上传失败数', defaultValue: '0' })
  fail_count?: number;

  @Column({ type: DataType.BIGINT, comment: '父任务编码', defaultValue: '0' })
  father_head?: number;

  @Column({ type: DataType.INTEGER, comment: '加价类型（1百分比 2固定值）' })
  price_up_type!: number;

  @Column({ type: DataType.DECIMAL(18, 2), comment: '加价值（百分比或元）' })
  price_up!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '抓取指令是否下发失败（0成功 1失败）',
    defaultValue: '0',
  })
  has_error?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '抓取指令失败备注',
  })
  error_remark?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '抓取是否完成',
    defaultValue: '0',
  })
  if_pick_finish?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '输入抓取原始数量',
    defaultValue: '0',
  })
  input_total_count?: number;

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
