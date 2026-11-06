# Vue / React 常用库选择速查

这页把参考资料中反复出现的库按**要解决的问题**整理。先明确问题，再选一项与现有项目兼容的工具；库名不是学习顺序，也不是推荐全部安装。路由、Pinia、Zustand、Redux Toolkit、Axios 基础已在 Vue/React 主线讲解。

| 问题 | React 常见选择 | Vue 常见选择 | 先确认什么 |
| --- | --- | --- | --- |
| 页面导航 | React Router，或所用应用框架自带路由 | Vue Router，或所用应用框架自带路由 | 项目已经用哪一套，不重复注册 |
| 客户端共享状态 | Context、Zustand、Redux Toolkit | Pinia；旧项目可能用 Vuex | 状态由谁修改，是否真的需要跨页面共享 |
| HTTP 请求 | `fetch`、Axios | `fetch`、Axios | 统一错误处理、认证与取消请求方式 |
| 服务端数据缓存 | TanStack Query、SWR | TanStack Query 的 Vue 适配 | 列表是否需要缓存、重试、失效与后台刷新 |
| 表单组织 | React Hook Form、Formik | vee-validate、组件库表单 | 表单规模、错误提示与现有项目方案 |
| 数据校验 | Zod、Yup 等 | Zod、Yup 等 | 前端校验改善体验，后端仍必须校验 |
| UI 与样式 | MUI、Ant Design、CSS Modules、Tailwind 等 | Vuetify、Element Plus、CSS Modules、Tailwind 等 | 项目设计规范、可访问性、主题与体积 |
| 表格与图表 | TanStack Table、ECharts 等 | 组件库表格、ECharts 等 | 数据量、排序分页在前端还是后端 |
| 常用工具 | dayjs / date-fns、lodash-es、clsx | dayjs / date-fns、lodash-es、VueUse | 原生 API 或已有依赖能否满足需求 |
| 多语言 | react-i18next 等 | vue-i18n 等 | 文案、日期、数字和复数规则都要覆盖 |

## 最容易混淆的三组

### 客户端状态与服务端数据

表单中正在输入的内容、当前打开的对话框属于**客户端状态**；从 API 读取、可能过期并需要重新获取的员工列表属于**服务端数据**。Pinia、Zustand 等适合组织前者；TanStack Query / SWR 主要帮助管理后者的请求、缓存与失效。项目小且请求少时，正课中的普通 API 层和组件状态也足够，不必先加入缓存库。

### 表单库与校验库

表单库负责字段注册、提交、错误显示等交互；Zod / Yup 这类校验库负责描述输入是否合法。二者可以组合，也可以先用现有组件逻辑完成一个简单表单。无论前端使用什么库，服务端仍要独立校验不可信输入。

### UI 组件库与 CSS 工具

Vuetify、MUI 等提供可配置的现成组件；Bootstrap 提供栅格、样式类及交互组件；Tailwind、CSS Modules、SCSS 主要解决样式编写与组织。它们的职责不同，混用前先考虑样式冲突和团队维护成本。具体的 Bootstrap / Vuetify 入门见 [UI 路线](ui.md)。

## 看一个已有项目时怎么判断

1. 查看 `package.json` 与锁定文件，记录**已安装**的路由、状态、HTTP、UI、测试工具和版本。
2. 找一个真实页面，沿“用户操作 → 组件状态 → API 层 → 返回结果”追踪数据。
3. 只在现有方案无法满足具体需求时增加依赖；评估兼容版本、维护状况、许可、体积与迁移成本。
4. 加入后用一个正常、一个失败和一个空数据场景验证，而非只看默认成功页面。

继续阅读各项目当前版本的官方文档：[TanStack Query](https://tanstack.com/query/latest)、[SWR](https://swr.vercel.app/)、[React Hook Form](https://react-hook-form.com/)、[vee-validate](https://vee-validate.logaretm.com/)、[Zod](https://zod.dev/)。
