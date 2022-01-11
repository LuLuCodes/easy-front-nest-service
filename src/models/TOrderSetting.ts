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
  tableName: 't_order_setting',
  timestamps: false,
  comment: '\u8BA2\u5355\u8BBE\u7F6E\u8868',
})
export class TOrderSetting extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '\u8BA2\u5355\u8BBE\u7F6E\u4E3B\u952E',
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
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u79D2\u6740\u8BA2\u5355\u8D85\u65F6\u5173\u95ED\u65F6\u95F4(\u5206)',
  })
  flash_order_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6B63\u5E38\u8BA2\u5355\u8D85\u65F6\u65F6\u95F4(\u5206)',
  })
  normal_order_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u53D1\u8D27\u540E\u81EA\u52A8\u786E\u8BA4\u6536\u8D27\u65F6\u95F4\uFF08\u5929\uFF09',
  })
  confirm_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u81EA\u52A8\u5B8C\u6210\u4EA4\u6613\u65F6\u95F4\uFF0C\u4E0D\u80FD\u7533\u8BF7\u552E\u540E\uFF08\u5929\uFF09',
  })
  finish_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u8BA2\u5355\u5B8C\u6210\u540E\u81EA\u52A8\u597D\u8BC4\u65F6\u95F4\uFF08\u5929\uFF09',
  })
  comment_overtime?: number;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '0',
  })
  enabled?: number;

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
