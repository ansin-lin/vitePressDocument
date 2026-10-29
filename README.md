# 技术研习室

VitePress + Vue 3 + TypeScript 交互式教材，第一阶段实现。全部在静态站点中运行，无账号、后台和服务器 API。

## 本地使用

需要 Node.js 22 或更高版本。

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

教材放在 `docs/`，配置与可复用组件放在 `docs/.vitepress/`。开发服务器默认地址以终端输出为准。

## 发布到 GitHub Pages

1. 将本目录作为 Git 仓库根目录提交并推送到 GitHub 的 main 或 master 分支。
2. 在仓库 Settings → Pages → Source 选择 GitHub Actions。
3. 工作流自动安装锁定依赖、检查类型、构建及部署。PR 只检查、不发布。
4. 仓库站点自动使用 `/仓库名/`；用户名站点使用 `/`。自定义域名请设置仓库变量 `BASE_PATH=/`。
5. 在 Actions 查看运行结果与 Pages 地址。未推送和实际运行前，不能视为已部署。

本地验证子路径（PowerShell）：

```powershell
$env:BASE_PATH='/training/'
npm run build
npm run preview
# 打开预览地址下的 /training/，验证后清除变量
Remove-Item Env:BASE_PATH
```

## 教材兼容

不修改参考目录 LearnDocument。普通 Markdown、代码围栏、相对链接、图片可继续采用；先小批接入并构建。MkDocs 专用 admonition、tab、宏、Obsidian 双链、特定插件语法不保证直接兼容，需要逐项适配。不要全量重写或自动迁移。构建保留死链检查。

详见 [开发说明](docs/guide/development.md)。第二阶段 Vue REPL、React Sandpack、SQLite WASM 尚未实现。

## 浏览器验证

运行 `npx playwright install chromium`，构建 `/training/` 子路径后运行 `npm run test:smoke`。覆盖交互状态、图表、主题和窄屏布局。

## 已知限制

VitePress 1.x 构建工具链存在 npm audit 告警，需后续升级并回归验证。Mermaid 的部分图表包较大，会产生构建体积警告。

本机 Node 24.11.0 在复验时发生无诊断退出；使用 24.22.1 后构建和浏览器检查通过。建议使用当前维护版本的 Node。Mermaid 官方浏览器模块在 dev/build 前复制到 public/vendor，按需从本站加载，不依赖 CDN。

验证详情见 [TEST-RESULTS.md](TEST-RESULTS.md)。
