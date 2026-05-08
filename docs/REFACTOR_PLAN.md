# NestJS 项目重构分析与渐进式重构方案

> 项目：`easy-front-nest-service`
> 当前分支：main · 分析日期：2026-05-07

## Context（重构背景）

这是一份服务于 easy-front 前端生态的 NestJS 后端服务模板。`package.json` 已升级到 NestJS v10，但代码组织、依赖选型、安全实现、工程化体系仍停留在 v8/v9 早期风格：自研 MD5 签名认证、无 migration、自封装 Redis 缓存、log4js、Bull v4、单阶段 Docker + Node 12 PM2、覆盖率几乎 0、业务模块（wx/oss/sms）与基础设施混杂。

目标是把它打造成一份**面向 2026 年的、可被任意 NestJS 项目复用的纯净基础模板**，业务模块剥离到独立包，老业务项目通过渐进式过渡接入新模板。

---

## 一、现状盘点

### 1.1 技术栈版本

| 模块         | 当前                                           | 状态              |
| ------------ | ---------------------------------------------- | ----------------- |
| @nestjs/core | ^10.3.5                                        | ⚠️ 主流已 v11     |
| TypeScript   | ^4.9.5                                         | ⚠️ 主流 5.4+      |
| Node 引擎    | ^16 (隐含)                                     | ⚠️ EOL            |
| ORM          | Sequelize 6 + sequelize-typescript             | 小众              |
| 缓存         | @liaoliaots/nestjs-redis + 自封装 CacheService | 与官方生态脱节    |
| 队列         | Bull v4                                        | BullMQ 已是新标准 |
| 日志         | log4js                                         | 应迁 pino         |
| 鉴权         | 自研 session+MD5 签名                          | 不安全、不标准    |

### 1.2 src 结构

```
src/
├── main.ts (手写 helmet/CORS/multer/bodyParser/session+Redis)
├── app.module.ts (240+ 行，配置堆积)
├── db.module.ts / init.module.ts
├── config/   decorator/   dto/   filter/   guard/   interceptor/
├── libs/     middleware/  models/      modules/    pipe/    service/
└── modules/{access,basic,wx,wxpay,mp,oss,oplog}
```

### 1.3 关键问题汇总

| #   | 项目           | 问题                                               |
| --- | -------------- | -------------------------------------------------- |
| 1   | TS / Node      | 4.9 / 16，类型与运行时双双过期                     |
| 2   | ORM            | Sequelize 类型差，**无 migration（用 sync 改表）** |
| 3   | 鉴权           | session + MD5 签名，权限校验在 controller 手写     |
| 4   | 缓存/队列/日志 | 自封装 / Bull v4 / log4js，全脱离官方生态          |
| 5   | 测试           | src/ 下 0 个 spec，覆盖率 ≈ 0%                     |
| 6   | 业务混杂       | wx / wxpay / mp / oss / sms 全在主仓               |
| 7   | DTO 污染       | BaseDTO 携带 cache_key / del_cache_key 业务字段    |
| 8   | Docker         | 单阶段 + Node 12 + PM2                             |
| 9   | CI             | 仅 GitLab CI、密码明文                             |
| 10  | 命名           | 目录单数、表 T_xxx 前缀                            |

---

## 二、重构方向决策

| 维度     | 选择                                                                |
| -------- | ------------------------------------------------------------------- |
| 重构策略 | 渐进式原地重构                                                      |
| ORM      | 切 TypeORM（带原生 migration）                                      |
| 表名兼容 | 保留 `T_xxx` 老表名，Entity 类名现代化（`@Entity('t_user')` 映射）  |
| 鉴权     | JWT + Passport + Refresh Token + `@Roles/@Permissions` 装饰器       |
| 业务模块 | wx / wxpay / mp / oss / sms 全部从模板剥离                          |
| 部署     | 多阶段 Docker + Node 22 LTS（弃 PM2）                               |
| CI 门槛  | GitHub Actions：lint+typecheck+test，覆盖率先 50% → 下期 80%        |
| 协作流程 | 完整 PR 流程（分支保护 + PR 模板 + CODEOWNERS + Dependabot/CodeQL） |
| Bun 引入 | 不在主线，作为可选 P8 阶段评估；先 Fastify Adapter 拿性能           |

