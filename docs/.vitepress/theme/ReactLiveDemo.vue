<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import type { loadSandpackClient } from '@codesandbox/sandpack-client'
import DemoContainer from './DemoContainer.vue'
import { reactExamples, type ReactExampleKey } from './reactLiveExamples'

const props = defineProps<{ example: ReactExampleKey }>()
const sample = reactExamples[props.example]
const code = ref(sample.code)
const active = ref(false)
const loading = ref(false)
const error = ref('')
const status = ref('尚未运行')
const iframe = ref<HTMLIFrameElement | null>(null)
let client: Awaited<ReturnType<typeof loadSandpackClient>> | null = null
let unsubscribe: (() => void) | null = null

function setup() {
  const dependencies = { react: '19.3.0', 'react-dom': '19.3.0', ...sample.dependencies }
  return {
    template: 'create-react-app' as const,
    entry: '/index.js',
    dependencies,
    files: {
      '/package.json': { code: JSON.stringify({ name: 'lesson-demo', version: '1.0.0', main: 'index.js', dependencies }) },
      '/index.html': { code: '<!doctype html><html><head><meta charset="UTF-8" /></head><body><div id="root"></div></body></html>' },
      '/index.js': { code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
createRoot(document.getElementById('root')).render(<App />);` },
      '/App.jsx': { code: code.value }
    }
  }
}

async function run() {
  if (loading.value) return
  error.value = ''
  if (!active.value) {
    active.value = true
    await nextTick()
  }
  if (!iframe.value) return
  try {
    if (client) {
      status.value = '正在更新预览…'
      client.updateSandbox(setup())
      return
    }
    loading.value = true
    status.value = '正在连接预览环境…'
    const { loadSandpackClient: load } = await import('@codesandbox/sandpack-client')
    client = await load(iframe.value, setup(), { showErrorScreen: true, showLoadingScreen: true, height: '420px' })
    unsubscribe = client.listen(message => {
      if (message.type === 'status') status.value = `预览状态：${message.status}`
      if (message.type === 'success' || message.type === 'done') status.value = '预览已更新'
      if (message.type === 'action' && message.action === 'show-error') {
        error.value = `代码错误：${message.message}`
        status.value = '预览有错误'
      }
    })
  } catch (cause) {
    error.value = `预览环境加载失败：${String(cause)}`
    status.value = '连接失败，可再次点击运行重试'
  } finally {
    loading.value = false
  }
}

function reset() {
  code.value = sample.code
  error.value = ''
  void run()
}

onBeforeUnmount(() => {
  unsubscribe?.()
  client?.destroy()
})
</script>

<template>
  <DemoContainer :title="sample.title" :description="sample.description" :active="active" :loading="loading" :error="error" :can-run="true" run-label="运行修改" @open="run" @run="run" @reset="reset">
    <p class="live-demo-task">动手试试：{{ sample.task }}</p>
    <div class="react-live-grid">
      <label class="react-live-code">App.jsx 代码<textarea v-model="code" spellcheck="false" aria-label="编辑 React 示例代码" /></label>
      <div class="react-live-preview"><strong>页面预览</strong><iframe ref="iframe" :title="`${sample.title}运行预览`" sandbox="allow-scripts allow-same-origin" /><small aria-live="polite">{{ status }}</small></div>
    </div>
    <p class="live-demo-footnote">这里运行的是浏览器中的 React 示例。点击“运行修改”更新预览；Sandpack 需要连接 CodeSandbox 的公共打包服务。重置会恢复初始代码。</p>
  </DemoContainer>
</template>
