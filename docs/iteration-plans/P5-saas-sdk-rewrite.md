# P5 · 多租户 SaaS 化 + 第三方 SDK 重写

> 本期总览。作为 `docs/REFACTOR_PLAN.md` P5 的展开版，原计划只是"业务模块剥离"，现升级为"SaaS 化 + SDK 全自研"。
>
> 工时估计 **22 – 28 PD**，跨 **9 个 PR**。

---

## Context

P0–P4 已经把后端从老式单体重塑为：TS 5 / Node 22 / Express / TypeORM / BullMQ / pino / JWT。但仍是**单租户**，且 wx/mp/wxpay 全部依赖 `@easy-front-core-sdk/*`（4 个 npm 包，源码不可控、维护停滞、配置只能 init 时灌入），oss 依赖 `nestjs-ali-oss` 的薄包装。

业务方向变化：**这套服务要做成 SaaS**，对外接入多租户客户。每个租户有自己的微信公众号 / 小程序 / 微信支付商户 / 支付宝商户 / 阿里云 OSS bucket，凭证不能再写在 env 里。

> 上线前**没有真实存量数据**，本期可以 drop 现有 schema 重建，无需 backfill。

## 用户决策（已确认）

| 决策项       | 选择                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------- |
| 数据隔离模型 | **共享 schema + tenant_id 列**（行级隔离），AuditEntity 基类承载                          |
| 租户身份传递 | **JWT claim**：access token 内嵌 `tenant_id`，AsyncLocalStorage 注入请求上下文            |
| 凭证存储     | **专表 `t_tenant_credential`**，secret 字段 AES-GCM 加密（master key 走 env）             |
| PR 排序      | **多租户骨架先行**，再逐个 SDK 重写                                                       |
| SDK 覆盖深度 | **覆盖常用 + webhook/notify**：完整支付 v3 交互、消息推送、JS-SDK 签名、async notify 验签 |
| 控制平面     | **本期一并交付** REST API（/admin/tenants, /admin/users, switch-tenant），UI 后续         |
| 现存数据     | 推倒重来，新建 system 租户（id=0）+ default 业务租户（id=1）做种子                        |
| super-admin  | **要**：system 租户下的超级账号，跨租户读写，`@SuperAdmin` 装饰器守护                     |

---

## 一、目标架构（高维）

```
┌──────────────────────────────────────────────────────────────┐
│  Client（Web / 小程序 / 移动端 / 第三方回调）                 │
└──────────────┬───────────────────────────────────────────────┘
               │ JWT (sub, tenant_id, roles, permissions)
               │ Authorization: Bearer
┌──────────────▼───────────────────────────────────────────────┐
│  AuthGuards: JwtAuthGuard → TenantContextInterceptor →        │
│              RolesGuard → PermissionsGuard                    │
│  AsyncLocalStorage: { tenantId, userId, roles[], isSuper }    │
└──────────────┬───────────────────────────────────────────────┘
               │
       ┌───────▼────────┐    ┌──────────────────┐
       │ Application    │───▶│ TenantScopedRepo │ (TypeORM addEventListener
       │ Services       │    │  自动注入 where) │
       └───────┬────────┘    └──────────────────┘
               │
       ┌───────▼─────────────────────────────────────────────┐
       │ Provider Layer (SDK rewrites)                       │
       │  ─ WxOaProvider     (公众号)                        │
       │  ─ WxMpProvider     (小程序)                        │
       │  ─ WxPayProvider    (微信支付 v3)                   │
       │  ─ AlipayProvider   (支付宝)                        │
       │  ─ OssProvider      (阿里云 OSS)                    │
       │ 每个 provider:                                       │
       │   getClient(tenantId) → 拿凭证 → 返回有状态客户端    │
       │   webhook handler 路由                               │
       └───────┬─────────────────────────────────────────────┘
               │
       ┌───────▼────────┐    ┌──────────────────┐
       │ TenantCredential│   │ Outbox / Notify  │
       │ Vault          │   │ Queue (BullMQ)   │
       │ (AES-GCM enc)  │   │                  │
       └────────────────┘    └──────────────────┘
```

### 核心抽象

