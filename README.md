# easy-front-nest-service

NestJS 11 + Fastify 5 backend for a multi-tenant SaaS. JWT auth, row-level
tenant isolation, self-built provider SDKs for WeChat (OA / MP / Pay v3),
Alipay, and aliyun OSS — every provider tenant-scoped via the credential
vault.

| Layer          | Choice                                                               |
| -------------- | -------------------------------------------------------------------- |
| Runtime        | Node 22 (managed via `.nvmrc`)                                       |
| HTTP           | NestJS 11 + Fastify 5 (`@nestjs/platform-fastify`)                   |
| ORM            | TypeORM 0.3 + mysql2                                                 |
| Cache / Queues | ioredis + BullMQ                                                     |
| Auth           | JWT (access + refresh) + Passport                                    |
| Logging        | pino (via `nestjs-pino`)                                             |
| Tracing        | OpenTelemetry (opt-in, OTLP HTTP)                                    |
| Tests          | jest, 60% / 45% / 55% / 60% coverage gate                            |
| Image          | Multi-stage Distroless `gcr.io/distroless/nodejs22-debian12:nonroot` |
| Releases       | `release-please` — conventional commits drive semver + CHANGELOG     |

---

## Quick start

```bash
# Local dev (requires .env in project root — copy & edit .env.production)
pnpm install
pnpm start:dev

# Unit + e2e
pnpm test
pnpm test:e2e

# Integration (needs mysql + redis)
docker compose -f docker-compose.test.yml up -d
pnpm test:integration
docker compose -f docker-compose.test.yml down -v

# Production build
pnpm build && node api/main.js

# Export OpenAPI spec
pnpm openapi:export   # writes openapi.json at repo root
```

---

## Architecture

### Auth (5.x+)

Session+MD5 was replaced by JWT + Passport in 5.0.0.

- `POST /api/auth/login` → `{ user, accessToken, refreshToken, refreshExpiresIn }` + `Set-Cookie: refresh_token`
- Subsequent requests carry `Authorization: Bearer <accessToken>`
- `POST /api/auth/refresh` — web auto-sends cookie; mobile / mini-program send `{ refreshToken }` in body
- `POST /api/auth/logout` — clears cookie + writes audit log
- `GET  /api/auth/me` — returns current user

Server-side guards:

```ts
@Public()                         // bypass JwtAuthGuard
@Permissions('access:user:edit')  // require permission code
@Roles('admin')                   // require role name
async someHandler(@CurrentUser() user: AuthenticatedUser) { ... }
```

JWT payload carries `roles` (names) + `permissions` (right_code); access TTL 15m, so permission changes take effect on the next refresh.

**Required env (production)**:

```env
JWT_ACCESS_SECRET=<random string ≥ 32 chars>
JWT_REFRESH_SECRET=<random string ≥ 32 chars>
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d
```

### Multi-tenant (5.x+)

Shared schema + `tenant_id` column model. Every authenticated request runs inside an `AsyncLocalStorage` scope set by `TenantContextInterceptor`; downstream service / repo / provider code reads `tenantId` from `TenantContextService`, never from `req`.

- **Audit subscriber** stamps `tenant_id` on insert when missing; `created_by` is immutable on update.
- **System tenant (id=0)** owns `is_super_admin` users — they can cross tenants and are guarded by `@SuperAdminOnly()`. Every super-admin call writes an audit log.
- **Tenant switching**: `POST /api/auth/switch-tenant { tenant_id }` — verifies `t_tenant_user_relation` membership and reissues a token.
- **Per-tenant rate limit (P22)**: throttler buckets are keyed `tenant:<id>:<ip>` when JWT-authenticated, falling back to `ip:<ip>` for anonymous routes.

**Required env**:

```env
TENANT_MASTER_KEY=<≥ 32 bytes base64; for t_tenant_credential AES-256-GCM>
```

`TENANT_MASTER_KEY` is hard-validated at startup — missing or too short rejects the boot.

### Providers (5.x+)

Five tenant-scoped provider clients live under `src/providers/`. Each implements:

```ts
interface Provider<TClient> {
  readonly name: CREDENTIAL_PROVIDER;
  getClient(tenantId: number, appId?: string): Promise<TClient>;
  invalidate(tenantId: number, appId?: string): Promise<void>;
}
```

Credentials live in `t_tenant_credential` (AES-256-GCM, LRU + Redis double-cache, 5min TTL / 30s negative cache). `getClient` resolves cached if available; `vault.invalidate` is fired on credential rotation.

