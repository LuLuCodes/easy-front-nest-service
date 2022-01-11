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
  tableName: 't_customer_favorite',
  timestamps: false,
  comment: '\u7528\u6237\u6536\u85CF\u8868',
})
export class TCustomerFavorite extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7528\u6237\u6536\u85CF\u4E3B\u952E(\u81EA\u589E)',
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

  @Column({ type: DataType.BIGINT, comment: '\u7528\u6237id' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6536\u85CF\u7C7B\u578B\uFF0C0\u5546\u54C1\uFF0C1\u54C1\u724C\uFF0C2\u4EBA',
  })
  @Index({ name: 'idx_target_id', using: 'BTREE', order: 'ASC', unique: false })
  target_type!: number;

  @Column({
    type: DataType.BIGINT,
    comment:
      '\u5982\u679Ctarget_type=0\uFF0C\u5219\u662F\u5546\u54C1ID\uFF0C\u5982\u679Ctarget_type=1\uFF0C\u5219\u662F\u54C1\u724CID',
  })
  @Index({ name: 'idx_target_id', using: 'BTREE', order: 'ASC', unique: false })
  target_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(2000),
    comment: '\u4E00\u4E9B\u9644\u52A0\u4FE1\u606F',
  })
  extra?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5E73\u53F0\u7AEF\u662F\u5426\u5220\u9664\uFF08\u4EC5\u7528\u4E8E\u6807\u8BB0\u65E5\u5FD7\u8BB0\u5F55\uFF09',
    defaultValue: '0',
  })
  if_super_del?: number;

  @Column({ type: DataType.DATE, comment: '\u521B\u5EFA\u65F6\u95F4' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u66F4\u65B0\u65F6\u95F4' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u903B\u8F91\u5220\u9664 1:\u5DF2\u5220\u9664',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