- **`TenantContext`** — 通过 `AsyncLocalStorage` 在请求生命周期内携带 `{ tenantId, userId, roles, isSuperAdmin }`。所有下游（service/repo/sdk/cache）从中取值，禁止直接读 `req`。
- **`TenantScope`**（TypeORM `EntitySubscriberInterface`）— `beforeInsert` 自动写 `tenant_id`，`afterLoad`/`select` 通过全局 query builder hook 自动 `WHERE tenant_id = ?`，super-admin 时绕过。
- **`TenantCredentialVault`** — 单一入口 `vault.get(tenantId, provider, key) → { appId, decrypted_secret, cert }`。带 LRU + Redis 双层缓存。Master key from env，AES-256-GCM。
- **`ProviderRegistry`** — `WxOaProvider` / `WxMpProvider` / `WxPayProvider` / `AlipayProvider` / `OssProvider` 实现统一 `Provider` 接口：`getClient(tenantId): Promise<Client>` + `webhookHandler`。Provider 内部用 `vault` 获取凭证，缓存客户端实例（per tenant）。
- **`@SuperAdminOnly()`** — 装饰器 + Guard，标注控制平面接口仅 system 租户超级账号可调，所有调用记 audit log。

---

## 二、PR 分解（9 个 PR）

```
P5-0 foundation ─┬─▶ P5-1 control-plane API ─▶ P5-2 access refactor ─┐
                 │                                                    │
                 └─▶ P5-3 credential-vault ─┬─▶ P5-4 wx-oa SDK        │
                                            ├─▶ P5-5 wx-mp SDK        │
                                            ├─▶ P5-6 wx-pay SDK       │
                                            ├─▶ P5-7 alipay SDK       │
                                            └─▶ P5-8 oss provider     │
                                                                      │
                                            P5-9 cleanup + e2e ───────┘
```

P5-3 ~ P5-8 之间彼此独立，可两人并行。P5-0 / P5-1 / P5-2 串行。P5-9 收尾。

---

### **PR P5-0 · 多租户基础（3 PD）**

**目的**：搭骨架，全局有 `tenantId`，所有现有 entity 加上 `tenant_id`，但**还不区分租户**（用默认 system 兜底，后续 PR 再分流）。

#### 新增

- `src/tenant/tenant.module.ts`（@Global）
  - `AsyncLocalStorage<TenantContext>` provider
  - `TenantContextService` — `run()` / `get()` / `requireTenantId()`
- `src/tenant/tenant-context.interceptor.ts` — 从 `req.user.tenant_id` 读出，调 `TenantContextService.run(...)` 包住后续逻辑。注册为全局 interceptor。
- `src/tenant/tenant-scope.subscriber.ts` — TypeORM `EntitySubscriberInterface`：
  - `beforeInsert`：自动注入 `tenant_id` 到任何继承 `AuditEntity` 的 entity。
  - 全局 query 拦截：通过 `TypeOrmModule.forRootAsync` `extra: { queryRunnerWrapper }` 或更稳妥地走 自定义 `Repository` 基类，在每次 find/findOne 自动加 `where: { tenant_id }`。super-admin 时跳过。
- `src/tenant/decorators/{super-admin,no-tenant-scope}.decorator.ts` — `@SuperAdminOnly()` / `@NoTenantScope()`（system 表如 dictionary 全局只读时使用）。
- `src/tenant/types/tenant-context.ts` — TS 类型。

#### 改

- `src/entities/audit.entity.ts` — 加 `@Column({ type: 'bigint' }) tenant_id!: number`，所有 9 个继承的 entity 自动获得。
- `src/auth/types/jwt-payload.ts` — `JwtAccessPayload` 加 `tenant_id: number; is_super_admin: boolean`。
- `src/auth/auth.service.ts` — `signTokens` 注入 `tenant_id`；`validateUser` 接受 `tenantId` 参数（可空时取用户默认租户）。
- `src/auth/strategies/jwt.strategy.ts` — `validate(payload)` 把 `tenant_id` 透传到 `req.user`。
- `src/auth/guards/jwt-auth.guard.ts` 之后接 `TenantContextInterceptor`（NestJS 顺序：guard → interceptor → controller，AsyncLocalStorage 在 interceptor 启动）。
- `src/service/cache.service.ts` — `tenantedKey(rawKey)` 工具：`t:{tenantId}:{rawKey}`。可选地新增 `setTenanted/getTenanted/...` 一组方法（不破坏现有 API）。
- `src/auth/guards/permissions.guard.ts` + `roles.guard.ts` — 增加 `req.user.is_super_admin === true` 直通。

