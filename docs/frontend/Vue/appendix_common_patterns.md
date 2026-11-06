# 附录：动态组件与常见内置能力

本附录用于阅读既有 Vue 3 项目。它们不是完成前面任务示例的前置条件；遇到标签切换、弹窗或父组件调用子组件方法时，再按场景查阅。先掌握组件、条件渲染、生命周期和模板引用，再看本页示例。

## 1. 动态组件：同一位置显示不同组件

页面有多个标签，每个标签对应一个不同组件时，可用 `<component :is="current">` 指定当前显示的组件。`current` 保存组件对象或已注册的组件名；切换它时，显示的组件也会切换。

```vue
<script setup>
import { shallowRef } from 'vue'
import CounterA from './CounterA.vue'
import CounterB from './CounterB.vue'

const current = shallowRef(CounterA)
</script>

<template>
  <button @click="current = CounterA">显示 A</button>
  <button @click="current = CounterB">显示 B</button>
  <component :is="current" />
</template>
```

这里使用 `shallowRef` 保存组件对象，避免把组件对象本身做深层响应式转换。若只是两段很短的文本，普通 `v-if` 更清楚；动态组件更适合切换完整组件。

### 1.1 `KeepAlive` 保留切走的组件状态

默认切换后，离开的组件通常会卸载；再次进入会创建新实例，本地计数或表单草稿可能重置。把动态组件包在 `<KeepAlive>` 中，可以缓存非活动组件实例：

```vue
<KeepAlive>
  <component :is="current" />
</KeepAlive>
```

先在下面的练习中给 A 组件加几次，再切换到 B、切回 A；随后删除 `KeepAlive` 标签比较结果。缓存组件可能经历激活和停用，而不是每次都卸载，因此有 `onActivated()` / `onDeactivated()` 等对应钩子。不要把所有页面无条件缓存；先明确哪些状态需要保留、何时应重新取数。

<VueLiveDemo example="dynamicKeepAlive" />

## 2. `Teleport`：改变 DOM 放置位置

弹窗由当前组件控制，但为了避免嵌套容器的定位和层级限制，实际 DOM 往往需要放到页面更外层。`<Teleport to="body">` 会把包裹内容放到文档 `body` 下：

```vue
<button @click="open = true">打开</button>
<Teleport to="body">
  <div v-if="open" class="modal">弹窗内容</div>
</Teleport>
```

它改变的是 **DOM 位置**，不是组件在 Vue 组件树中的父子关系；Props、事件和注入仍按原组件关系工作。`to` 指向的目标元素在挂载时必须存在。练习在预览框中运行，显示的 `BODY` 指预览文档，不是教学网站的整个页面。

<VueLiveDemo example="teleport" />

正式弹窗还需要处理焦点、键盘关闭和无障碍语义；仅使用 `Teleport` 并不自动完成这些行为。

## 3. `defineExpose`：明确允许父组件访问什么

在 `<script setup>` 组件中，内部变量和方法默认不会直接作为公共实例暴露。确有需要让父组件通过组件模板引用调用子组件方法时，可由子组件明确公开：

```vue
<!-- CounterPanel.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
function reset() { count.value = 0 }
defineExpose({ reset })
</script>
```

父组件为子组件加 `ref="panel"`，再通过 `panel.value?.reset()` 调用。模板中读取 ref 时会自动解包，因此事件表达式可以写成 `panel?.reset()`。模板引用要等子组件挂载后才有值；`?.` 可避免尚未挂载时调用失败。

<VueLiveDemo example="expose" />

父子之间传数据仍优先使用 Props 和事件。`defineExpose` 适合焦点、重置等少量明确的命令式操作，不应把子组件的全部内部状态都交给父组件修改。

## 4. `Transition`：为出现和消失加过渡

`<Transition>` 可以包裹通过 `v-if` 显示或隐藏的单个元素或组件。它负责在进入、离开时添加 CSS 类；具体视觉效果仍由 CSS 定义。

```vue
<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <button @click="open = !open">切换提示</button>
  <Transition name="fade">
    <p v-if="open">保存成功</p>
  </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

读既有代码时，把 `name="fade"` 与 `.fade-enter-*`、`.fade-leave-*` 类名对应起来即可。复杂动画和页面切换效果不作为本课程必学内容。

## 5. 遇到需求时怎样选择

| 需求 | 首先考虑 | 需要额外检查 |
| --- | --- | --- |
| 两段简单内容切换 | `v-if` | 是否真的需要拆组件 |
| 同一位置切换完整组件 | 动态组件 | 切走后状态是否应重置 |
| 切走后保留组件本地状态 | `KeepAlive` | 缓存范围、激活与重新取数 |
| 弹窗 DOM 放到外层容器 | `Teleport` | 目标元素、焦点与键盘操作 |
| 父组件调用子组件少量方法 | `defineExpose` | 是否能改用 Props 与事件 |
| 出现或消失时加视觉过渡 | `Transition` | CSS 类名与动画时长 |

官方参考：[动态组件](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components)、[KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)、[Teleport](https://vuejs.org/guide/built-ins/teleport.html)、[Transition](https://vuejs.org/guide/built-ins/transition.html)、[defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)。
