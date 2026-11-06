# 第 16 章 Vue Router：用URL组织页面

Vue Router是Vue的官方路由。它把浏览器URL与Vue页面组件对应起来，使单页应用能够切换页面、保留前进后退记录，并允许用户复制或刷新某个页面地址。

## 本章目标与前置知识

- 【必须掌握】安装、创建并注册Vue Router。
- 【必须掌握】使用`RouterLink`和`RouterView`完成页面切换。
- 【必须掌握】配置静态路由、动态参数、命名路由、query、重定向和404。
- 【必须掌握】使用`useRoute()`读取当前路由，使用`useRouter()`执行导航。
- 【必须掌握】理解History模式、使用路由懒加载基础写法，并用`beforeEach()`完成常见登录检查。
- 【会使用、能看懂】嵌套路由、路由组件传参、`onBeforeRouteLeave()`和`onBeforeRouteUpdate()`。
- 【会读即可】识别`beforeResolve()`、复杂`beforeEnter`组合、Options API组件内守卫、旧式`next()`和完整守卫顺序。

需要掌握组件、Props、`watch()`和异步函数。本章继续使用普通JavaScript。

## 1. 为什么需要路由

任务系统通常包含任务一览、任务详情、设置和登录等页面。如果只用多个`v-if`切换根组件中的内容，会遇到以下问题：

- URL始终不变，不能复制任务详情地址；
- 刷新后不知道应该恢复哪个页面；
- 浏览器前进和后退无法按页面工作；
- 页面越来越多时，根组件会堆积大量切换条件。

使用Router后，URL可以明确表达当前页面：

```text
/tasks      → 任务一览
/tasks/101  → 任务101详情
/settings   → 设置
```

Router负责URL和前端页面组件，不负责请求任务数据，也不负责跨页面保存任务状态。API层在第17章学习，跨页面状态在第18章学习。

### 1.1 三种“切换或路由”不要混淆

| 方式 | 管理对象 | 示例 |
| --- | --- | --- |
| `v-if` | 当前页面中的局部区域 | 打开编辑框 |
| Vue Router | URL与前端页面组件 | `/tasks/101`显示详情页 |
| 后端路由 | HTTP请求与服务器处理 | `GET /api/tasks/101`返回JSON |

进入`/tasks/101`时，Vue Router先显示详情页面；详情页面再向后端API请求任务数据。

## 2. 安装Vue Router

在Vue项目根目录执行：

```bash
npm install vue-router
```

安装后`package.json`和锁文件会记录实际版本。提交这两个文件，不提交`node_modules`。

## 3. 建立第一个可运行路由

先只建立两个静态页面，完成最小闭环。不要一开始加入参数、守卫和嵌套路由。

### 3.1 创建页面组件

新建`src/views/TaskListView.vue`：

```vue
<template>
  <main>
    <h1>任务一览</h1>
    <p>这里显示全部任务。</p>
  </main>
</template>
```

新建`src/views/AboutView.vue`：

```vue
<template>
  <main>
    <h1>系统说明</h1>
    <p>任务示例用于管理担当任务。</p>
  </main>
</template>
```

`views`保存与URL直接对应的页面组件，`components`保存页面内部复用的业务组件。这是常见目录约定，不是Vue强制规则。

### 3.2 创建路由表

新建`src/router/index.js`：

```js
import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '../views/TaskListView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/tasks', component: TaskListView },
  { path: '/about', component: AboutView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

`routes`是路由记录数组。每条记录至少说明：

| 配置 | 可接受的常见值 | 作用 |
| --- | --- | --- |
| `path` | 以`/`开头的路径字符串 | 规定匹配的URL |
| `component` | 导入的Vue组件 | 规定匹配后显示的页面 |
| `history` | `createWebHistory()`等History实现 | 规定URL和浏览器历史的工作方式 |

`createRouter(options)`根据配置创建Router实例；`createWebHistory()`使用普通URL，例如`/tasks`。

### 3.3 注册Router

修改`src/main.js`：

```js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

createApp(App)
  .use(router)
  .mount('#app')
