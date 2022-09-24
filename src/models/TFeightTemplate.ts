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
  tableName: 't_feight_template',
  timestamps: false,
  comment: '运费模版表',
})
export class TFeightTemplate extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '运费模板主键',
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

  @Column({ type: DataType.STRING(64), comment: '运费模板名称' })
  feight_template_name!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '计费类型:0->按重量；1->按件数',
    defaultValue: '0',
  })
  charge_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '首重kg',
    defaultValue: '0.00',
  })
  first_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '首费（元）',
    defaultValue: '0.00',
  })
  first_fee?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL(10, 2), comment: '续重kg' })
  continue_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '续费（元）',
  })
  continue_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '目的地（省、市）',
  })
  dest_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
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