| Provider | `app_id`     | `secret`                 | `cert`                   | `metadata` keys                                                                        |
| -------- | ------------ | ------------------------ | ------------------------ | -------------------------------------------------------------------------------------- |
| `wx_oa`  | 公众号 AppID | AppSecret                | —                        | `token`, `encoding_aes_key`                                                            |
| `wx_mp`  | 小程序 AppID | AppSecret                | —                        | —                                                                                      |
| `wx_pay` | mch_id       | —                        | merchant private key PEM | `api_v3_key`, `appid`, optional `notify_url` / `refund_notify_url`                     |
| `alipay` | app_id       | merchant private key PEM | platform public key PEM  | optional `gateway`, `sign_type`, `key_type`, `encrypt_key`, `notify_url`, `return_url` |
| `oss`    | bucket       | access_key_secret        | access_key_id            | `region`, optional `endpoint`, `internal`, `domain`, `secure`, `timeout_ms`            |

Upstream errors are wrapped as `ProviderError` (carrying `provider`, `upstreamCode`, `retryable`); `CredentialMissingError` is the specialization for unconfigured credentials.

**Control plane** (super-admin only): see `src/tenant/tenant.controller.ts` for create / list / get / invite / remove / credential CRUD endpoints under `/api/admin/tenants/*`.

### HTTP adapter (Fastify, 6.x+)

Migrated from Express → Fastify 4 in 7.x and bumped to NestJS 11 + Fastify 5 in 6.0.0. Drop-in for callers (same paths, same JSON, same cookie names). Internals differ:

- `helmet` → `@fastify/helmet`
- `cookie-parser` → `@fastify/cookie` (`reply.setCookie` / `clearCookie`)
- `compression` → `@fastify/compress`
- `body-parser` JSON is Fastify built-in; urlencoded via `@fastify/formbody`
- `multer` → `@fastify/multipart` (consume via `req.parts()` async iterator)
- Express `Request`/`Response` types → `FastifyRequest`/`FastifyReply`

E2E tests must `await app.getHttpAdapter().getInstance().ready()` after `app.init()`.

### API versioning (P21)

URI-style versioning is on. Every controller responds at **both** `/api/<resource>` and `/api/v1/<resource>` — zero breakage for existing clients, explicit pinning available for new ones. Future v2 controllers opt in via `@Version('2')`. See [docs/decisions/2026-05-12-api-versioning.md](./docs/decisions/2026-05-12-api-versioning.md).

### Health probes (P13)

| Endpoint                | Use case                                  | Checks                                |
| ----------------------- | ----------------------------------------- | ------------------------------------- |
| `GET /api/health`       | Docker HEALTHCHECK, K8s `livenessProbe`   | Process up only                       |
| `GET /api/health/ready` | K8s `readinessProbe`, service-mesh checks | DB ping (1.5s timeout) + Redis `PING` |

Liveness stays minimal on purpose so a downstream flap doesn't restart-loop the container. Readiness rolls a pod out of the load balancer when DB or Redis is unreachable.

### Observability (P20 + P32)

Three pillars wired:

| Pillar  | Source                                                                 | Where to read it                                               |
| ------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| Traces  | OpenTelemetry SDK, OTLP HTTP exporter, auto-instrumentation            | Tempo / Jaeger / Honeycomb (set `OTEL_EXPORTER_OTLP_ENDPOINT`) |
| Logs    | pino + pino-http, structured per-request, trace-correlated             | stdout → Loki / ELK / CloudWatch                               |
| Metrics | prom-client registry, exposed at `GET /api/metrics` (no auth, no sign) | Prometheus scrape → Grafana                                    |

**Tracing (P20)** — when `OTEL_EXPORTER_OTLP_ENDPOINT` is set the SDK auto-instruments HTTP / Fastify / ioredis / mysql2, plus `TenantSpanInterceptor` stamps `tenant.id` + `tenant.is_super_admin` on every active span. Unset = zero overhead. See [docs/decisions/2026-05-12-opentelemetry.md](./docs/decisions/2026-05-12-opentelemetry.md).

**Metrics (P32)** — `MetricsModule` owns a prom-client `Registry` and ships:

- `http_requests_total{method, route, status_code}` — counter
- `http_request_duration_seconds{method, route, status_code}` — histogram (buckets `5ms…10s`)
- Default Node runtime metrics (heap, GC, event loop lag, CPU) on a 10s tick

Routes are bound to the _route template_ (`/api/v1/foo/:id`), not the literal URL — keeps label cardinality bounded.

**Error correlation (P32)** — every error response envelope now carries both `request_id` (caller-supplied) and `trace_id` (active OTel span id). The frontend can deep-link straight to the trace UI from an error toast.

