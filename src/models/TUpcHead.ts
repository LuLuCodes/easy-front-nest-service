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
  tableName: 't_upc_head',
  timestamps: false,
  comment: 'upc\u8868\u5934',
})
export class TUpcHead extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u4F01\u4E1A\u7F16\u7801' })
  @Index({ name: 'idx_seller_id', using: 'BTREE', order: 'ASC', unique: false })
  seller_id!: number;

  @Column({ type: DataType.STRING(50), comment: '\u540D\u79F0' })
  upc_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: 'upc\u8868\u7C7B\u578B\uFF081\u9ED8\u8BA4upc\uFF09',
    defaultValue: '0',
  })
  upc_type?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u9ED8\u8BA4',
    defaultValue: '0',
  })
  is_default?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u603B\u6570\u91CF',
    defaultValue: '0',
  })
  all_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u5DF2\u7528\u6570\u91CF',
    defaultValue: '0',
  })
  use_count?: number;

  @Column({
    type: DataType.STRING(50),
    comment: '\u521B\u5EFA\u4EBA\u59D3\u540D',
  })
  username!: string;

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
