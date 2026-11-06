# 附录：识读 Vue 2 写法与 Vue 3 差异

本附录面向维护既有 Vue 2 项目的学员。学习目标是**判断项目版本、看懂常见代码、识别升级时需要调查的差异**，不是在现有 Vue 3 教学项目中混用 Vue 2 代码。下面标为“Vue 2”的代码只用于阅读与对照，不放进本站的 Vue 3 REPL 运行。需要实际修改 Vue 2 项目时，应在该项目自己的依赖和构建环境中验证。

先读[Options API 附录](appendix_options_api.md)：`data`、`computed`、`methods` 等写法在 Vue 3 也能使用。**看到 Options API 不能据此断定项目是 Vue 2。**Vue 2.7 又加入了部分 Composition API 和 `<script setup>` 支持，因此看到 `setup` 也不能单凭这一点断定项目是 Vue 3。

## 1. 先确认项目到底使用哪个版本

从项目根目录的 `package.json` 和锁文件开始，确认 Vue、路由和状态库版本；再看入口文件与构建配置。不要只凭单个组件猜版本。

| 要查的位置 | Vue 2 项目中常见内容 | Vue 3 项目中常见内容 |
| --- | --- | --- |
| `package.json` | `vue` 为 `2.x` | `vue` 为 `3.x` |
| 应用入口 | `new Vue(...).$mount('#app')` | `createApp(App).mount('#app')` |
| 路由 | Vue Router 3 的 `new Router(...)` | Vue Router 4 的 `createRouter(...)` |
| 集中状态 | 常见 Vuex 3 | 本课程使用 Pinia；既有项目也可能使用 Vuex 4 |
| 单文件组件 | 常见 Options API | Options API、Composition API 均可 |

锁文件记录实际安装版本。如果 `package.json` 写的是范围，还应确认当前安装结果。项目可能处在迁移中，因此入口、依赖与具体组件要一起看。

## 2. 应用入口：从 `new Vue` 到 `createApp`

Vue 2 常见入口：

```js
// Vue 2：src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
```

Vue 3 本课程入口：

```js
// Vue 3：src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

Vue 2 的 `new Vue` 创建根实例；Vue 3 的 `createApp` 返回应用实例。入口变化不意味着只改一行就能升级，路由、状态库、组件库和构建工具都需要一起检查。

## 3. 组件 `v-model` 与自定义事件

在 Vue 2 中，组件默认的 `v-model` 约定是 **`value` prop + `input` 事件**。例如父组件写 `<TaskInput v-model="title" />`，子组件可以这样实现：

```vue
<!-- Vue 2：TaskInput.vue -->
<script>
export default {
  props: { value: String },
  methods: {
    update(event) { this.$emit('input', event.target.value) },
  },
}
</script>
<template><input :value="value" @input="update" /></template>
```

Vue 3 默认改为 **`modelValue` prop + `update:modelValue` 事件**。课程中的 Vue 3 Options API 对应写法是：

```vue
<!-- Vue 3：TaskInput.vue -->
<script>
export default {
  props: { modelValue: String },
  emits: ['update:modelValue'],
  methods: {
    update(event) { this.$emit('update:modelValue', event.target.value) },
  },
}
</script>
<template><input :value="modelValue" @input="update" /></template>
```

Vue 2 组件可以通过 `model` 选项改用其他 prop 和事件，因此读既有代码时仍需检查该选项。Vue 2 的 `.sync` 常见于更新某个 prop；Vue 3 则使用带参数的 `v-model`，如 `v-model:title`。这些是**组件**契约的差异，普通原生输入框的 `v-model` 不应直接按组件规则推断。

## 4. Vue 2 响应式的常见陷阱

Vue 2 初始化对象时建立响应式转换。给已有嵌套对象**新增属性**，或通过索引直接替换数组元素、直接修改数组长度，可能不会触发预期更新。阅读旧项目遇到 `Vue.set`、`this.$set` 或 `splice`，先判断它们是否用于处理这些限制。

```js
// Vue 2：假设 task 已在 data 中，且原来没有 assignee 字段
this.$set(this.task, 'assignee', '田中')

