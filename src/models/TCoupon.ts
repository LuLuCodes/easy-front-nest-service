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
  tableName: 't_coupon',
  timestamps: false,
  comment: '\u4F18\u60E0\u5238\u8868',
})
export class TCoupon extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u4F18\u60E0\u5238\u4E3B\u952E',
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
    type: DataType.STRING(63),
    comment: '\u4F18\u60E0\u5238\u540D\u79F0',
  })
  @Index({
    name: 'idx_coupon_name',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  coupon_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(127),
    comment:
      '\u4F18\u60E0\u5238\u4ECB\u7ECD\uFF0C\u901A\u5E38\u662F\u663E\u793A\u4F18\u60E0\u5238\u4F7F\u7528\u9650\u5236\u6587\u5B57',
  })
  coupon_desc?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u4F7F\u7528\u5E73\u53F0\uFF1A0->\u5168\u90E8\uFF1B1->\u79FB\u52A8\uFF1B2->PC',
  })
  platform?: number;

  @Column({
    allowNull: true,
    type: DataType.JSON,
    comment:
      '\u6295\u653E\u6E20\u9053(JSON [{"id":1\uFF080\u4EE3\u8868\u5168\u7F51\u6295\u653E\uFF09,"name":"\u6E20\u90531"}])',
  })
  no_sale_channel_json?: object;

  @Column({
    allowNull: true,
    type: DataType.STRING(63),
    comment:
      '\u4F18\u60E0\u5238\u6807\u7B7E\uFF0C\u4F8B\u5982\u65B0\u4EBA\u4E13\u7528',
  })
  tag?: string;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment:
      '\u4F18\u60E0\u5238\u8D60\u9001\u7C7B\u578B\uFF0C0->\u5168\u573A\u8D60\u5238\uFF1B1->\u4F1A\u5458\u8D60\u5238\uFF1B2->\u8D2D\u7269\u8D60\u5238\uFF1B3->\u6CE8\u518C\u8D60\u5238',
    defaultValue: '0',
  })
  @Index({ name: 'idx_type', using: 'BTREE', order: 'ASC', unique: false })
  type?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4F18\u60E0\u5238\u603B\u6570\u91CF\uFF0C\u5982\u679C\u662F0\uFF0C\u5219\u662F\u65E0\u9650\u91CF',
    defaultValue: '0',
  })
  count?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u4F18\u60E0\u91D1\u989D',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6BCF\u4EBA\u9650\u9886\u5F20\u6570',
    defaultValue: '1',
  })
  per_limit?: number;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment:
      '\u4F7F\u7528\u95E8\u69DB(\u6700\u5C11\u6D88\u8D39\u91D1\u989D\u624D\u80FD\u4F7F\u7528\u4F18\u60E0\u5238)\uFF1B0\u8868\u793A\u65E0\u95E8\u69DB',
    defaultValue: '0.00',
  })
  min_point?: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment:
      '\u4F7F\u7528\u7C7B\u578B\uFF1A0->\u5168\u573A\u901A\u7528\uFF1B1->\u6307\u5B9A\u5206\u7C7B\uFF1B2->\u6307\u5B9A\u5546\u54C1',
    defaultValue: '0',
  })
  @Index({ name: 'idx_use_type', using: 'BTREE', order: 'ASC', unique: false })
  use_type?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u53D1\u884C\u6570\u91CF, 0->\u65E0\u9650\u91CF',
    defaultValue: '0',
  })
  publish_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5DF2\u4F7F\u7528\u6570\u91CF',
    defaultValue: '0',
  })
  use_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u9886\u53D6\u6570\u91CF',
    defaultValue: '0',
  })
  receive_count?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64),
    comment: '\u4F18\u60E0\u7801',
  })
  code?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(1200),
    comment:
      '\u53EF\u9886\u53D6\u7684\u4F1A\u5458\u7C7B\u578B\u4E3B\u952E\uFF08\u7528\u9017\u53F7\u9694\u5F00\uFF09\uFF1A\u7A7A->\u65E0\u9650\u5236',
  })
  customer_level?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u4EE5\u9886\u53D6\u5F00\u59CB\u65F6\u95F4',
  })
  pick_start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u53EF\u4EE5\u9886\u53D6\u7ED3\u675F\u65F6\u95F4',
  })
  pick_end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment:
      '\u6709\u6548\u65F6\u95F4\u9650\u5236\uFF0C\u5982\u679C\u662F0\uFF0C\u5219\u57FA\u4E8E\u9886\u53D6\u65F6\u95F4\u7684\u6709\u6548\u5929\u6570days\uFF1B\u5982\u679C\u662F1\uFF0C\u5219use_start_time\u548Cuse_end_time\u662F\u4F18\u60E0\u5238\u6709\u6548\u671F\uFF1B',
    defaultValue: '0',
  })
  use_time_type?: number;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
    comment:
      '\u57FA\u4E8E\u9886\u53D6\u65F6\u95F4\u7684\u6709\u6548\u5929\u6570days\u3002',
    defaultValue: '0',
  })
  days?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4F18\u60E0\u5238\u53EF\u4F7F\u7528\u5F00\u59CB\u65F6\u95F4',
  })
  use_start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4F18\u60E0\u5238\u53EF\u4F7F\u7528\u7ED3\u675F\u65F6\u95F4',
  })
  use_end_time?: Date;

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

  @Column({ type: DataType.TINYINT, comment: '\u521B\u5EFA\u4EBA' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '\u4FEE\u6539\u4EBA' })
  modifier_id!: number;
}
