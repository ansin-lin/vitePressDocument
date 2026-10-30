<script setup lang="ts">
import { computed, ref } from 'vue'

type TraceStep = {
  title: string
  explanation: string
  line: number
  stack: string
  timer: string
  microtasks: string
  tasks: string
  output: string[]
}

const lines = [
  'console.log("A 同步开始");',
  'setTimeout(() => console.log("D 定时器"), 0);',
  'Promise.resolve().then(() => console.log("C Promise"));',
  'console.log("B 同步结束");'
]
const steps: TraceStep[] = [
  { title: '开始', explanation: '先预测输出：源代码是 A、定时器、Promise、B；实际输出会按这个书写顺序吗？', line: 0, stack: '尚未开始', timer: '无', microtasks: '空', tasks: '空', output: [] },
  { title: '1. 执行第一行', explanation: '同步代码立即输出 A。当前这一轮脚本还会继续向下执行。', line: 1, stack: '当前脚本 → console.log', timer: '无', microtasks: '空', tasks: '空', output: ['A 同步开始'] },
  { title: '2. 登记定时器', explanation: 'setTimeout 登记回调后立即返回；0 毫秒表示尽早安排，不表示立刻打断当前脚本。', line: 2, stack: '当前脚本 → setTimeout', timer: '等待计时条件满足', microtasks: '空', tasks: '定时器回调稍后可进入任务队列', output: ['A 同步开始'] },
  { title: '3. 登记 Promise 后续处理', explanation: 'Promise 已经成功，但 then 的回调仍要等当前同步代码结束，先进入微任务队列。', line: 3, stack: '当前脚本 → then', timer: '定时器回调待执行', microtasks: '输出 C 的回调', tasks: '定时器回调待执行', output: ['A 同步开始'] },
  { title: '4. 执行最后一行', explanation: '继续执行当前脚本，输出 B。到这里，当前同步代码才结束。', line: 4, stack: '当前脚本 → console.log', timer: '定时器回调待执行', microtasks: '输出 C 的回调', tasks: '定时器回调待执行', output: ['A 同步开始', 'B 同步结束'] },
  { title: '5. 清空微任务队列', explanation: '当前脚本结束后，先处理已经排队的 Promise 回调，输出 C。', line: 3, stack: 'Promise 回调 → console.log', timer: '定时器回调待执行', microtasks: '执行后为空', tasks: '定时器回调待执行', output: ['A 同步开始', 'B 同步结束', 'C Promise'] },
  { title: '6. 执行定时器任务', explanation: '微任务处理完后，定时器回调在可运行时作为后续任务执行，输出 D。', line: 2, stack: '定时器回调 → console.log', timer: '计时结束', microtasks: '空', tasks: '取出定时器回调', output: ['A 同步开始', 'B 同步结束', 'C Promise', 'D 定时器'] },
  { title: '完成', explanation: '最终顺序是 A → B → C → D。等待没有阻塞同步代码；回调的执行时机由队列和事件循环决定。', line: 0, stack: '空', timer: '完成', microtasks: '空', tasks: '空', output: ['A 同步开始', 'B 同步结束', 'C Promise', 'D 定时器'] }
]
const index = ref(0)
const current = computed(() => steps[index.value])
</script>

<template>
  <section class="async-trace" aria-label="JavaScript 异步执行步骤演示">
    <div class="async-trace-head">
      <div><span class="demo-kicker">EXECUTION TRACE · 流程图解</span><h3>同一段代码，输出为什么是 A → B → C → D？</h3><p>先阅读代码并预测，再用“下一步”观察调用栈与队列。</p></div>
      <span class="async-trace-count">{{ index + 1 }} / {{ steps.length }}</span>
    </div>
    <div class="async-trace-grid">
      <div class="async-trace-code"><strong>示例代码</strong><div v-for="(line, lineIndex) in lines" :key="lineIndex" class="async-trace-line" :class="{ active: current.line === lineIndex + 1 }"><span>{{ lineIndex + 1 }}</span><code>{{ line }}</code></div></div>
      <div class="async-trace-state"><strong>{{ current.title }}</strong><p>{{ current.explanation }}</p><div class="async-trace-lanes"><div><span>调用栈</span><b>{{ current.stack }}</b></div><div><span>浏览器定时器</span><b>{{ current.timer }}</b></div><div><span>微任务队列</span><b>{{ current.microtasks }}</b></div><div><span>后续任务</span><b>{{ current.tasks }}</b></div></div></div>
    </div>
    <div class="async-trace-output"><strong>当前输出</strong><span>{{ current.output.length ? current.output.join(' → ') : '暂无输出' }}</span></div>
    <div class="async-trace-footer"><p>这是教学流程模型，展示这段代码的关键步骤；不是浏览器内部线程或源码的逐行还原。</p><div><button type="button" :disabled="index === 0" @click="index--">上一步</button><button type="button" :disabled="index === steps.length - 1" @click="index++">下一步</button><button type="button" @click="index = 0">重置</button></div></div>
  </section>
</template>
