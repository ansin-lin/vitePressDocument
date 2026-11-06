# 技术研习室

VitePress 站点。当前收录 Web 前端、SQL、PL/SQL、Java、MyBatis、Spring Boot、Git、Linux、Shell 和 AWS 课程。教材以 `LearnDocument` 为参考，参考目录未修改。

## 本地运行

需要 Node.js 22 或更高版本：

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

前端页面位于 `docs/frontend/`，SQL 与 PL/SQL 位于 `docs/database/`，Java、MyBatis、Spring Boot 位于 `docs/backend/`，Git、Linux、Shell 位于 `docs/tools/`，AWS 位于 `docs/cloud/aws/`。课程入口在 `docs/courses/index.md`；综合练习位于 `docs/exercises/`。

前端参考资料中的库、UI 和测试专题已整理为 `docs/frontend/extensions/`。Vue / React 正课仍负责路由、状态与组件测试的具体教学；扩展专题只补充工具选择、Bootstrap / Vuetify 接入差异及 Jest 旧项目识读。Python、AI、Docker 与参考目录的其他练习未加入本站。

## GitHub Pages

推送到 `main` 后，GitHub Actions 自动检查类型、构建并部署。仓库站点自动设置 `/vitePressDocument/` 基础路径。站点地址：https://ansin-lin.github.io/vitePressDocument/

HTML 和 CSS 的部分章节提供可展开的效果预览，导航中的「网页编辑室」可以同时编辑 HTML、CSS 并实时查看效果。预览在隔离的浏览器框中渲染，不执行 JavaScript；编辑内容不会保存。原有 Markdown 代码块保留，Mermaid 图表仍可在教材中显示。

JavaScript 部分章节提供基于 Web Worker 的真实代码运行示例，可编辑、重置并查看输出。DOM、浏览器存储、模块和 HTTP 请求仍需按照教材在相应页面或网络环境中练习；静态站点不提供业务 API。

Vue 与 React 课程的概念章节加入可展开的在线练习。Vue 使用 Vue REPL，可修改单文件组件并即时查看结果；React 使用 Sandpack Client，可编辑 `App.jsx`，点击「运行修改」后查看页面。两种练习均支持重置，首次打开才加载编辑器；Vue 预览依赖公共 CDN，React 预览依赖 CodeSandbox 公共打包服务。涉及真实后端、路由配置或完整工程构建的章节仍以本地项目练习为准，页面中的异步演示会明确标明模拟数据。

路由章节另外提供 Vue Router 和 React Router 的真实导航练习。在线预览使用内存历史，不改变教材网站 URL；本地项目按教材配置 Web History 或 BrowserRouter。状态管理章节提供 Pinia、Zustand 和 Redux Toolkit 的真实 Store 练习，演示数据只保存在当前浏览器预览内。Vue Router 与 Pinia 需要从公共 CDN 加载模块；React Router、Zustand、Redux Toolkit 由 Sandpack 的公共打包服务加载。

示例集中在 `docs/.vitepress/theme/vueLiveExamples.ts` 和 `reactLiveExamples.ts`。在 Markdown 中使用 `<VueLiveDemo example="ref" />` 或 `<ReactLiveDemo example="state" />` 引用现有示例，新增示例时先为目录增加键和完整代码，再在首次讲解该知识点的位置引用。参考教材目录未修改。

MyBatis 与 Spring Boot 的流程演示使用可复用的 `<BackendFlowDemo>` 组件，逐步解释调用路径，并明确标为教学模拟。它不会在浏览器中运行 Java、MyBatis、Spring Boot 或 MySQL；课程中的代码按章节在本地工程执行。附录中指向 Java、SQL 等源码的链接会打开参考仓库中的对应文件。

Git、Linux、Shell 的首次流程练习使用 `<CommandFlowDemo>`，演示命令和状态变化，但不会操作学员电脑或服务器。PL/SQL 需要 Oracle 练习环境，本站不将 SQLite 演示描述为 Oracle 执行。

AWS 课程展示架构与控制台操作说明，不连接云账号，也不在线创建资源。章节中的免费资格、控制台菜单和费用以学员自己的账号及 AWS 当前说明为准。