---

## ⚠️ 立即处置（已完成，2026-05-07）

历史版本的 `.gitlab-ci.yml` 中曾存在阿里云容器镜像仓库的**明文凭证**（已失效，不再展示具体值）。处理时间线：

- ✅ **2026-05-07**：阿里云仓库账号密码已 rotate
- ✅ **2026-05-07**：`.gitlab-ci.yml` 已在 P0 commit 中删除
- ✅ **2026-05-07**：本文件与 `docs/CONTRIBUTING.md` 中的明文示例已抹除
- ⏳ **待办**：在 GitHub Secrets 中存储新凭证（`REGISTRY_USER` / `REGISTRY_PASSWORD`），供 P6 阶段的 docker.yml 工作流读取

> 旧密码仍残留在 git 历史 commit `89bab0f` 中。由于密码已失效，且重写历史会破坏现有 clone 与 tag，决定不重写历史。如未来需开源此仓库，需重新评估。

---

## 三、分阶段实施计划（7 阶段，约 21 PD）

阶段依赖图：

```
P0 工具链 ─┬─▶ P1 公共层瘦身 ─┬─▶ P3 数据层迁移 ─┬─▶ P5 业务剥离
           │                   │                  │
           └─▶ P2 基础设施替换 ─┘                  └─▶ P4 认证替换
                                                         │
                                            P6 部署/CI 现代化（任意阶段后并行）
                                            P7 测试体系（贯穿）
```

### P0 · 工具链升级 + 测试基线 + 完整 PR 流程（2.5 PD）

- **目标**：Node 22 LTS / TS 5.x / ESLint flat config；废弃 GitLab CI 改 GitHub Actions；建立强制 PR + 分支保护 + CODEOWNERS + 自动依赖更新
- **现状关键问题**（探查得出）：

  - 仓库托管在 GitHub (`LuLuCodes/easy-front-nest-service`)，CI 却在 GitLab —— 错位严重
  - 当前活跃分支 `main` / `dev_10` / `dev-4.0.0`（长寿大分支会堆冲突）
  - 无 `.github/` 目录（无 PR 模板、CODEOWNERS、Actions、Dependabot、CodeQL）
  - husky 是 v4 老格式（`package.json` 内嵌 hooks），需升 v9
  - `lint-staged` 配置错位（`*.js → standard`，但项目用 ESLint 且主体是 TS）

- **改**：

  - `package.json` engines/scripts、移除 `husky` v4 配置、修正 `lint-staged`
  - `tsconfig*.json`、`commitlint.config.js`
  - `dockerfile`（暂保留，P6 再大改）

- **新增（工程化与工具链）**：

  - `eslint.config.mjs`（flat config，含 TS、prettier、import 排序）
  - `.husky/pre-commit`（跑 lint-staged）
  - `.husky/commit-msg`（跑 commitlint）
  - `.lintstagedrc.json`（`*.{ts,js}` → `eslint --fix && prettier --write`）
  - `.nvmrc`（`22`）
  - `.editorconfig`

- **新增（PR 流程基础设施）**：

  - `.github/PULL_REQUEST_TEMPLATE.md` — 强制 Why / What / Test Plan / Risk / Rollback
  - `.github/ISSUE_TEMPLATE/bug_report.yml`、`feature_request.yml`
  - `.github/CODEOWNERS` — 按目录指定 review 人（如 `src/auth/ @x` `src/database/ @y`）
  - `.github/workflows/ci.yml` — push/PR 触发：`install → lint → typecheck → unit test → e2e → 上传 coverage`
  - `.github/workflows/pr-checks.yml` — semantic PR title 校验、size-label、changeset/changelog 提醒
  - `.github/workflows/codeql.yml` — GitHub 原生 SAST（每周 + PR 触发）
  - `.github/dependabot.yml` — npm + docker + actions 三类，weekly 分组合并
  - `.github/labeler.yml` + `.github/workflows/label.yml` — 按文件路径自动打 label
  - `.gitignore` 补 `.idea/`、`coverage/`、`.env.local` 等

