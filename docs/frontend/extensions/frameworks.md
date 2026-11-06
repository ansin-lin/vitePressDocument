# Vite、Next.js、Nuxt 与 Webpack 怎么选

先认清层次：**Vue / React** 是编写界面的框架或库；**Vite / Webpack** 处理开发与构建；**Next.js / Nuxt** 在 React / Vue 基础上约定路由、页面渲染和项目结构。它们并非同一层面的四选一。

| 工具 | 主要职责 | 常见使用场景 |
| --- | --- | --- |
| Vite | 本地开发服务器与生产构建 | 已有 Vue/React 单页应用，或需要自己选择路由和数据方案 |
| Webpack | 模块打包与构建配置 | 维护使用 Webpack 的既有项目；新项目先看实际工具链 |
| Next.js | 基于 React 的应用框架 | 项目需要框架提供的文件路由、服务端渲染等能力 |
| Nuxt | 基于 Vue 的应用框架 | Vue 项目需要框架提供的文件路由、服务端渲染等能力 |

## 从已学过的 Vite 项目理解差别

在 Vue/React 正课中，你编写组件，Vite 启动开发服务器并生成部署资源。路由和数据请求由项目单独配置。引入 Next.js 或 Nuxt 后，目录结构、页面、布局和渲染方式更多地遵循框架约定。不能把已有 Vite 项目的 `src/App.vue` 或 `App.jsx` 原样复制过去就视为迁移完成。

### 同样是“首页”，文件职责不同

```text
Vite + React：src/main.jsx 挂载应用，App.jsx 展示内容，路由另行配置
Next.js App Router：app/layout.jsx 是布局，app/page.jsx 是首页
Nuxt：pages/index.vue 是首页，layouts/ 可提供共享布局
```

例如 Next.js App Router 中的 `app/page.jsx` 可以是：

```jsx
export default function HomePage() {
  return <main><h1>申请一览</h1></main>
}
```

Nuxt 的 `pages/index.vue` 则使用 Vue 单文件组件：

```vue
<template>
  <main><h1>申请一览</h1></main>
</template>
```

这两个例子只演示“文件怎样对应首页”，不是完整项目。Next.js 的服务端组件与客户端交互边界、Nuxt 的数据获取和服务端渲染，需要在已有 React / Vue 基础上继续阅读各自当前版本文档。

静态站点与需要服务端运行的页面也不能混为一谈。**本站用 VitePress 构建后部署到 GitHub Pages**；Next.js / Nuxt 项目能否导出为纯静态文件，要逐页核对用到的功能和对应框架文档。需要服务端能力时还要安排运行环境，不能只上传静态文件。[Next.js 部署文档](https://nextjs.org/docs/app/getting-started/deploying)列出了不同部署形态。

若后端已经是 Spring Boot，先画清楚“浏览器 → 前端页面 → Spring Boot API”的路径：谁负责登录状态、谁校验权限、页面在哪里渲染、API 地址如何配置。采用 Next.js / Nuxt 不会自动移除 Spring Boot；是否让应用框架承担新的服务端职责由项目设计决定。

## 选型时先问四件事

1. 项目是已有代码还是新项目？已有项目先沿用当前框架和构建链。
2. 页面是否真的需要服务端渲染、静态预生成或服务端逻辑？仅有多个页面不等于必须换框架。
3. 后端是否已经由 Spring Boot 等服务提供？前端仍可选 Vite、Next.js 或 Nuxt，但要明确接口、身份验证和部署边界。
4. 团队能否承担新框架的部署、缓存和版本升级？先做一个包含关键页面的小验证，再定方案。

## 新人验证任务

打开一个现有项目，找 `package.json` 的 `scripts` 和依赖：

- 看见 `vite`：确认入口、路由库和 `npm run build` 的输出目录。
- 看见 `next`：确认 `app` 或 `pages` 目录、页面与布局，并按当前项目版本阅读文档。
- 看见 `nuxt`：确认 `pages`、`layouts`、`nuxt.config` 与部署方式。
- 看见 `webpack`：先读已有配置和脚本，不把它误认成页面框架。

继续阅读：[Vite 官方指南](https://vite.dev/guide/)、[Next.js 官方入门](https://nextjs.org/docs/app/getting-started)、[Nuxt 官方文档](https://nuxt.com/docs)、[Webpack 官方概念](https://webpack.js.org/concepts/)。命令、目录和支持的功能会随版本变化，以项目锁定版本的文档为准。
