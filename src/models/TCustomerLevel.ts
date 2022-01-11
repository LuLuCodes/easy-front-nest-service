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
  tableName: 't_customer_level',
  timestamps: false,
  comment: '\u7528\u6237\u7B49\u7EA7\u8868',
})
export class TCustomerLevel extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '\u7528\u6237\u7B49\u7EA7\u4E3B\u952E(\u81EA\u589E)',
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
    type: DataType.STRING(36),
    comment: '\u7528\u6237\u7B49\u7EA7\u540D\u79F0',
  })
  @Index({
    name: 'idx_customer_level_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_level_name!: string;

  @Column({
    type: DataType.STRING(45),
    comment: '\u7528\u6237\u7B49\u7EA7code',
  })
  customer_level_code!: string;

  @Column({
    type: DataType.STRING(4000),
    comment: '\u7528\u6237\u7B49\u7EA7\u63CF\u8FF0',
  })
  customer_level_desc!: string;

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
