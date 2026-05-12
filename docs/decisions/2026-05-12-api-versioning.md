# API versioning (P21)

**Date:** 2026-05-12
**Status:** adopted

## Context

The service exposes all routes under `/api/*` with no version segment.
Adding new features that change response shapes requires either
backwards-compatible additive changes or hard-cuts that break every
client. There's no escape hatch for "this endpoint changed shape; pin
to v1 if you're not ready."

## Decision

Adopt **URI-style versioning** via NestJS's built-in `enableVersioning`,
with both `VERSION_NEUTRAL` and `'1'` as default versions.

```ts
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: [VERSION_NEUTRAL, '1'],
});
```

Every existing controller now responds at **both**:

- `/api/<resource>` (the original URL — zero breakage)
- `/api/v1/<resource>` (the explicitly-pinned URL)

A controller that needs a breaking change opts into a higher version:

```ts
@Controller({ path: 'users', version: '2' })  // -> /api/v2/users
export class UsersV2Controller { ... }
```

Both versions coexist; clients migrate at their own pace.

## Why URI over header / media-type

- Discoverable via the URL alone — debuggable in logs, curl, Sentry.
- Renders cleanly in Swagger (separate sections per version).
- Cache-friendly — different versions are different cache keys without
  needing `Vary: Accept-Version`.
- Lowest cognitive load for downstream frontends; no header juggling.

## Why default = `[VERSION_NEUTRAL, '1']` instead of `'1'` alone

A bare `defaultVersion: '1'` would mean existing `/api/users` URLs return
404 — every client would have to rewrite their base URL today. Pairing
with `VERSION_NEUTRAL` keeps every legacy URL alive while the explicit
`/v1/` URL becomes available for clients that want to pin.

## Not in scope

- **Auto-redirect** from `/api/users` to `/api/v1/users` — keeps URLs
  stable but adds a hop; revisit if cache analytics make the case.
- **Deprecation headers** on legacy unversioned URLs — defer until we
  actually deprecate something.
- **API gateway routing** by version — deployment concern, not framework.

## Revisit trigger

When we ship the first `@Version('2')` controller, decide whether to:

- Move `defaultVersion` to `['1']` alone (force the `/v1/` prefix),
- Or keep neutral routes alive indefinitely and let v2 simply add `/v2/`.
