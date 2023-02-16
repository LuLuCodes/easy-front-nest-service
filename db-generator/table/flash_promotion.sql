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
-- Table structure for t_flash_promotion
-- ----------------------------
DROP TABLE IF EXISTS `t_flash_promotion`;
CREATE TABLE `t_flash_promotion` (
  `id` bigint NOT NULL COMMENT '活动主键',
  `flash_promotion_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '活动名称',
  `pic_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '活动主图url',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '活动标题',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_name` (`flash_promotion_name`),
  KEY `idx_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='限时购活动表';

-- ----------------------------
-- Table structure for t_flash_promotion_session
-- ----------------------------
DROP TABLE IF EXISTS `t_flash_promotion_session`;
CREATE TABLE `t_flash_promotion_session` (
  `id` bigint NOT NULL COMMENT '场次主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `flash_promotion_id` bigint NOT NULL DEFAULT '0' COMMENT '限时购主键',
  `flash_promotion_session_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '场次名称',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_id` (`flash_promotion_id`),
  KEY `idx_flash_promotion_session_name` (`flash_promotion_session_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='限时购场次表';

-- ----------------------------
-- Table structure for t_flash_promotion_product
-- ----------------------------
DROP TABLE IF EXISTS `t_flash_promotion_product`;
CREATE TABLE `t_flash_promotion_product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关系主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `flash_promotion_id` bigint NOT NULL DEFAULT '0' COMMENT '限时购主键',
  `flash_promotion_session_id` bigint NOT NULL DEFAULT '0' COMMENT '限时购场次主键',
  `product_id` bigint NOT NULL DEFAULT '0' COMMENT '活动商品(SPU)主键',
  `sku_id` bigint NOT NULL DEFAULT '0' COMMENT '活动SKU主键',
  `publish_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '上架状态：0->下架；1->上架',
  `active_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '活动价格',
  `active_stock` int NOT NULL DEFAULT '0' COMMENT '参加活动的库存',
  `num_limit` int NOT NULL DEFAULT '0' COMMENT '每人限购数据量',
  `sort_no` int NOT NULL DEFAULT '0' COMMENT '排序',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_id` (`flash_promotion_id`, `publish_status`, `sort_no`),
  KEY `idx_flash_promotion_session_id` (`flash_promotion_session_id`, `publish_status`, `sort_no`),
  KEY `idx_product_id` (`product_id`, `publish_status`),
  KEY `idx_publish_status` (`publish_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='限时购商品表';

SET FOREIGN_KEY_CHECKS = 1;
