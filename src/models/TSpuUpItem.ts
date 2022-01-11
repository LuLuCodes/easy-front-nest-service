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
  tableName: 't_spu_up_item',
  timestamps: false,
  comment: '\u5546\u54C1\u4E0A\u4F20\u4EFB\u52A1\u4E3B\u8868',
})
export class TSpuUpItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
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

  @Column({ type: DataType.BIGINT, comment: '\u5E97\u94FAid' })
  shop_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E0A\u4F20\u9009\u54C1\uFF081\u540E\u53F0\u4EBA\u5DE5\u9009\u53D6\uFF0C2\u667A\u80FD\u81EA\u52A8\u9009\u53D6\uFF09',
    defaultValue: '1',
  })
  up_type?: number;

  @Column({ type: DataType.BIGINT, comment: '\u4EFB\u52A1\u4E3B\u952E' })
  @Index({ name: 'idx_head_id', using: 'BTREE', order: 'ASC', unique: false })
  head_id!: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E0A\u4F20\u72B6\u6001\uFF080\u5F85\u4E0A\u4F20 1\u4E0A\u4F20\u4E2D 2\u4E0A\u4F20\u6210\u529F 11\u4E0A\u4F20\u5931\u8D25\uFF09',
    defaultValue: '0',
  })
  up_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u4E0A\u4F20\u5907\u6CE8',
  })
  up_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u540C\u6B65\u89C4\u683Chtml',
  })
  up_schema?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u540C\u6B65\u5546\u54C1html',
  })
  up_spu?: string;

  @Column({
    type: DataType.BIGINT,
    comment: 'url\u91C7\u96C6\u7684\u6B3E\u4FE1\u606F',
  })
  spu_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(128),
    comment: '\u5546\u54C1\u540D\u79F0',
  })
  spu_name?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u4E0A\u6E38\u5546\u54C1\u7C7B\u76EE\u4E3B\u952E',
  })
  spu_category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u4E0A\u4F20\u6210\u529F\u540E\u7684\u6B3E\u4FE1\u606F',
  })
  @Index({
    name: 'idx_new_spu_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  new_spu_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(50),
    comment: '\u4E09\u65B9\u5546\u54C1\u7F16\u7801',
  })
  @Index({
    name: 'id_new_product_sn',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  new_product_sn?: string;

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(10, 2),
    comment: '\u65B0\u5546\u54C1\u4EF7\u683C',
  })
  new_spu_sale_price?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u65B0\u5546\u54C1\u521B\u5EFA\u65F6\u95F4',
  })
  new_spu_create_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u4E09\u65B9\u5546\u54C1\u9500\u91CF',
    defaultValue: '0',
  })
  new_spu_sale?: number;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u6709\u9500\u91CF\u7684\u5546\u54C1\u5904\u7406\u72B6\u6001\uFF080\u5F85\u5904\u7406 1\u5DF2\u5904\u7406\uFF09',
    defaultValue: '0',
  })
  new_spu_sale_deal?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u6709\u9500\u91CF\u7684\u5546\u54C1\u5904\u7406\u4EBA',
  })
  new_spu_sale_deal_use_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6709\u9500\u91CF\u7684\u5546\u54C1\u5904\u7406\u65F6\u95F4',
  })
  new_spu_sale_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E09\u65B9\u5546\u54C1\u9500\u552E\u72B6\u6001',
  })
  new_spu_cps_onsale?: string;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u5BA1\u6838\u72B6\u6001(0\u5F85\u5BA1\u6838 1\u5BA1\u6838\u4E2D 10\u5BA1\u6838\u901A\u8FC7 11\u5BA1\u6838\u62D2\u7EDD  12\u6302\u8D77)',
    defaultValue: '0',
  })
  audit_status?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5BA1\u6838\u4EBA',
  })
  audit_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5BA1\u6838\u65F6\u95F4',
  })
  audit_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u4E0A\u4E0B\u67B6\u72B6\u6001(0\u5F85\u4E0A\u67B6 1\u4E0A\u67B6 2\u4E0B\u67B6)',
    defaultValue: '0',
  })
  onsale_status?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E0B\u67B6\u5907\u6CE8',
  })
  onsale_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u4E0A\u4E0B\u67B6\u4EBA',
  })
  onsale_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u4E0A\u4E0B\u67B6\u4EBA',
  })
  onsale_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u4E0A\u4E0B\u67B6\u65F6\u95F4',
  })
  onsale_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u5DE1\u68C0\u8B66\u544A',
    defaultValue: '0',
  })
  isc_warning?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u5DE1\u68C0\u8B66\u544A',
  })
  isc_warning_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5DE1\u68C0\u8B66\u544A\u5F02\u5E38\u65F6\u95F4',
  })
  isc_warning_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6700\u540E\u8B66\u544A\u6E05\u9664\u4EBA',
  })
  isc_warning_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6700\u540E\u8B66\u544A\u6E05\u9664\u4EBA',
  })
  isc_warning_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6E05\u9664\u5DE1\u68C0\u8B66\u544A\u5F02\u5E38\u65F6\u95F4',
  })
  isc_warning_deal_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u6700\u540E\u5546\u54C1\u7F16\u8F91\u4EBA',
  })
  edit_user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6700\u540E\u5546\u54C1\u7F16\u8F91\u4EBA',
  })
  edit_user?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u5546\u54C1\u7F16\u8F91\u65F6\u95F4',
  })
  edit_user_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u56FE\u7247\u662F\u5426\u5BA1\u6838(0\u5F85\u5DE1\u67E5 1\u6B63\u5E38 2\u5F02\u5E38)',
    defaultValue: '0',
  })
  if_img_check?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5F02\u5E38\u56FE\u7247\u5BA1\u6838\u4EBA',
  })
  audit_img_check_username?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u5F02\u5E38\u56FE\u7247\u5BA1\u6838\u65F6\u95F4',
  })
  audit_img_check_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(500),
    comment: '\u56FE\u7247\u5BA1\u6838\u5907\u6CE8',
  })
  img_check_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u56FE\u7247\u5BA1\u6838\u65F6\u95F4',
  })
  img_check_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment:
      '\u662F\u5426\u8BBE\u7F6E\u516C\u76CA\uFF080\u672A\u8BBE\u7F6E 1\u5DF2\u8BBE\u7F6E\uFF09',
    defaultValue: '0',
  })
  is_gonyi?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8BBE\u7F6E\u516C\u76CA\u65F6\u95F4',
  })
  is_gonyi_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u8BBE\u7F6E\u76F4\u901A\u8F66',
    defaultValue: '0',
  })
  is_car?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u8BBE\u7F6E\u76F4\u901A\u8F66\u65F6\u95F4',
  })
  is_car_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E0B\u67B6\u76F4\u901A\u8F66\u65F6\u95F4',
  })
  off_car_time?: Date;

  @Column({
    type: DataType.INTEGER,
    comment: '\u662F\u5426\u6C38\u4E45\u5173\u95ED\u76F4\u901A\u8F66',
    defaultValue: '0',
  })
  close_car?: number;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u81EA\u5B9A\u4E49\u7C7B\u522B\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({
    name: 'idx_category_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  category_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment:
      '\u81EA\u5B9A\u4E49\u7C7B\u522B\u4E09\u65B9\u6DD8\u5B9D\u7F16\u7801',
  })
  category_cps_cid?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u5DE1\u68C0\u65F6\u95F4',
  })
  last_inspect?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u6700\u540E\u5DE1\u68C0UUID',
  })
  @Index({
    name: 'idx_last_inspect_uuid',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  last_inspect_uuid?: string;

  @Column({
    type: DataType.INTEGER,
    comment: '\u6700\u540E\u4E00\u6B21\u5DE1\u68C0\u662F\u5426\u5931\u8D25',
    defaultValue: '0',
  })
  if_last_inspect_fail?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(200),
    comment: '\u6700\u540E\u4E00\u6B21\u5DE1\u68C0\u5931\u8D25\u7406\u7531',
  })
  last_inspect_fail_remark?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E00\u6B21\u5DE1\u68C0\u5931\u8D25\u65F6\u95F4',
  })
  last_inspect_fail_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E00\u6B21\u6709\u6D41\u91CF\u65F6\u95F4',
  })
  last_flow_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u8BBF\u5BA2\u6570',
  })
  visitor_count?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '\u652F\u4ED8\u4E70\u5BB6\u6570',
  })
  payuser_count?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    comment: '\u6700\u540E\u4E0B\u53D1\u5DE1\u68C0\u6A21\u7248\u65F6\u95F4',
  })
  last_freight_time?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5546\u54C1\u8FD0\u8D39\u6A21\u677F',
  })
  tb_freight_template?: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    comment: '\u4E0D\u53D1\u8D27\u533A\u57DF',
  })
  no_translate_areas?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment: '\u5546\u54C1\u8FD0\u8D39\u6A21\u677F\u7CFB\u7EDF\u7F16\u7801',
  })
  @Index({
    name: 'idx_tb_freight_template_id',
    using: 'BTREE',
    order: 'ASC',
    unique: false,
  })
  tb_freight_template_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(100),
    comment: '\u5546\u54C1\u4E0D\u53D1\u8D27\u533A\u57DF\u6A21\u677F',
  })
  tb_translate_template?: string;

  @Column({
    allowNull: true,
    type: DataType.BIGINT,
    comment:
      '\u5546\u54C1\u4E0D\u53D1\u8D27\u533A\u57DF\u6A21\u677F\u7CFB\u7EDF\u7F16\u7801',
  })
  tb_translate_template_id?: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment:
      '\u5546\u54C1\u4E0D\u53D1\u8D27\u533A\u57DF\u6A21\u677F\u662F\u5426\u540C\u6B65',
  })
  tb_translate_template_is_sync?: number;

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
