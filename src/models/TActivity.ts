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
  tableName: 't_activity',
  timestamps: false,
  comment: '\u6D3B\u52A8\u8868',
})
export class TActivity extends Model {
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

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6D3B\u52A8\u6807\u9898',
  })
  act_title?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u6D3B\u52A8\u526F\u6807\u9898',
  })
  act_title_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u6D3B\u52A8\u56FE\u7247',
  })
  act_file?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u6D3B\u52A8\u62D3\u5C55\u56FE\u7247',
  })
  act_file_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u6D3B\u52A8\u8BE6\u60C5',
  })
  act_detail?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6D3B\u52A8\u5F00\u59CB\u65F6\u95F4',
  })
  start_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6D3B\u52A8\u5F00\u59CB\u65F6\u95F4',
  })
  end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u62A5\u540D\u622A\u6B62\u65F6\u95F4',
  })
  sign_up_end_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 2),
    comment: '\u7B7E\u5230\u8303\u56F4\uFF08\u7C73\uFF09',
  })
  sign_array?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u4E0A\u8BFE\u5730\u70B9',
  })
  act_address?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '\u7ECF\u5EA6',
  })
  longitude?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(18, 10),
    comment: '\u7EAC\u5EA6',
  })
  latitude?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6D3B\u52A8\u53EF\u62A5\u540D\u4EBA\u6570',
    defaultValue: '0',
  })
  limit_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6D3B\u52A8\u5DF2\u62A5\u540D\u4EBA\u6570',
    defaultValue: '0',
  })
  sign_up_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6D3B\u52A8\u5DF2\u7B7E\u5230\u4EBA\u6570',
    defaultValue: '0',
  })
  sign_in_count?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6D3B\u52A8\u72B6\u6001 0 \u5F85\u53D1\u5E03,1\u53D1\u5E03 2\u64A4\u4E0B',
    defaultValue: '0',
  })
  status?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6D3B\u52A8\u5173\u8054\u7684\u8BFE\u7A0B\u5546\u54C1',
  })
  spu_id?: number;

  @Column({
    type: DataType.DECIMAL(18, 2),
    comment: '\u573A\u5730\u8D39\u7528',
    defaultValue: '0.00',
  })
  field_fee?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6392\u5E8F',
    defaultValue: '0',
  })
  sort?: number;

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
