# OpenAPI export (P25)

**Date:** 2026-05-12
**Status:** adopted

## Context

The service runs `@nestjs/swagger` and exposes the spec at `/api-doc`
(JSON at `/api-doc-json`) — but only in `development` / `test` envs.
Frontend / mobile clients can't pull the contract from a live URL in
prod, and there's no static artifact published anywhere. Reverse-
engineering shapes from controllers + DTOs is the current state.

## Decision

Generate a static `openapi.json` artifact in CI and publish it.

- **`scripts/export-openapi.ts`** boots `AppModule` without a network
  listener (`NestFactory.create` + `app.init()`, no `app.listen()`),
  runs `SwaggerModule.createDocument`, writes the result to
  `openapi.json` at the repo root.
- **`pnpm openapi:export`** wraps the script for local use.
- **CI**: the existing `integration-test` job already spins up MySQL +
  Redis services (needed for `AppModule` to boot), so the export step
  runs there. `openapi.json` is uploaded as a 30-day artifact named
  `openapi`.

Builder logic lives in `src/bootstrap/swagger.ts`'s exported
`buildSwaggerOptions` / `createOpenApiDocument` helpers, reused by
both runtime (`applySwagger`) and the standalone script — so the
`/api-doc` UI and the CI artifact cannot drift.

## Why not generate a typed TS client too

Out of scope for this PR. With the artifact published, consumers can
run `openapi-typescript` or `openapi-typescript-codegen` themselves
from their own repos, pinning the spec version they want. A typed
client maintained inside this repo would create a tight coupling
between backend release schedule and frontend code.

## Not in scope

- Attaching `openapi.json` to GitHub Releases. Easy to add later — the
  artifact name is stable.
- Publishing the spec to an npm package (`@easy-front/openapi-spec` or
  similar). Same reasoning as the TS client.
- Generating spec at every PR vs only at release time. Currently every
  CI run produces a fresh artifact; cheap to regenerate.

## Revisit trigger

- When a frontend team starts depending on the spec, decide whether to
  pin to releases (semver tags from release-please) or always pull
  from latest CI artifact.