#### 不动

- 现有 controller / service 行为：他们以为自己仍在单租户世界，由 subscriber 自动加 `tenant_id`。

#### 退出条件

- 启动时 `t_tenant` 还没建（下个 PR），但每个现有表加了 `tenant_id` 列，DDL 通过 migration 上线。
- 单元测试：`TenantContextService.run` 内任何 service 调用 `get()` 都能拿到租户 ID。
- 全套 e2e（11 个）改写为登录 → JWT 含 tenant_id → 受保护接口注入 context，仍全绿。

---

### **PR P5-1 · 控制平面 schema + API（3 PD）**

**目的**：`t_tenant` / `t_tenant_user_relation` / `t_tenant_credential` 上线 + 控制平面 REST。

#### 新增 Entity

- `Tenant` (`t_tenant`):

  - `id` bigint PK
  - `code` varchar(64) UQ — kebab-case slug
  - `name` varchar(128)
  - `status` enum('active','suspended','deleted')
  - `plan` varchar(32) — 自由文本，未来对接计费
  - `metadata` json — 扩展用
  - - audit 字段（继承 AuditEntity，**但 tenant_id 设为指向自身或 0=system**）

- `TenantUserRelation` (`t_tenant_user_relation`):

  - `tenant_id` + `user_id` 复合 UQ
  - `role_in_tenant` enum('owner','admin','member')
  - `joined_at`
  - 用于"一个用户能加入多个租户"的多对多

- `TenantCredential` (`t_tenant_credential`):
  - `id` bigint PK
  - `tenant_id` bigint, NOT NULL, FK
  - `provider` enum('wx_oa','wx_mp','wx_pay','alipay','oss')
  - `app_id` varchar(128) — 公众号/小程序 appId、商户号、bucket name
  - `display_name` varchar(128) — 给运营看的标签
  - `secret_cipher` blob — AES-GCM(secret_plain, master_key)
  - `secret_iv` binary(12)
  - `cert_cipher` blob nullable — 用于 wx_pay 私钥
  - `cert_serial_no` varchar(64) nullable
  - `status` enum('active','disabled')
  - `metadata` json — 比如公众号 token、aes_key、notify_url 等
  - UQ: (tenant_id, provider, app_id)

#### 新增 Service

- `src/tenant/tenant.service.ts`

  - `createTenant(dto)` — 仅 super-admin
  - `suspendTenant(id)` / `activateTenant(id)`
  - `listTenants(query)` — super-admin
  - `getMyTenants(userId)` — 普通用户列出自己加入的
  - `inviteUserToTenant(tenantId, userId, role)`
  - `removeUserFromTenant(tenantId, userId)`
  - `switchTenant(userId, tenantId) → 新 access+refresh`（重新登录到该租户）

- `src/tenant/credential.service.ts`
  - `addCredential(tenantId, dto)`
  - `listCredentials(tenantId, provider?)`
  - `disableCredential(id)`
  - `rotateSecret(id, newSecret)`
  - 内部封装 AES-GCM 加解密

#### 新增 Controller

- `src/tenant/tenant.controller.ts` — `/api/admin/tenants/*`
- `src/tenant/credential.controller.ts` — `/api/admin/tenants/:id/credentials/*`
- `src/auth/auth.controller.ts` 加 `POST /api/auth/switch-tenant` `{ tenant_id }` → 验证用户在该租户的 relation → 重签 token

所有 admin 接口 `@SuperAdminOnly()` 或 `@Roles('owner','admin')` 视场景。

#### 加密工具

- `src/tenant/crypto/aes-gcm.ts` — 纯函数 `encrypt(plain, key) → { cipher, iv }` / `decrypt(cipher, iv, key)`。
- env: `TENANT_MASTER_KEY` (≥ 32 chars, base64). 启动校验。

#### 退出条件

