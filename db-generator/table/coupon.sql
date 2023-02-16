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
-- Table structure for t_coupon
-- ----------------------------
DROP TABLE IF EXISTS `t_coupon`;
CREATE TABLE `t_coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '优惠券主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `coupon_name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '优惠券名称',
  `coupon_desc` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '优惠券介绍，通常是显示优惠券使用限制文字',
  `platform` tinyint(1) NOT NULL DEFAULT '0' COMMENT '使用平台：0->全部；1->移动；2->PC',
  `tag` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '优惠券标签，例如新人专用',
  `type` int NOT NULL DEFAULT '0' COMMENT '优惠券赠送类型，0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券',
  `count` int NOT NULL DEFAULT '0' COMMENT '优惠券总数量，如果是0，则是无限量',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '优惠金额',
  `per_limit` int NOT NULL DEFAULT '1' COMMENT '每人限领张数',
  `min_point` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '使用门槛(最少消费金额才能使用优惠券)；0表示无门槛',
  `use_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '使用类型：0->全场通用；1->指定分类；2->指定商品',
  `publish_count` int NOT NULL DEFAULT '0' COMMENT '发行数量, 0->无限量',
  `use_count` int NOT NULL DEFAULT '0' COMMENT '已使用数量',
  `receive_count` int NOT NULL DEFAULT '0' COMMENT '领取数量',
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '优惠码',
  `customer_level` varchar(1200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '可领取的会员类型主键（用逗号隔开）：空->无限制',
  `pick_start_time` datetime DEFAULT NULL COMMENT '可以领取开始时间',
  `pick_end_time` datetime DEFAULT NULL COMMENT '可以领取结束时间',
  `use_time_type` smallint NOT NULL DEFAULT '0' COMMENT '有效时间限制，如果是0，则基于领取时间的有效天数days；如果是1，则use_start_time和use_end_time是优惠券有效期；',
  `days` smallint NOT NULL DEFAULT '0' COMMENT '基于领取时间的有效天数days。',
  `use_start_time` datetime DEFAULT NULL COMMENT '优惠券可使用开始时间',
  `use_end_time` datetime DEFAULT NULL COMMENT '优惠券可使用结束时间',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_coupon_name` (`coupon_name`),
  KEY `idx_type` (`type`),
  KEY `idx_use_type` (`use_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券表';

-- ----------------------------
-- Table structure for t_customer_coupon_history
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_coupon_history`;
CREATE TABLE `t_customer_coupon_history` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户优惠券主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `customer_nick` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户昵称',
  `coupon_id` bigint NOT NULL DEFAULT '0' COMMENT '优惠券主键',
  `order_id` bigint NOT NULL DEFAULT '0' COMMENT '订单主键',
  `get_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '获取类型：0->后台赠送；1->主动获取',
  `use_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '使用状态：0->未使用；1->已使用；2->已过期',
  `used_time` datetime DEFAULT NULL COMMENT '使用时间',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_customer_code` (`customer_code`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_coupon_id` (`coupon_id`),
  KEY `idx_get_type` (`get_type`),
  KEY `idx_use_status` (`use_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户优惠券使用领取表';

-- ----------------------------
-- Table structure for t_coupon_product_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_coupon_product_relation`;
CREATE TABLE `t_coupon_product_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '优惠券商品主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `coupon_id` bigint NOT NULL DEFAULT '0' COMMENT '优惠券主键',
  `product_id` bigint NOT NULL DEFAULT '0' COMMENT '商品主键',
  `product_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `product_sn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '货号',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_coupon_id` (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券和商品的关系表';

-- ----------------------------
-- Table structure for t_coupon_product_category_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_coupon_product_category_relation`;
CREATE TABLE `t_coupon_product_category_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '优惠券商品主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `coupon_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '优惠券主键',
  `product_category_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '类目主键',
  `product_category_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '类目名称',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_category_id` (`product_category_id`),
  KEY `idx_coupon_id` (`coupon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券和商品类目关系表';

SET FOREIGN_KEY_CHECKS = 1;
