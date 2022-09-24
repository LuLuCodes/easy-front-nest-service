import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_upc_head', timestamps: false, comment: 'upc表头' })
export class TUpcHead extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '企业编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.STRING(50), comment: '名称' })
  upc_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'upc表类型（1默认upc）',
    defaultValue: '0',
  })
  upc_type?: number;

  @Column({ type: DataType.INTEGER, comment: '是否默认', defaultValue: '0' })
  is_default?: number;

  @Column({ type: DataType.INTEGER, comment: '总数量', defaultValue: '0' })
  all_count?: number;

  @Column({ type: DataType.INTEGER, comment: '已用数量', defaultValue: '0' })
  use_count?: number;

  @Column({ type: DataType.STRING(50), comment: '创建人姓名' })
  username!: string;

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