```

`app.use(router)`把Router安装到Vue应用，必须在`mount()`之前执行。

### 3.4 放置链接和页面出口

修改`src/App.vue`：

```vue
<template>
  <header>
    <nav aria-label="主要导航">
      <RouterLink to="/tasks">任务一览</RouterLink>
      <RouterLink to="/about">系统说明</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
```

`RouterLink`生成客户端导航链接；点击时更新URL，不重新加载整份HTML。`RouterView`是当前路由页面的显示位置。缺少`RouterView`时，URL可能变化，但页面组件没有显示位置。

```mermaid
flowchart LR
    A[点击 RouterLink<br/>前往 /tasks] --> B[浏览器 URL 变为 /tasks]
    B --> C[Vue Router<br/>匹配 path: /tasks]
    C --> D[App.vue 中的 RouterView]
    D --> E[显示 TaskListView.vue]
```

这是已经打开的单页应用内点击链接的过程。直接在地址栏输入或刷新`/tasks`时，浏览器还会先向服务器请求这个地址，服务器需要按第13节说明返回应用入口；仅有前端路由表并不能保证刷新成功。

运行`npm run dev`，分别点击两个链接，并使用浏览器前进和后退。确认URL、标题和页面内容同步变化。

下面的在线练习使用真正的 Vue Router。为避免练习中的导航改变教学网站地址，预览采用内存历史；本地项目仍按上面的步骤使用 `createWebHistory()`。

<VueLiveDemo example="router" />

## 4. 命名路由

直接写路径可以工作，但大型项目中路径会出现在许多文件。给路由记录设置唯一名称：

```js
const routes = [
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskListView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
]
```

模板改为路由对象：

```vue
<RouterLink :to="{ name: 'tasks' }">任务一览</RouterLink>
```

`name`是项目内唯一的路由名称。`:to`中的冒号表示右侧是JavaScript表达式，而不是普通字符串。路径改变时，只需调整路由表，使用路由名称的位置通常不需要修改。

当前路由匹配某个`RouterLink`时，Vue Router会自动添加激活class。项目可以设置当前导航项样式，但不能只依靠颜色表达当前位置。

## 5. 动态路由与params

任务详情路径中的编号每次不同，可以使用动态参数：

```js
{
  path: '/tasks/:id',
  name: 'task-detail',
  component: TaskDetailView,
}
```

`:id`表示动态路径段。`/tasks/101`和`/tasks/205`都会匹配这条记录，参数分别是`101`和`205`。

链接中传入参数：

```vue
<RouterLink
  :to="{ name: 'task-detail', params: { id: task.id } }"
>
  {{ task.title }}
</RouterLink>
```

`params`用于组成路径中的动态部分。参数通常传字符串或数字，不要传完整任务对象。

## 6. useRoute读取当前路由

`TaskDetailView.vue`读取URL中的编号：

```vue
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const taskId = computed(() => {
  const id = Number(route.params.id)
  return Number.isInteger(id) && id > 0 ? id : null
})
</script>

<template>
  <main>
    <h1>任务详情</h1>
    <p v-if="taskId === null" role="alert">任务编号不正确。</p>
    <p v-else>正在显示任务{{ taskId }}。</p>
  </main>
</template>
```

`useRoute()`返回当前路由信息。常用属性包括`params`、`query`、`name`、`path`和`meta`。URL属于外部输入，必须转换并验证，不能假定`id`一定是有效数字。

## 7. useRouter与编程式导航

链接跳转使用`RouterLink`；保存成功、登录成功等由程序决定的跳转使用`useRouter()`：

```js
import { useRouter } from 'vue-router'

const router = useRouter()

