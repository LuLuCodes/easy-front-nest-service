"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeConversion = void 0;
/*
 * @Author: mochi mochi@google.com
 * @Date: 2022-08-31 11:54:53
 * @LastEditors: mochi mochi@google.com
 * @LastEditTime: 2022-08-31 11:59:35
 * @FilePath: \mc-service\db-tools\CodeConversion.ts
 * @Description: 处理代码连接数据库生成实体类注释乱码的问题
 * Copyright (c) 2022 by mochi mochi@google.com, All Rights Reserved.
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CodeConversion {
    /**
     * @description: 循环读取文件
     * @param {*} dir 文件夹目录
     * @param {*} list 文件路径集合
     * @return {*}
     */
    static deep(dir, list) {
        const arr = fs.readdirSync(dir);
        arr.forEach(item => {
            const itemPath = dir + item;
            const isDir = fs.statSync(itemPath).isDirectory();
            if (isDir) {
                const temp = dir + item + '/';
                this.deep(temp, list);
            }
            else {
                list.push(itemPath);
            }
        });
    }
    /**
     * @description: 执行
     * @return {*}
     */
    static run() {
        let list = [];
        CodeConversion.deep(path.join(__dirname, '..') + "/src/models/", list);
        // console.log(list)
        list.forEach(path => {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err)
                    throw err;
                data = unescape(data.replace(/\\u/g, "%u"));
                fs.writeFile(path, data, 'utf8', (err) => {
                    if (err)
                        throw err;
                });
            });
        });
    }
}
exports.CodeConversion = CodeConversion;
