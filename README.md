<!--
 * @Author: leyi leyi@myun.info
 * @Date: 2021-11-25 17:08:33
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-08-18 11:02:48
 * @FilePath: /easy-front-nest-service/README.md
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->

# 开发

本地调试时，请手动创建.env 文件，参考.env.production

# 部署

```shell
# 安装 pm2-intercom
pm2 install pm2-intercom

# 启动服务
pm2 start pm2.json
```

# pm2.json

```json
{
  "name": "easy-front-nest-service-v8", // 服务名
  "script": "api/main.js", // 启动脚本
  "ignoreWatch": ["node_modules"],
  "instances": "2", // 启动进程数
  "watch": false,
  "merge_logs": true,
  "instance_var": "INSTANCE_ID",
  "env": {
    "NODE_ENV": "production"
  }
}
```

# 创建数据库

**请先在.env 文件中配置数据库参数，并修改'db-generator/db_schema.sql'文件中的数据库名**

```shell
chmod +x ./db-generatoer/install.sh
./db-generatoer/install.sh
```

# 同步数据库 model

```shell
npm run seq # and select `sync models from database`
```

# 根据 db model 自动创建 CRUD 接口

```shell
npm run seq # and select `auto generate crud for model`
```

# 关于 Sharp 内存泄漏的解决方案

## 安装 jemalloc

```shell
yum -y install jemalloc
```

## 配置环境变量

```shell
# 编辑 /etc/environment
LD_PRELOAD=/usr/lib64/libjemalloc.so.1
```

```shell
export LD_PRELOAD="/usr/lib64/libjemalloc.so.1"

echo /usr/lib64/libjemalloc.so.1 >> /etc/ld.so.preload
```

## 清除 pm2 中以运行的程序

```shell
pm2 kill
pm2 resurrect
```

## 单例运行

```shell
LD_PRELOAD=/usr/lib64/libjemalloc.so.1 node index.js
```

## 接口加解密传输开启方式

适用于对安全性要求较高的项目

1.服务端 env 文件开启“API_CIPHER_ENABLE”，并配置加密的 key

```shell
# API加密传输，默认不开启，需要前端配合，前端部分请参考README.md指引
API_CIPHER_ENABLE=true
# API加密传输密钥, 请务必修改每个项目的密钥
API_CIPHER_KEY='myun.info'
```

2.libs 库中增加加密方法

```ts
/**
 * api接口加密
 * @param data 返回值
 * @param key 加密的key
 * @returns 加密文本
 */
export function apiCipher(data: any, key: string): string {
  if (data == null) {
    return data;
  }
  return cryptoJS.AES.encrypt(
    typeof data === 'object' ? JSON.stringify(data) : data.toString(),
    key,
  ).toString();
}

```

3.拦截管道增加返回数据加密功能 interceptor/transform.interceptor
### 前端配合修改解密功能
1.在前端env文件中增加解密环境变量
```shell
# API加密传输，默认不开启，需要前端配合，前端部分请参考README.md指引
VUE_APP_API_CIPHER_ENABLE = 1
# API加密传输密钥, 请务必修改每个项目的密钥,和后端一致
VUE_APP_API_CIPHER_KEY = 'myun.info'
```
2.修改api核心方法,参考代码：
```js
const api_cipher_enable = process.env.VUE_APP_API_CIPHER_ENABLE
const api_cipher_key = process.env.VUE_APP_API_CIPHER_KEY
...
...
...
...
if (resData.data.code === 0) {
  if (api_cipher_enable) {
    const _cipher_text = aes
      .decrypt(resData.data.data, api_cipher_key)
      .toString(utf8)
    return _cipher_text[0] === '{' || _text[0] === '['
      ? JSON.parse(_cipher_text)
      : _cipher_text
  }
  return resData.data.data
} else {
  throw new Error(resData.data.msg)
}
```