async function openTask(id) {
  await router.push({
    name: 'task-detail',
    params: { id },
  })
}
```

`useRouter()`取得Router实例。`route`描述“当前在哪里”，`router`负责“导航到哪里”。

| 方法 | 历史记录变化 | 常见用途 |
| --- | --- | --- |
| `push()` | 新增一条记录 | 从列表进入详情 |
| `replace()` | 替换当前记录 | 同一列表同步筛选条件 |
| `back()` | 返回上一条记录 | 模拟浏览器后退 |

返回固定页面时优先使用命名路由，不要假定`back()`一定会回到任务一览。

## 8. query保存可选条件

query位于URL的`?`后面，适合搜索、排序和分页：

```text
/tasks?keyword=vue&status=doing&page=2
```

下面是任务一览页中的独立示例。输入框失去焦点时更新URL；浏览器前进、后退改变URL时，输入框和列表也会跟着变化：

```vue
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tasks = [
  { id: 1, title: 'Vue画面确认' },
  { id: 2, title: 'API联调' },
]

const keyword = computed(() => String(route.query.keyword ?? ''))
const filteredTasks = computed(() =>
  tasks.filter((task) => task.title.includes(keyword.value)),
)

function updateKeyword(event) {
  router.push({
    name: 'tasks',
    query: { ...route.query, keyword: event.currentTarget.value.trim() || undefined, page: undefined },
  })
}
</script>

<template>
  <label for="task-keyword">任务关键字</label>
  <input id="task-keyword" :value="keyword" @change="updateKeyword">
  <p>找到 {{ filteredTasks.length }} 条任务</p>
  <ul>
    <li v-for="task in filteredTasks" :key="task.id">{{ task.title }}</li>
  </ul>
</template>
```

`keyword`从当前URL计算，而不是仅在组件创建时读一次。输入`Vue`后离开输入框，URL中的`keyword`、输入框内容和列表结果一起变化；浏览器后退时也会从新的URL重新计算。这里使用`push()`保留前一次搜索记录，并在关键字变化时清除旧页码；若项目要求输入变化不增加历史记录，可改用`replace()`。`status`同样应校验允许的值；`page`来自URL时应转换为正整数，不能直接信任查询字符串。

| 需求 | 推荐方式 |
| --- | --- |
| 查看任务101 | params：`/tasks/101` |
| 按状态筛选 | query：`/tasks?status=doing` |
| 显示第2页 | query：`/tasks?page=2` |

query同样来自URL，应提供默认值并校验允许范围。

## 9. 参数变化时重新处理

从`/tasks/1`直接进入`/tasks/2`时，两条URL使用同一个详情组件，Vue Router可能复用组件实例，因此`onMounted()`不会再次执行。

```js
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.params.id,
  (id) => loadTask(String(id)),
  { immediate: true },
)
```

`immediate: true`负责首次读取，之后参数变化再次调用`loadTask()`。加载函数还要处理非法编号、读取失败和任务不存在。

## 10. 嵌套路由

设置页面包含共同布局和多个子页面时，可以使用`children`：

```js
{
  path: '/settings',
  component: SettingsView,
  children: [
    {
      path: 'profile',
      name: 'settings-profile',
      component: ProfileSettingsView,
    },
  ],
}
```

子路由`path: 'profile'`不以`/`开头，最终URL是`/settings/profile`。父页面还要提供子页面出口：

```vue
<!-- SettingsView.vue -->
<template>
  <main>
    <h1>设置</h1>
    <RouterLink :to="{ name: 'settings-profile' }">个人设置</RouterLink>
    <RouterView />
  </main>
</template>
```

外层`App.vue`的`RouterView`显示`SettingsView`，内层`RouterView`显示`ProfileSettingsView`。

## 11. 重定向、别名与404

### 11.1 重定向

重定向会把访问者导航到另一个地址：

```js
{ path: '/', redirect: { name: 'tasks' } }
```

访问`/`后，浏览器URL会变成`/tasks`。

### 11.2 别名

别名让另一个路径显示同一个路由内容，但保留用户访问的URL：

```js
{ path: '/tasks', alias: '/work', name: 'tasks', component: TaskListView }
```

访问`/work`时仍显示任务一览，URL保持`/work`。别名达到会读即可，不要为同一页面随意创建大量入口。

### 11.3 404页面

```js
{
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: NotFoundView,
}
```

该记录匹配其他记录都未匹配的路径，通常放在路由表最后。`/tasks/abc`仍匹配任务详情，应由详情页显示非法编号；完全不存在的`/abc`才进入404页面。

## 12. 把路由参数作为组件Props

页面直接调用`useRoute()`会依赖Router。配置`props: true`后，动态参数会作为同名Prop传给页面组件：

```js
{
  path: '/tasks/:id',
  name: 'task-detail',
  component: TaskDetailView,
  props: true,
}
```

```vue
<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>
```

这样详情组件更容易在没有Router的测试中单独传入`id`。直接读取`route`和使用Props都是常见方式，应遵守项目既有设计。

## 13. History模式与刷新

`createWebHistory()`生成`/tasks/101`这样的普通URL。页面内点击由Router处理；直接打开或刷新时，浏览器会向Web服务器请求`/tasks/101`。

如果服务器只查找同名文件，可能返回404。部署时需要让未知前端路径回退到`index.html`，再由Vue Router读取URL。

`createWebHashHistory()`生成`/#/tasks/101`，较少遇到服务器回退问题，但URL形式不同。使用哪种模式应遵守部署条件和项目规范。

