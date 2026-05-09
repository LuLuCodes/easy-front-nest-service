# syntax=docker/dockerfile:1.7

# ─── Stage 1: install all deps (incl. dev) for build ────────────────────────
FROM node:22-bookworm-slim AS deps
WORKDIR /app
# HUSKY=0 disables the `prepare: husky` script which depends on a dev
# binary not present in --prod installs.
ENV CI=true \
    HUSKY=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    COREPACK_DEFAULT_TO_LATEST=0
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store \
 && pnpm install --frozen-lockfile

# ─── Stage 2: compile sources to api/ ───────────────────────────────────────
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV CI=true HUSKY=0 PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml tsconfig*.json nest-cli.json ./
COPY src ./src
RUN pnpm build

# ─── Stage 3: production-only node_modules (no devDependencies) ─────────────
FROM node:22-bookworm-slim AS prod-deps
WORKDIR /app
ENV CI=true HUSKY=0 PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store \
 && pnpm install --frozen-lockfile --prod \
 && pnpm store prune

# ─── Stage 4: distroless runtime ────────────────────────────────────────────
# `nonroot` variant runs as uid 65532; no shell, no package manager.
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runtime
WORKDIR /home/app

ENV NODE_ENV=production \
    APP_PORT=8000

COPY --from=prod-deps --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=build     --chown=nonroot:nonroot /app/api          ./api
COPY --chown=nonroot:nonroot scripts/healthcheck.js             ./healthcheck.js
COPY --chown=nonroot:nonroot package.json                       ./package.json

EXPOSE 8000

# distroless's ENTRYPOINT is `node`; pass the entry module path directly.
CMD ["api/main.js"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD ["/nodejs/bin/node", "healthcheck.js"]
