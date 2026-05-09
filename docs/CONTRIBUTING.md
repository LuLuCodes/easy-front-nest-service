# 贡献与协作流程

本项目采用 **PR-only** 工作流：任何代码改动都必须通过 Pull Request 合入 `main`。

## 1. 分支策略

| 分支                      | 用途          | 来源   | 合并目标                        |
| ------------------------- | ------------- | ------ | ------------------------------- |
| `main`                    | 永远可发布    | —      | —                               |
| `feature/<ticket>-<slug>` | 新功能 / 重构 | `main` | `main`                          |
| `fix/<ticket>-<slug>`     | 缺陷修复      | `main` | `main`                          |
| `hotfix/<ticket>`         | 紧急生产修复  | `main` | `main` + cherry-pick 到 release |
| `release/<version>`       | 发版准备      | `main` | `main`（打 tag）                |

> 老分支 `dev_10` / `dev-4.0.0` 在 P0 阶段后将被 archive 并删除。如有未合并提交，先挑出来转成 `feature/*` 重发 PR。

## 2. Commit 与 PR 规范

- **Commit message** 与 **PR title** 都遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- 类型白名单：`feat / fix / refactor / docs / test / chore / perf / ci / build / style / revert`
- PR 描述使用仓库内 PR 模板，必须填写 Why / What / Test Plan / Risk / Rollback
- PR 体量建议：单 PR < 500 行（自动打 size label，> 1000 行会被警告）
- 推荐使用 `pnpm cz` 通过 commitizen 交互式生成 commit

## 3. 本地开发流程

```bash
# 1. 安装依赖（pnpm 是唯一支持的包管理器）
pnpm install

# 2. 启动开发服务
pnpm start:dev

# 3. 提交前自动跑 lint-staged + commitlint（husky 钩子）
git add .
git commit -m "feat: add xxx"

# 4. 推送并发起 PR
git push -u origin feature/xxx
gh pr create --fill
```

## 4. CI 流水线

每个 PR 会触发以下检查（必须全绿才允许 merge）：

| Check                           | 来源                              | 阻塞        |
| ------------------------------- | --------------------------------- | ----------- |
| Lint / Typecheck / Test / Build | `.github/workflows/ci.yml`        | ✅          |
| Semantic PR title               | `.github/workflows/pr-checks.yml` | ✅          |
| PR size label                   | `.github/workflows/pr-checks.yml` | ❌ (仅警告) |
| CodeQL                          | `.github/workflows/codeql.yml`    | ✅          |
| Auto Label                      | `.github/workflows/label.yml`     | ❌          |

## 5. 仓库管理员需要在 GitHub UI 完成的配置

> ⚠️ 这部分需要 admin 权限，无法通过代码 PR 完成。

### 5.1 Default branch

确认 `main` 是默认分支：**Settings → Branches → Default branch**

### 5.2 Branch protection on `main`

**Settings → Branches → Add branch ruleset** （或 Branch protection rules）

启用以下选项：

- ✅ **Require a pull request before merging**
  - Require approvals: `1`（单人项目可设为 `0`，仅依赖 CI）
  - Dismiss stale approvals when new commits are pushed
- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - 必选 checks：
    - `Lint / Typecheck / Test / Build`
    - `Semantic PR title`
    - `Analyze (javascript-typescript)` (CodeQL)
- ✅ **Require conversation resolution before merging**
- ✅ **Require linear history**（禁 merge commit，强制 squash/rebase）
- ✅ **Restrict who can push to matching branches** → 只允许通过 PR
- ✅ **Block force pushes**
- ✅ **Restrict deletions**
- ✅ **Require signed commits**（可选，建议开启）

### 5.3 Secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret 名称         | 说明                                     |
| ------------------- | ---------------------------------------- |
| `REGISTRY_USER`     | 阿里云镜像仓库账号（替换原 GitLab 明文） |
| `REGISTRY_PASSWORD` | 阿里云镜像仓库密码（**记得先 rotate**）  |
| `CODECOV_TOKEN`     | Codecov 上传 token（如启用）             |

### 5.4 General settings

- ✅ **Automatically delete head branches**（PR 合并后自动删除源分支）
- ✅ **Allow squash merging**（推荐唯一允许的合并方式）
- ❌ Allow merge commits（关闭）
- ❌ Allow rebase merging（关闭）

