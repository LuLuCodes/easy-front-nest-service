# OpenTelemetry tracing (P20)

**Date:** 2026-05-12
**Status:** adopted

## Context

After P0–P19 the service has structured logging (pino), readiness probes
(terminus), and a 60% coverage gate, but **no traces or per-tenant
latency visibility**. For a multi-tenant SaaS that means a slow tenant
can't be isolated from the rest without log spelunking.

## Decision

Adopt the OpenTelemetry Node SDK with **opt-in OTLP HTTP export** and
**Nest interceptor stamping `tenant.id` on the active span**.

- `src/observability/tracing.ts` — initializes the SDK before
  `NestFactory.create`. Only starts when
  `OTEL_EXPORTER_OTLP_ENDPOINT` is set; otherwise it returns null and
  the rest of the service runs with zero overhead.
- Auto-instrumentations enabled: HTTP, Fastify, ioredis, mysql2.
- `TenantSpanInterceptor` (global `APP_INTERCEPTOR`) reads
  `TenantContextService` and stamps `tenant.id` +
  `tenant.is_super_admin` on the active span. When the SDK isn't
  started, `trace.getActiveSpan()` returns undefined and the
  interceptor short-circuits with no allocation.

## Configuration

| Env var                       | Purpose                   | Default                    |
| ----------------------------- | ------------------------- | -------------------------- |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP HTTP collector URL   | (unset → tracing disabled) |
| `OTEL_SERVICE_NAME`           | Service name attribute    | `easy-front-nest-service`  |
| `OTEL_SERVICE_VERSION`        | Service version attribute | `5.0.0`                    |
| `OTEL_LOG_LEVEL`              | SDK diag log level        | (off)                      |

Wire a collector by setting `OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318`
in the deployment env. Traces flow downstream from there (Tempo, Jaeger,
Honeycomb, Datadog — collector handles routing).

## Why opt-in

- Local dev / CI / unit tests should never need a collector.
- The auto-instrumentations patch core modules at first require time; we
  want them dormant unless the deploy environment is actually wired up.
- The interceptor is no-op when there's no active span, so leaving it
  globally registered costs ~one map lookup per request.

## Not in scope

- **Metrics** — start with traces. Per-tenant histograms can come in a
  follow-up once we know which routes need them.
- **Logs correlation** — pino + OTel log signal integration deferred;
  span IDs are already on the trace side, log↔trace correlation is a
  separate concern.
- **Sampler tuning** — default `ParentBased(AlwaysOn)`. Move to
  `TraceIdRatioBased` if cost requires it.

## Revisit trigger

- When a collector is provisioned in any environment.
- When we need per-tenant SLO dashboards.
- If the auto-instrumentations cause measurable overhead with the SDK off
  (shouldn't, but verify in prod once enabled).
