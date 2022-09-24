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
  tableName: 't_shop_cps_node',
  timestamps: false,
  comment: '三方店铺消息列表',
})
export class TShopCpsNode extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编号' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '消息类型' })
  node_type?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '三方消息编码',
  })
  @Index({
    name: 'idx_cps_node_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  cps_node_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '标题' })
  title?: string;

  @Column({ allowNull: true, type: DataType.STRING, comment: '消息内容' })
  content?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '处理状态（0待处理 1已处理）',
    defaultValue: '0',
  })
  deal_status?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '处理时间' })
  deal_time?: Date;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '处理人' })
  deal_user?: string;

  @Column({ allowNull: true, type: DataType.BIGINT, comment: '处理人' })
  deal_user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(200), comment: '处理备注' })
  deal_remark?: string;

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
