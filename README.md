# 技术研习室

VitePress 站点。当前预览内容为从 `LearnDocument/docs/database/sql` 复制的 SQL 知识课程，以及对应的第 15 章综合练习。参考目录未修改。

## 本地运行

需要 Node.js 22 或更高版本：

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

页面位于 `docs/database/sql/`，课程入口在 `docs/courses/index.md`。SQL 教材原文仅复制，没有迁移其他课程。第 15 章通过相对链接指向 `docs/exercises/database/sql/15_sql_comprehensive_practice.md`。

## GitHub Pages

推送到 `main` 后，GitHub Actions 自动检查类型、构建并部署。仓库站点自动设置 `/vitePressDocument/` 基础路径。站点地址：https://ansin-lin.github.io/vitePressDocument/

当前展示为阅读型教材，已移除早期交互示例。Mermaid 图表仍可在教材中显示。