- **删**：`.gitlab-ci.yml`、`.eslintrc.js`、`.eslintignore`、`.prettierrc`、`package.json` 中的 `husky` 字段

- **配置（GitHub UI 或 admin API，需仓库管理员操作）**：

  - **Branch protection on `main`**：必须 PR、必须过 CI、至少 1 review、`Require linear history`、禁 force push、禁直推
  - **Default branch** = `main`
  - **Auto-delete branch on merge** 启用
  - **Require signed commits**（可选，建议开）
  - **Secrets**：`REGISTRY_USER`、`REGISTRY_PASSWORD`（替换 GitLab CI 明文）、`CODECOV_TOKEN`、`NPM_TOKEN`（如有私仓发布）

- **分支策略（统一约定写入 README）**：

  - `main` — 永远可发布
  - `release/<version>` — 发版准备，从 main cut，PR 回 main
  - `feature/<ticket>-<slug>` — 从 main 切，PR 回 main
  - `hotfix/<ticket>` — 从 main 切，PR 回 main 并 cherry-pick 到 release
  - **逐步收编 `dev_10` / `dev-4.0.0`**：把未合并的提交挑出来转成 feature 分支重发 PR，老分支 archive 后删除

- **退出条件**：
  - `pnpm install && pnpm lint && pnpm typecheck && pnpm build && pnpm test` 全部 exit 0
  - 任意 push 到 main 被 GitHub 拒绝（必须 PR）
  - GH Actions PR 流水线绿
  - `gh pr view` 可看到 PR template 自动填充
  - Dependabot 已发出第一批 PR
- **破坏性**：协作方式变化（直推 main 被禁）；运维需更新发布脚本（GitLab Runner → GitHub Actions）
- **回滚**：保留 `.gitlab-ci.yml.bak` 一周；分支保护可临时降级

### P1 · main.ts 拆分 + BaseDTO 净化 + 目录规范（2 PD）

- **目标**：`bootstrap/` 拆出每段配置；DTO 去业务字段；目录统一 kebab-case
- **改**：`src/main.ts`（只剩 NestFactory + listen）、`src/app.module.ts`（< 80 行）
- **新**：`src/bootstrap/{security,body,session,swagger,filters,pipes}.ts`、`src/common/dto/base.dto.ts`（纯字段）
- **改**：`src/dto/BaseDTO.ts` 拆 `BaseQueryDto` + `PaginationDto`，`cache_key` 改 `@CacheKey()` 装饰器
- **桥接**：旧 `BaseDTO` 留 re-export 一周 + `@deprecated`
- **退出条件**：`main.ts` < 30 行；`/api/health` 200；Swagger `/docs` 可访问
- **破坏性**：DTO 字段位置变化，需回归 access/basic 列表接口

### P2 · 基础设施替换：log/queue（**调整范围后约 1.5 PD**）

> **2026-05-08 调研后调整**：原 plan 写「CacheService → @nestjs/cache-manager」，
> 实地看代码后决定**取消**。理由见下方调研记录。

#### P2 调研结果（2026-05-08）

