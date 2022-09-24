import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_remove_item_new', timestamps: false })
export class TRemoveItemNew extends Model {
  @Column({ allowNull: true, type: DataType.BIGINT })
  item_id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  new_spu_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  remove_status?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  create_time?: Date;
}
