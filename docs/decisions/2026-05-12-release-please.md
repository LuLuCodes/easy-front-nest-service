# release-please automation (P23)

**Date:** 2026-05-12
**Status:** adopted

## Context

The project already uses conventional commits enforced by the
`commit-msg` husky hook (commitlint + cz-customizable). But the
release process is entirely manual:

- No `CHANGELOG.md` exists.
- Version bumps happen ad-hoc by editing `package.json`.
- No git tags are cut for releases; deployment artifacts pin by commit
  SHA only.

For an internal API service this is survivable, but it makes "what
changed between deploy A and deploy B" needlessly archeological.

## Decision

Adopt **`googleapis/release-please-action@v4`** to:

1. Watch `main` for conventional-commit messages.
2. Maintain a single rolling **"chore(main): release X.Y.Z"** PR that
   bumps `package.json` + `.release-please-manifest.json` and
   regenerates `CHANGELOG.md` from commit subjects.
3. When that PR is merged, create the `vX.Y.Z` git tag and a GitHub
   release with the changelog excerpt.

## Configuration

| File                                   | Purpose                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `.github/workflows/release-please.yml` | Workflow trigger on push-to-main                                            |
| `release-please-config.json`           | Release behavior (release-type=node, tag format `v...`, changelog sections) |
| `.release-please-manifest.json`        | Current version pin (`5.0.0`)                                               |

The workflow uses the default `GITHUB_TOKEN` with `contents: write`
plus `pull-requests: write` permissions — no PAT required.

## Bump rules

| Commit type                                          | Bump  |
| ---------------------------------------------------- | ----- |
| `feat:`                                              | minor |
| `fix:`                                               | patch |
| `perf:` / `refactor:` / `docs:` / `test:` / `chore:` | patch |
| Any with `!` suffix or `BREAKING CHANGE:` footer     | major |

Already aligned with our commitlint config so no rule drift.

## Why this over `semantic-release` or `changesets`

- **semantic-release** ships the tag at every push and immediately
  publishes — too aggressive for an internal service where deploys
  follow their own schedule.
- **changesets** is designed for multi-package monorepos with explicit
  changeset files. Overkill for a single Nest service.
- release-please's "rolling PR" model gives a clear human review point
  before each release cut, which fits how we already operate.

## Not in scope

- Auto-publishing to npm / GHCR. `release-please` only creates the
  tag + release; downstream Docker build / publish is the existing
  `docker.yml` workflow's job.
- Multi-package (monorepo) layout. Single-package config; revisit if we
  ever split into separate npm packages.

## Revisit trigger

- If the rolling PR backs up because nobody reviews it — add a Slack
  reminder or auto-merge gate.
- If we need pre-release / beta tags before a major version cut —
  flip `prerelease: true` in the config for that branch.