## 14. 路由懒加载

基础流程能够运行后，可以把页面组件改为动态导入：

```js
{
  path: '/tasks',
  name: 'tasks',
  component: () => import('../views/TaskListView.vue'),
}
```

`() => import(...)`表示访问该路由时再加载页面代码。它改变加载时机，不改变路由匹配方式。是否全部懒加载应遵守项目构建策略。

路由懒加载用于按URL加载整个页面组件：用户尚未进入`/tasks`时，不必先下载任务一览页的代码；首次进入该路由时再加载。这里直接把`() => import(...)`交给Router，**不要**套上`defineAsyncComponent()`。第10章的异步组件则用于普通组件按需显示，例如点击按钮才出现的帮助面板。两者都可能延后加载代码，但配置位置和触发条件不同。首次加载时仍需等待组件代码下载，慢网络下应按页面需求处理等待体验。

## 15. 导航守卫：在页面切换前后执行处理

导航守卫是在路由切换过程中的特定时机执行的函数。它常用于登录检查、权限判断、阻止未保存内容丢失、修改页面标题和记录访问日志。

新项目先会用`to`、`from`和返回值判断导航，再练习全局`beforeEach()`与离开页面时的`onBeforeRouteLeave()`。本节其余守卫用于阅读既存项目：遇到具体代码时再查对应小节，不需要为了完成本章任务而逐一配置。15.11节的完整顺序也只用于调查一次导航经过了哪些守卫，不要求按顺序默写。

守卫不是越多越好。先判断逻辑属于整个应用、某一条路由，还是某个页面组件，再选择合适的位置。

| 分类 | API | 执行时机 | 能否阻止导航 | 常见用途 |
| --- | --- | --- | --- | --- |
| 全局前置 | `router.beforeEach()` | 每次导航开始阶段 | 可以 | 登录与通用权限检查 |
| 全局解析 | `router.beforeResolve()` | 组件守卫和异步组件解析完成后、导航确认前 | 可以 | 进入页面前的最后检查 |
| 全局后置 | `router.afterEach()` | 导航完成后 | 不可以 | 标题、日志、访问统计 |
| 路由独享 | `beforeEnter` | 进入指定路由前 | 可以 | 某个页面专用的进入条件 |
| 组件内更新 | `onBeforeRouteUpdate()` | 当前组件被复用、路由发生变化时 | 可以 | 处理动态参数变化 |
| 组件内离开 | `onBeforeRouteLeave()` | 离开当前组件前 | 可以 | 提醒保存编辑内容 |
| Options API组件守卫 | `beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave` | 进入、复用更新或离开组件时 | 可以 | 阅读旧项目代码 |

### 15.1 `to`、`from`和守卫返回值

大部分守卫会收到两个路由对象：

- `to`：准备前往的目标路由；
- `from`：当前正在离开的来源路由。

守卫通过返回值决定本次导航：

| 返回结果 | 含义 |
| --- | --- |
| 不写`return`或返回`undefined` | 允许继续导航 |
| `true` | 允许继续导航，一般不必特意书写 |
| `false` | 取消本次导航，并让URL恢复到原来的状态 |
| 路由地址字符串 | 改为导航到该地址，例如`return '/login'` |
| 路由位置对象 | 改为导航到指定路由，例如`return { name: 'login' }` |
| 抛出错误 | 取消导航，错误会交给`router.onError()`处理 |

