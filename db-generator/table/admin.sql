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
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '后台用户主键',
  `admin_code` varchar(36) NOT NULL COMMENT '后台用户code',
  `email` varchar(30) DEFAULT '' COMMENT '邮箱',
  `phone` varchar(15) DEFAULT '' COMMENT '手机号',
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `icon` varchar(500) DEFAULT '' COMMENT '头像',
  `nick_name` varchar(200) DEFAULT '' COMMENT '昵称',
  `note` varchar(500) DEFAULT '' COMMENT '备注信息',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `password_salt` varchar(32) NOT NULL COMMENT '密码盐',
  `status` tinyint(3) NOT NULL COMMENT '0 可用, 1 禁用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_phone` (`phone`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户表';

-- ----------------------------
-- Table structure for t_admin_login_log
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_login_log`;
CREATE TABLE `t_admin_login_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `admin_code` varchar(36) NOT NULL COMMENT '后台用户code',
  `last_login_time` datetime DEFAULT NULL COMMENT '最近一次登录时间',
  `last_login_ip` varchar(36) DEFAULT '' COMMENT '最近一次登录IP地址',
  `user_agent` varchar(300) DEFAULT '' COMMENT '浏览器登录类型',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户登录日志表';

-- ----------------------------
-- Table structure for t_admin_permission_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_permission_relation`;
CREATE TABLE `t_admin_permission_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `admin_code` varchar(36) NOT NULL COMMENT '后台用户code',
  `permission_id` bigint(20) NOT NULL COMMENT '权限主键',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户和权限关系表(除角色中定义的权限以外的加减权限)';

-- ----------------------------
-- Table structure for t_admin_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role_relation`;
CREATE TABLE `t_admin_role_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `admin_code` varchar(36) NOT NULL COMMENT '后台用户code',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色主键',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_admin_code` (`admin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户和角色关系表';

-- ----------------------------
-- Table structure for t_admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_menu`;
CREATE TABLE `t_admin_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '菜单主键',
  `parent_id` bigint(20) NOT NULL COMMENT '父级ID',
  `title` varchar(100) DEFAULT NULL COMMENT '菜单名称',
  `level` int(11) DEFAULT 0 COMMENT '菜单级数',
  `sort` int(11) DEFAULT 0 COMMENT '菜单排序',
  `show_name` varchar(100) DEFAULT NULL COMMENT '前端名称',
  `show_icon` varchar(200) DEFAULT NULL COMMENT '前端图标',
  `status` tinyint(3) NOT NULL COMMENT '0 可用, 1 禁用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台菜单表';

-- ----------------------------
-- Table structure for t_admin_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_permission`;
CREATE TABLE `t_admin_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '权限主键',
  `parent_id` bigint(20) NOT NULL COMMENT '父级权限id',
  `name` varchar(100) DEFAULT '' COMMENT '名称',
  `value` varchar(200) DEFAULT '' COMMENT '权限值',
  `icon` varchar(500) DEFAULT '' COMMENT '图标',
  `type` tinyint(1) DEFAULT 0 COMMENT '权限类型：0->目录；1->菜单；2->按钮（接口绑定权限）',
  `uri` varchar(200) DEFAULT '' COMMENT '前端资源路径',
  `status` tinyint(3) NOT NULL COMMENT '0 可用, 1 禁用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户权限表';

-- ----------------------------
-- Table structure for t_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role`;
CREATE TABLE `t_admin_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色主键',
  `role_name` varchar(100) NOT NULL COMMENT '名称',
  `desc` varchar(500) DEFAULT '' COMMENT '描述',
  `admin_count` int(11) DEFAULT 0 COMMENT '后台用户数量',
  `status` tinyint(3) NOT NULL COMMENT '0 可用, 1 禁用, 2 注销',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户角色表';

-- ----------------------------
-- Table structure for t_admin_role_permission_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_admin_role_permission_relation`;
CREATE TABLE `t_admin_role_permission_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `role_id` bigint(20) NOT NULL COMMENT '角色主键',
  `permission_id` bigint(20) NOT NULL COMMENT '权限主键',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台用户角色和权限关系表';


SET FOREIGN_KEY_CHECKS = 1;
