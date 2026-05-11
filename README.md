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

# 多租户 (5.x+)

> 5.0.0 起本服务以 SaaS 形态运行：每个调用都绑定一个 `tenant_id`，凭证（公众号 / 小程序 / 微信支付 / 支付宝 / OSS）按租户隔离。

## 隔离模型

- **共享 schema + tenant_id 列**：所有业务表新增 `tenant_id` 列，TypeORM subscriber 自动注入；`AuditEntity` 基类承载该字段。
- **JWT claim**：access token 携带 `tenant_id`、`is_super_admin`，通过 `TenantContextInterceptor` 注入 `AsyncLocalStorage`，下游 service / repo / provider 一律从 context 取值，禁止直接读 `req`。
- **超级管理员**：system 租户 (id=0) 下的 `is_super_admin=true` 用户跨租户读写，所有调用记 audit log；用 `@SuperAdminOnly()` 装饰器守护控制平面接口。
- **租户切换**：`POST /api/auth/switch-tenant { tenant_id }` 校验 `t_tenant_user_relation` 后重签 token。

## 必要环境变量

```env
TENANT_MASTER_KEY=<≥ 32 字节, base64; 用于 t_tenant_credential AES-256-GCM>
```

`TENANT_MASTER_KEY` 启动时强校验；不存在或长度不够直接拒绝启动。

## 控制平面（仅 super-admin）

| 端点                                                   | 用途                    |
| ------------------------------------------------------ | ----------------------- |
| `POST /api/admin/tenants`                              | 创建租户                |
| `GET  /api/admin/tenants`                              | 列出租户                |
| `GET  /api/admin/tenants/:id`                          | 租户详情                |
| `POST /api/admin/tenants/:id/users`                    | 添加用户到租户          |
| `DELETE /api/admin/tenants/:id/users/:userId`          | 移除用户                |
| `POST /api/admin/tenants/:id/credentials`              | 添加凭证（即加密入库）  |
| `GET  /api/admin/tenants/:id/credentials`              | 列出凭证（不含 secret） |
| `PATCH /api/admin/tenants/:id/credentials/:cid/status` | 启用 / 禁用             |
| `PATCH /api/admin/tenants/:id/credentials/:cid/secret` | 轮换 secret / cert      |

## Provider 配置

每条凭证存于 `t_tenant_credential`：`secret_cipher` / `cert_cipher` AES-256-GCM 加密，`metadata` JSON 存非密配置。下表是各 provider 的字段约定：

| Provider | `app_id`      | `secret`          | `cert`             | `metadata` 关键字段                                                                 |
| -------- | ------------- | ----------------- | ------------------ | ----------------------------------------------------------------------------------- |
| `wx_oa`  | 公众号 AppID  | 公众号 AppSecret  | -                  | `token`, `encoding_aes_key`                                                         |
| `wx_mp`  | 小程序 AppID  | 小程序 AppSecret  | -                  | (无)                                                                                |
| `wx_pay` | 商户号 mch_id | -                 | 商户私钥 PEM       | `api_v3_key`, `appid`, `notify_url?`, `refund_notify_url?`                          |
| `alipay` | 支付宝 app_id | 商户私钥 PEM      | 支付宝平台公钥 PEM | `gateway?`, `sign_type?`, `key_type?`, `encrypt_key?`, `notify_url?`, `return_url?` |
| `oss`    | bucket 名     | access_key_secret | access_key_id      | `region`, `endpoint?`, `internal?`, `domain?`, `secure?`, `timeout_ms?`             |

`cert_serial_no` 仅 wx_pay 使用（商户证书序列号）。

## Provider 调用约定

每个 provider 实现统一接口：

```ts
interface Provider<TClient> {
  readonly name: CREDENTIAL_PROVIDER;
  getClient(tenantId: number, appId?: string): Promise<TClient>;
  invalidate(tenantId: number, appId?: string): Promise<void>;
}
```

- `getClient` 内部走 `TenantCredentialVault.get(tenantId, name, appId)` 取凭证（LRU + Redis 双层缓存，5min TTL，30s 负缓存），按 `(tenantId, app_id)` 缓存客户端实例。
- 凭证更新 / 轮换会通过 `vault.invalidate` 击穿缓存。
- 上游错误统一封 `ProviderError`（带 `provider` 标签 + `upstreamCode` + `retryable`），`CredentialMissingError` 是没配凭证时的特化。

## 何时需要写 controller / service

业务代码常态下不需要直接接触 vault：

```ts
@Controller('alipay')
export class AlipayController {
  constructor(private readonly provider: AlipayProvider) {}

  @Post('precreate')
  async precreate(@Body() body: PrecreateDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.app_id);
    return client.precreate(stripAppId(body));
  }
}
```

