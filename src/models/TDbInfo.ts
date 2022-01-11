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
  tableName: 't_db_info',
  timestamps: false,
  comment: '\u6570\u636E\u5E93\u7248\u672C\u53F7',
})
export class TDbInfo extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '\u4E3B\u952E',
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

  @Column({ type: DataType.INTEGER, comment: '\u7248\u672C' })
  version!: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u521B\u5EFA\u65F6\u95F4',
  })
  create_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u66F4\u65B0\u65F6\u95F4',
  })
  update_time?: Date;

  @Column({ type: DataType.BIGINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
