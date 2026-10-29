# 第一阶段验证记录

验证日期：2026-10-29。

- npm ci：成功从锁文件安装 305 个包。
- Vue TypeScript 检查：通过。
- 根路径生产构建：通过（首次及最终复验）。
- /training/ 子路径生产构建：通过，最终构建约 8 秒。
- Chromium 自动检查：通过计数器上限提示与重置、请求异常路径与前后步骤禁用、重置关闭异常开关、Mermaid 流程图和时序图、主题切换后的图表、390px 视口无页面横向溢出；无 pageerror。
- GitHub Actions：已检查配置包含锁文件安装、类型检查、构建、PR 不发布、Pages artifact、部署权限、环境和仓库子路径推导；未在 GitHub 实际运行。
- npm audit：3 项告警（2 moderate、1 high），来自 VitePress 1.x 的 Vite/esbuild 工具链，尚未解决。

## 限制与未完成

当前目录不是 Git 仓库，未推送，未实际部署 GitHub Pages。需要创建或关联仓库并设置 Pages 来源为 GitHub Actions。

尚未手动完成搜索结果的浏览器验收；已配置 VitePress 本地搜索并成功生成构建。未对参考教材逐篇做兼容性测试，未迁移或修改参考目录。

第二阶段 Vue REPL、React Sandpack、SQLite WASM 已开发；Git/Linux/Shell 模拟器未开发。

本机 Node 24.11.0 的后续构建发生无诊断退出；用 Node 24.22.1 完成最终验证。Mermaid 使用官方预编译浏览器模块，避免全量重打包。运行 tests/smoke.mjs 前需构建 /training/ 子路径。

## 第二阶段验证

- 类型检查与 `/vitePressDocument/` 生产构建通过。
- Chromium 验证：Vue 与 React 预览中的计数按钮真实可点击；SQL 查询、结果行、语法错误及数据重置通过。
- React 代码发送至 CodeSandbox 编译服务；Vue REPL 编译器资源需联网。