- super-admin 可创建租户、加凭证；secret 在 DB 是密文。
- 用户能 `switch-tenant`，新 token 携带新 tenant_id。
- e2e：tenant CRUD + credential CRUD + switch flow 完整。

---

### **PR P5-2 · access/auth 全面接入租户（2.5 PD）**

**目的**：把 access 模块改成租户感知；登录 / 角色 / 权限 全部按租户隔离。

#### 改

- `AccessService.login`：根据 `account_id` 找 `UserLogin` → 取关联 `User` → 查 `TenantUserRelation` 获取该用户默认 / 当前租户 → 加载该租户内的 roles/permissions → 返回 user。
- `AuthService.signTokens` 注入 `tenant_id`（来自当前租户上下文）+ `is_super_admin`（来自 `system_user` 标记）。
- `loadAuthorities` 加 `where: { tenant_id }`。
- 所有 admin 接口（`set-role` / `set-right` / `get-user-list` 等）—— 通过 `TenantScopeSubscriber` 自动按当前 tenant 隔离，但**新建**用户/角色时需要服务层显式指定 `tenant_id`（subscriber 默认从 context 拿）。
- 增加 `system_users` 概念：
  - `User` 表加 `is_system_admin` boolean（仅 system 租户的 user 可设为 true）
  - JwtPayload 透传

#### 退出条件

- 跨租户测试：tenant=1 用户只能看到 tenant=1 的角色 / 用户列表。
- super-admin 接口能跨租户操作。
- 11 e2e 全部改为 tenant-aware（每个测试 boot 一个 tenant + 一个用户）。

---

### **PR P5-3 · TenantCredentialVault（1 PD）**

**目的**：抽象凭证读取，是 P5-4 ~ P5-8 的依赖。

#### 新增

- `src/tenant/credential-vault.service.ts`
  - `get(tenantId, provider, appId?) → { app_id, secret, cert?, metadata }`
    - 从 redis cache 读（key: `vault:{tenantId}:{provider}:{appId}`，TTL 5min）
    - 读 DB → AES-GCM 解密 → 缓存
  - `invalidate(tenantId, provider)` — 凭证更新时调用
- `Provider` 抽象基类 `src/providers/base/provider.ts`
  ```ts
  export interface Provider<TClient> {
    readonly name: string;
    getClient(tenantId: number, appId?: string): Promise<TClient>;
  }
  ```
- HTTP client 封装 `src/providers/base/http-client.ts`：基于 axios，统一超时、重试（exponential backoff）、trace id 注入、metric 钩子。

#### 退出条件

- 单元测试：vault.get 缓存命中 / miss / TTL / invalidate。
- credential 表有数据时 `vault.get(tenantId, 'wx_oa')` 返回明文 secret。

---

### **PR P5-4 · WxOaProvider（公众号 SDK 重写，3 PD）**

**完整覆盖现有 19 个 endpoints + JS-SDK 签名 + 服务器消息推送**。

#### 新增

- `src/providers/wx-oa/wx-oa.provider.ts` — 实现 `Provider<WxOaClient>`
- `src/providers/wx-oa/wx-oa.client.ts` —
  - `getAccessToken()` — 双层缓存（Redis TTL 7000s + 进程内 LRU 5min）+ 互斥锁（redlock）防并发刷
  - `material.upload/get/getJssdk/addNews/updateNews/uploadImg/addMaterial/addVideoMaterial/getMaterial/delMaterial/getMaterialCount/batchGet`
  - `basic.getApiDomainIp/getCallbackIp/netCheck/clearQuota/getAutoReplyRules`
  - `jssdk.getTicket() / sign(url, nonce, timestamp)` — JS-SDK 签名
  - `notify.verifySignature(query) / decryptMessage(xml)` — 用于 `/wx-oa/webhook` 接收
- `src/providers/wx-oa/wx-oa.controller.ts` — `/api/wx-oa/{appId}/...`
  - `GET /webhook/{appId}` — 验签
  - `POST /webhook/{appId}` — 消息推送，dispatch 到 BullMQ `wx-oa-message` queue
  - 现有的 19 个 endpoints 迁移到这里

#### SnsAccessTokenAPI 同时迁移（之前未注册的 user.controller.ts）

`getAuthorizeUrl/getSnsAccessToken/refreshToken/checkAccessToken/getUserInfo`

