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

## 6. ⚠️ 安全提醒：立即处置项

仓库历史中的 `.gitlab-ci.yml` **包含明文凭证**：

```yaml
REGISTRY_USER: public@myun.info
REGISTRY_PASSWORD: Myun@123jx
```

**必须立即操作：**

1. 登录阿里云镜像仓库后台 → 修改 `public@myun.info` 账号密码
2. 把新凭证存入 GitHub Secrets（`REGISTRY_USER` / `REGISTRY_PASSWORD`）
3. P0 PR 合并后 `.gitlab-ci.yml` 文件已删，但 git 历史中仍可见旧密码 —— 旧密码必须视为已泄露
4. 用 `gitleaks detect --source . --no-git` 或 `trufflehog git file://. --branch main` 扫一遍，确认无其他泄漏

## 7. P0 之后即将启用的进阶规则（预告）

- 测试覆盖率门槛：先 50%，下期 80%（P7）
- 分支 owner 按目录细化（P3 / P4 完成后）
- 自动发版：`release-please` 或 `changeset`（P6）
