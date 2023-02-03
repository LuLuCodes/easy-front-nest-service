-- 数据库创建脚本
drop database if exists easy_front_mall_db;
drop user if exists 'Myun'@'%';
-- 支持emoji：需要mysql数据库参数： character_set_server=utf8mb4
create database easy_front_mall_db default character set utf8mb4 collate utf8mb4_unicode_ci;
use easy_front_mall_db;
create user 'Myun'@'%' identified by 'Myun@123jx';
grant all privileges on easy_front_mall_db.* to 'Myun'@'%';
flush privileges;