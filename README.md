# 技术研习室

VitePress 站点。当前收录从 `LearnDocument/docs/frontend/HTML`、`CSS`、`JavaScript` 复制的 Web 基础课程，以及从 `LearnDocument/docs/database/sql` 复制的 SQL 课程、从 `LearnDocument/docs/backend/java` 复制的 Java 基础教程和对应综合练习。参考目录未修改。

## 本地运行

需要 Node.js 22 或更高版本：

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

HTML、CSS、JavaScript 页面位于 `docs/frontend/`；SQL 页面位于 `docs/database/sql/`，Java 页面位于 `docs/backend/java/`，课程入口在 `docs/courses/index.md`。Java 的 `06_arrays.md` 对未加代码围栏的泛型签名做了 VitePress 转义。JavaScript 的逐章审核、演示判断和图解清单见 `JS-REVIEW.md`。

## GitHub Pages

推送到 `main` 后，GitHub Actions 自动检查类型、构建并部署。仓库站点自动设置 `/vitePressDocument/` 基础路径。站点地址：https://ansin-lin.github.io/vitePressDocument/

HTML 和 CSS 的部分章节提供可展开的效果预览，导航中的「网页编辑室」可以同时编辑 HTML、CSS 并实时查看效果。预览在隔离的浏览器框中渲染，不执行 JavaScript；编辑内容不会保存。原有 Markdown 代码块保留，Mermaid 图表仍可在教材中显示。

JavaScript 部分章节提供基于 Web Worker 的真实代码运行示例，可编辑、重置并查看输出。DOM、浏览器存储、模块和 HTTP 请求仍需按照教材在相应页面或网络环境中练习；静态站点不提供业务 API。

如需恢复此次改动前的版本，可使用提交 `3ec4938`。参考教材目录未修改。