守卫可以使用`async`和`await`。异步守卫完成之前，本次导航会保持等待状态。因此，异步操作也必须覆盖允许、取消或重定向等结果，不能让代码长期没有结束。

```js
router.beforeEach(async (to, from) => {
  const signedIn = await checkSignedIn()

  if (to.meta.requiresAuth && !signedIn) {
    return { name: 'login' }
  }
})
```

上例中的`checkSignedIn()`代表项目已有的登录状态检查函数。当前只需理解：`await`取得结果后，守卫再决定是否放行。

### 15.2 用`meta`保存路由附加信息

路由记录可以通过`meta`保存登录要求、页面标题等附加信息。`meta`不是守卫，它只是守卫可以读取的数据。

```js
{
  path: '/tasks/:id',
  name: 'task-detail',
  component: TaskDetailView,
  meta: {
    requiresAuth: true,
    title: '任务详情',
  },
}
```

守卫要导航到登录页，路由表中必须先存在对应记录：

```js
{
  path: '/login',
  name: 'login',
  component: () => import('../views/LoginView.vue'),
}
```

`LoginView.vue`至少要提供登录操作和返回安全页面的方式。

### 15.3 全局前置守卫`beforeEach()`

全局前置守卫在导航确认前执行：

```js
router.beforeEach((to) => {
  const signedIn = sessionStorage.getItem('signedIn') === 'true'

  if (to.meta.requiresAuth && !signedIn && to.name !== 'login') {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }
})
```

执行过程如下：

1. 用户准备进入需要登录的页面；
2. 守卫读取`to.meta.requiresAuth`；
3. 未登录时跳转到登录页，并用`redirect`记录原目标地址；
4. 已登录或页面不要求登录时，不返回内容，继续导航。

条件中排除登录页可以避免“进入登录页时又跳转到登录页”的无限重定向。多个`beforeEach()`会按照注册顺序执行，但初学项目通常集中保留一个入口，再调用独立的检查函数即可。

### 15.4 全局解析守卫`beforeResolve()`

`beforeResolve()`也会在每次导航时执行，但时间比`beforeEach()`晚：异步路由组件和组件内守卫已经处理完成，导航尚未最终确认。

```js
router.beforeResolve((to) => {
  if (to.meta.requiresFinalConfirm) {
    const accepted = window.confirm('确认进入此操作页面吗？')

    if (!accepted) {
      return false
    }
  }
})
```

它适合“只有确定能够进入页面时才值得执行”的最终检查。普通登录检查放在`beforeEach()`更容易理解；不要把同一个条件同时写在两个全局守卫中。

### 15.5 全局后置钩子`afterEach()`

`afterEach()`在导航结束后运行，因此不能取消导航，也不能重定向。它适合更新页面标题、记录日志和发送访问统计。

```js
router.afterEach((to, from, failure) => {
  if (!failure) {
    document.title = to.meta.title ?? '任务示例'
  }
})
```

第三个参数`failure`表示导航失败信息。没有失败时，示例把当前路由的`meta.title`设置为浏览器标题；没有配置标题时使用`任务示例`。

### 15.6 路由独享守卫`beforeEnter`

只与某条路由有关的进入条件，可以直接写在该路由记录中：

```js
{
  path: '/tasks/new',
  name: 'task-create',
  component: () => import('../views/TaskCreateView.vue'),
  beforeEnter: () => {
    const canCreate = sessionStorage.getItem('canCreateTask') === 'true'

    if (!canCreate) {
      return { name: 'tasks' }
    }
  },
}
```

`beforeEnter`仅在“进入这条路由记录”时执行。从`/tasks/1`切换到`/tasks/2`等仅参数、query或hash变化而继续使用同一条路由记录的情况，不会再次触发它。需要处理参数变化时，应使用`watch()`或下一节的`onBeforeRouteUpdate()`。

同一路由也可以配置守卫数组，例如`beforeEnter: [checkLogin, checkCreatePermission]`。每个函数仍使用相同的返回规则。