| 替换面                           | 调研结论                                                                                                                                                                                                                                                                                          | 决定                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **log4js → pino**                | 仅 `src/libs/log4js.ts`(158L) + `src/config/log4js.ts`(111L) + 4 个调用点（middleware/pipe/3 个 filter）；调用面只有 `logger.{log,info,warn,error,fatal,trace,debug}`                                                                                                                             | ✅ 执行                      |
| **CacheService → cache-manager** | `CacheService` 暴露 **13 个方法**：`exists/set/get/del/decrby/incrby/sadd/sismember/hget/hmget/hset/hmset/expire`，其中过半是 Redis 结构化数据 API（Hash/Set/计数器）。`@nestjs/cache-manager` 只抽象简单 KV，**强行替换会丢能力**。`@liaoliaots/nestjs-redis` 本身是活跃维护的好库，没有更换必要 | ❌ **不替换**，保留现状      |
| **Bull → BullMQ**                | 2 个全局队列 `api-log`/`op-log` + 1 个 access 模块本地队列；3 个生产者 + 1 个消费者；BullMQ 跟 Bull API 大致兼容，主要变化是 `@Process` → `@Processor`(class) 模式                                                                                                                                | ✅ 执行                      |
| **Bonus 发现**                   | `api-log` 队列**没有 consumer**！LoggerMiddleware push 进 Redis 但永远没人消费，是个死队列堆积                                                                                                                                                                                                    | 顺手处理：补 consumer 或废弃 |

#### P2-A · log4js → pino（1 PD）

- **改**：`src/middleware/logger.middleware.ts`、`src/pipe/validation.pipe.ts`、`src/filter/{any,http,other}-exception.filter.ts` —— 替换 `LoggerFactory.getInstance()` 调用为 NestJS `Logger`（`nestjs-pino` 提供）
- **新**：`src/common/logger/logger.module.ts`、`src/common/logger/logger.config.ts`
- **改**：`src/main.ts` / `bootstrap` —— 在 `NestFactory.create` 时启用 `bufferLogs:true` + `app.useLogger(app.get(Logger))`
- **删**：`src/libs/log4js.ts`、`src/config/log4js.ts`
- **依赖**：`pnpm add nestjs-pino pino pino-http pino-pretty` / `pnpm remove log4js stacktrace-js chalk`（chalk 仅 log4js wrapper 用了）
- **退出条件**：`grep -rE "log4js\|stacktrace-js" src/` 为空；启动后 `/api/health` 仍 200；HTTP 请求自动出结构化 JSON 日志

#### P2-B · Bull → BullMQ + 修死队列（0.5 PD）

- **改**：`src/app.module.ts`、`src/modules/{access,oplog}/*.module.ts` —— `BullModule.forRootAsync` API 微调；`registerQueue` 配置不变
- **改**：`src/middleware/logger.middleware.ts`、`src/modules/oplog/oplog.service.ts` —— `Queue` 类型从 `bull` 换 `bullmq`
- **改**：`src/modules/oplog/oplog.processor.ts` —— `@Processor('op-log')` + `@Process('oplog')` → `@Processor('op-log')` class 继承 `WorkerHost` 重写 `process()` 方法（BullMQ 标准）
- **`api-log` 死队列处置**（2 选 1）：
  - **选项 1（推荐）**：彻底废弃，删 `BullModule.registerQueue({name: 'api-log'})`，删 LoggerMiddleware 中 `use_log_queue` 分支。HTTP 日志走 pino-http 即可，无需队列。
  - 选项 2：补一个 `api-log` 的 processor，把消息消费写库或文件
- **依赖**：`pnpm add @nestjs/bullmq bullmq` / `pnpm remove @nestjs/bull bull`
- **退出条件**：`grep -r "@nestjs/bull\b\|from 'bull'" src/` 为空；`op-log` 任务可消费（看 LogService 写 `t_user_oplog` 表）；Bull Board / 仪表板能看到 BullMQ 队列

#### P2-C · 自 provider ioredis + CacheService 原地重写（0.5 PD）

> **2026-05-08 二次调研**：放弃 cache-manager 路线后改方向 —— 真正的问题不在"依赖什么包"，而在 `CacheService` 实现层有 boilerplate 和 bug：13 个方法每个都重复 `if (!this.client) await getClient()` 异步初始化；`del()` 函数签名 `Promise<void>` 但内部没 await 是真 bug。

