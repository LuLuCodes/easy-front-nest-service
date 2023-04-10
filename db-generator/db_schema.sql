-- 支持emoji：需要mysql数据库参数： character_set_server=utf8mb4
create database if not exists t_test_db default character set utf8mb4 collate utf8mb4_unicode_ci;
use easy_front_test_db;
create user 'Myun'@'%' identified by 'Myun@123jx';
grant all privileges on easy_front_test_db.* to 'Myun'@'%';
flush privileges;