import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_db_info', timestamps: false, comment: '数据库版本号' })
export class TDbInfo extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: '主键',
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

  @Column({ type: DataType.INTEGER, comment: '版本' })
  version!: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '创建时间' })
  create_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE, comment: '更新时间' })
  update_time?: Date;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
