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
  tableName: 't_swiper',
  timestamps: false,
  comment: '\u8F6E\u64AD\u56FE\u8868',
})
export class TSwiper extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u8F6E\u64AD\u56FE\u4E3B\u952E',
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
    type: DataType.STRING(64),
    comment: '\u8F6E\u64AD\u56FE\u540D\u5B57',
  })
  @Index({
    name: 'idx_swiper_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  swiper_name!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u96C6\u5408\u9875\u8F6E\u64AD\u56FE',
    defaultValue: '0',
  })
  is_active?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\b\b\u5F39\u5C4F',
    defaultValue: '0',
  })
  is_popup?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\b\b\u5F39\u5C4FJSON',
  })
  popup_json?: string;

  @Column({
    type: DataType.STRING(255),
    comment: '\u8F6E\u64AD\u56FE\u56FE\u7247url',
  })
  url!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: 'banner\u56FE\u7247',
  })
  banner?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u94FE\u63A5\u7C7B\u578B 1:\u5C0F\u7A0B\u5E8F\u94FE\u63A5 2:\u7AD9\u5185\u94FE\u63A53:\u56FE\u7247 4:\u96C6\u5408\u9875',
  })
  link_type?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8F6E\u64AD\u56FE\u8DF3\u8F6C\u94FE\u63A5\u5730\u5740',
  })
  link?: string;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment:
      '\u9500\u552E\u6E20\u9053(JSON [{"id":1\uFF080\u4EE3\u8868\u5168\u7F51\uFF09,"name":"\u6E20\u90531","colour":"\u989C\u8272","background":"\u80CC\u666F"}])',
  })
  sale_channel_ids?: object;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    comment:
      '\u8F6E\u64AD\u56FE\u4F4D\u7F6E: home\u9996\u9875 goods-list\u5546\u54C1\u5217\u8868\u9875',
  })
  @Index({
    name: 'idx_position_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  position?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8F6E\u64AD\u56FE\u5C55\u793A\u5F00\u59CB\u65F6\u95F4',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8F6E\u64AD\u56FE\u5C55\u793A\u7ED3\u675F\u65F6\u95F4',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6392\u5E8F',
    defaultValue: '0',
  })
  @Index({
    name: 'idx_position_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  @Index({
    name: 'idx_swiper_name_sort',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  sort?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u5907\u6CE8',
  })
  remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: 'json\u5907\u6CE8',
  })
  josn_remark?: string;

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
