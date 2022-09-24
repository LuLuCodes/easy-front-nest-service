import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_file_down', timestamps: false, comment: '文件表' })
export class TFileDown extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
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

  @Column({
    type: DataType.INTEGER,
    comment: '归属（0平台后台 1商家后台）',
    defaultValue: '0',
  })
  own_type?: number;

  @Column({ type: DataType.BIGINT, comment: '归属编码', defaultValue: '0' })
  @Index({ name: 'idx_own_id', using: 'BTREE', order: 'ASC', unique: false })
  own_id?: number;

  @Column({ type: DataType.STRING(100), comment: '文件名称' })
  file_name!: string;

  @Column({ type: DataType.STRING(500), comment: '文件路径' })
  file_path!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '文件状态（0生成中 10已生成 11生成失败）',
    defaultValue: '0',
  })
  file_status?: number;

  @Column({ allowNull: true, type: DataType.STRING(500), comment: '备注' })
  remark?: string;

  @Column({ type: DataType.INTEGER, comment: '下载次数', defaultValue: '0' })
  down_count?: number;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  username!: string;

  @Column({ allowNull: true, type: DataType.DATE, comment: '最后下载时间' })
  last_down_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '来源（1spu 2t_order 3obj_wallet_log 4发货冻结 5upc导出 6发货单 7运营报表 8物流运费报表 9虹运支付宝C资金 10虹运支付宝B资金 11虹运支付宝A资金 12虹运不发货区域 13店铺授权类目 14刷单商品 15刷单任务明细 16刷单订单表 17刷单异常订单 18财务报表总表 19财务报表日表 25t_bill_info发票表 26酒店订单 27空投权益 28称重订单）',
    defaultValue: '0',
  })
  source_type?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '来源编码(1spu编码 2订单编码)',
    defaultValue: '0',
  })
  source_id?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '来源类别(0普通 1亚马逊导入文件)',
    defaultValue: '0',
  })
  source_class?: number;

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