### 5.5 Auto-merge & Dependabot

- ✅ Enable **auto-merge** at repository level
- Dependabot 已通过 `.github/dependabot.yml` 配置每周扫描

## 6. 安全凭证管理

历史版本的 `.gitlab-ci.yml` 曾把阿里云镜像仓库账号密码硬编码在文件里（具体值已不再展示，旧密码已于 2026-05-07 rotate 失效）。当前规则：

- **任何凭证、token、API Key 都不得写入仓库**（包括示例、注释、文档）
- 所有 CI 需要的凭证一律走 **GitHub Secrets**：`Settings → Secrets and variables → Actions`
- 本地开发用的环境变量写在 `.env.local`（已在 `.gitignore`），不进 git
- 提交前可以本地跑 `gitleaks detect --source . --no-git` 自检

> 旧密码仍残留在 git 历史 commit `89bab0f` 中。由于密码已 rotate 失效、且重写历史会破坏现有 clone 与 tag，决定保留历史。如未来要开源仓库，需重新评估。

## 7. 认证 (5.0+)

5.0.0 起，认证从 session+MD5 切换为 JWT + Passport。下游必须配合升级，没有双轨期。

### 7.1 必要环境变量

```env
JWT_ACCESS_SECRET=<≥ 32 位随机字符串>
JWT_REFRESH_SECRET=<≥ 32 位随机字符串>
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d
REFRESH_COOKIE_NAME=refresh_token
REFRESH_COOKIE_SECURE=true
REFRESH_COOKIE_SAMESITE=lax
REFRESH_COOKIE_PATH=/api/auth
```

生产环境未设置 `JWT_*_SECRET` 时启动失败。Dev/test 环境会落在确定性占位值上，不阻塞本地开发。

### 7.2 客户端契约

| 端点                     | 鉴权                            | 用途                                                                                                    |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `POST /api/auth/login`   | `@Public()`                     | 账号密码登录，返回 `{ accessToken, refreshToken, refreshExpiresIn, user }` + Set-Cookie `refresh_token` |
| `POST /api/auth/refresh` | `@Public()`，校验 refresh token | Web 自动带 cookie；Mobile/小程序在 body 传 `{ refreshToken }`。返回新 access + refresh                  |
| `POST /api/auth/logout`  | Bearer access                   | 清 cookie + 写 oplog                                                                                    |
| `GET /api/auth/me`       | Bearer access                   | 返回当前用户（不含 `sub`）                                                                              |
| 所有受保护接口           | Bearer access                   | 默认全局 `JwtAuthGuard` 拦截，未通过返回 401                                                            |

关键变更：

- 不再读 `X-Auth-Token` header
- 不再下发 session cookie
- access token 默认 15 分钟过期；权限变更通过 refresh 一轮即生效

### 7.3 服务端装饰器

```ts
import { Public, Roles, Permissions, CurrentUser } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';

@Public()                           // 跳过 JwtAuthGuard
@Roles('admin')                     // 角色名匹配（来自 t_user_role.role_name）
@Permissions('access:user:edit')    // 权限码匹配（来自 t_user_right.right_code）
async handler(@CurrentUser() user: AuthenticatedUser) { ... }
```

`@Roles` / `@Permissions` 都按"任一即放行"语义校验 token 中携带的列表。`@Public()` 优先于其它装饰器。

### 7.4 强制下线

JWT 是无状态签发，不可单点撤销。强制下线方案：

- 短 access TTL（默认 15m）配合 refresh 重新签发，权限变化即生效
- 必要时在 `CacheService` 中维护 refresh 黑名单，`AuthService.refresh` 命中黑名单即拒绝（钩子已预留）

## 8. 多租户 (5.x+)

> P5 后所有业务都是租户感知的。本节介绍模型 + 新增 provider 的标准流程。

### 8.1 模型与运行时

- **数据隔离**：所有继承 `AuditEntity` 的表都有 `tenant_id` 列；`TenantScopeSubscriber` 在 `beforeInsert` 自动注入，在查询路径自动追加 `WHERE tenant_id = ?`，super-admin 时跳过。
- **请求上下文**：`JwtAuthGuard → TenantContextInterceptor` 把 `tenant_id` / `userId` / `roles` / `isSuperAdmin` 写进 `AsyncLocalStorage`。下游一律 `tenantContext.requireTenantId()`，禁止从 `req.user` 透传。
- **凭证存储**：`t_tenant_credential` 列 `secret_cipher / cert_cipher` AES-256-GCM 加密，`master key` 来自 env `TENANT_MASTER_KEY`。读取走 `TenantCredentialVault`（LRU + Redis 双层缓存，5min TTL，30s 负缓存），凭证更新经控制平面会自动 invalidate。

