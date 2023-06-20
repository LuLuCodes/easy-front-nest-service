/*
 Navicat Premium Data Transfer

 Source Server         : 开发环境数据库
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 127.0.0.1:4306
 Source Schema         : easy-front-nest-db

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 20/06/2023 16:28:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `t_dictionary`;
CREATE TABLE `t_dictionary`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '字典表主键',
  `field_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典名称',
  `field_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典key',
  `field_value` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '字典value',
  `is_system` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否是系统变量',
  `is_init_cache` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否初始化时缓存',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '备注',
  `sort_no` int NULL DEFAULT 0 COMMENT '排序',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `created_by` bigint NOT NULL COMMENT '创建者id',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `updated_by` bigint NOT NULL COMMENT '更新者id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_field_key`(`field_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '基础-字典表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for t_sms_log
-- ----------------------------
DROP TABLE IF EXISTS `t_sms_log`;
CREATE TABLE `t_sms_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '系统编码',
  `sms_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '短信类型，业务自定义',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `sms_param` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '校验码',
  `expire_time` datetime NULL DEFAULT NULL COMMENT '过期时间',
  `msg_status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：1-待验证 10-已验证 11-发送失败 12-验证失败',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_mobile`(`mobile`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '短信发送表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_sms_log
-- ----------------------------

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nick` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `tag` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户标签',
  `note` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `role_type` tinyint NULL DEFAULT 1 COMMENT '角色类型 1-平台端角色 其他根据业务自己定义',
  `user_status` tinyint NULL DEFAULT NULL COMMENT '账户状态 1-正常 11-禁用 12-注销',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1230620 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户基础信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, '平台管理员', '/user/1686884710140-avatar.jpg', NULL, NULL, NULL, 1, 1, NULL, '2023-06-01 10:09:49', '2023-06-16 11:05:14', 1, 1);

-- ----------------------------
-- Table structure for t_user_login
-- ----------------------------
DROP TABLE IF EXISTS `t_user_login`;
CREATE TABLE `t_user_login`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `login_type` tinyint NULL DEFAULT NULL COMMENT '账号类型：1-账号名密码 2-手机号 3-微信公众号授权 4-小程序授权 5-微信unionid登录',
  `login_client` tinyint NULL DEFAULT NULL COMMENT '账号客户端类型 1-平台端 2-企业端 3-小程序端',
  `account_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '账号id',
  `account_pwd` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `pwd_salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码盐',
  `user_id` bigint NULL DEFAULT NULL COMMENT '账号所属user_id',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_account`(`account_id`, `account_pwd`) USING BTREE,
  INDEX `idx_userid`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户登录账号表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_login
-- ----------------------------
INSERT INTO `t_user_login` VALUES (1, 1, 1, 'admin', 'EbnzQtokkhb2EhUoISZi9g==', '7a4=', 1, NULL, '2023-02-23 17:49:08', '2023-06-16 11:20:28', 1, 1);

-- ----------------------------
-- Table structure for t_user_oplog
-- ----------------------------
DROP TABLE IF EXISTS `t_user_oplog`;
CREATE TABLE `t_user_oplog`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户id',
  `target_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '目标类型(表名)',
  `target_id` bigint NULL DEFAULT NULL COMMENT '目标id(表id)',
  `action_user` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '【谁】',
  `action_type` tinyint UNSIGNED NULL DEFAULT NULL COMMENT '动作，业务定义 1-新增 2-修改 3-删除',
  `action_desc` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '【干了什么】',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_target`(`target_id`, `target_type`) USING BTREE,
  INDEX `idx_user`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户操作记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_oplog
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_right
-- ----------------------------
DROP TABLE IF EXISTS `t_user_right`;
CREATE TABLE `t_user_right`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限主键',
  `parent_id` bigint NOT NULL DEFAULT 0 COMMENT '权限父级ID',
  `role_type` tinyint NOT NULL DEFAULT 1 COMMENT '角色类型 1-平台端角色 其他根据业务自己定义',
  `right_type` tinyint NOT NULL COMMENT '权限类型 1-菜单 2-按钮',
  `right_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单编码',
  `right_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限名称',
  `sort_no` int NOT NULL DEFAULT 0 COMMENT '排序字段 0-最大 默认0',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parent_id`(`parent_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user_right
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_right_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_user_right_relation`;
CREATE TABLE `t_user_right_relation`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` bigint NULL DEFAULT NULL,
  `right_id` bigint NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色权限关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user_right_relation
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色主键',
  `role_type` tinyint NOT NULL DEFAULT 1 COMMENT '角色类型 1-平台端角色 其他根据业务自己定义',
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `is_supper` tinyint NOT NULL DEFAULT 0 COMMENT '是否系统角色，不可操作',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_role_name`(`role_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role_relation`;
CREATE TABLE `t_user_role_relation`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NULL DEFAULT NULL,
  `role_id` bigint NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL COMMENT '删除时间 null-未删除',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `created_by` bigint NOT NULL COMMENT '创建人',
  `updated_by` bigint NOT NULL COMMENT '修改人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户角色关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of t_user_role_relation
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
