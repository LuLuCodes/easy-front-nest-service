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
-- Table structure for t_area
-- ----------------------------
DROP TABLE IF EXISTS `t_area`;
CREATE TABLE `t_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '省市区主键',
  `pcd_code` varchar(20) NOT NULL COMMENT '省市区编码',
  `pcd_name` varchar(50) NOT NULL COMMENT '省市区名称',
  `level` int(11) NOT NULL COMMENT '级别 100 省 1000市 10000区',
  `parent_code` varchar(20) NOT NULL COMMENT '父级id',
  `initials` varchar(10) DEFAULT '' COMMENT '简写，用于搜索北京 bj',
  `pinyin` varchar(100) DEFAULT '' COMMENT '名称拼音 beijing',
  `is_municipality` tinyint(1) DEFAULT 0 COMMENT '是否是直辖市',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `is_hot` tinyint(1) DEFAULT 0 COMMENT '热门城市',
  `enabled` tinyint(1) DEFAULT 1 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_level_sort` (`level`, `sort`),
  KEY `idx_parent_code_sort` (`parent_code`, `sort`),
  KEY `idx_pcd_name_sort` (`pcd_name`, `sort`),
  KEY `idx_pcd_code_sort` (`pcd_code`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='基础-省市区';

-- ----------------------------
-- Table structure for t_db_info
-- ----------------------------
DROP TABLE IF EXISTS `t_db_info`;
CREATE TABLE `t_db_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` int(11) NOT NULL COMMENT '版本',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据库版本号';

-- ----------------------------
-- Table structure for t_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `t_dictionary`;
CREATE TABLE `t_dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典表主键',
  `field_name` varchar(50) NOT NULL COMMENT '字典名称',
  `field_key` varchar(50) NOT NULL COMMENT '字典key',
  `field_value` varchar(255) NOT NULL COMMENT '字典value',
  `sort_no` int(11) NOT NULL COMMENT '排序',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='基础-字典表';

-- ----------------------------
-- Table structure for t_swiper
-- ----------------------------
DROP TABLE IF EXISTS `t_swiper`;
CREATE TABLE `t_swiper` (
  `id` bigint(20) NOT NULL COMMENT '轮播图主键',
  `swiper_name` varchar(64) NOT NULL COMMENT '轮播图名字',
  `url` varchar(255) NOT NULL COMMENT '轮播图图片url',
  `link` varchar(255) DEFAULT '' COMMENT '轮播图跳转链接地址',
  `position` varchar(20) DEFAULT '' COMMENT '轮播图位置: home首页 goods-list商品列表页',
  `start_time` datetime DEFAULT NULL COMMENT '轮播图展示开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '轮播图展示结束时间',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_position_sort` (`position`, `sort`),
  KEY `idx_swiper_name_sort` (`swiper_name`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';

-- ----------------------------
-- Table structure for t_feight_template
-- ----------------------------
DROP TABLE IF EXISTS `t_feight_template`;
CREATE TABLE `t_feight_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '运费模板主键',
  `feight_template_name` varchar(64) NOT NULL DEFAULT ''  COMMENT '运费模板名称',
  `charge_type` tinyint(1) DEFAULT 0 COMMENT '计费类型:0->按重量；1->按件数',
  `first_weight` decimal(10,2) DEFAULT 0 COMMENT '首重kg',
  `first_fee` decimal(10,2) DEFAULT 0 COMMENT '首费（元）',
  `continue_weight` decimal(10,2) DEFAULT NULL COMMENT '续重kg',
  `continue_fee` decimal(10,2) DEFAULT NULL COMMENT '续费（元）',
  `dest_pcd_code` varchar(255) DEFAULT NULL COMMENT '目的地（省、市）',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='运费模版表';

-- ----------------------------
-- Table structure for t_third_platform_config
-- ----------------------------
DROP TABLE IF EXISTS `t_third_platform_config`;
CREATE TABLE `t_third_platform_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `wx_appid` varchar(32) DEFAULT '' COMMENT '微信公众号AppID',
  `wx_appsecret` varchar(255) DEFAULT '' COMMENT '微信公众号AppSecret',
  `wx_token` varchar(32) DEFAULT '' COMMENT '微信公众号token(非access token)',
  `mp_appid` varchar(32) DEFAULT '' COMMENT '微信公众号AppID',
  `mp_appsecret` varchar(255) DEFAULT '' COMMENT '微信公众号AppSecret',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='三方平台配置';

SET FOREIGN_KEY_CHECKS = 1;
