#!/bin/bash
#execute all script in specified directory
MYDATE=`date +%F'-'%T'-'%w`
WORKDIR=$(cd $(dirname $0); pwd)
SQL_PATH=${WORKDIR}/table #指定的目录
LOG_FILE=${WORKDIR}/exec_${MYDATE}.log
db_host=81.69.225.47
db_port=4306
db_name=easy_front_mall_db
db_pass=Myun@123jx
#创建数据库
mysql -h ${db_host} -uroot -p$db_pass -P$db_port --default-character-set=utf8 < db_schema.sql >& error.log
#创建数据表
for file in ${SQL_PATH}/*
do
if [ -f "$file" ] ; then
postfix=`echo $file | awk -F'.' '{print  "."$NF}'`
  if [ $postfix = ".sql" ] ; then
    mysql -h ${db_host} -uroot -p$db_pass -P$db_port --default-character-set=utf8 ${db_name} < $file >& error.log
    echo $file 
    echo -e "\n===========$file=============\n" >>${LOG_FILE}
    cat error.log >>${LOG_FILE} #输出执行日志
    error=`grep ERROR error.log` #读取错误日志信息
    if [ -n "$error" ] ; then #如果有错误就退出程序
      echo $error
      exit
    fi
  fi
fi
done
#导入数据
mysql -h ${db_host} -uroot -p$db_pass -P$db_port --default-character-set=utf8 ${db_name} < db_data.sql >& error.log