/*
 Navicat Premium Data Transfer

 Source Server         : easy-front电商数据库
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 118.31.122.205:3306
 Source Schema         : easy_front_mall_db

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 01/07/2020 14:51:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_order_setting
-- ----------------------------
DROP TABLE IF EXISTS `t_order_setting`;
CREATE TABLE `t_order_setting` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '订单设置主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `flash_order_overtime` int NOT NULL DEFAULT '0' COMMENT '秒杀订单超时关闭时间(分)',
  `normal_order_overtime` int NOT NULL DEFAULT '0' COMMENT '正常订单超时时间(分)',
  `confirm_overtime` int NOT NULL DEFAULT '0' COMMENT '发货后自动确认收货时间（天）',
  `finish_overtime` int NOT NULL DEFAULT '0' COMMENT '自动完成交易时间，不能申请售后（天）',
  `comment_overtime` int NOT NULL DEFAULT '0' COMMENT '订单完成后自动好评时间（天）',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单设置表';

-- ----------------------------
-- Table structure for t_cart_item
-- ----------------------------
DROP TABLE IF EXISTS `t_cart_item`;
CREATE TABLE `t_cart_item` (
  `id` bigint NOT NULL COMMENT '购物车条目主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `product_id` bigint NOT NULL DEFAULT '0' COMMENT '商品主键',
  `product_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货号',
  `sku_id` bigint NOT NULL DEFAULT '0' COMMENT '商品SKU主键',
  `sku_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'sku编码',
  `product_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品主图, 可以是spu主图，或者sku主图',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `quantity` int NOT NULL DEFAULT '0' COMMENT '购买数量',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '添加到购物车的价格',
  `product_attr` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_code` (`customer_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- ----------------------------
-- Table structure for t_order_item
-- ----------------------------
DROP TABLE IF EXISTS `t_order_item`;
CREATE TABLE `t_order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单编号',
  `product_id` bigint NOT NULL DEFAULT '0' COMMENT '商品主键',
  `product_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货号',
  `sku_id` bigint NOT NULL DEFAULT '0' COMMENT '商品SKU主键',
  `sku_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'sku编码',
  `product_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品主图, 可以是spu主图，或者sku主图',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '下单时的价格',
  `quantity` int NOT NULL DEFAULT '0' COMMENT '购买数量',
  `promotion_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品促销名称',
  `promotion_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品促销分解金额',
  `coupon_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '优惠券优惠分解金额',
  `integration_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '积分优惠分解金额',
  `real_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '该商品经过优惠后的分解金额',
  `gift_integration` int NOT NULL DEFAULT '0' COMMENT '赠送的积分',
  `gift_growth` int NOT NULL DEFAULT '0' COMMENT '赠送的成长值',
  `product_attr` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_sku_id` (`sku_id`),
  KEY `idx_sku_code` (`sku_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单中所包含的商品';

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `id` bigint NOT NULL COMMENT '订单主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `coupon_id` bigint NOT NULL DEFAULT '0' COMMENT '优惠券主键',
  `order_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单总金额',
  `pay_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '应付金额（实际支付金额）',
  `freight_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '运费金额',
  `promotion_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '促销优化金额（促销价、满减、阶梯价）',
  `integration_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '积分抵扣金额',
  `coupon_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '优惠券抵扣金额',
  `discount_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '管理员后台调整订单使用的折扣金额',
  `pay_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '支付方式：0->未支付；1->支付宝；2->微信',
  `source_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '订单来源：0->PC订单；1->app订单',
  `order_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '订单状态：0->待付款；1->待发货；2->部分发货；3->已发货；4->已完成；5->已关闭；6->无效订单',
  `cancel_status` tinyint NOT NULL DEFAULT '0' COMMENT '订单取消状态：0->未取消；1->已取消；',
  `order_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '订单类型：0->正常订单；1->秒杀订单',
  `delivery_company` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '物流公司(配送方式)',
  `delivery_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '物流单号',
  `auto_confirm_day` int NOT NULL DEFAULT '2' COMMENT '自动确认时间（天）',
  `integration` int NOT NULL DEFAULT '0' COMMENT '可以获得的积分',
  `growth` int NOT NULL DEFAULT '0' COMMENT '可以获得的成长值',
  `promotion_info` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '活动信息',
  `bill_type` int NOT NULL DEFAULT '0' COMMENT '发票类型：0->不开发票；1->电子发票；2->纸质发票',
  `bill_header` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '发票抬头',
  `bill_content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '发票内容',
  `bill_receiver_phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收票人电话',
  `bill_receiver_email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收票人邮箱',
  `receiver_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人姓名',
  `receiver_phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人电话',
  `receiver_post_code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人邮编',
  `receiver_province` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '省份/直辖市',
  `receiver_city` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '城市',
  `receiver_region` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '区',
  `receiver_detail_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '详细地址',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单备注',
  `confirm_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '确认收货状态：0->未确认；1->已确认',
  `use_integration` int NOT NULL DEFAULT '0' COMMENT '下单时使用的积分',
  `payment_time` datetime DEFAULT NULL COMMENT '支付时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '发货时间',
  `receive_time` datetime DEFAULT NULL COMMENT '确认收货时间',
  `comment_time` datetime DEFAULT NULL COMMENT '评价时间',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_code` (`customer_code`),
  KEY `idx_coupon_id` (`coupon_id`),
  KEY `idx_order_sn` (`order_sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- ----------------------------
-- Table structure for t_order_operate_history
-- ----------------------------
DROP TABLE IF EXISTS `t_order_operate_history`;
CREATE TABLE `t_order_operate_history` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '记录主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单id',
  `old_order` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '原始订单json',
  `order` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '最新订单json',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单操作历史记录';

-- ----------------------------
-- Table structure for t_order_return_reason
-- ----------------------------
DROP TABLE IF EXISTS `t_order_return_reason`;
CREATE TABLE `t_order_return_reason` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '退货原因主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `reason_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '退货类型',
  `sort_no` int NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='退货原因表';

-- ----------------------------
-- Table structure for t_order_return_apply
-- ----------------------------
DROP TABLE IF EXISTS `t_order_return_apply`;
CREATE TABLE `t_order_return_apply` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单id',
  `customer_address_id` bigint NOT NULL DEFAULT '0' COMMENT '收货地址表主键',
  `product_id` bigint NOT NULL DEFAULT '0' COMMENT '退货商品主键',
  `order_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `return_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '退款金额',
  `return_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '退货人姓名',
  `return_phone` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '退货人电话',
  `return_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝',
  `product_pic` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品图片',
  `product_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `product_attr` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品销售属性',
  `product_count` int NOT NULL DEFAULT '0' COMMENT '退货数量',
  `product_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品单价',
  `product_real_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品实际支付单价',
  `reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '原因',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '描述',
  `proof_pics` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '凭证图片，以逗号隔开',
  `handle_note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '处理备注',
  `handle_man` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '处理人员',
  `receive_man` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人',
  `receive_time` datetime DEFAULT NULL COMMENT '收货时间',
  `receive_note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货备注',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_order_sn` (`order_sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单退货申请';

-- ----------------------------
-- Table structure for t_order_pay_log
-- ----------------------------
DROP TABLE IF EXISTS `t_order_pay_log`;
CREATE TABLE `t_order_pay_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '系统编码',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单系统编码',
  `pay_type` tinyint NOT NULL DEFAULT '0' COMMENT '支付类型 （1->支付宝；2->微信；3->钱包余额）',
  `trade_no` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '第三方支付流水号（唯一、退款用，余额支付可存guid）',
  `pay_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '支付金额',
  `trade_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '三方流水账面金额',
  `pay_time` datetime NOT NULL COMMENT '第三方支付成功时间',
  `buyer_no` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注用户支付的账号，仅后期查账用（支付宝、微信账号，余额支付可存钱包id）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_order_id` (`order_id`),
  KEY `idx_trade_no` (`trade_no`)
) ENGINE=InnoDB AUTO_INCREMENT=464 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单支付记录表';

-- ----------------------------
-- Table structure for t_order_delivery
-- ----------------------------
DROP TABLE IF EXISTS `t_order_delivery`;
CREATE TABLE `t_order_delivery` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '发货单主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `delivery_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '系统发货单号',
  `feed_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '三方发货结果ID',
  `seller_id` bigint NOT NULL DEFAULT '0' COMMENT '发货单归属企业',
  `shop_id` bigint NOT NULL DEFAULT '0' COMMENT '发货单归属店铺',
  `pack_type` int NOT NULL DEFAULT '0' COMMENT '分包类型（0正常包裹）',
  `pack_attribute` int NOT NULL DEFAULT '0' COMMENT '包裹属性（0普通 1带电）',
  `inter_type` int NOT NULL DEFAULT '0' COMMENT '国际物流类型（1.第三方物流）',
  `inter_company_id` int NOT NULL DEFAULT '0' COMMENT '国际第三方物流（1云途物流）',
  `track_sn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '跟踪码',
  `pack_weight` int NOT NULL DEFAULT '0' COMMENT '重量（克）',
  `in_weight` int NOT NULL DEFAULT '0' COMMENT '入库重量（克）',
  `out_weight` int NOT NULL DEFAULT '0' COMMENT '出库重量（克）',
  `pack_long` int NOT NULL DEFAULT '0' COMMENT '长（cm）',
  `pack_wide` int NOT NULL DEFAULT '0' COMMENT '宽（cm）',
  `pack_high` int NOT NULL DEFAULT '0' COMMENT '高（cm）',
  `delivery_time` datetime DEFAULT NULL COMMENT '发货日期',
  `purchase_const` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '采购成本',
  `total_count` int NOT NULL DEFAULT '0' COMMENT '发货数量',
  `receiver_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人姓名',
  `receiver_country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人国家',
  `receiver_detail_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '详细地址',
  `receiver_detail_address2` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '详细地址2',
  `receiver_detail_address3` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '详细地址3',
  `receiver_phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人电话',
  `receiver_pcd_code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人邮编',
  `receiver_pcd_desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '收货人省份直辖市',
  `customs_sn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '海关编码',
  `added_tax` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '增值税号',
  `eu_tax` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '欧盟税号',
  `note` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注',
  `if_photo` int NOT NULL DEFAULT '0' COMMENT '是否拍照',
  `if_reinforce` int NOT NULL DEFAULT '0' COMMENT '是否加固',
  `if_paper` int NOT NULL DEFAULT '0' COMMENT '是否换纸盒子',
  `confirm_status` int NOT NULL DEFAULT '0' COMMENT '对账状态（0未对账 10已对账）',
  `confirm_time` datetime DEFAULT NULL COMMENT '对账时间',
  `confirm_user` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '对账人',
  `confirm_const` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '对账仓库费用',
  `pack_status` int NOT NULL DEFAULT '0' COMMENT '货单状态（0待入库 1已入库 10已出库）',
  `pack_status_intime` datetime DEFAULT NULL COMMENT '货单入库时间',
  `pack_status_inuser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货单入库人',
  `pack_status_outtime` datetime DEFAULT NULL COMMENT '货单出库时间',
  `pack_status_outuser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货单出库人',
  `inter_transport_code` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '国际物流运输方式',
  `inter_transport_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '国际物流运输方式',
  `inter_company_sn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '国际第三方物流快递单号',
  `inter_company_fee` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递预收运费',
  `inter_company_realfee` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算总运费',
  `inter_company_ini_realfee` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算总运费(初始)',
  `inter_company_realfee_time` datetime DEFAULT NULL COMMENT '国际第三方物流快递结算总运费时间',
  `inter_company_feestatus` int NOT NULL DEFAULT '0' COMMENT '国际第三方物流快递运费结算状态（0未结算 10已结算）',
  `inter_company_weight` int NOT NULL DEFAULT '0' COMMENT '国际第三方物流快递结算重量',
  `inter_company_freight` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算运费',
  `inter_company_gas` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算燃油费',
  `inter_company_gh` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算挂号费',
  `inter_company_deal` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算处理费',
  `inter_company_other` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '国际第三方物流快递结算其他费',
  `delivery_company_id` bigint NOT NULL DEFAULT '0' COMMENT '物流公司编码',
  `delivery_company_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '物流公司名称',
  `delivery_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '物流单号',
  `direct_order_status` tinyint NOT NULL DEFAULT '0' COMMENT '易递友换单状态 10成功，其他失败',
  `ori_delivery_sn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '易递友换单前原始物流单号',
  `ori_delivery_company_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '易递友换单前原始物流公司名称',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单编号',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_delivery_company_id` (`delivery_company_id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_delivery_code` (`delivery_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单发货单表';

-- ----------------------------
-- Table structure for t_order_delivery_item
-- ----------------------------
DROP TABLE IF EXISTS `t_order_delivery_item`;
CREATE TABLE `t_order_delivery_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '发货单明细主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `delivery_id` bigint NOT NULL DEFAULT '0' COMMENT '发货单主键',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单编号',
  `order_item_id` bigint NOT NULL DEFAULT '0' COMMENT '订单明细主键',
  `quantity` int NOT NULL DEFAULT '0' COMMENT '发货数量',
  `del_sku_weight` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '称重商品最终发货sku总重量（克）',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_delivery_id` (`delivery_id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_ order_item_id` (`order_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
