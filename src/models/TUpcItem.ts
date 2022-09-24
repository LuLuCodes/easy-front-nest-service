import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_upc_item', timestamps: false, comment: 'upc明细' })
export class TUpcItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: 'upc表头编码' })
  @Index({
    name: 'idx_upc_head_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  upc_head_id!: number;

  @Column({ type: DataType.BIGINT, comment: '企业编码' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.STRING(100), comment: 'upc编号' })
  @Index({ name: 'idx_upc_code', using: 'BTREE', order: 'ASC', unique: false })
  upc_code!: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'upc使用状态（0待使用 1占用中 10已使用）',
    defaultValue: '0',
  })
  upc_status?: number;

  @Column({
    type: DataType.BIGINT,
    comment: '当前占用skuid',
    defaultValue: '0',
  })
  sku_id?: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '使用时间' })
  use_time?: Date;

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
