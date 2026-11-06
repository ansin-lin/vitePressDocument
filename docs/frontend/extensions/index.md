# 前端扩展：工具与组件库

这里把参考文档中重复的前端库、UI 框架和测试工具说明整理为选学资料。先完成 [HTML](../HTML/index.md)、[CSS](../CSS/index.md)、[JavaScript](../JavaScript/index.md) 和对应的 [Vue](../Vue/index.md) 或 [React](../React/index.md) 主线，再按项目需要选择。每个项目先看已有依赖和团队约定，不必把表中的库全部安装。

| 想解决的问题 | 先读哪里 | 本附录补充什么 |
| --- | --- | --- |
| 项目开发、构建和服务端渲染 | [Vite、Next.js 与 Nuxt](frameworks.md) | 认清工具层次与选型条件 |
| 请求缓存、表单、样式和常用工具 | [常用库选择速查](libraries.md) | 在已有 Vue/React 知识上选择库 |
| 统一页面外观 | [Bootstrap 与 Vuetify](ui.md) | 按项目类型选择一条 UI 路线 |
| 自动测试或接手 Jest 旧项目 | [测试工具衔接](testing.md) | 从正课的 Vitest 迁移到其他测试配置 |

## 已在主线讲解的内容

- Vite、Node.js 与 npm 的基本职责：[Node.js 与 npm](../NodeJS/index.md)、[Vue 入门](../Vue/01_intro_project_setup.md)、[React 入门](../React/01_intro_setup.md)。
- 路由、状态和 API：[Vue Router](../Vue/16_vue_router.md)、[Pinia](../Vue/18_pinia.md)、[React Router](../React/12_router_navigation.md)、[React 状态库](../React/16_state_libraries.md)。
- 测试：[Vue 测试基础](../Vue/19_frontend_testing.md)、[Vue 自动测试](../Vue/20_vue_unit_testing.md)、[React 测试](../React/21_testing.md)。

本附录不重复这些章节的大段代码，也不把“库的名单”当作必学清单。能解释项目中的选择、运行已有示例并完成一个具体改动，就达到了选学目标。
