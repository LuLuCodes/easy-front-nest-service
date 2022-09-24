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
  tableName: 't_shop_expenditure_item',
  timestamps: false,
  comment: '店铺额外开支表明细表',
})
export class TShopExpenditureItem extends Model {
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

  @Column({ type: DataType.BIGINT, comment: '店铺编码（冗余）' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({ type: DataType.BIGINT, comment: '店铺额外开支表头' })
  @Index({
    name: 'idx_shop_expenditure_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  shop_expenditure_id!: number;

  @Column({ type: DataType.DATE, comment: '开支起始时间（包括这个点）' })
  start_time!: Date;

  @Column({ type: DataType.DATE, comment: '开支结束时间（不包括这个点）' })
  end_time!: Date;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '金额',
    defaultValue: '0.00',
  })
  const?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '备注说明' })
  remark?: string;

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
