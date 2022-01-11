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
  tableName: 't_flash_promotion',
  timestamps: false,
  comment: '\u9650\u65F6\u8D2D\u6D3B\u52A8\u8868',
})
export class TFlashPromotion extends Model {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    comment: '\u6D3B\u52A8\u4E3B\u952E',
  })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5E94\u7528id',
    defaultValue: '10000',
  })
  app_id?: number;

  @Column({ type: DataType.STRING(50), comment: '\u6D3B\u52A8\u540D\u79F0' })
  @Index({
    name: 'idx_flash_promotion_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  flash_promotion_name!: string;

  @Column({
    type: DataType.STRING(255),
    comment: '\u6D3B\u52A8\u4E3B\u56FEurl',
  })
  pic_url!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(255),
    comment: '\u6D3B\u52A8\u6807\u9898',
  })
  @Index({ name: 'idx_title', using: 'BTREE', order: 'ASC', unique: false })
  title?: string;

  @Column({ type: DataType.DATE, comment: '\u5F00\u59CB\u65F6\u95F4' })
  start_time!: Date;

  @Column({ type: DataType.DATE, comment: '\u7ED3\u675F\u65F6\u95F4' })
  end_time!: Date;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '\u662F\u5426\u542F\u7528 1:\u542F\u7528',
    defaultValue: '1',
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