#### 删

- `src/modules/wx/` 整个目录
- `init.module.ts` 内 wx 相关 putCore 调用
- `package.json` 的 `@easy-front-core-sdk/wx`

#### 测试

- Mock 微信 API（`nock` 拦截 https://api.weixin.qq.com）
- 每个 endpoint 一个 unit test
- access_token 并发刷新只调一次 API

---

### **PR P5-5 · WxMpProvider（小程序 SDK 重写，2 PD）**

完整覆盖现有 7 个 endpoints + 用户数据解密 + URL Schema/Link。

- `code2Session` — 不缓存（每次都要新 session_key）
- `qrcode.create / getWxAcode / getUnlimited`
- `decryptUserData(encrypted_data, iv, session_key)` — AES-128-CBC PKCS#7
- `urlSchema.generate` / `urlLink.generate`（新加，常用）
- 删 `src/modules/mp/` + `@easy-front-core-sdk/miniprogram`

---

### **PR P5-6 · WxPayProvider（微信支付 v3 完整，4 PD）**

**最重的一个**。当前只有一个 `get-plat-cert`，要补全订单全生命周期。

#### 新增 endpoints

| Endpoint                                          | 用途                                             |
| ------------------------------------------------- | ------------------------------------------------ |
| `POST /api/wx-pay/{tenant}/native`                | Native 扫码下单                                  |
| `POST /api/wx-pay/{tenant}/jsapi`                 | JSAPI 下单（带 prepay_id 给前端）                |
| `POST /api/wx-pay/{tenant}/h5`                    | H5 下单                                          |
| `POST /api/wx-pay/{tenant}/app`                   | APP 下单                                         |
| `GET /api/wx-pay/{tenant}/order/{out_trade_no}`   | 查询订单                                         |
| `POST /api/wx-pay/{tenant}/close/{out_trade_no}`  | 关闭订单                                         |
| `POST /api/wx-pay/{tenant}/refund`                | 申请退款                                         |
| `GET /api/wx-pay/{tenant}/refund/{out_refund_no}` | 查询退款                                         |
| `POST /api/wx-pay/{tenant}/notify/payment`        | **支付结果通知**（验签 + AEAD-AES-256-GCM 解密） |
| `POST /api/wx-pay/{tenant}/notify/refund`         | 退款结果通知                                     |

#### Provider 内部

- mTLS 私钥 + 平台证书管理（启动时拉一次 `/v3/certificates`，本地 cache，定期刷新）
- 请求签名（SHA256-RSA-PKCS1）
- 响应验签（用平台证书）
- AEAD 解密（用 api3secret）
- 幂等：`out_trade_no` UQ + retry-safe

#### 测试

- mock 微信支付 sandbox API
- notify 验签：用真实测试 cert 验证一遍

---

### **PR P5-7 · AlipayProvider（全新，3 PD）**

依赖：`alipay-sdk@4.x` 是官方 sdk 在维护中。**用它 vs 全自研？** —— 选 alipay-sdk 作为底层 HTTP + 签名层，业务封装走自家 Provider。比全自研省 1 PD 且可维护性更好。

#### Endpoints

| Endpoint                                        | 用途                 |
| ----------------------------------------------- | -------------------- |
| `POST /api/alipay/{tenant}/face-to-face`        | 当面付 / 扫码付      |
| `POST /api/alipay/{tenant}/precreate`           | 预下单（生成二维码） |
| `POST /api/alipay/{tenant}/online`              | 网页支付 (PC/Wap)    |
| `POST /api/alipay/{tenant}/app`                 | APP 支付             |
| `GET /api/alipay/{tenant}/query/{out_trade_no}` | 订单查询             |
| `POST /api/alipay/{tenant}/refund`              | 退款                 |
| `POST /api/alipay/{tenant}/notify`              | 异步通知（验签）     |

#### 凭证

- `app_id`、`merchant_private_key`、`alipay_public_key`、`encrypt_key`（可选）
- 全部存 `t_tenant_credential`，cert_cipher 字段

---

### **PR P5-8 · OssProvider（2 PD）**

#### 新增