### 15.7 组件更新守卫`onBeforeRouteUpdate()`

动态路由参数改变时，Vue Router可能复用同一个组件。`onBeforeRouteUpdate()`在复用组件的路由更新前执行，可以读取即将进入的`to`，也可以取消本次变化。

```vue
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to) => {
  const nextTaskId = Number(to.params.id)

  if (!Number.isInteger(nextTaskId) || nextTaskId <= 0) {
    window.alert('任务编号必须是正整数')
    return false
  }
})
</script>
```

第9节使用`watch()`在参数变化后重新处理数据；本守卫则发生在变化确认前，并且能够拒绝非法导航。只需观察变化并刷新数据时使用`watch()`，必须在进入前判断能否切换时使用本守卫。

### 15.8 组件离开守卫`onBeforeRouteLeave()`

编辑页面中最常见的问题是：用户修改了表单，却在保存前离开。组件离开守卫可以先进行确认。

```vue
<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const formChanged = ref(false)

onBeforeRouteLeave(() => {
  if (formChanged.value) {
    const leave = window.confirm('修改尚未保存，确定离开吗？')
    return leave
  }
})
</script>
```

选择“取消”时`window.confirm()`返回`false`，导航也被取消；选择“确定”时返回`true`，允许离开。保存成功后应把`formChanged.value`改回`false`，否则仍会反复提示。

### 15.9 Options API中的三个组件守卫

既有Vue项目中还可能看到以下写法：

```js
export default {
  beforeRouteEnter(to, from, next) {
    next((componentInstance) => {
      console.log('已经进入组件：', componentInstance)
    })
  },
  beforeRouteUpdate(to, from) {
    // 当前组件被复用且路由变化时执行
  },
  beforeRouteLeave(to, from) {
    // 离开当前组件前执行
  },
}
```

- `beforeRouteEnter`：进入创建该组件的路由前执行。此时组件实例尚未创建，不能使用`this`；它没有对应的组合式API函数。
- `beforeRouteUpdate`：组件被复用且路由变化时执行；组合式API项目使用`onBeforeRouteUpdate()`。
- `beforeRouteLeave`：离开组件前执行；组合式API项目使用`onBeforeRouteLeave()`。

本课程新代码继续使用`<script setup>`。`beforeRouteEnter`及其中通过`next()`取得组件实例的写法，达到能读懂既有代码即可。

### 15.10 旧式`next()`参数

导航守卫仍兼容第三个`next`参数：`next()`表示继续，`next(false)`表示取消，`next('/login')`表示重定向。但是，同一次守卫执行中必须保证`next`只调用一次，否则容易出现导航错误。

```js
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }

  next()
})
```

新代码优先使用`return`，因为分支结果更容易检查。看到旧项目的`next()`时，需要逐个分支确认它不会被遗漏或重复调用。

### 15.11 完整执行顺序

一次导航可能经过以下阶段。没有配置的守卫会自然跳过：

1. 导航被触发；
2. 在准备离开的组件中执行`beforeRouteLeave`或`onBeforeRouteLeave()`；
3. 执行全局`beforeEach()`；
4. 在被复用的组件中执行`beforeRouteUpdate`或`onBeforeRouteUpdate()`；
5. 执行路由记录中的`beforeEnter`；
6. 解析异步路由组件；
7. 在准备进入的组件中执行`beforeRouteEnter`；
8. 执行全局`beforeResolve()`；
9. 导航被确认；
10. 执行全局`afterEach()`；
11. 页面DOM更新；
12. 执行`beforeRouteEnter`中传给`next()`的实例回调。

记忆时不要只背顺序，可以理解为：先询问旧页面能否离开，再做全局检查和目标页面检查，确认导航后才执行不能拦截的后置处理。

### 15.12 应该选择哪个守卫

