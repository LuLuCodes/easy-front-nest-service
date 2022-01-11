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
  tableName: 't_admin_menu_relation',
  timestamps: false,
  comment:
    '\u540E\u53F0\u7528\u6237\u548C\u6743\u9650\u5173\u7CFB\u8868(\u9664\u89D2\u8272\u4E2D\u5B9A\u4E49\u7684\u6743\u9650\u4EE5\u5916\u7684\u52A0\u51CF\u6743\u9650)',
})
export class TAdminMenuRelation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u5173\u7CFB\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: 'admin_id' })
  @Index({
    name: 'idx_admin_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  admin_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u6743\u9650\u4E3B\u952E' })
  menu_id!: number;

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
