# 附录：读懂并修改 Options API 组件

Options API 是组织 Vue 组件的一种写法，**不是 Vue 2 的别名**。Vue 3 仍支持它；本附录的在线练习运行在 Vue 3。课程正文使用 Composition API 和 `<script setup>`，这里重点练习阅读、定位和局部修改已有组件。如果接手的是 Vue 2 项目，还应阅读[Vue 2 写法与版本差异](appendix_vue2.md)。

学完后应能回答：组件从哪里接收数据？哪些数据由组件自己保存？点击按钮执行哪个方法？哪些值由计算得到？哪里有副作用或清理工作？

## 1. 从完整组件读起

下面的 `TaskList.vue` 包含状态、计算属性、监听器和事件方法。沿着一次点击读代码：模板中的按钮调用 `addTask()`；方法修改 `tasks`；`unfinishedCount` 随之重新计算；模板更新；`watch` 再记录数量变化。

```vue
<script>
export default {
  data() {
    return {
      title: '',
      tasks: [{ id: 1, title: '阅读教程', completed: false }],
      message: '',
    }
  },
  computed: {
    unfinishedCount() {
      return this.tasks.filter(task => !task.completed).length
    },
  },
  watch: {
    unfinishedCount(newValue, oldValue) {
      this.message = `未完成数：${oldValue} → ${newValue}`
    },
  },
  methods: {
    addTask() {
      if (!this.title.trim()) return
      this.tasks.push({ id: Date.now(), title: this.title.trim(), completed: false })
      this.title = ''
    },
    toggleTask(task) { task.completed = !task.completed },
  },
}
</script>

<template>
  <h2>未完成：{{ unfinishedCount }}</h2>
  <input v-model="title" placeholder="任务名称" @keyup.enter="addTask" />
  <button @click="addTask">添加</button>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <button @click="toggleTask(task)">{{ task.completed ? '恢复' : '完成' }}</button>
      {{ task.title }}
    </li>
  </ul>
  <p>{{ message }}</p>
</template>
```

`this.title` 和 `this.tasks` 来自 `data()`；`this.unfinishedCount` 来自 `computed`。模板中直接写名称，方法中通过 `this` 访问组件实例。`watch` 的两个参数依次是新值、旧值。`Date.now()` 只用于生成演示 ID；真实任务应使用后端返回的 ID。

<VueLiveDemo example="optionsBasics" />

## 2. 各个选项负责什么

| 选项 | 常见写法 | 主要职责 | 阅读时先问什么 |
| --- | --- | --- | --- |
| `name` | `name: 'TaskList'` | 标识组件，便于调试 | 组件叫什么？ |
| `components` | `components: { TaskCard }` | 注册局部组件 | 自定义标签来自哪里？ |
| `props` | `props: { title: String }` | 接收父组件输入 | 值是谁传来的？ |
| `emits` | `emits: ['done']` | 声明发出的事件 | 哪些操作通知父组件？ |
| `data()` | 返回对象 | 保存组件自己的响应式状态 | 初始值在哪里？ |
| `computed` | `count() { return ... }` | 计算派生值 | 它依赖哪些状态？ |
| `methods` | `save() { ... }` | 处理点击、提交等动作 | 从哪个事件进入？ |
| `watch` | `keyword(newValue) { ... }` | 值变化后执行副作用 | 变化后做了什么？ |
| 生命周期钩子 | `mounted() { ... }` | 初始化或清理 | 是否要移除监听和定时器？ |

`data` 写成返回对象的函数，使每个组件实例有自己的状态。`props` 是父组件输入，不应在子组件直接改写；要改变父组件状态，应发出事件或使用约定好的组件 `v-model`。不要把依赖组件 `this` 的 `data`、`computed`、`methods` 写成箭头函数。

### 2.1 `computed`、`methods`、`watch` 怎样区分

- **要一个由现有状态算出的值**：用 `computed`，例如未完成任务数。依赖不变时计算结果会被缓存。
- **要响应用户动作**：用 `methods`，例如添加任务或提交表单。
- **值变化后需要额外动作**：用 `watch`，例如发起请求、同步浏览器标题。不要把本来能直接计算的显示值绕一圈存进 `watch`。

阅读旧代码时，如果 `watch` 只是在更新另一个显示字段，先检查它能否改为 `computed`；如果是网络请求或外部同步，则应检查错误与清理逻辑。

## 3. Props 与事件：顺着数据流找文件