- `src/providers/oss/oss.provider.ts` — 直接用 `ali-oss` package（轻量、官方维护），但不再走 `nestjs-ali-oss` 包装
  - `put(tenantId, key, file)`
  - `signedUrl(tenantId, key, ttl)` — 生成下载签名 URL
  - `stsUploadParams(tenantId, options)` — 替代 ali-oss-helper.ts
- `src/providers/oss/oss.controller.ts`
  - `POST /api/oss/{tenant}/upload`（含权限 `oss:upload`）
  - `POST /api/oss/{tenant}/sign-upload-params`
  - `GET /api/oss/{tenant}/signed-url`
- 凭证：`access_key_id` / `access_key_secret` / `bucket` / `endpoint` / `domain` 都 per-tenant

#### 删

- `src/modules/oss/`
- `src/libs/ali-oss-helper.ts`
- npm: `nestjs-ali-oss`

---

### **PR P5-9 · 收尾 + e2e + docs（1.5 PD）**

- 删干净 `init.module.ts`（已无用），`@easy-front-core-sdk/*` 全部 npm remove
- README 加"多租户" + "Provider 配置" 章节
- CONTRIBUTING.md 加"新增 Provider 流程" 章节
- e2e 套件加：tenant 隔离冒烟（A 租户用户读 B 租户数据 → 403）+ super-admin 跨租户（system 用户跨读 → 200）+ provider mock 集成（每个 provider 至少 1 个端到端 mock 测试）

---

## 三、关键 Cross-cutting 决策

### 3.1 TypeORM 自动 tenant_id 拦截怎么实现

NestJS + TypeORM 0.3 没原生 multi-tenant。两个候选：

| 方案                                       | 实现                                                                                                                                                                                            | 可控性 | 推荐 |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| **`Repository` 基类自动注入**              | 自家 `TenantedRepository<T>` 包 `Repository<T>`，覆盖 `find/findOne/createQueryBuilder/save`，从 `TenantContext` 取 id 注入 where。所有 service 注入 `TenantedRepository` 而不是 `Repository`。 | 最高   | ✅   |
| `EntitySubscriberInterface.afterLoad` 过滤 | 粒度太粗（DB 还是查全表，应用层 filter 浪费 IO）                                                                                                                                                | 低     | ❌   |
| `addQueryBuilderHook` (TypeORM patch)      | 改框架                                                                                                                                                                                          | 低     | ❌   |

走 **TenantedRepository 基类**。`@SuperAdminOnly` 接口注入原生 `Repository`，绕过过滤。

### 3.2 凭证加密 master key 管理

- env: `TENANT_MASTER_KEY=<base64 32 bytes>`
- 启动时校验长度，缺失 → 生产 fail-fast / dev fallback
- Rotate：双 key 期间，DB 加 `key_version` 列，解密时尝试两个 key
- 远期可上 KMS / Vault，但当前 env-based 足以

### 3.3 控制平面安全

- `@SuperAdminOnly()` Guard：检查 `req.user.is_super_admin === true && req.user.tenant_id === SYSTEM_TENANT_ID(0)`
- 所有 super-admin 调用强制写 `t_user_oplog`，`target_type='cross_tenant'`，并在响应头加 `X-SuperAdmin-Action: true` 方便前端审计提示
- `inviteUserToTenant` 时 user 必须已存在（不创建匿名用户）；`tenant.owner` 角色才能 invite

### 3.4 webhook 域名

每个 provider 的 notify URL 携带 `{tenantId}`：`https://api.example.com/api/wx-pay/{tenantId}/notify/payment`。租户在微信商户后台配自己的 URL；服务端从路径取 tenantId、查凭证、验签。

避免单一 notify URL 的"按内容路由"复杂度（cert/secret 还没拿到就要验签）。

---

## 四、依赖与 npm 变化

### 删除

- `@easy-front-core-sdk/kits`
- `@easy-front-core-sdk/miniprogram`
- `@easy-front-core-sdk/wx`
- `@easy-front-core-sdk/wxpay`
- `easy-front-core-sdk`
- `nestjs-ali-oss`

### 新增

- `alipay-sdk@^4` — 支付宝官方维护，做底层签名+HTTP，业务封装自家
- `axios` — provider HTTP 调用（如未在 deps）
- `nock` (dev) — provider 单测的 HTTP mock

