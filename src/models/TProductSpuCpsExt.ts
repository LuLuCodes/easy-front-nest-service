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
  tableName: 't_product_spu_cps_ext',
  timestamps: false,
  comment: '\u5546\u54C1\u4E09\u65B9\u62D3\u5C55\u63CF\u8FF0\u8868',
})
export class TProductSpuCpsExt extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '\u7CFB\u7EDF\u4E3B\u952E',
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

  @Column({ type: DataType.BIGINT, comment: '\u6B3E\u7F16\u7801' })
  @Index({
    name: 'idx_product_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  product_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5F53\u524D\u6743\u91CD\uFF08\u8D8A\u5927\u8D8A\u4F18\u5148\uFF09',
    defaultValue: '0',
  })
  sort?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u7981\u7528',
    defaultValue: '0',
  })
  disable?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '\u4E09\u65B9\u771F\u5B9E\u5546\u54C1\u540D\u79F0',
  })
  cps_spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '\u4E09\u65B9\u771F\u5B9E\u5546\u54C1\u62D3\u5C55\u540D',
  })
  cps_spu_name_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u8BA4\u9886\u53BB\u5411\u7AD9\u70B9\u5730\u5740',
  })
  to_cps_url?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment:
      '\u5C5E\u6027\u522B\u540Djson[{"pid":"123","key":"\u989C\u8272\u5206\u7C7B\u201D,\u201Dvalues":[{"vid":"456"."display":"\u6CB9\u4EAE\u70AB\u9ED1\u8272","real":"\u9ED1\u8272"}]}]',
  })
  properties?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u5DE1\u68C0\uFF1A\u5546\u54C1\u53D8\u5316(1\u9AD8\u4EAE)',
    defaultValue: '0',
  })
  isc_spu?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5DE1\u68C0\uFF1A\u5546\u54C1\u62D3\u5C55\u540D\u53D8\u5316(1\u9AD8\u4EAE)',
    defaultValue: '0',
  })
  isc_spu_ext?: number;

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