新增 provider 的标准流程见 [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)。

# 测试 (7.x+)

> 7.0.0 起，jest 强制覆盖率门槛（lines/statements/functions ≥ 50%，branches ≥ 35%）。CI 覆盖率回退立刻 fail。

## 三层测试套件

| 层级        | 命令                             | 内容                                                            |
| ----------- | -------------------------------- | --------------------------------------------------------------- |
| Unit        | `pnpm test` (或 `pnpm test:cov`) | `src/**/*.spec.ts`，无外部依赖，含 `coverageThreshold` 阻塞门槛 |
| E2E         | `pnpm test:e2e`                  | `test/e2e/*.e2e-spec.ts`，TestingModule + supertest + stub repo |
| Integration | `pnpm test:integration`          | `test/**/*.integration.spec.ts`，**需要本地 mysql + redis**     |

## 本地跑 Integration

```bash
docker compose -f docker-compose.test.yml up -d   # 起 mysql:8 + redis:7
pnpm test:integration
docker compose -f docker-compose.test.yml down -v
```

## CI 流水线

- `.github/workflows/ci.yml`
  - **ci job**：unit + e2e + build + 覆盖率门槛阻塞
  - **integration-test job** (`needs: ci`)：GitHub Actions services 起 mysql + redis，跑 `pnpm test:integration`
- `.github/workflows/docker.yml`：build + Trivy + SBOM（详见下文部署章节）
- `.github/workflows/codeql.yml`：静态安全分析

## 写新测试

- 单测放 `src/**/*.spec.ts`，与源码同目录
- E2E 放 `test/e2e/*.e2e-spec.ts`，用 TestingModule + supertest + stub repo
- Integration 放 `test/**/*.integration.spec.ts`；不被默认 `pnpm test` 跑，由 CI 单独 job 跑
- 增加新模块时**同步**写 controller spec（mock service）+ service spec（mock repo），避免覆盖率回退

# 部署 (6.x+)

> 6.0.0 起，部署从 pm2 + 单阶段 keymetrics 镜像切换为多阶段 Distroless 镜像 + GitHub Actions 自动发布到 ghcr.io。

## 镜像构建

`Dockerfile` 是多阶段构建：

| 阶段        | base                                          | 作用                                                     |
| ----------- | --------------------------------------------- | -------------------------------------------------------- |
| `deps`      | `node:22-bookworm-slim`                       | 装全量依赖（含 dev）                                     |
| `build`     | `node:22-bookworm-slim`                       | 跑 `pnpm build`，产物到 `api/`                           |
| `prod-deps` | `node:22-bookworm-slim`                       | 重新装 prod-only 依赖                                    |
| `runtime`   | `gcr.io/distroless/nodejs22-debian12:nonroot` | 拷贝 `api/` + `node_modules` + healthcheck，非 root 运行 |

本地构建：

```bash
docker build -t easy-front-nest-service:local .
docker run --rm -p 8000:8000 \
  -e APP_PORT=8000 \
  -e NODE_ENV=production \
  --env-file .env.production.local \
  easy-front-nest-service:local
```

## 健康检查

容器内置 `HEALTHCHECK`（每 30s 一次），通过运行 `node healthcheck.js` 访问 `GET /api/health`：

- 200 → 健康
- 非 200 / 网络错误 → 不健康（Docker / K8s 重启）

K8s 直接用同一 endpoint 配 `livenessProbe` 即可：

```yaml
livenessProbe:
  httpGet: { path: /api/health, port: 8000 }
  periodSeconds: 30
  failureThreshold: 3
```

## CI/CD

| Workflow                          | 触发                               | 用途                                              |
| --------------------------------- | ---------------------------------- | ------------------------------------------------- |
| `.github/workflows/ci.yml`        | push/PR to main                    | Lint / Typecheck / Test / Build                   |
| `.github/workflows/codeql.yml`    | push/PR to main, weekly            | 静态安全分析                                      |
| `.github/workflows/docker.yml`    | push to main, tag `v*`, related PR | 构建镜像 + Trivy HIGH/CRITICAL 阻塞 + SBOM (SPDX) |
| `.github/workflows/pr-checks.yml` | PR                                 | semantic title + size label                       |

镜像默认推到 `ghcr.io/<owner>/<repo>`，tag 形如 `main`, `sha-<short>`, `v1.2.3`, `1.2`, `latest`。镜像扫描产物 (SARIF) 自动上传到 GitHub Code Scanning，SBOM 作为 artifact 保留 30 天。

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
