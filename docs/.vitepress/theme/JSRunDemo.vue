<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { isJsExampleKey, jsExamples } from './jsExamples'

const props = defineProps<{ example: string }>()
const sample = isJsExampleKey(props.example) ? jsExamples[props.example] : null
const code = ref<string>(sample?.code ?? '')
const lines = ref<string[]>([])
const running = ref(false)
let worker: Worker | null = null
let timer: ReturnType<typeof setTimeout> | null = null

function stop() {
  if (timer) clearTimeout(timer)
  timer = null
  worker?.terminate()
  worker = null
  running.value = false
}
function reset() {
  stop()
  code.value = sample?.code ?? ''
  lines.value = []
}
function run() {
  stop()
  lines.value = []
  if (!sample) return
  const source = `
const format = value => {
  if (typeof value === 'string') return value;
  if (value instanceof Error) return value.name + ': ' + value.message;
  try { return JSON.stringify(value); } catch { return String(value); }
};
for (const level of ['log', 'warn', 'error']) {
  console[level] = (...args) => self.postMessage({ kind: 'line', value: args.map(format).join(' ') });
}
self.addEventListener('error', event => self.postMessage({ kind: 'line', value: '错误：' + event.message }));
self.addEventListener('unhandledrejection', event => self.postMessage({ kind: 'line', value: '错误：' + format(event.reason) }));
(async () => { try { ${code.value}\n } catch (error) { console.error(error); } finally { self.postMessage({ kind: 'done' }); } })();`
  const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
  try {
    worker = new Worker(url)
    running.value = true
    worker.onmessage = event => {
      if (event.data?.kind === 'line') lines.value.push(String(event.data.value))
      if (event.data?.kind === 'done') {
        running.value = false
      }
    }
    worker.onerror = event => {
      lines.value.push(`语法或运行错误：${event.message}`)
      stop()
    }
    timer = setTimeout(() => {
      if (running.value) lines.value.push('运行已停止：超过 3 秒。请检查是否有无限循环。')
      stop()
    }, 3000)
  } catch (error) {
    lines.value.push(`无法启动运行环境：${String(error)}`)
  } finally {
    URL.revokeObjectURL(url)
  }
}
onBeforeUnmount(stop)
</script>
<template>
  <section v-if="sample" class="js-run-demo" :aria-label="sample.title">
    <header><div><strong>{{ sample.title }}</strong><p>修改代码后点击运行。这里会真实执行 JavaScript，并显示 console 输出。</p></div><div class="js-run-actions"><button type="button" @click="run">运行</button><button type="button" @click="reset">重置</button></div></header>
    <div class="js-run-grid"><label>JavaScript 代码<textarea v-model="code" spellcheck="false" /></label><div class="js-run-output"><strong>运行结果</strong><pre aria-live="polite">{{ lines.length ? lines.join('\n') : running ? '运行中…' : '点击“运行”查看输出。' }}</pre></div></div>
    <p class="js-run-note">运行环境是独立的 Web Worker，可编辑普通 JavaScript；这里没有 DOM 或浏览器存储。网络请求请按第 22 章在真实页面环境练习。每次运行会重新开始，超时会自动停止。</p>
  </section>
</template>