### 保留

- `ali-oss` — 阿里云 OSS 官方 sdk，直接用
- `crypto-js` — 已在用
- `jsonwebtoken` / `passport-jwt` — 已在用

---

## 五、测试与验证

### 单元测试

- `TenantContextService` / `TenantedRepository` 行为
- `CredentialVault` 加解密 + cache
- 每个 Provider 的 client 方法（mock HTTP）
- 控制平面 service 各方法

### 集成 / e2e

- 多租户隔离冒烟：A 租户用户读 B 租户 `/access/get-user-list` → 仅返回 A 的用户
- super-admin 跨租户读 → 返回 all
- 每个 provider 的 webhook 端到端：构造 mock 请求 → 验签通过 → 响应 200
- 每个 provider 的 happy path：`getClient → call API mock → assert response`

### 回归

- 所有现有 22 unit + 11 e2e 都需要适配（加 tenant context）

---

## 六、工时与节奏

| PR                    | 工时       |
| --------------------- | ---------- |
| P5-0 多租户基础       | 3 PD       |
| P5-1 控制平面         | 3 PD       |
| P5-2 access 接入      | 2.5 PD     |
| P5-3 credential vault | 1 PD       |
| P5-4 wx-oa            | 3 PD       |
| P5-5 wx-mp            | 2 PD       |
| P5-6 wx-pay           | 4 PD       |
| P5-7 alipay           | 3 PD       |
| P5-8 oss              | 2 PD       |
| P5-9 收尾             | 1.5 PD     |
| **合计**              | **~25 PD** |

双人并行（A 主攻 P5-0/1/2/9，B 主攻 P5-3 后接 P5-4/5/6/7/8），日历 ~3 周。

---

## 七、风险与回滚

| 风险                                               | 缓解                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| TenantedRepository 拦截漏掉某些 `query()` 原生 SQL | 全仓 `grep -rn "query(\|createQueryBuilder("`，强制 review；e2e 隔离冒烟兜底               |
| Master key 误丢                                    | 启动校验 + 备份策略文档化；rotate 流程提前演练                                             |
| 微信支付 notify 验签错误率                         | 用沙箱环境跑全套，cert 缓存 1h 后强制 refresh                                              |
| Alipay SDK v4 与现有 axios 版本冲突                | spike 阶段先验证；冲突则 alipay-sdk 走 isolated module                                     |
| 控制平面 SuperAdmin 误用                           | 强制 audit log + 接口前端二次确认 + 接口前缀 `/api/admin/` 在 nginx 层加 IP 白名单（可选） |

每个 PR 独立可 revert；P5-0 之前 `main` 是单租户基线。

---

## 八、最终一键验证

```bash
pnpm install --frozen-lockfile
pnpm lint && pnpm typecheck
pnpm test --coverage
pnpm test:e2e
pnpm exec nest build

# 静态契约
grep -r "@easy-front-core-sdk\|nestjs-ali-oss" src/ | wc -l                                         # = 0
grep -rn "Repository<.*>" src/ | grep -v "TenantedRepository\|@SuperAdmin" | xargs -I{} echo "review: {}"  # 全部 super-admin 通道审过

# 运行时探针
curl -X POST http://localhost:3000/api/auth/login \
  -d '{"account_id":"super","account_pwd":"...","login_client":1}'
# → 返回 access token，payload 含 tenant_id=0, is_super_admin=true

curl -X POST http://localhost:3000/api/admin/tenants \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"code":"acme","name":"Acme Inc"}'
# → 创建租户

curl -X POST http://localhost:3000/api/admin/tenants/2/credentials \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"provider":"wx_oa","app_id":"wx...","secret":"...", "metadata": {"token":"..."}}'
# → 凭证入库（密文）

# 切换到 acme 租户
curl -X POST http://localhost:3000/api/auth/switch-tenant \
  -H "Authorization: Bearer ${TOKEN}" -d '{"tenant_id":2}'
# → 新 token

# 获取该租户公众号 access_token
curl -X POST http://localhost:3000/api/wx-oa/get-access-token -H "Authorization: Bearer ${ACME_TOKEN}"
# → provider 从 vault 取凭证，调微信 API，返回
```
