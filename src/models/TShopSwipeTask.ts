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
  tableName: 't_shop_swipe_task',
  timestamps: false,
  comment: '\u5E97\u94FA\u5237\u5355-\u4EFB\u52A1\u8868',
})
export class TShopSwipeTask extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u7F16\u7801',
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FA\u4E3B\u952E' })
  @Index({ name: 'idx_shop_id', using: 'BTREE', order: 'ASC', unique: false })
  shop_id!: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5237\u624B\u4EE3\u7406',
  })
  lead_admin_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5237\u624B\u4EE3\u7406',
  })
  lead_username?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4EFB\u52A1\u65E5\u671F',
  })
  @Index({ name: 'idx_task_day', using: 'BTREE', order: 'ASC', unique: false })
  task_day?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u7C7B\u522B\u7F16\u7801JSON',
  })
  spu_category_json?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u521B\u5EFA\u4EBA\u59D3\u540D',
  })
  username?: string;

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