### 8.2 新增 Provider 流程

新增第三方平台（如新增"抖音支付"）的标准步骤：

1. **凭证字段建模**：在 `CREDENTIAL_PROVIDER` 枚举里增加 slug；如果该 provider 用 `cert` 字段，且需要序列号，复用 `cert_serial_no`。`metadata` 里的非密配置写明 TS 接口。
2. **placement**：放到 `src/providers/<slug>/`，遵循 `wx-pay` / `alipay` / `oss` 现有布局：

   ```
   src/providers/<slug>/
   ├── types.ts                  // 凭证 metadata + 请求 / 响应类型
   ├── <slug>.dto.ts             // class-validator DTO
   ├── <slug>.client.ts          // 包装 SDK / 自己写底层签名 / HTTP
   ├── <slug>.client.spec.ts     // 单元测试 (mock 上游)
   ├── <slug>.provider.ts        // implements Provider<...>，按 (tenant, app_id) 缓存 client
   ├── <slug>.controller.ts      // REST endpoints + webhook
   └── <slug>.module.ts
   ```

3. **Provider 接口**（`src/providers/base/provider.ts`）：

   ```ts
   export interface Provider<TClient> {
     readonly name: CREDENTIAL_PROVIDER;
     getClient(tenantId: number, appId?: string): Promise<TClient>;
     invalidate(tenantId: number, appId?: string): Promise<void>;
   }
   ```

   - `getClient` 必须用 `vault.get(tenantId, this.name, appId)` 取凭证；缺失抛 `CredentialMissingError`。
   - 客户端实例按 `${tenantId}:${app_id}` 维度缓存（避免多租户互踩）。
   - 长生命周期资源（access_token、平台证书）放专门的 store / cache，不要写进 client 实例字段。

4. **错误约定**：业务失败抛 `ProviderError({ provider, message, upstreamCode, retryable })`；transient 错误（网络抖动）走 `HttpClient` 自带的 exponential backoff retry，不要自己 wrap。

5. **回调（webhook / notify）**：

   - 路由形如 `POST /api/<slug>/notify/:tenantId/:appId`，标 `@Public()`（不走 JWT）。
   - **必须先验签再处理**，验签失败直接抛 `ProviderError`，不要落到业务层。
   - 校验后将 payload 入 BullMQ，独立 retry，再向上游回 ack（避免 ack 超时把签名好的 notify 丢了）。

6. **测试矩阵**：

   - 单元：客户端的每个 happy / error / 验签分支（参考 `src/providers/wx-pay/`）。
   - e2e：`test/e2e/providers-smoke.e2e-spec.ts` 加一节，覆盖 `getClient` 缺凭证 / 有凭证 / 缓存 / invalidate。
   - 不要为每个 provider 启真实 HTTP — 单元里 mock SDK / `HttpClient` 即可。

7. **wire-up**：

   - 在 `src/app.module.ts` 注册新 `<Slug>Module`。
   - 在 `t_tenant_credential` 已有 enum 上增加新值需要 migration。
   - README "Provider 配置" 表格里加一行。

### 8.3 控制平面调用

为现有租户增配凭证：

```bash
curl -X POST http://localhost:3000/api/admin/tenants/$TID/credentials \
  -H "Authorization: Bearer $SUPER_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "alipay",
    "app_id": "2014072300007148",
    "secret": "-----BEGIN PRIVATE KEY-----...",
    "cert":   "-----BEGIN PUBLIC KEY-----...",
    "metadata": { "key_type": "PKCS8", "notify_url": "https://..." }
  }'
```

Server 端立即 AES-GCM 加密入库；vault 在下次读取时缓存解密结果。

## 9. P0 之后即将启用的进阶规则（预告）

- 测试覆盖率门槛：先 50%，下期 80%（P7）
- 分支 owner 按目录细化（P5 完成后）
- 自动发版：`release-please` 或 `changeset`（P6）
