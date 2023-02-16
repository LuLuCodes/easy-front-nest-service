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
  timestamps: true,
  paranoid: true,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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

  @Column({ type: DataType.INTEGER, comment: '应用id', defaultValue: '10000' })
  app_id?: number;

  @Column({ type: DataType.STRING(64), comment: '运费模板名称' })
  feight_template_name!: string;

  @Column({
    type: DataType.TINYINT,
    comment: '计费类型:0->按重量；1->按件数',
    defaultValue: '0',
  })
  charge_type?: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '首重kg',
    defaultValue: '0.00',
  })
  first_weight?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '首费（元）',
    defaultValue: '0.00',
  })
  first_fee?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '续重kg',
    defaultValue: '0.00',
  })
  continue_weight?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '续费（元）',
    defaultValue: '0.00',
  })
  continue_fee?: string;

  @Column({ type: DataType.STRING(255), comment: '目的地（省、市）' })
  dest_pcd_code!: string;

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

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  created_by!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  updated_by!: number;
}
