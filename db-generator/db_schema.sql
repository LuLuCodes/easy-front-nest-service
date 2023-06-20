-- 支持emoji：需要mysql数据库参数： character_set_server=utf8mb4
create database if not exists `easy-front-nest-db` default character set utf8mb4 collate utf8mb4_0900_ai_ci;
use `easy-front-nest-db`;
create user 'Myun'@'%' identified by 'Myun@123jx';
grant all privileges on `easy-front-nest-db`.* to 'Myun'@'%';
flush privileges;