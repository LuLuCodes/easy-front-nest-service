/*
 * @Author: mochi mochi@google.com
 * @Date: 2022-08-31 11:54:53
 * @LastEditors: mochi mochi@google.com
 * @LastEditTime: 2022-08-31 11:59:35
 * @FilePath: \mc-service\db-tools\CodeConversion.ts
 * @Description: 处理代码连接数据库生成实体类注释乱码的问题
 * Copyright (c) 2022 by mochi mochi@google.com, All Rights Reserved.
 */
import * as fs from 'fs';
import * as path from 'path';

export class CodeConversion {

  /**
   * @description: 循环读取文件
   * @param {*} dir 文件夹目录
   * @param {*} list 文件路径集合
   * @return {*}
   */
  private static deep(dir, list) {
    const arr = fs.readdirSync(dir)
    arr.forEach(item => {
      const itemPath = dir + item
      const isDir = fs.statSync(itemPath).isDirectory()
      if (isDir) {
        const temp = dir + item + '/'
        this.deep(temp, list)
      } else {
        list.push(itemPath)
      }
    })
  }
  /**
   * @description: 执行
   * @return {*}
   */
  public static run() {
    let list = [];
    CodeConversion.deep(path.join(__dirname, '..') + "/src/models/", list);
    // console.log(list)
    list.forEach(path => {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        data = unescape(data.replace(/\\u/g, "%u"));
        fs.writeFile(path, data, 'utf8', (err) => {
          if (err) throw err;
        });

      });
    })
  }
}