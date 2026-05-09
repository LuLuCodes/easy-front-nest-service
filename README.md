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

# 认证 (5.x+)

> 5.0.0 起，认证从 session+MD5 切换为 JWT + Passport。详见 [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)。

## 必要环境变量（生产）

```env
JWT_ACCESS_SECRET=<随机字符串 ≥ 32 位>
JWT_REFRESH_SECRET=<随机字符串 ≥ 32 位>
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d
REFRESH_COOKIE_NAME=refresh_token
REFRESH_COOKIE_SECURE=true
REFRESH_COOKIE_SAMESITE=lax
REFRESH_COOKIE_PATH=/api/auth
```

> 开发/测试环境未设置时会使用占位值；生产环境必填，否则启动失败。

## 客户端契约

- `POST /api/auth/login` → `{ user, accessToken, refreshToken, refreshExpiresIn }` + `Set-Cookie: refresh_token`
- 后续请求带 `Authorization: Bearer <accessToken>`
- access 过期后调用 `POST /api/auth/refresh`：Web 自动带 cookie；移动/小程序在 body 中传 `{ refreshToken }`
- `POST /api/auth/logout` 清除 cookie + 记录登出日志
- `GET /api/auth/me` 返回当前用户

## 服务端权限

```ts
import { Public, Roles, Permissions, CurrentUser } from '@auth/decorators';

@Public()                         // 跳过 JwtAuthGuard
@Permissions('access:user:edit')  // 需具备权限码
@Roles('admin')                   // 需具备角色名
async someHandler(@CurrentUser() user: AuthenticatedUser) { ... }
```

JWT payload 一次性灌入用户的 `roles`（角色名）与 `permissions`（right_code）；access TTL 15m，权限变更次轮 refresh 即生效。强制下线可在 refresh 阶段加黑名单（预留 `CacheService` 钩子）。

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

[地址](https://rw3ew7jh3sr.feishu.cn/wiki/ZrgEwRg9Iia8ntkQEc9cxJnjnyb?from=from_copylink)
