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
-- Table structure for t_account
-- ----------------------------
DROP TABLE IF EXISTS `t_account`;
CREATE TABLE `t_account` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '账户主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `password_salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码盐',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='账户表';

-- ----------------------------
-- Table structure for t_account_login_log
-- ----------------------------
DROP TABLE IF EXISTS `t_account_login_log`;
CREATE TABLE `t_account_login_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `last_login_time` datetime DEFAULT NULL COMMENT '最近一次登录时间',
  `last_login_ip` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最近一次登录IP地址',
  `user_agent` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '浏览器UA',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户登录日志表';

-- ----------------------------
-- Table structure for t_account_platform
-- ----------------------------
DROP TABLE IF EXISTS `t_account_platform`;
CREATE TABLE `t_account_platform` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `app_id` int DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `platform_id` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '平台id，多个app共同一个账号',
  `platform_token` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '平台access_token',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '平台类型 0:未知,1:wechat',
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像',
  `weixin_openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信登录openid',
  `weixin_unionid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '微信登录unionid',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_platform_id` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='第三方用户信息';

-- ----------------------------
-- Table structure for t_customer
-- ----------------------------
DROP TABLE IF EXISTS `t_customer`;
CREATE TABLE `t_customer` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `gender` tinyint NOT NULL DEFAULT '0' COMMENT '性别：0 未知， 1男， 1 女',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `nick` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像地址',
  `level` int DEFAULT '0' COMMENT '用户等级',
  `invitation_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邀请码',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_code` (`customer_code`),
  KEY `idx_gender` (`gender`),
  KEY `idx_nick` (`nick`),
  KEY `idx_name` (`name`),
  KEY `idx_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ----------------------------
-- Table structure for t_customer_address
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_address`;
CREATE TABLE `t_customer_address` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户地址主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `pcd_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '省市区编码',
  `pcd_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '省市区',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '街道，xx路',
  `house_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '门牌号',
  `sort_no` int NOT NULL DEFAULT '0' COMMENT '排序',
  `tags` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '标签：家，公司',
  `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否默认地址',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`, `sort_no`),
  KEY `idx_customer_code` (`customer_code`, `sort_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户地址表';

-- ----------------------------
-- Table structure for t_customer_favorite
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_favorite`;
CREATE TABLE `t_customer_favorite` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户收藏主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `target_type` tinyint NOT NULL DEFAULT '0' COMMENT '收藏类型，0商品，1品牌',
  `target_id` bigint NOT NULL DEFAULT '0' COMMENT '如果target_type=0，则是商品ID，如果target_type=1，则是品牌ID',
  `extra` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '一些附加信息',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`, `target_type`),
  KEY `idx_customer_code` (`customer_code`, `target_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户收藏表';

-- ----------------------------
-- Table structure for t_customer_level
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_level`;
CREATE TABLE `t_customer_level` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户等级主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `customer_level_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户等级名称',
  `customer_level_desc` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户等级描述',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_customer_level_name` (`customer_level_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户等级表';

-- ----------------------------
-- Table structure for t_customer_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_relation`;
CREATE TABLE `t_customer_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户关系主键(自增)',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `account_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '账户code',
  `customer_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户code',
  `inviter_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邀请人ID',
  `sub_path` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '层级路径',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_account_code` (`account_code`),
  KEY `idx_customer_code` (`customer_code`),
  KEY `idx_inviter_id` (`inviter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户关系(上下级关系)表';

-- ----------------------------
-- Table structure for t_customer_wallet
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_wallet`;
CREATE TABLE `t_customer_wallet` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '系统编码',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `customer_id` bigint NOT NULL DEFAULT '0' COMMENT '用户id',
  `amount` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '钱包余额',
  `out_frozen_amount` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '出账冻结',
  `in_frozen_amount` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '进帐冻结',
  `point` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '积分',
  `out_frozen_point` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '出账冻结',
  `in_frozen_point` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '出账冻结',
  `point2` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '积分2',
  `out_frozen_point2` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '出账冻结',
  `in_frozen_point2` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '出账冻结',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户钱包表';

-- ----------------------------
-- Table structure for t_customer_wallet_log
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_wallet_log`;
CREATE TABLE `t_customer_wallet_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '系统编码',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `wallet_id` bigint NOT NULL DEFAULT '0' COMMENT '钱包编码',
  `amount` decimal(18,4) NOT NULL DEFAULT '0.0000' COMMENT '流水金额（正号增加，负号减少）',
  `log_type` int NOT NULL DEFAULT '0' COMMENT '流水类型（1奖励 2提现 3退款……）',
  `log_title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '流水标题',
  `log_desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '内容描述',
  `source_type` int NOT NULL DEFAULT '0' COMMENT '来源（1订单，2充值单，3提现单，4豆豆转账）',
  `source_id` bigint NOT NULL DEFAULT '0' COMMENT '来源编码（1订单编码，2充值单编码，3提现单编码，4豆豆流水账号）',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_wallet_id` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户钱包流水表';

-- ----------------------------
-- Table structure for t_customer_profit
-- ----------------------------
DROP TABLE IF EXISTS `t_customer_profit`;
CREATE TABLE `t_customer_profit` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '系统编码',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `customer_id` bigint NOT NULL DEFAULT '0' COMMENT '用户id',
  `profit_status` int NOT NULL DEFAULT '0' COMMENT '分佣状态（0初始冻结中，10已结算）',
  `profit_type` int NOT NULL DEFAULT '0' COMMENT '分佣类型（100级差自购省  200级差奖励  300爆单奖励）',
  `profit_amount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '分佣金额',
  `settle_time` datetime DEFAULT NULL COMMENT '结算到钱包时间',
  `source_type` int NOT NULL DEFAULT '0' COMMENT '来源（1订单奖励）',
  `source_id` bigint NOT NULL DEFAULT '0' COMMENT '来源系统编码',
  `sort_no` int NOT NULL DEFAULT (0) COMMENT '排序',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_customer_id` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分佣表';

SET FOREIGN_KEY_CHECKS = 1;
