<!--
  PR title 必须遵循 Conventional Commits 规范：
  feat: / fix: / refactor: / docs: / test: / chore: / perf: / ci: / build: / style: / revert:
-->

## Why（背景与目的）

<!-- 简述这次改动要解决什么问题、来自什么需求或 issue -->

Closes #

## What（改了什么）

<!-- 列出关键改动点。可贴文件清单或核心模块。 -->

-

## Test Plan（如何验证）

<!-- 列出可执行的验证步骤；命令、URL、预期结果。 -->

- [ ] 单元测试：`pnpm test`
- [ ] 类型检查：`pnpm typecheck`
- [ ] Lint：`pnpm lint`
- [ ] 本地启动：`pnpm start:dev`
- [ ]

## Risk（风险评估）

<!-- 接口兼容性 / 数据库变更 / 配置变更 / 性能影响 / 安全影响 -->

- [ ] 无破坏性变更
- [ ] 包含数据库变更（已附 migration）
- [ ] 涉及环境变量改动（已更新 `.env.example`）
- [ ] 涉及外部 API / 客户端协议变更

## Rollback（回滚方案）

<!-- 如何快速回滚？是否需要数据库回滚或配置恢复？ -->

-

## Checklist

- [ ] 已自查 lint / typecheck / test 全部通过
- [ ] 已更新相关文档（README / CHANGELOG / 接口文档）
- [ ] 已为新功能补充测试用例
- [ ] PR title 符合 Conventional Commits 规范