父组件通过 `:title="currentTask"` 把值传给子组件；子组件通过 `this.$emit('done', this.title)` 报告完成；父组件的 `@done="handleDone"` 接收事件参数。`this.$emit()` 的第一个参数是事件名，后面是交给父组件的数据。

```vue
<!-- TaskCard.vue：Vue 3 Options API -->
<script>
export default {
  props: { title: { type: String, required: true } },
  emits: ['done'],
  methods: {
    finish() { this.$emit('done', this.title) },
  },
}
</script>
<template><button @click="finish">完成 {{ title }}</button></template>
```

不要只停在 `$emit`：继续搜索父组件中该标签的 `@done`，才能知道状态最终在哪里更新。

<VueLiveDemo example="optionsCommunication" />

## 4. 生命周期：初始化后还要找清理

`created` 可做不依赖 DOM 的初始化；`mounted` 后组件 DOM 已挂载，常用于连接浏览器 API；`beforeUnmount` 和 `unmounted` 是 Vue 3 的卸载阶段。定时器、事件监听和订阅如果在挂载时建立，通常要在卸载时清理。

```js
export default {
  data() { return { seconds: 0, timer: null } },
  mounted() {
    this.timer = setInterval(() => { this.seconds++ }, 1000)
  },
  beforeUnmount() { clearInterval(this.timer) },
}
```

`updated` 可能多次执行，不适合无条件修改同一份响应式状态。Vue 2 的卸载钩子名称不同，见[Vue 2 附录](appendix_vue2.md#5-生命周期名称与清理)。

<VueLiveDemo example="optionsLifecycle" />

## 5. 与 Composition API 对照

下表用于定位概念，**不表示每一行都能机械替换**。

| Options API | Composition API / `<script setup>` | 核心作用 |
| --- | --- | --- |
| `data()` 返回的字段 | `ref()`、`reactive()` | 组件状态 |
| `methods` | 普通函数 | 事件与业务动作 |
| `computed` | `computed()` | 派生值 |
| `watch` | `watch()` | 变化后的副作用 |
| `props` | `defineProps()` | 父组件输入 |
| `emits`、`this.$emit()` | `defineEmits()` 返回的函数 | 向父组件发事件 |
| `mounted` | `onMounted()` | 挂载后的工作 |
| `beforeUnmount` | `onBeforeUnmount()` | 卸载前清理 |
| `this.$refs.input` | 模板引用 `ref()` | 访问元素或子组件 |

例如 `addTask` 在 `<script setup>` 中是普通函数，通过 `title.value` 和 `tasks.value` 修改 `ref`；Options API 方法则通过 `this.title` 和 `this.tasks` 访问。模板对 `ref` 自动解包，脚本中不自动解包，这是阅读两种写法时容易混淆的地方。

## 6. 接手旧文件时按这个顺序调查

1. 看模板：记录显示字段、点击事件、自定义组件和 `v-model`。
2. 查 `components`、`props`、`data()`：确定字段从父组件来，还是本组件创建。
3. 查 `computed`：确认显示值如何计算。
4. 从模板事件进入 `methods`，继续追踪 `$emit`、Store 或 API 调用。
5. 查 `watch` 和生命周期：找请求、监听、定时器及对应清理。
6. 看父组件和路由：确认组件何时创建或销毁，以及谁保存最终状态。

定位问题时，可在浏览器开发工具中观察 Network、Console 和组件状态。只改一处逻辑时，优先遵守该文件现有风格。

## 7. 练习与检查点

1. 在第一个在线练习中加“清除已完成任务”按钮。说明它应放在 `methods` 还是 `computed`。
2. 在 Props 练习中把子组件事件名从 `done` 改成 `completed`，同时修改父组件监听；观察漏改一侧的结果。
3. 在生命周期练习中切换组件，说明计时器何时创建、何时清理。
4. 打开任意一章正文的 `<script setup>` 示例，指出改用 Options API 后各成员应放在哪里。

- [ ] 能根据模板找到 Options API 对应字段和方法。
- [ ] 能说清 `props → 子组件 → $emit → 父组件` 的数据流。
- [ ] 能区分 `computed`、`methods` 与 `watch`。
- [ ] 能检查挂载阶段建立的资源是否在卸载时清理。
- [ ] 知道 Options API 在 Vue 3 中仍可运行，Vue 2 差异需要单独判断。

官方参考：[Vue 3 Options API 参考](https://vuejs.org/api/)、[Composition API 常见问题](https://vuejs.org/guide/extras/composition-api-faq.html)。
