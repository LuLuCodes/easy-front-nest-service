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
  tableName: 't_customer_withdrawal',
  timestamps: false,
  comment: '店铺角色提现表',
})
export class TCustomerWithdrawal extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    comment: '系统编码',
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

  @Column({ type: DataType.BIGINT, comment: '人员编码' })
  @Index({
    name: 'idx_customer_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  customer_id!: number;

  @Column({ type: DataType.DATE, comment: '提现时间' })
  draw_time!: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '提现类型(1代购提现 2代理商提现 3投资人提现)',
  })
  draw_type!: number;

  @Column({ allowNull: true, type: DataType.DATE, comment: '到账时间' })
  finish_time?: Date;

  @Column({ type: DataType.STRING(100), comment: '业务单据号' })
  @Index({ name: 'idx_draw_sn', using: 'BTREE', order: 'ASC', unique: false })
  draw_sn!: string;

  @Column({ type: DataType.STRING(100), comment: '支付宝单据号' })
  @Index({
    name: 'idx_ali_pay_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  ali_pay_sn!: string;

  @Column({ type: DataType.BIGINT, comment: '支付宝平台配置' })
  platform_config_id!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '提现金额',
    defaultValue: '0.00',
  })
  amount?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '到账金额',
    defaultValue: '0.00',
  })
  success_amount?: string;

  @Column({ type: DataType.STRING(100), comment: '支付宝账号' })
  draw_ali!: string;

  @Column({
    type: DataType.INTEGER,
    comment: '到账状态（0进行中 1到账 2到账失败）',
  })
  draw_status!: number;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '银行卡' })
  bank_card?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '银行名称' })
  bank_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '支行名称' })
  bank_name_ext?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '支付宝返回备注',
  })
  ali_remark?: string;

  @Column({ allowNull: true, type: DataType.STRING(50), comment: '提现人姓名' })
  real_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100), comment: '提现备注' })
  title?: string;

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