- **新**：`src/common/redis/redis.module.ts`（~20 行）自 provider 一个 ioredis 单例 + 导出 `REDIS_CLIENT` symbol
- **改**：`src/service/cache.service.ts` 改用 `@Inject(REDIS_CLIENT)` 同步注入 ioredis 客户端，消灭所有 `if (!this.client)` 检查；修 `del` 未 await bug；类型从 `any` → `Redis`
- **改**：`src/app.module.ts` 移除 `@liaoliaots/nestjs-redis` 的 `RedisModule.forRootAsync`，改 import 自 provider 的 `RedisModule`
- **改**：`src/bootstrap/session.ts` —— 它通过 `createClient` from 'redis' 直接连了一份 cookie session 用的 redis（独立 db_index）；保留独立连接但风格统一（可后续抽到 redis.module.ts 内多 client）
- **删**：依赖 `@liaoliaots/nestjs-redis`（仅 cache.service.ts 用过）
- **退出条件**：`grep -r "@liaoliaots/nestjs-redis\|RedisService" src/` 为空；CacheService API 完全兼容（30+ 调用方零改动）；`pnpm test` 通过
- **破坏性**：无对外 API 变化；调用方完全不改

### P3 · 数据层迁移 Sequelize → TypeORM（约 4 PD · **最重**）

> **2026-05-08 调研后调整**：原 plan 写"按 basic → access → oplog → wx 顺序逐个 PR 切换"。实地看代码后改方案 —— 因为 access.service 一处用了 6 个 model + 3 个 transaction，model 间关系跨 ORM 不能保留，**access 必须一刀切**。最终采用 3 个 PR。

#### P3 调研结果（2026-05-08）

| 维度                    | 数值                                                                                                                        | 决定                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Model 数量              | 10 个 (`src/models/T*.ts`)，每个 49-79 行                                                                                   | 1:1 转 TypeORM Entity                                                    |
| 字段总数                | ~99 个，全 snake_case，含 `created_at/updated_at/deleted_at/created_by/updated_by`                                          | 表名保留 `t_xxx`，列名零变化                                             |
| 关系装饰器              | **0 个**（在 entity 上）；`db.module.ts` 运行时声明 2 个 (User hasOne UserLogin, UserRoleRelation hasOne UserRole)          | 改 entity 级 `@OneToOne` 装饰器                                          |
| `@InjectModel` 注入点   | 14 处                                                                                                                       | 改 `@InjectRepository(Entity)`                                           |
| API 方法调用            | findOne 13 / findAll 5 / findAndCountAll 3 / create 8 / update 16 / destroy 4 / bulkCreate 2 = **51 处**                    | 改 TypeORM Repository                                                    |
| `transaction` 调用      | 3 处真用（全在 access.service.ts），1 处注释                                                                                | 改 `dataSource.transaction(async (manager) => ...)`                      |
| Op/QueryTypes/raw query | 仅 cron-task.service 有 import 但**全是 unused**（lint warning 印证），文件 14 行实际为空                                   | 顺手清掉                                                                 |
| 全局 hooks              | 在 `app.module.ts SequelizeModule.forRootAsync` 里 10 个：审计字段强制 (created_by/updated_by/deleted_by) + request_id 过滤 | 用 TypeORM `EventSubscriber` + entity `@BeforeInsert/@BeforeUpdate` 复刻 |
| Service 调用集中度      | access.service.ts 用 6 个 model + 33 处方法调用（最重） / 其他 service 各 1-2 个 model                                      | access 一刀切，其他渐进切                                                |

#### 推荐执行：3 个 PR

##### P3-1 · TypeORM 基础设施 + 简单 service 切换（2 PD）

- **新增**：
  - 装 `typeorm` `@nestjs/typeorm`
  - `src/database/data-source.ts`（CLI 用 DataSource 实例）
  - `src/database/migrations/`（空目录）
  - `src/database/subscribers/audit-fields.subscriber.ts`（复刻审计字段强制 + request_id 过滤逻辑）
  - `src/entities/{user,user-login,user-role,user-role-relation,user-right,user-right-relation,dictionary,sms-log,user-oplog}.entity.ts`（10 个）
  - `scripts/{migration-generate,migration-run,migration-revert}.sh`（npm scripts wrapper）
