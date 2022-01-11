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
  comment: '\u8FD0\u8D39\u6A21\u7248\u8868',
})
export class TFeightTemplate extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '\u8FD0\u8D39\u6A21\u677F\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({
    type: DataType.STRING(64),
    comment: '\u8FD0\u8D39\u6A21\u677F\u540D\u79F0',
  })
  feight_template_name!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u8BA1\u8D39\u7C7B\u578B:0->\u6309\u91CD\u91CF\uFF1B1->\u6309\u4EF6\u6570',
    defaultValue: '0',
  })
  charge_type?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u9996\u91CDkg',
    defaultValue: '0.00',
  })
  first_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u9996\u8D39\uFF08\u5143\uFF09',
    defaultValue: '0.00',
  })
  first_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u7EED\u91CDkg',
  })
  continue_weight?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u7EED\u8D39\uFF08\u5143\uFF09',
  })
  continue_fee?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u76EE\u7684\u5730\uFF08\u7701\u3001\u5E02\uFF09',
  })
  dest_pcd_code?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
