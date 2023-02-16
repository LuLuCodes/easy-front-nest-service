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
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '后台用户主键',
  `app_id` int DEFAULT '10000' COMMENT '应用id',
  `admin_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '后台用户code',
  `source_type` int NOT NULL DEFAULT '0' COMMENT '账号来源（0平台后台 1商家后台 2渠道后台）',
  `source_id` bigint NOT NULL DEFAULT '0' COMMENT '账号来源编码',
  `source_class` int NOT NULL DEFAULT '0' COMMENT '渠道类型（0普通 1渠道）',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `icon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '头像',
  `nick_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '备注信息',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码',
  `password_salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '密码盐',
  `enabled` tinyint(1) DEFAULT '1' COMMENT '0 禁用, 1 可用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户表';

-- ----------------------------
-- Table structure for t_admin_login_log
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_login_log`;
CREATE TABLE `t_admin_login_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `admin_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '后台用户code',
  `last_login_time` datetime DEFAULT NULL COMMENT '最近一次登录时间',
  `last_login_ip` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '最近一次登录IP地址',
  `user_agent` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '浏览器登录类型',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户登录日志表';

-- ----------------------------
-- Table structure for t_admin_permission_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_permission_relation`;
CREATE TABLE `t_admin_permission_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `admin_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '后台用户code',
  `permission_id` bigint NOT NULL DEFAULT '0' COMMENT '权限主键',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户和权限关系表(除角色中定义的权限以外的加减权限)';

-- ----------------------------
-- Table structure for t_admin_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role_relation`;
CREATE TABLE `t_admin_role_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `admin_code` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '后台用户code',
  `role_id` bigint NOT NULL DEFAULT '0' COMMENT '角色主键',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户和角色关系表';

-- ----------------------------
-- Table structure for t_admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_menu`;
CREATE TABLE `t_admin_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `parent_id` bigint NOT NULL COMMENT '父级ID',
  `right_type` tinyint NOT NULL DEFAULT '0' COMMENT '权限类型 0 未知 1目录 2菜单 3按钮',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '菜单名称',
  `level` int NOT NULL DEFAULT '0' COMMENT '菜单级数',
  `sort_no` int NOT NULL DEFAULT '0' COMMENT '菜单排序',
  `show_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '前端路由name',
  `show_icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '前端图标',
  `menu_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '菜单编码',
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '跳转地址',
  `layout` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT 'component',
  `show_path` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '前端路由path',
  `extra` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '额外的字段',
  `source_type` int NOT NULL DEFAULT '0' COMMENT '来源',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COLLATE=utf8mb4_0900_ai_ci COMMENT='后台菜单表';

-- ----------------------------
-- Table structure for t_admin_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_permission`;
CREATE TABLE `t_admin_permission` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `parent_id` bigint NOT NULL COMMENT '父级权限id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `value` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '权限值',
  `icon` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '图标',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '权限类型：0->目录；1->菜单；2->按钮（接口绑定权限）',
  `uri` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '前端资源路径',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户权限表';

-- ----------------------------
-- Table structure for t_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role`;
CREATE TABLE `t_admin_role` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `role_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '名称',
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '描述',
  `admin_count` int NOT NULL DEFAULT '0' COMMENT '后台用户数量',
  `source_type` int NOT NULL DEFAULT '0' COMMENT '角色来源（0平台后台 1商家后台）',
  `source_id` bigint NOT NULL DEFAULT '0' COMMENT '角色来源编码',
  `is_system` int NOT NULL DEFAULT '0' COMMENT '是否系统角色',
  `is_customer_service` int NOT NULL DEFAULT '0' COMMENT '是否客服',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户角色表';

-- ----------------------------
-- Table structure for t_admin_role_permission_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role_permission_relation`;
CREATE TABLE `t_admin_role_permission_relation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `app_id` int NOT NULL DEFAULT '10000' COMMENT '应用id',
  `role_id` bigint NOT NULL DEFAULT '0' COMMENT '角色主键',
  `permission_id` bigint NOT NULL DEFAULT '0' COMMENT '权限主键',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 禁用, 1 可用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='后台用户角色和权限关系表';


SET FOREIGN_KEY_CHECKS = 1;
