# ADR: Bun runtime — deferred (2026-05-11)

> Status: **Deferred** · Re-evaluate: 2026-11 (six months) or upon Bun's resolution of the issues listed below.
>
> Scope: P8 spike per `docs/REFACTOR_PLAN.md`.

## Context

P0–P7 left the service on Node 22 + Express + NestJS 10 + TypeORM + jest, with a healthy CI gate (50% coverage, Trivy HIGH/CRITICAL, distroless image). The plan called for a P8 spike to evaluate Bun as a faster substitute, with three optional steps (package manager → test runner → runtime) and the explicit instruction to stop on the first red light.

Bun version evaluated: **1.3.6** (latest stable on 2026-05-11).

## Spike results

### Step 1: `bun install` (package manager) — ✅ Green

`bun install` against the current `package.json` resolved cleanly:

```
1225 packages installed [17.96s]
Blocked 2 postinstalls. Run `bun pm untrusted` for details.
```

Comparable to `pnpm install` wall time. Two postinstall scripts (likely `@swc/core` + `msgpackr-extract`) are blocked by default; would need `bun pm trust @swc/core msgpackr-extract` in CI.

**Caveat**: this generates `bun.lockb` (binary) alongside `pnpm-lock.yaml`. Living with two lockfiles is operationally painful, so adopting Bun's installer means committing to drop pnpm entirely. The savings (~2s on a warm cache) are not worth that swap by themselves.

### Step 2: `bun test` (test runner) — ❌ Red

Pure utility specs run fine. Anything that imports a NestJS DI surface fails:

```
src/auth/auth.service.spec.ts:
  ReferenceError: Cannot access 'User' before initialization.
    at src/auth/auth.service.ts:44:27   ← @InjectRepository(User)
```

This is the classic TypeScript-decorator-metadata bug under Bun's TS loader. The decorator-applied class is referenced before its declaration is initialized; with `tsc` + `emitDecoratorMetadata`, the emit reorders correctly. Bun's loader does not.

Tracked upstream: **[oven-sh/bun#4575](https://github.com/oven-sh/bun/issues/4575)** — open since 2023, still no fix in 1.3.x.

Until that issue closes, `bun test` cannot replace `jest` for this codebase: any spec that boots a `TestingModule` or imports a `@Module()` will fail, and that covers most of the 320+ tests we just stood up in P7.

### Step 3: `bun run` (runtime) — Not attempted

Per the spike's stop-on-first-red rule, runtime evaluation is moot until step 2 is unblocked. The same decorator metadata gap would manifest at process boot (NestFactory.create) for the same reason.

## Decision

**Defer Bun adoption.** Do not migrate the installer, test runner, or runtime in 2026 H1.

## Rationale

1. The P8 plan's exit condition was met explicitly: "若 spike 任一阶段红 → 写一份《Bun 暂不引入决策记录》归档". Step 2 turned red on a known, open, decorator-metadata issue.
2. The only green step (installer) does not move the needle on either cost or operational quality, and it forces a one-way lockfile migration.
3. The other risks the plan flagged are still open:
   - oven-sh/bun#27526 (decorator watch-mode regression)
   - oven-sh/bun#4136 (TypeORM compatibility, open)
   - JSC GC long-run stability under NestJS workloads (community reports)
   - APM / OTel Node SDK lag on Bun (monitoring blind spots)
4. The plan itself called out a **safer performance lever**: switching the HTTP adapter from Express to Fastify (`NestFastifyApplication`). That is a one-line `NestFactory.create` change with no runtime swap and yields 2–3× QPS in benchmarks. It is the obvious next move if/when latency or throughput become a binding constraint.

## What we did keep

Nothing. No `bun.lockb`, no Bun-specific scripts, no CI changes. The spike branch carries only this decision record so the rationale is searchable when somebody revisits.

## Re-evaluation criteria

Reopen the question when **any** of the following becomes true:

- oven-sh/bun#4575 closes with a verified fix shipped in a Bun stable release.
- A measured perf ceiling on Node 22 + Fastify proves insufficient for production load (i.e. we've already taken the safer lever and still need more).
- A subdependency we hard-require ships ESM-only or otherwise becomes hostile to Node's module resolution in a way Bun handles better.

## Follow-up — Express → Fastify (not part of this PR)

When the team has appetite for it, the migration steps are:

1. `pnpm add @nestjs/platform-fastify fastify` (remove `@nestjs/platform-express`, `express`, `body-parser`, `cookie-parser`)
2. `NestFactory.create<NestExpressApplication>` → `NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())`
3. Replace `helmet()` middleware with `@fastify/helmet`, `cookie-parser` with `@fastify/cookie`
4. Replace `FilesInterceptor` (oss upload path) with `@fastify/multipart`
5. Update e2e tests' supertest invocations (Fastify needs `app.getHttpAdapter().getInstance().ready()` before bound HTTP)
6. Adapt the three exception filters' `req: Request` / `res: Response` types to Fastify's

Estimated 1–2 PD; non-trivial because of the multipart + filter ripple.