- **改**：
  - `app.module.ts`：新增 `TypeOrmModule.forRootAsync`，**保留** `SequelizeModule.forRootAsync`（双 ORM 期）
  - 简单 service 切换（每个只用 1 个 model）：
    - `service/sms-core.service.ts` (TSmsLog → SmsLog)
    - `service/dict-cache.service.ts` (TDictionary → Dictionary)
    - `modules/basic/basic.service.ts` (TDictionary → Dictionary)
    - `modules/oplog/oplog.service.ts` (TUserOplog → UserOplog)
- **保留 Sequelize**：access.service.ts（6 model + 关系 + transaction，留给 P3-2）
- **退出条件**：4 个 service 切换后，`pnpm test` 通过；`@InjectRepository(SmsLog)` 等可正常 inject

##### P3-2 · 切 access.service.ts（1.5 PD · access 模块一次性切完）

- **改**：
  - 6 个 `@InjectModel` → `@InjectRepository`
  - 33 处 model 方法调用 → Repository API
  - 3 处 `sequelize.transaction(async (t) => ...)` → `dataSource.transaction(async (manager) => ...)`
  - 关系预加载（hasOne `account`、hasOne `role`）→ TypeORM `relations: ['account']` 或 `leftJoinAndSelect`
- **退出条件**：access 模块所有接口（登录/注册/角色/权限）行为不变；e2e 跑通

##### P3-3 · 收尾：删 Sequelize + 生成 baseline migration（0.5 PD）

- **删**：
  - `src/models/T*.ts`（10 个）+ `src/db.module.ts` + `init.module.ts` 中 Sequelize 引用
  - `app.module.ts` 中 `SequelizeModule.forRootAsync`（含 139 行 hooks 配置）
  - 卸 `@nestjs/sequelize` `sequelize` `sequelize-typescript` `@types/sequelize` `sequelize-auto` `easy-front-sequelize-generator`
  - 删 `sequelize-generator/` `db-generator/` 工具目录
  - 顺手清 `cron-task.service.ts` 的 unused imports
- **生成 baseline migration**：`pnpm typeorm migration:generate src/database/migrations/0001_baseline -d src/database/data-source.ts`，对比生产 schema 验证一致
- **退出条件**：`grep -rE "@nestjs/sequelize\|sequelize-typescript\|from 'sequelize'" src/` 为空；空库可通过 migration 重建出与生产一致的 schema

#### 双 ORM 期注意事项

P3-1 完成后到 P3-3 之前（即 access 切换中），**main 上 Sequelize + TypeORM 共存**：

- 两套 ORM 各自维护连接池（同一 MySQL，不同会话）
- 同一表上 access 模块走 Sequelize（如未来 hotfix），其他 service 走 TypeORM
- **不能跨 ORM 做事务**：access 的 transaction 全部由 Sequelize 完成；TypeORM 服务不参与

为防止双 ORM 期太长，**P3-1 → P3-2 → P3-3 应该尽量在一周内连续推进**。

- **破坏性**：中（API 行为不变，但事务/hooks/查询语义底层换了一套实现）
- **回滚**：每个 PR 独立可 revert；P3-3 之前 Sequelize 都可以无损回退

### P4 · 认证替换 session+MD5 → JWT+Passport（3 PD）

- **目标**：access(短) + refresh(长)；统一 `@Roles()/@Permissions()/@Public()` 装饰器；移除 express-session
- **删**：`src/guard/{auth,sign}.guard.ts`、`src/middleware/session.middleware.ts`
- **新**：`src/auth/{auth.module,auth.service,strategies/{jwt,jwt-refresh,local}.strategy,decorators/{roles,permissions,public}.ts}`、`src/auth/guards/{jwt-auth,roles}.guard.ts`
- **桥接**：双轨期登录同时下发 cookie session + JWT，env `AUTH_MODE=session|jwt|both`；客户端按版本灰度切；2 周后下线 session
- **退出条件**：老 session 调用监控 = 0；`/auth/login` 返回 access+refresh；`/auth/refresh` 200；无 token 受保护接口 401
- **破坏性**：高（客户端必须配合升级）