// Vue 2：替换数组下标 1 的元素
this.$set(this.tasks, 1, updatedTask)
// 或 this.tasks.splice(1, 1, updatedTask)
```

**根层级状态仍应预先在 `data()` 声明**，不要把 `$set` 当作随意新增根状态的办法。Vue 3 的响应式基础改为 Proxy，不再需要 `Vue.set` / `$set` 处理这些场景；迁移时也要检查旧代码是否依赖数组或对象的特殊行为。

## 5. 生命周期名称与清理

两版共有 `created`、`mounted`、`beforeUpdate`、`updated` 等常见钩子。卸载阶段名称发生变化：

| 阶段 | Vue 2 | Vue 3 Options API |
| --- | --- | --- |
| 卸载前 | `beforeDestroy` | `beforeUnmount` |
| 卸载后 | `destroyed` | `unmounted` |

```js
// Vue 2 组件中的片段
export default {
  mounted() {
    this.timer = setInterval(this.refresh, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    refresh() { /* 更新画面数据 */ },
  },
}
```

升级时除了改钩子名称，还要确认组件何时真正卸载、定时器和订阅是否有对应清理。不要在 Vue 3 的练习中直接复制 `beforeDestroy` 并期待它按 Vue 2 的时机运行。

## 6. 模板与组件接口中容易误读的旧写法

| Vue 2 中可能看到 | 含义或用途 | 阅读 Vue 3 项目时应注意 |
| --- | --- | --- |
| `price \| currency`（在插值中） | 过滤器格式化显示值 | Vue 3 移除了过滤器语法，可改用计算属性或函数 |
| `@click.native` | 监听子组件根元素的原生事件 | Vue 3 移除了 `.native`，需检查组件事件声明与属性透传 |
| `v-on="$listeners"` | 向内部元素转发监听器 | Vue 3 移除了 `$listeners`，监听器并入 `$attrs` |
| `:title.sync="title"` | 以 `update:title` 事件同步 prop | Vue 3 使用 `v-model:title` |
| `slot="header"` 等旧插槽写法 | 指定具名插槽 | 新代码通常使用 `v-slot` / `#header` |

例如 Vue 2 插值中的 `task.title | uppercase` 并不是 JavaScript 的按位或运算；在 Vue 3 中可用 `task.title.toUpperCase()`，或抽成计算属性。不要对整个项目直接做文本替换，应先确认格式化函数是否有空值处理、国际化和复用需求。

## 7. 路由与状态库：先认出版本，再追数据流

Vue Router 3 的常见创建方式：

```js
// Vue 2 + Vue Router 3 中常见写法
import Vue from 'vue'
import Router from 'vue-router'
import TaskListView from '../views/TaskListView.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{ path: '/tasks', component: TaskListView }],
})
```

Vue Router 4 改用 `createRouter({ history: createWebHistory(), routes })`。组件里仍可能看到 `this.$route` 和 `this.$router`；先分清前者是当前路由信息，后者负责导航。升级时还应检查守卫、重定向和服务器对 History 模式刷新的支持，不能只替换构造函数。

Vue 2 项目常见 Vuex 3，使用 `state`、`getters`、`mutations`、`actions` 和 `commit` / `dispatch`。本课程 Vue 3 使用 Pinia，直接从 Store 调用 action。两者都用于组织共享状态，但数据流和 API 不同；阅读旧项目时，先从组件的 `mapState`、`mapGetters`、`mapActions` 或 `this.$store` 找到实际 Store 模块，再决定是否需要迁移。不要把 Vuex mutation 机械改名为 Pinia action。

## 8. 迁移调查顺序与练习

1. 核对 `vue`、`vue-router`、状态库、组件库和构建工具的实际版本。
2. 在入口文件确认应用创建、插件注册和挂载方式。
3. 查组件 `v-model`、`.sync`、过滤器、`.native`、`$listeners` 与生命周期钩子。
4. 查 `Vue.set` / `$set` 与数组、对象更新逻辑。
5. 用现有测试和浏览器操作记录升级前行为，再按模块改动并回归。大型项目可参考 Vue 官方的兼容构建迁移方案；是否适用仍取决于项目依赖。

练习：在一份 Vue 2 组件中找到 `value` / `input` 组成的 `v-model`、`beforeDestroy`、`this.$set`，分别说明它们在当前版本为何这样写，以及升级 Vue 3 时需要检查什么。只写出修改方案，不在本站 Vue 3 REPL 中运行 Vue 2 代码。

- [ ] 不凭 Options API 或 `<script setup>` 单独判断 Vue 主版本。
- [ ] 能解释 Vue 2 组件 `v-model` 与 Vue 3 组件 `v-model` 的默认契约。
- [ ] 能识别 Vue 2 对新增对象属性和数组索引更新的限制。
- [ ] 能找到卸载清理、旧模板语法、路由和状态库的版本差异。
- [ ] 知道迁移需要实际项目的构建与回归验证。

## 官方参考

- [Vue 2 响应式说明](https://v2.vuejs.org/v2/guide/reactivity.html)
- [Vue 2.7 功能与限制](https://v2.vuejs.org/v2/guide/migration-vue-2-7.html)
- [Vue 3 迁移指南：不兼容改动](https://v3-migration.vuejs.org/breaking-changes/)
- [Vue 3 兼容构建与迁移流程](https://v3-migration.vuejs.org/migration-build.html)
