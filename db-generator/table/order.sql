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
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单设置主键',
  `flash_order_overtime` int(11) DEFAULT NULL COMMENT '秒杀订单超时关闭时间(分)',
  `normal_order_overtime` int(11) DEFAULT NULL COMMENT '正常订单超时时间(分)',
  `confirm_overtime` int(11) DEFAULT NULL COMMENT '发货后自动确认收货时间（天）',
  `finish_overtime` int(11) DEFAULT NULL COMMENT '自动完成交易时间，不能申请售后（天）',
  `comment_overtime` int(11) DEFAULT NULL COMMENT '订单完成后自动好评时间（天）',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单设置表';

-- ----------------------------
-- Table structure for t_cart_item
-- ----------------------------
DROP TABLE IF EXISTS `t_cart_item`;
CREATE TABLE `t_cart_item` (
  `id` bigint(20) NOT NULL COMMENT '购物车条目主键',
  `account_code` varchar(36) NOT NULL COMMENT '账户code',
  `customer_cdoe` varchar(36) NOT NULL COMMENT '用户code',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `product_sn` varchar(64) DEFAULT '' COMMENT '货号',
  `sku_id` bigint(20) NOT NULL COMMENT '商品SKU主键',
  `sku_code` varchar(64) DEFAULT '' COMMENT 'sku编码',
  `product_pic` varchar(255) DEFAULT NULL COMMENT '商品主图, 可以是spu主图，或者sku主图',
  `product_name` varchar(128) DEFAULT NULL COMMENT '商品名称',
  `quantity` int(11) DEFAULT NULL COMMENT '购买数量',
  `price` decimal(10,2) DEFAULT NULL COMMENT '添加到购物车的价格',
  `product_attr` varchar(1000) DEFAULT NULL COMMENT '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_cdoe` (`customer_cdoe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表';

-- ----------------------------
-- Table structure for t_order_item
-- ----------------------------
DROP TABLE IF EXISTS `t_order_item`;
CREATE TABLE `t_order_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL COMMENT '订单编号',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `product_sn` varchar(64) DEFAULT '' COMMENT '货号',
  `sku_id` bigint(20) NOT NULL COMMENT '商品SKU主键',
  `sku_code` varchar(64) DEFAULT '' COMMENT 'sku编码',
  `product_pic` varchar(255) DEFAULT NULL COMMENT '商品主图, 可以是spu主图，或者sku主图',
  `product_name` varchar(128) DEFAULT NULL COMMENT '商品名称',
  `price` decimal(10,2) DEFAULT NULL COMMENT '下单时的价格',
  `quantity` int(11) DEFAULT NULL COMMENT '购买数量',
  `promotion_name` varchar(200) DEFAULT NULL COMMENT '商品促销名称',
  `promotion_amount` decimal(10,2) DEFAULT NULL COMMENT '商品促销分解金额',
  `coupon_amount` decimal(10,2) DEFAULT NULL COMMENT '优惠券优惠分解金额',
  `integration_amount` decimal(10,2) DEFAULT NULL COMMENT '积分优惠分解金额',
  `real_amount` decimal(10,2) DEFAULT NULL COMMENT '该商品经过优惠后的分解金额',
  `gift_integration` int(11) DEFAULT '0' COMMENT '赠送的积分',
  `gift_growth` int(11) DEFAULT '0' COMMENT '赠送的成长值',
  `product_attr` varchar(1000) DEFAULT NULL COMMENT '商品销售属性:[{"key":"颜色","value":"颜色"},{"key":"容量","value":"4G"}]',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_sku_id` (`sku_id`),
  KEY `idx_sku_code` (`sku_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单中所包含的商品';

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `id` bigint(20) NOT NULL COMMENT '订单主键',
  `account_code` varchar(36) NOT NULL COMMENT '账户code',
  `customer_cdoe` varchar(36) NOT NULL COMMENT '用户code',
  `coupon_id` bigint(20) DEFAULT NULL COMMENT '优惠券主键',
  `order_sn` varchar(64) DEFAULT NULL COMMENT '订单编号',
  `total_amount` decimal(10,2) DEFAULT NULL COMMENT '订单总金额',
  `pay_amount` decimal(10,2) DEFAULT NULL COMMENT '应付金额（实际支付金额）',
  `freight_amount` decimal(10,2) DEFAULT NULL COMMENT '运费金额',
  `promotion_amount` decimal(10,2) DEFAULT NULL COMMENT '促销优化金额（促销价、满减、阶梯价）',
  `integration_amount` decimal(10,2) DEFAULT NULL COMMENT '积分抵扣金额',
  `coupon_amount` decimal(10,2) DEFAULT NULL COMMENT '优惠券抵扣金额',
  `discount_amount` decimal(10,2) DEFAULT NULL COMMENT '管理员后台调整订单使用的折扣金额',
  `pay_type` tinyint(1) DEFAULT NULL COMMENT '支付方式：0->未支付；1->支付宝；2->微信',
  `source_type` tinyint(1) DEFAULT NULL COMMENT '订单来源：0->PC订单；1->app订单',
  `order_status` tinyint(1) DEFAULT NULL COMMENT '订单状态：0->待付款；1->待发货；2->部分发货；3->已发货；4->已完成；5->已关闭；6->无效订单',
  `order_type` tinyint(1) DEFAULT NULL COMMENT '订单类型：0->正常订单；1->秒杀订单',
  `delivery_company` varchar(64) DEFAULT NULL COMMENT '物流公司(配送方式)',
  `delivery_sn` varchar(64) DEFAULT NULL COMMENT '物流单号',
  `auto_confirm_day` int(11) DEFAULT NULL COMMENT '自动确认时间（天）',
  `integration` int(11) DEFAULT NULL COMMENT '可以获得的积分',
  `growth` int(11) DEFAULT NULL COMMENT '可以获得的成长值',
  `promotion_info` varchar(100) DEFAULT NULL COMMENT '活动信息',
  `bill_type` int(1) DEFAULT NULL COMMENT '发票类型：0->不开发票；1->电子发票；2->纸质发票',
  `bill_header` varchar(200) DEFAULT NULL COMMENT '发票抬头',
  `bill_content` varchar(200) DEFAULT NULL COMMENT '发票内容',
  `bill_receiver_phone` varchar(32) DEFAULT NULL COMMENT '收票人电话',
  `bill_receiver_email` varchar(64) DEFAULT NULL COMMENT '收票人邮箱',
  `receiver_name` varchar(100) NOT NULL COMMENT '收货人姓名',
  `receiver_phone` varchar(32) NOT NULL COMMENT '收货人电话',
  `receiver_post_code` varchar(32) DEFAULT NULL COMMENT '收货人邮编',
  `receiver_province` varchar(32) DEFAULT NULL COMMENT '省份/直辖市',
  `receiver_city` varchar(32) DEFAULT NULL COMMENT '城市',
  `receiver_region` varchar(32) DEFAULT NULL COMMENT '区',
  `receiver_detail_address` varchar(200) DEFAULT NULL COMMENT '详细地址',
  `note` varchar(500) DEFAULT NULL COMMENT '订单备注',
  `confirm_status` tinyint(1) DEFAULT NULL COMMENT '确认收货状态：0->未确认；1->已确认',
  `use_integration` int(11) DEFAULT NULL COMMENT '下单时使用的积分',
  `payment_time` datetime DEFAULT NULL COMMENT '支付时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '发货时间',
  `receive_time` datetime DEFAULT NULL COMMENT '确认收货时间',
  `comment_time` datetime DEFAULT NULL COMMENT '评价时间',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_cdoe` (`customer_cdoe`),
  KEY `idx_coupon_id` (`coupon_id`),
  KEY `idx_order_sn` (`order_sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- ----------------------------
-- Table structure for t_order_operate_history
-- ----------------------------
DROP TABLE IF EXISTS `t_order_operate_history`;
CREATE TABLE `t_order_operate_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '记录主键',
  `order_id` bigint(20) NOT NULL COMMENT '订单id',
  `old_order` text COMMENT '原始订单json',
  `order` text COMMENT '最新订单json',
  `note` varchar(500) DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单操作历史记录';

-- ----------------------------
-- Table structure for t_order_return_reason
-- ----------------------------
DROP TABLE IF EXISTS `t_order_return_reason`;
CREATE TABLE `t_order_return_reason` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '退货原因主键',
  `reason_name` varchar(100) NOT NULL COMMENT '退货类型',
  `sort` int(11) NOT NULL COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='退货原因表';

-- ----------------------------
-- Table structure for t_order_return_apply
-- ----------------------------
DROP TABLE IF EXISTS `t_order_return_apply`;
CREATE TABLE `t_order_return_apply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL COMMENT '订单id',
  `customer_address_id` bigint(20) NOT NULL COMMENT '收货地址表主键',
  `product_id` bigint(20) NOT NULL COMMENT '退货商品主键',
  `order_sn` varchar(64) DEFAULT NULL COMMENT '订单编号',
  `return_amount` decimal(10,2) DEFAULT NULL COMMENT '退款金额',
  `return_name` varchar(100) DEFAULT NULL COMMENT '退货人姓名',
  `return_phone` varchar(100) DEFAULT NULL COMMENT '退货人电话',
  `return_status` tinyint(1) DEFAULT NULL COMMENT '申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝',
  `product_pic` varchar(500) DEFAULT NULL COMMENT '商品图片',
  `product_name` varchar(200) DEFAULT NULL COMMENT '商品名称',
  `product_attr` varchar(1000) DEFAULT NULL COMMENT '商品销售属性',
  `product_count` int(11) DEFAULT NULL COMMENT '退货数量',
  `product_price` decimal(10,2) DEFAULT NULL COMMENT '商品单价',
  `product_real_price` decimal(10,2) DEFAULT NULL COMMENT '商品实际支付单价',
  `reason` varchar(200) DEFAULT NULL COMMENT '原因',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `proof_pics` varchar(1000) DEFAULT NULL COMMENT '凭证图片，以逗号隔开',
  `handle_note` varchar(500) DEFAULT NULL COMMENT '处理备注',
  `handle_man` varchar(100) DEFAULT NULL COMMENT '处理人员',
  `receive_man` varchar(100) DEFAULT NULL COMMENT '收货人',
  `receive_time` datetime DEFAULT NULL COMMENT '收货时间',
  `receive_note` varchar(500) DEFAULT NULL COMMENT '收货备注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_order_sn` (`order_sn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单退货申请';

SET FOREIGN_KEY_CHECKS = 1;