### P5 · 业务模块剥离 wx/wxpay/mp/oss/sms（3 PD）

- **目标**：主模板只留 access/basic/oplog 等骨架，业务搬到 monorepo packages
- **改**：`src/app.module.ts` 移除业务 imports；`src/libs/sms/*` 搬走
- **新**：`packages/biz-{wx,wxpay,mp,oss,sms}/`（pnpm workspace）；`apps/example/` 集成测试用
- **删**：`src/modules/{wx,wxpay,mp,oss}`、`src/config/oss.ts`
- **桥接**：老路径在主仓 re-export 一个 release 周期
- **退出条件**：`find src/modules -maxdepth 1` 不含 wx\*/mp/oss；主模板镜像体积下降 ≥ 20%；example app e2e 通过
- **破坏性**：下游 import 路径变更

### P6 · 部署 / CI 现代化（1.5 PD，可并行）

- **目标**：多阶段 Dockerfile + Node 22 distroless；GitHub Actions 全替代 GitLab；Trivy 镜像扫描 + SBOM
- **改**：`dockerfile`（builder/runner 多阶段，非 root）、`package.json` `start:prod` 改 `node dist/main.js`
- **删**：`.gitlab-ci.yml`、`pm2.json`
- **新**：`.github/workflows/{ci.yml,release.yml,docker.yml}`、`.dockerignore` 完善、`scripts/healthcheck.js`
- **桥接**：K8s 灰度 50/50 一周再切净；旧镜像保留 `legacy-pm2` tag
- **退出条件**：镜像 < 250MB；`trivy image --severity HIGH,CRITICAL` 0 命中；CI Secrets 走 GH Secrets
- **破坏性**：中（部署管线改造）

### P7 · 测试体系夯实 + 覆盖率门槛（2 PD）

- **目标**：unit + e2e 双层；testcontainers 起 mysql/redis；覆盖率 50% → 80%
- **新**：`test/e2e/{auth,access,basic}.e2e-spec.ts`、`test/setup/testcontainers.ts`
- **改**：jest `coverageThreshold.global.lines: 50`（下期升 80）；`.github/workflows/ci.yml` 加 `--coverage` 强制
- **退出条件**：`pnpm test:cov` lines ≥ 50%；e2e 可在 CI 跑通无 host 依赖；PR 覆盖率回退即 fail

### P8 · Bun 引入评估 spike（**可选，2-3 PD，不阻塞主线**）

- **背景**：Bun 在 NestJS + Express 场景下相比 Node 有 ~2.4× QPS 提升，但与 NestJS 装饰器、TypeORM、原生模块叠加存在已知风险（截至 2026 Q2）
- **已知风险清单**（全部带可查证 issue）：
  | 风险 | 状态 | 影响 |
  |---|---|---|
  | NestJS 装饰器在 watch 模式 controller 崩溃 | oven-sh/bun#27526 (1.3.10 回归) | 开发体验受损 |
  | tsconfig 继承不生效，`emitDecoratorMetadata` 不发出 | oven-sh/bun#4575 | NestJS 直接挂 |
  | TypeORM 兼容 | oven-sh/bun#4136 (open) | 数据层风险 |
  | JSC GC 长跑稳定性 | 社区报告 72h+ 内存表现弱于 V8 | 生产可用性 |
  | 原生模块（bcrypt / sharp / Bull worker） | 项目使用 ali-oss / helmet / crypto-js / sms 厂商 SDK，需逐项验证 | 启动即挂 |
  | APM/OTel Node SDK 对 Bun 支持滞后 | 监控覆盖度下降 | 排障能力 |