| 需求 | 推荐位置 |
| --- | --- |
| 整个系统统一检查登录状态 | `beforeEach()` |
| 所有检查即将完成时做最后确认 | `beforeResolve()` |
| 导航完成后修改标题或记录日志 | `afterEach()` |
| 只有任务新建页需要检查创建权限 | 路由记录的`beforeEnter` |
| 详情组件复用时检查新的任务编号 | `onBeforeRouteUpdate()` |
| 离开编辑页前提醒保存 | `onBeforeRouteLeave()` |
| 阅读旧式组件守卫 | Options API的三个`beforeRoute...` |

官方完整行为可参照[Vue Router导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)。

前端守卫只能改善导航体验，不能代替服务器认证和权限检查。

## 16. 任务示例阶段成果与验证

完成以下地址：

```text
/                      重定向到任务一览
/tasks                 任务一览，可用query保存筛选
/tasks/:id             任务详情，校验任务编号
/settings/profile      嵌套设置页面
/login                 登录页面
其他路径                404页面
```

依次验证：

1. 点击链接切换页面，页面不整页刷新。
2. 浏览器前进、后退时URL和页面一致。
3. `/tasks/1`切到`/tasks/2`时重新处理参数。
4. `/tasks/abc`显示非法编号。
5. 未知路径显示404。
6. 复制详情URL到新标签页并刷新。
7. 未登录进入受保护路由时导航到登录页。
8. 编辑内容后离开页面时出现确认，取消后仍停留在原页面。
9. 导航成功后浏览器标题随路由的`meta.title`变化。
10. 执行`npm run build`确认路由代码可以构建。

## 17. 常见错误

| 现象 | 常见原因 | 修正方法 |
| --- | --- | --- |
| URL变化但页面不显示 | 缺少`RouterView` | 检查根组件或父路由页面 |
| 找不到路由名称 | `name`拼写不一致 | 对照路由表与导航对象 |
| 参数变化但详情不变 | 只在`onMounted()`读取参数 | 监听`route.params.id` |
| 嵌套页面不显示 | 父页面缺少内层`RouterView` | 增加子路由出口 |
| 登录页不断重定向 | 守卫没有排除登录路由 | 检查守卫条件 |
| 守卫执行后导航一直等待 | 异步任务未结束，或旧式`next()`没有调用 | 检查每个执行分支 |
| 同一次导航出现警告或结果异常 | 一个分支多次调用`next()` | 改用返回值，或保证只调用一次 |
| 在`afterEach()`中返回`false`仍然跳转 | 后置钩子不能拦截导航 | 将判断移到前置、解析或组件守卫 |
| 参数改变时`beforeEnter`没有执行 | 仍在同一条路由记录中 | 使用`watch()`或`onBeforeRouteUpdate()` |
| 部署刷新404 | 服务器没有回退到`index.html` | 检查Web服务器配置 |

## 18. 练习与检查点

1. 从没有Router的项目完成安装、路由表、注册、链接和页面出口。
2. 建立任务一览、详情、设置子页面、登录和404页面。
3. 使用命名路由、params和query完成导航。
4. 处理参数首次读取、参数变化和非法编号。
5. 用`meta`和`beforeEach()`保护一个需要登录的路由。
6. 【会使用、能看懂】用`onBeforeRouteUpdate()`处理详情编号变化。
7. 【会使用、能看懂】用`onBeforeRouteLeave()`提醒用户保存已修改的表单。
8. 【会读即可】阅读`beforeEnter`与`afterEach()`示例，说明它们与`beforeEach()`的职责差异。
10. 验证页面跳转、前进后退、直接访问、刷新、取消导航、404和构建。

- [ ] 能解释Vue Router解决的问题及其职责边界。
- [ ] 能创建、注册Router并使用`RouterLink`和`RouterView`。
- [ ] 能配置静态、动态、重定向和404路由，并能读懂嵌套路由。
- [ ] 能区分route与router、params与query、push与replace。
- [ ] 能处理参数变化、非法输入和History刷新问题。
- [ ] 能用`beforeEach()`实现基础导航检查，知道它不能代替后端权限。
- [ ] 能根据资料使用参数更新和离开确认守卫。
- [ ] 能读懂路由独享守卫、其他全局守卫和主要执行顺序，不要求默写完整顺序。
- [ ] 能读懂Options API组件守卫和旧式`next()`写法。





