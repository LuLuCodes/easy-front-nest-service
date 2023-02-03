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
-- Table structure for t_product_brand
-- ----------------------------
DROP TABLE IF EXISTS `t_product_brand`;
CREATE TABLE `t_product_brand` (
  `id` bigint(20) NOT NULL COMMENT '品牌id',
  `brand_name` varchar(64) NOT NULL COMMENT '品牌名称',
  `first_letter` varchar(8) NOT NULL COMMENT '首字母',
  `factory_status` tinyint(1) DEFAULT 0 COMMENT '是否为品牌制造商：0->不是；1->是',
  `logo` varchar(500) DEFAULT '' COMMENT '品牌logo',
  `big_pic` varchar(255) DEFAULT '' COMMENT '专区大图',
  `origin_Place` varchar(32) DEFAULT '' COMMENT '源产地',
  `brand_profile` varchar(4000) DEFAULT '' COMMENT '品牌简介',
  `brand_story` text COMMENT '品牌故事',
  `product_count` int(11) DEFAULT 0 COMMENT '商品数量',
  `product_comment_count` int(11) DEFAULT 0 COMMENT '商品评论数量',
  `is_hot` tinyint(1) DEFAULT 0 COMMENT '是否热门品牌',
  `is_recommend` tinyint(1) DEFAULT 0 COMMENT '是否推荐品牌',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_brand_name` (`brand_name`),
  KEY `idx_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='品牌表';

-- ----------------------------
-- Table structure for t_product_category
-- ----------------------------
DROP TABLE IF EXISTS `t_product_category`;
CREATE TABLE `t_product_category` (
  `id` bigint(20) NOT NULL COMMENT '类目主键',
  `pid` bigint(20) DEFAULT 0 COMMENT '上级分类的编号：0表示一级分类',
  `category_name` varchar(64) DEFAULT '' COMMENT '名称',
  `type` int(11) DEFAULT 1 COMMENT '类目类型，1->商品',
  `level` int(11) DEFAULT 1 COMMENT '类目级别：0->1级；1->2级',
  `product_count` int(11) DEFAULT 0 COMMENT '商品数量',
  `product_unit` varchar(64) DEFAULT '' COMMENT '商品单位',
  `nav_status` tinyint(1) DEFAULT 1 COMMENT '是否显示在导航：0->不显示；1->显示',
  `category_desc` varchar(500) DEFAULT NULL COMMENT '类目描述',
  `pic_url` varchar(500) DEFAULT '' COMMENT '类目图片url',
  `sub_path` varchar(4000)  NOT NULL DEFAULT '' COMMENT '分类地址{pid}-{child_id}-...',
  `keywords` varchar(255) DEFAULT '' COMMENT '关键字',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_pid` (`pid`, `sort`),
  KEY `idx_category_name` (`category_name`, `sort`),
  KEY `idx_level` (`level`, `sort`),
  KEY `idx_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='基础-类目表';

-- ----------------------------
-- Table structure for t_product_attribute_category
-- ----------------------------
DROP TABLE IF EXISTS `t_product_attribute_category`;
CREATE TABLE `t_product_attribute_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品属性分类主键',
  `attribute_category_name` varchar(64) NOT NULL DEFAULT '' COMMENT '名称',
  `attribute_count` int(11) DEFAULT 0 COMMENT '属性数量',
  `param_count` int(11) DEFAULT 0 COMMENT '参数数量',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品属性分类表';

-- ----------------------------
-- Table structure for t_product_attribute
-- ----------------------------
DROP TABLE IF EXISTS `t_product_attribute`;
CREATE TABLE `t_product_attribute` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品属性主键',
  `product_attribute_category_id` int(11) NOT NULL COMMENT '商品属性分类主键',
  `attribute_name` varchar(64) NOT NULL COMMENT '商品属性名称',
  `select_type` tinyint(1) DEFAULT 0 COMMENT '属性选择类型：0->唯一；1->单选；2->多选',
  `input_type` tinyint(1) DEFAULT 0 COMMENT '属性录入方式：0->手工录入；1->从列表中选取',
  `input_list` varchar(255) comment 'input_type是1时生效，可选值列表，以逗号隔开',
  `hand_add_status` tinyint(1) DEFAULT 0 COMMENT '是否支持手动新增；0->不支持；1->支持',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_attribute_category_id_sort` (`product_attribute_category_id`, `sort`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品属性表';

-- ----------------------------
-- Table structure for t_product_attribute_value
-- ----------------------------
DROP TABLE IF EXISTS `t_product_attribute_value`;
CREATE TABLE `t_product_attribute_value` (
  `id` varchar(36) NOT NULL COMMENT '商品属性值主键',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `product_attribute_id` bigint(20) NOT NULL COMMENT '商品属性主键',
  `value` varchar(128) NOT NULL COMMENT '属性值，多个时以逗号隔开',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_product_attribute_id` (`product_id`, `product_attribute_id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品属性值表';

-- ----------------------------
-- Table structure for t_product_category_attribute_relation
-- ----------------------------
DROP TABLE IF EXISTS `t_product_category_attribute_relation`;
CREATE TABLE `t_product_category_attribute_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关系主键',
  `product_category_id` varchar(36) NOT NULL COMMENT '商品类目主键',
  `product_attribute_id` bigint(20) NOT NULL COMMENT '商品属性主键',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_category_id` (`product_category_id`),
  KEY `idx_product_attribute_id` (`product_attribute_id`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品类目和属性关系表';

-- ----------------------------
-- Table structure for t_product_spu
-- ----------------------------
DROP TABLE IF EXISTS `t_product_spu`;
CREATE TABLE `t_product_spu` (
  `id` bigint(20) NOT NULL COMMENT '商品主键',
  `spu_name` varchar(128) NOT NULL COMMENT '商品名称',
  `brand_id` varchar(36) DEFAULT '' COMMENT '品牌主键',
  `brand_name` varchar(64) DEFAULT '' COMMENT '品牌名称',
  `category_id` varchar(36) NOT NULL COMMENT '类目主键',
  `category_name` varchar(64) NOT NULL COMMENT '类目名称',
  `pic_url` varchar(255) NOT NULL COMMENT '主图url',
  `product_sn` varchar(64) DEFAULT '' COMMENT '货号',
  `publish_status` tinyint(1) DEFAULT 0 COMMENT '上架状态：0->下架；1->上架',
  `is_new` tinyint(1) DEFAULT 0 COMMENT '新品状态:0->不是新品；1->新品',
  `is_recommand` tinyint(1) DEFAULT 0 COMMENT '推荐状态；0->不推荐；1->推荐',
  `verify_status` tinyint(1) DEFAULT 0 COMMENT '审核状态：0->未审核；1->审核通过',
  `preview_status` tinyint(1) DEFAULT 0 COMMENT '是否为预售商品：0->不是；1->是',
  `stock` int(11) DEFAULT 0 COMMENT '库存',
  `low_stock` int(11) DEFAULT 0 COMMENT '预警库存',
  `lock_stock` int(11) DEFAULT 0 COMMENT '锁定库存',
  `original_price` decimal(10,2) DEFAULT 0 COMMENT '市场价(原价)',
  `sale_price` decimal(10,2) DEFAULT 0 COMMENT '销售价',
  `cost_price` decimal(10,2) DEFAULT 0 COMMENT '成本价',
  `promotion_price` decimal(10,2) DEFAULT 0 COMMENT '促销价',
  `promotion_start_time` datetime DEFAULT NULL COMMENT '促销开始时间',
  `promotion_end_time` datetime DEFAULT NULL COMMENT '促销结束时间',
  `promotion_per_limit` int(11) DEFAULT NULL COMMENT '活动限购数量',
  `price_type` int(1) DEFAULT NULL COMMENT '促销类型：0->没有促销使用销售价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  `gift_point` int(11) DEFAULT 0 COMMENT '赠送的积分',
  `sub_title` varchar(255) DEFAULT '' COMMENT '副标题',
  `spu_desc` text COMMENT '商品描述',
  `unit` varchar(16) DEFAULT '' COMMENT '单位',
  `weight` int(11) DEFAULT 0 COMMENT '重量(克)',
  `service_ids` varchar(64) DEFAULT '' COMMENT '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  `keywords` varchar(255) DEFAULT '' COMMENT '关键字',
  `album_pics` varchar(255) DEFAULT '' COMMENT '商品画册，限制为5张，以逗号分割',
  `detail_title` varchar(255) DEFAULT '' COMMENT '详情标题',
  `detail_desc` text COMMENT '详情描述',
  `detail_html` text COMMENT '产品详情富文本',
  `note` varchar(255) DEFAULT '' COMMENT '备注',
  `share_title` varchar(128) DEFAULT '' COMMENT '分享标题',
  `share_desc` text COMMENT '分享描述',
  `share_pic_url` varchar(255) DEFAULT '' COMMENT '分享缩略图url',
  `sale` int(11) DEFAULT 0 COMMENT '销量',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_spu_name` (`spu_name`),
  KEY `idx_brand_id` (`brand_id`),
  KEY `idx_category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表(SPU)';


-- ----------------------------
-- Table structure for t_product_sku
-- ----------------------------
DROP TABLE IF EXISTS `t_product_sku`;
CREATE TABLE `t_product_sku` (
  `id` bigint(20) NOT NULL COMMENT '商品SKU主键',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `sku_code` varchar(64) DEFAULT '' COMMENT 'sku编码',
  `pic_url` varchar(255) NOT NULL COMMENT '主图url',
  `stock` int(11) DEFAULT 0 COMMENT '库存',
  `low_stock` int(11) DEFAULT 0 COMMENT '预警库存',
  `lock_stock` int(11) DEFAULT 0 COMMENT '锁定库存',
  `original_price` decimal(10,2) DEFAULT 0 COMMENT '市场价',
  `sale_price` decimal(10,2) DEFAULT 0 COMMENT '销售价',
  `cost_price` decimal(10,2) DEFAULT 0 COMMENT '成本价',
  `promotion_price` decimal(10,2) DEFAULT 0 COMMENT '促销价',
  `promotion_start_time` datetime DEFAULT NULL COMMENT '促销开始时间',
  `promotion_end_time` datetime DEFAULT NULL COMMENT '促销结束时间',
  `promotion_per_limit` int(11) DEFAULT NULL COMMENT '活动限购数量',
  `price_type` int(1) DEFAULT NULL COMMENT '促销类型：0->没有促销使用销售价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  `sale` int(11) DEFAULT 0 COMMENT '销量',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_sku_code` (`sku_code`, `deleted`)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品SKU表';

-- ----------------------------
-- Table structure for t_spu_customer_price
-- ----------------------------
DROP TABLE IF EXISTS `t_spu_customer_price`;
CREATE TABLE `t_spu_customer_price` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `customer_level_id` bigint(20) DEFAULT NULL,
  `customer_price` decimal(10,2) DEFAULT NULL COMMENT '会员价格',
  `customer_level_name` varchar(100) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_customer_level_id` (`product_id`, `customer_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SPU)会员价格表';

-- ----------------------------
-- Table structure for t_sku_customer_price
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_customer_price`;
CREATE TABLE `t_sku_customer_price` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `sku_id` bigint(20) NOT NULL COMMENT '商品SKU主键',
  `customer_level_id` bigint(20) DEFAULT NULL,
  `customer_price` decimal(10,2) DEFAULT NULL COMMENT '会员价格',
  `customer_level_name` varchar(100) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_sku_id` (`sku_id`),
  KEY `idx_customer_level_id` (`sku_id`, `customer_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SKU)会员价格表';

-- ----------------------------
-- Table structure for t_spu_full_reduction
-- ----------------------------
DROP TABLE IF EXISTS `t_spu_full_reduction`;
CREATE TABLE `t_spu_full_reduction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `full_price` decimal(10,2) DEFAULT NULL COMMENT '满多少',
  `reduce_price` decimal(10,2) DEFAULT NULL COMMENT '减多少',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SPU)满减表(只针对同SPU)';

-- ----------------------------
-- Table structure for t_sku_full_reduction
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_full_reduction`;
CREATE TABLE `t_sku_full_reduction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `sku_id` bigint(20) NOT NULL COMMENT '商品主键',
  `full_price` decimal(10,2) DEFAULT NULL COMMENT '满多少',
  `reduce_price` decimal(10,2) DEFAULT NULL COMMENT '减多少',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_sku_id` (`sku_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SKU)满减表(只针对同SKU)';

-- ----------------------------
-- Table structure for t_spu_ladder
-- ----------------------------
DROP TABLE IF EXISTS `t_spu_ladder`;
CREATE TABLE `t_spu_ladder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `product_id` bigint(20) NOT NULL COMMENT '商品主键',
  `count` int(11) NOT NULL DEFAULT 0 COMMENT '满足的商品数量',
  `discount` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '折扣',
  `price` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '折后价格',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SPU)阶梯价格表(只针对同SPU)';

-- ----------------------------
-- Table structure for t_sku_ladder
-- ----------------------------
DROP TABLE IF EXISTS `t_sku_ladder`;
CREATE TABLE `t_sku_ladder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '价格主键',
  `sku_id` bigint(20) NOT NULL COMMENT '商品主键',
  `count` int(11) NOT NULL DEFAULT 0 COMMENT '满足的商品数量',
  `discount` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '折扣',
  `price` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '折后价格',
  `enabled` tinyint(1) DEFAULT 0 COMMENT '是否启用 1:启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL  COMMENT '删除时间',
  `creator_id` bigint NOT NULL DEFAULT '1' COMMENT '创建人',
  `modifier_id` bigint NOT NULL DEFAULT '1' COMMENT '修改人',
  PRIMARY KEY (`id`),
  KEY `idx_sku_id` (`sku_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品(SKU)阶梯价格表(只针对同SKU)';

SET FOREIGN_KEY_CHECKS = 1;