- **三步走（每一步都可中止）**：

  1. **Bun as package manager**：`bun install` 替代 `pnpm`，仅装包提速。CI 仍跑 `pnpm` 直到 lockfile 稳定后切换。零风险。
  2. **Bun as test runner**：`bun test` 跑 unit test，E2E 仍 jest。低风险。
  3. **Bun as runtime**（仅在前两步全绿后）：staging 部署，72h 监控 RSS / p99 / error rate 全部不退化才推生产。

- **更稳的性能杠杆（建议先做，不依赖 Bun）**：

  - **Express → Fastify Adapter**（NestJS 一行改 `NestFactory.create(AppModule, new FastifyAdapter())`），QPS 立刻提升 2-3×，几乎零风险
  - 配合 P2 的 pino + BullMQ + cache-manager 命中率优化，已能覆盖大部分性能诉求

- **退出条件**：
  - 若 spike 全绿 → 给出 production rollout 提案 + monorepo 中保留 Node 备份镜像 1 个月
  - 若 spike 任一阶段红 → 写一份《Bun 暂不引入决策记录》归档，半年后再评估
- **破坏性**：仅 spike 阶段无；如最终切 runtime，归为 P6 范畴的部署变更

---

## 四、关键文件路径（实施时直接定位）

- `src/main.ts` — bootstrap 拆分起点
- `src/app.module.ts` — 根模块瘦身
- `src/db.module.ts` — ORM 切换核心
- `src/dto/BaseDTO.ts` — DTO 净化
- `src/guard/{auth,sign}.guard.ts` — 鉴权替换源点
- `src/service/cache.service.ts` — 缓存替换源点
- `src/config/log4js.ts` — 日志替换源点
- `src/models/T*.ts` — Entity 迁移源点
- `dockerfile` / `pm2.json` / `.gitlab-ci.yml` — 部署 CI 替换

## 五、可复用的现有代码（无需重写）

- `src/libs/cryptogram.ts` — 密码强度检查 / 哈希工具，搬到 `src/common/crypto/`
- `src/libs/env-unit.ts` — `env/envNumber/envBoolean/envArray`，搬到 `src/common/env/`（或直接用 `@nestjs/config` 的 schema 校验）
- `src/libs/verification-code-generator.ts` — 验证码生成器，保留
- `src/libs/redlock.ts` — Redis 分布式锁，保留
- 软删除/审计字段钩子模式（来自 `src/db.module.ts`）— 在 TypeORM 用 `@BeforeInsert/@BeforeUpdate` 复刻

## 六、最终一键验证清单

```bash
# 仓库根运行，全部 exit 0 即视为重构完成
pnpm install --frozen-lockfile \
  && pnpm lint \
  && pnpm typecheck \
  && pnpm test:cov -- --coverageThreshold='{"global":{"lines":80}}' \
  && pnpm test:e2e \
  && pnpm typeorm migration:run -- -d src/database/data-source.ts \
  && pnpm build \
  && docker build -t app:verify . \
  && trivy image --exit-code 1 --severity HIGH,CRITICAL app:verify \
  && grep -rE "sequelize|log4js|express-session|pm2" src/ | wc -l | xargs -I{} test {} -eq 0
```

运行时探针：

- `curl -f http://localhost:3000/api/health` → 200
- `POST /auth/login` 返回 `{accessToken, refreshToken}`
- `GET /api/users` 带 Bearer token → 200，无 token → 401
- `docker run --rm app:verify id -u` ≠ 0（非 root）

---

## 七、工时与节奏

- 主线总工时 ≈ **22 PD**（P0 升级到 2.5PD 含 PR 流程）
- 可选 P8 (Bun spike) **+2-3 PD**
- 双人并行（A 主攻 P3，B 跑 P0/P1/P2/P4/P6）日历压到 **3 周**
- P5 / P7 收尾 1 周
- P8 单独排期，不阻塞主线

## 八、回滚总策略

每个阶段独立 PR、独立 release tag；带 ORM/AUTH/LOGGER 的双轨 env 开关；migration 全部成对带 `down`；部署阶段保留 `legacy-pm2` 镜像 tag 1 个月。任何阶段出问题可回滚到上一 tag，不影响其他阶段成果。