### Tests (P18)

Three-tier suite + coverage gate (statements ≥ 60, branches ≥ 45, functions ≥ 55, lines ≥ 60). CI fails on regression.

| Tier        | Command                          | Scope                                                             |
| ----------- | -------------------------------- | ----------------------------------------------------------------- |
| Unit        | `pnpm test` (or `pnpm test:cov`) | `src/**/*.spec.ts` — no external deps                             |
| E2E         | `pnpm test:e2e`                  | `test/e2e/*.e2e-spec.ts` — TestingModule + supertest + stub repos |
| Integration | `pnpm test:integration`          | `test/**/*.integration.spec.ts` — needs mysql + redis             |

When adding a module, also add its `*.controller.spec.ts` (mock service) and `*.service.spec.ts` (mock repo) so coverage doesn't regress.

### Container + CI/CD (P6 / P25)

Multi-stage `Dockerfile` ending in Distroless `gcr.io/distroless/nodejs22-debian12:nonroot`. Container HEALTHCHECK runs `node healthcheck.js` against liveness.

| Workflow             | Trigger                            | Job                                                                          |
| -------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| `ci.yml`             | push/PR to main                    | Lint / Typecheck / Test / Build + Integration                                |
| `codeql.yml`         | push/PR to main + weekly           | Static analysis                                                              |
| `docker.yml`         | push to main, `v*` tag, related PR | Image build + Trivy HIGH/CRITICAL gate + SBOM (SPDX) + OpenAPI spec artifact |
| `pr-checks.yml`      | PR                                 | semantic title + size label                                                  |
| `release-please.yml` | push to main                       | Rolling release PR maintaining CHANGELOG + version bump + git tag            |

Images publish to `ghcr.io/<owner>/<repo>`; tags include `main`, `sha-<short>`, `v1.2.3`, `1.2`, `latest`. Trivy SARIF auto-uploads to GitHub Code Scanning, SBOM kept 30 days. The CI `integration-test` job additionally exports `openapi.json` as an artifact (see [docs/decisions/2026-05-12-openapi-codegen.md](./docs/decisions/2026-05-12-openapi-codegen.md)).

### Release management (P23)

`release-please` watches main for conventional-commit messages and maintains a rolling **"chore(main): release X.Y.Z"** PR. Merging it cuts the `vX.Y.Z` git tag, creates a GitHub Release, and lands the generated section of `CHANGELOG.md`. See [docs/decisions/2026-05-12-release-please.md](./docs/decisions/2026-05-12-release-please.md).

Bump rules follow our existing commitlint config:

| Commit type                                                   | Bump  |
| ------------------------------------------------------------- | ----- |
| `feat:`                                                       | minor |
| `fix:` / `perf:` / `refactor:` / `docs:` / `test:` / `chore:` | patch |
| Any with `!` suffix or `BREAKING CHANGE:` footer              | major |

---

## Reference

### NPM scripts (selected)

```bash
pnpm start:dev          # nest start --watch, NODE_ENV=development
pnpm build              # SWC compile into api/
pnpm test               # unit, with coverage gate
pnpm test:e2e           # supertest + TestingModule
pnpm test:integration   # needs docker-compose.test.yml services
pnpm typecheck          # tsc --noEmit (strict TS — P19)
pnpm lint               # eslint --fix-able with `pnpm lint:fix`
pnpm openapi:export     # writes openapi.json at repo root
pnpm migration:generate # TypeORM migration codegen
pnpm migration:run      # apply pending migrations
```

### Architecture decision records

Living docs for "why" decisions. Read these for context on non-obvious choices:

- [bun-evaluation](./docs/decisions/2026-05-11-bun-evaluation.md) — why bun is deferred
- [opentelemetry](./docs/decisions/2026-05-12-opentelemetry.md) — OTel opt-in design
- [api-versioning](./docs/decisions/2026-05-12-api-versioning.md) — URI versioning with `VERSION_NEUTRAL` + `'1'`
- [release-please](./docs/decisions/2026-05-12-release-please.md) — semver automation
- [openapi-codegen](./docs/decisions/2026-05-12-openapi-codegen.md) — OpenAPI artifact (not typed client)
- [i18n-deferred](./docs/decisions/2026-05-12-i18n-deferred.md) — why i18n is intentionally not done

### Optional response cipher

Some routes can ship encrypted payloads — see [internal wiki](https://rw3ew7jh3sr.feishu.cn/wiki/ZrgEwRg9Iia8ntkQEc9cxJnjnyb) for the legacy enable flow.

---

## Contributing

See [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) for the development workflow, including how to add a new provider.
