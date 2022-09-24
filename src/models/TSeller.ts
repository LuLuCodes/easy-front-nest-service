import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 't_seller', timestamps: false, comment: '企业表' })
export class TSeller extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '商品主键',
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

  @Column({ type: DataType.STRING(100), comment: '企业名称' })
  seller_name!: string;

  @Column({ type: DataType.STRING(100), comment: '企业简称' })
  seller_short_name!: string;

  @Column({ allowNull: true, type: DataType.STRING(36), comment: '账户code' })
  @Index({
    name: 'idx_account_code',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  account_code?: string;

  @Column({ type: DataType.STRING(100), comment: '企业法人' })
  seller_boss!: string;

  @Column({ type: DataType.STRING(100), comment: '法人联系方式' })
  seller_boss_tel!: string;

  @Column({ type: DataType.STRING(100), comment: '企业注册地址' })
  address!: string;

  @Column({ type: DataType.STRING(100), comment: '所属区域编码' })
  city_code!: string;

  @Column({ type: DataType.STRING(100), comment: '所属区域' })
  city!: string;

  @Column({ type: DataType.STRING(100), comment: '统一社会信用代码' })
  license!: string;

  @Column({ type: DataType.STRING(100), comment: '电子邮箱' })
  email!: string;

  @Column({ type: DataType.STRING(100), comment: '企业负责人' })
  seller_person!: string;

  @Column({ type: DataType.STRING(100), comment: '负责人联系方式' })
  seller_person_tel!: string;

  @Column({ type: DataType.STRING(100), comment: '企业介绍' })
  remark!: string;

  @Column({ type: DataType.STRING(5000), comment: '附件' })
  files!: string;

  @Column({ type: DataType.STRING(500), comment: '企业logo' })
  logo!: string;

  @Column({ type: DataType.STRING(500), comment: '营业执照' })
  license_file!: string;

  @Column({ type: DataType.STRING(500), comment: '开户许可证' })
  permit_file!: string;

  @Column({
    allowNull: true,
    type: DataType.TINYINT,
    comment: '是否启用 1:启用',
    defaultValue: '0',
  })
  enabled?: number;

  @Column({ type: DataType.DATE, comment: '创建时间' })
  create_time!: Date;

  @Column({ type: DataType.DATE, comment: '更新时间' })
  update_time!: Date;

  @Column({
    type: DataType.TINYINT,
    comment: '是否逻辑删除 1:已删除',
    defaultValue: '0',
  })
  deleted?: number;

  @Column({ type: DataType.BIGINT, comment: '创建人' })
  creator_id!: number;

  @Column({ type: DataType.BIGINT, comment: '修改人' })
  modifier_id!: number;
}
