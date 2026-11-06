export interface VueLiveExample {
  title: string
  description: string
  task: string
  files: Record<string, string>
}

function single(title: string, description: string, task: string, code: string): VueLiveExample {
  return { title, description, task, files: { 'src/App.vue': code } }
}

export const vueExamples = {
  intro: single('第一次运行 Vue 组件', '修改模板文本，观察预览实时变化。', '把标题改成自己的课程名称。', `<template>
  <main><h1>我的第一个 Vue 页面</h1><p>修改左侧文字试试。</p></main>
</template>`),
  template: single('模板中的插值与指令', '修改数据，观察插值、属性绑定和条件内容。', '修改 employeeName 和 hasLeave 的值。', `<script setup>
const employeeName = '田中'
const hasLeave = true
const profileUrl = 'https://example.com/profile'
</script>

<template>
  <h2>你好，{{ employeeName }}</h2>
  <a :href="profileUrl">员工资料</a>
  <p v-if="hasLeave">可以申请休假</p>
  <p v-else>暂无可用休假</p>
</template>`),
  ref: single('ref 与响应式更新', '点击按钮后，响应式值改变，页面自动更新。', '把每次增加的数量改成 2。', `<script setup>
import { ref } from 'vue'
const count = ref(0)
function add() { count.value += 1 }
</script>

<template>
  <p>点击次数：{{ count }}</p>
  <button @click="add">增加</button>
</template>`),
  events: single('事件绑定与参数', '按钮事件把当前员工编号传给处理函数。', '为第二名员工也加一个按钮。', `<script setup>
import { ref } from 'vue'
const message = ref('请选择员工')
function selectEmployee(code) { message.value = '已选择：' + code }
</script>

<template>
  <button @click="selectEmployee('EMP-001')">选择田中</button>
  <p>{{ message }}</p>
</template>`),
  conditional: single('条件渲染', '切换条件后观察 v-if 与 v-else 显示的内容。', '增加第三种“待审核”状态。', `<script setup>
import { ref } from 'vue'
const approved = ref(false)
</script>

<template>
  <button @click="approved = !approved">切换审批状态</button>
  <p v-if="approved">申请已批准</p>
  <p v-else>申请未批准</p>
</template>`),
  list: single('列表渲染与新增', 'v-for 根据数组生成列表，新增后页面同步变化。', '给列表增加删除按钮。', `<script setup>
import { ref } from 'vue'
const tasks = ref([{ id: 1, name: '确认申请' }, { id: 2, name: '发送通知' }])
let nextId = 3
function addTask() { tasks.value.push({ id: nextId++, name: '新任务' }) }
</script>

<template>
  <button @click="addTask">新增任务</button>
  <ul><li v-for="task in tasks" :key="task.id">{{ task.name }}</li></ul>
</template>`),
  computed: single('computed 派生结果', '派生值会随着原始状态改变而更新。', '把及格线从 60 改为 80。', `<script setup>
import { ref, computed } from 'vue'
const score = ref(55)
const result = computed(() => score.value >= 60 ? '及格' : '未及格')
</script>

<template>
  <button @click="score += 10">分数 +10</button>
  <p>分数：{{ score }}，结果：{{ result }}</p>
</template>`),
  form: single('表单双向绑定', '输入框与状态同步，校验结果立即显示。', '加入姓名至少 2 个字符的判断。', `<script setup>
import { ref, computed } from 'vue'
const name = ref('')
const valid = computed(() => name.value.trim().length > 0)
</script>

<template>
  <label>姓名 <input v-model="name" /></label>
  <p>{{ valid ? '可以提交：' + name : '请填写姓名' }}</p>
</template>`),
  watch: single('watch 观察变化', 'watch 适合在状态变化后执行副作用。', '输入关键词并观察记录的变化。', `<script setup>
import { ref, watch } from 'vue'
const keyword = ref('')
const history = ref([])
watch(keyword, (next, previous) => {
  history.value.unshift('从「' + previous + '」变成「' + next + '」')
})
</script>

<template>
  <input v-model="keyword" placeholder="输入关键词" />
  <ul><li v-for="(item, index) in history" :key="index">{{ item }}</li></ul>
</template>`),
  component: {
    title: '拆分并复用组件', description: '同一个子组件可以用不同数据重复使用。', task: '在 App.vue 中再增加一张员工卡片。', files: {
      'src/App.vue': `<script setup>
import EmployeeCard from './EmployeeCard.vue'
</script>

<template>
  <EmployeeCard name="田中" department="开发部" />
  <EmployeeCard name="佐藤" department="销售部" />
</template>`,
      'src/EmployeeCard.vue': `<script setup>
defineProps({ name: String, department: String })
</script>

<template>
  <article><h3>{{ name }}</h3><p>{{ department }}</p></article>
</template>`
    }
  },
  propsEmits: {
    title: 'Props 向下，事件向上', description: '子组件接收数据，并把用户意图通知父组件。', task: '把按钮文案改成“移除员工”，观察父组件的提示。', files: {
      'src/App.vue': `<script setup>
import { ref } from 'vue'
import EmployeeCard from './EmployeeCard.vue'
const message = ref('等待操作')
</script>

<template>
  <EmployeeCard name="田中" @remove="message = '准备移除：' + $event" />
  <p>{{ message }}</p>
</template>`,
      'src/EmployeeCard.vue': `<script setup>
defineProps({ name: String })
const emit = defineEmits(['remove'])
</script>

<template>
  <button @click="emit('remove', name)">通知父组件：{{ name }}</button>
</template>`
    }
  },
  componentModel: {
    title: '组件 v-model', description: '父组件与输入组件通过 modelValue 和 update:modelValue 协作。', task: '修改输入框内容，再尝试把初始姓名改为“佐藤”。', files: {
      'src/App.vue': `<script setup>
import { ref } from 'vue'
import NameInput from './NameInput.vue'
const name = ref('田中')
</script>

<template>
  <NameInput v-model="name" />
  <p>父组件中的姓名：{{ name }}</p>
</template>`,
      'src/NameInput.vue': `<script setup>
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>`
    }
  },
  slots: {
    title: '插槽传入内容', description: '父组件决定卡片内部显示什么。', task: '给卡片增加一段说明文字。', files: {
      'src/App.vue': `<script setup>
import BaseCard from './BaseCard.vue'
</script>

<template>
  <BaseCard><strong>本月申请：3 件</strong></BaseCard>
</template>`,
      'src/BaseCard.vue': `<template>
  <section style="padding:16px;border:1px solid #aaa;border-radius:8px">
    <slot>暂无内容</slot>
  </section>
</template>`
    }
  },
  lifecycle: {
    title: '挂载与清理', description: '显示组件时启动计时器，隐藏时清理计时器。', task: '把计时器间隔从 1 秒改成 500 毫秒。', files: {
      'src/App.vue': `<script setup>
import { ref } from 'vue'
import Timer from './Timer.vue'
const visible = ref(true)
</script>
<template><button @click="visible = !visible">切换组件</button><Timer v-if="visible" /></template>`,
      'src/Timer.vue': `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const count = ref(0)
let timer
onMounted(() => timer = setInterval(() => count.value++, 1000))
onUnmounted(() => clearInterval(timer))
</script>
<template><p>已运行 {{ count }} 秒</p></template>`
    }
  },
  composable: {
    title: '复用 Composable', description: '两个组件调用同一函数，各自拥有独立状态。', task: '让第二个计数器初始值为 10。', files: {
      'src/App.vue': `<script setup>
import { useCounter } from './useCounter.js'
const first = useCounter()
const second = useCounter()
</script>

<template>
  <button @click="first.add">第一个：{{ first.count }}</button>
  <button @click="second.add">第二个：{{ second.count }}</button>
</template>`,
      'src/useCounter.js': `import { ref } from 'vue'
export function useCounter() {
  const count = ref(0)
  function add() { count.value++ }
  return { count, add }
}`
    }
  },
  asyncState: single('异步界面状态', '本地延时演示读取中、成功与失败三种界面状态。', '把“模拟失败”改为 true，观察错误提示。', `<script setup>
import { ref } from 'vue'
const state = ref('idle')
const items = ref([])
const simulateFailure = false
async function load() {
  state.value = 'loading'
  await new Promise(resolve => setTimeout(resolve, 600))
  if (simulateFailure) { state.value = 'error'; return }
  items.value = ['任务 A', '任务 B']
  state.value = 'success'
}
</script>

<template>
  <button @click="load">读取任务</button>
  <p v-if="state === 'loading'">读取中…</p>
  <p v-else-if="state === 'error'">读取失败，请重试</p>
  <ul v-else-if="state === 'success'"><li v-for="item in items" :key="item">{{ item }}</li></ul>
</template>`),
  router: {
    title: 'Vue Router 页面导航', description: '真实运行 Vue Router；预览使用内存路由，不改变教学网站地址。', task: '增加 /about 页面，或把详情页编号改成 202。', files: {
      'src/App.vue': `<script setup>
import { getCurrentInstance } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { router } from './router.js'
getCurrentInstance().appContext.app.use(router)
const route = useRoute()
</script>
<template>
  <nav><RouterLink to="/tasks">任务一览</RouterLink> | <RouterLink to="/tasks/101">任务 101</RouterLink></nav>
  <p>当前路径：{{ route.fullPath }}</p>
  <RouterView />
</template>`,
      'src/router.js': `import { createRouter, createMemoryHistory } from 'vue-router'
import TaskList from './TaskList.vue'
import TaskDetail from './TaskDetail.vue'
import NotFound from './NotFound.vue'
export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TaskList },
    { path: '/tasks/:id', component: TaskDetail },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})
router.push('/tasks')`,
      'src/TaskList.vue': `<template><h2>任务一览</h2><p>点击导航查看详情。</p></template>`,
      'src/TaskDetail.vue': `<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template><h2>任务详情：{{ route.params.id }}</h2></template>`,
      'src/NotFound.vue': `<template><h2>页面不存在</h2></template>`,
      'import-map.json': JSON.stringify({ imports: { 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.6.4/dist/vue-router.esm-browser.prod.js' } }, null, 2)
    }
  },
  optionsBasics: single('Options API：状态、计算与方法', 'Vue 3 中真实运行 Options API，修改数据并观察模板更新。', '新增任务后观察总数；修改 completed 的初始值。', `<script>
export default {
  data() {
    return { title: '', tasks: [{ id: 1, title: '阅读教程', completed: false }], message: '' }
  },
  computed: {
    unfinishedCount() { return this.tasks.filter(task => !task.completed).length }
  },
  watch: {
    unfinishedCount(newValue, oldValue) { this.message = '未完成数：' + oldValue + ' → ' + newValue }
  },
  methods: {
    addTask() {
      if (!this.title.trim()) return
      this.tasks.push({ id: Date.now(), title: this.title.trim(), completed: false })
      this.title = ''
    },
    toggleTask(task) { task.completed = !task.completed }
  }
}
</script>
<template>
  <h2>未完成：{{ unfinishedCount }}</h2>
  <input v-model="title" placeholder="任务名称" @keyup.enter="addTask" />
  <button @click="addTask">添加</button>
  <ul><li v-for="task in tasks" :key="task.id"><button @click="toggleTask(task)">{{ task.completed ? '恢复' : '完成' }}</button> {{ task.title }}</li></ul>
  <p>{{ message }}</p>
</template>`),
  optionsCommunication: {
    title: 'Options API：Props 与事件', description: '父组件传 Props，子组件用 $emit 把操作结果交回父组件。', task: '把按钮文字改成“标记已读”，再观察父组件收到的消息。', files: {
      'src/App.vue': `<script>
import TaskCard from './TaskCard.vue'
export default {
  components: { TaskCard },
  data() { return { currentTask: '确认设计书', message: '尚未操作' } },
  methods: { handleDone(title) { this.message = '已完成：' + title } }
}
</script>
<template><TaskCard :title="currentTask" @done="handleDone" /><p>{{ message }}</p></template>`,
      'src/TaskCard.vue': `<script>
export default {
  props: { title: { type: String, required: true } },
  emits: ['done'],
  methods: { finish() { this.$emit('done', this.title) } }
}
</script>
<template><button @click="finish">完成 {{ title }}</button></template>`
    }
  },
  optionsLifecycle: {
    title: 'Options API：挂载与清理', description: '组件 mounted 时启动计时器，beforeUnmount 时停止。', task: '切换组件并观察计时器从零开始；把间隔改为 500 毫秒。', files: {
      'src/App.vue': `<script>
import TimerPanel from './TimerPanel.vue'
export default {
  components: { TimerPanel },
  data() { return { visible: true } }
}
</script>
<template><button @click="visible = !visible">切换组件</button><TimerPanel v-if="visible" /></template>`,
      'src/TimerPanel.vue': `<script>
export default {
  data() { return { seconds: 0, timer: null } },
  mounted() { this.timer = setInterval(() => { this.seconds++ }, 1000) },
  beforeUnmount() { clearInterval(this.timer) }
}
</script>
<template><p>运行 {{ seconds }} 秒</p></template>`
    }
  },
  pinia: {
    title: 'Pinia 共享状态', description: '两个组件使用同一个真实 Pinia Store；数据只在预览会话内保存。', task: '修改初始任务，或为 Store 增加删除 action。', files: {
      'src/App.vue': `<script setup>
import { getCurrentInstance } from 'vue'
import { createPinia } from 'pinia'
import TaskHeader from './TaskHeader.vue'
import TaskPanel from './TaskPanel.vue'
getCurrentInstance().appContext.app.use(createPinia())
</script>
<template><TaskHeader /><TaskPanel /></template>`,
      'src/taskStore.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(['准备课程'])
  const count = computed(() => tasks.value.length)
  function addTask(title) { if (title.trim()) tasks.value.push(title.trim()) }
  return { tasks, count, addTask }
})`,
      'src/TaskHeader.vue': `<script setup>
import { useTaskStore } from './taskStore.js'
const store = useTaskStore()
</script>
<template><h2>任务总数：{{ store.count }}</h2></template>`,
      'src/TaskPanel.vue': `<script setup>
import { ref } from 'vue'
import { useTaskStore } from './taskStore.js'
const store = useTaskStore()
const title = ref('')
function add() { store.addTask(title.value); title.value = '' }
</script>
<template><input v-model="title" placeholder="任务名称" /><button @click="add">添加任务</button><ul><li v-for="task in store.tasks" :key="task">{{ task }}</li></ul></template>`,
      'import-map.json': JSON.stringify({ imports: { pinia: 'https://esm.sh/pinia@3.0.4?external=vue' } }, null, 2)
    }
  }
} satisfies Record<string, VueLiveExample>

export type VueExampleKey = keyof typeof vueExamples
