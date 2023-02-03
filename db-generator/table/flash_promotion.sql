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
  `id` bigint(20) NOT NULL COMMENT '活动主键',
  `flash_promotion_name` varchar(50) NOT NULL COMMENT '活动名称',
  `pic_url` varchar(255) NOT NULL COMMENT '活动主图url',
  `title` varchar(255) DEFAULT '' COMMENT '活动标题',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `enabled` tinyint(1) DEFAULT 1 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_name` (`flash_promotion_name`),
  KEY `idx_title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='限时购活动表';

-- ----------------------------
-- Table structure for t_flash_promotion_session
-- ----------------------------
DROP TABLE IF EXISTS `t_flash_promotion_session`;
CREATE TABLE `t_flash_promotion_session` (
  `id` bigint(20) NOT NULL COMMENT '场次主键',
  `flash_promotion_id` bigint(36) NOT NULL COMMENT '限时购主键',
  `flash_promotion_session_name` varchar(50) DEFAULT '' COMMENT '场次名称',
  `start_time` datetime NOT NULL COMMENT '开始时间',
  `end_time` datetime NOT NULL COMMENT '结束时间',
  `enabled` tinyint(1) DEFAULT 1 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_id` (`flash_promotion_id`),
  KEY `idx_flash_promotion_session_name` (`flash_promotion_session_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='限时购场次表';

-- ----------------------------
-- Table structure for t_flash_promotion_product
-- ----------------------------
DROP TABLE IF EXISTS `t_flash_promotion_product`;
CREATE TABLE `t_flash_promotion_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关系主键(自增)',
  `flash_promotion_id` bigint(20) NOT NULL COMMENT '限时购主键',
  `flash_promotion_session_id` bigint(20) NOT NULL COMMENT '限时购场次主键',
  `product_id` bigint(20) NOT NULL COMMENT '活动商品(SPU)主键',
  `sku_id` bigint(20) NOT NULL COMMENT '活动SKU主键',
  `publish_status` tinyint(1) DEFAULT 0 COMMENT '上架状态：0->下架；1->上架',
  `active_price` decimal(10,2) DEFAULT 0 COMMENT '活动价格',
  `active_stock` int(11) DEFAULT 0 COMMENT '参加活动的库存',
  `num_limit` int(11) DEFAULT 0 COMMENT '每人限购数据量',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_flash_promotion_id` (`flash_promotion_id`, `publish_status`, `sort`),
  KEY `idx_flash_promotion_session_id` (`flash_promotion_session_id`, `publish_status`, `sort`),
  KEY `idx_product_id` (`product_id`, `publish_status`),
  KEY `idx_publish_status` (`publish_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='限时购商品表';

SET FOREIGN_KEY_CHECKS = 1;
