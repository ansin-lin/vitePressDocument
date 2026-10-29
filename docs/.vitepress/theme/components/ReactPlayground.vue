<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DemoContainer from './DemoContainer.vue'
import type { SandpackClient } from '@codesandbox/sandpack-client'
const initial = `import React, { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>点击 {count} 次</button>;
}`
const code = ref(initial)
const error = ref('')
const status = ref('正在准备预览…')
const frame = ref<HTMLIFrameElement | null>(null)
let client: SandpackClient | undefined
let unsubscribe: (() => void) | undefined
function setup() { return { files: { '/App.js': { code: code.value }, '/index.js': { code: "import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; createRoot(document.getElementById('root')).render(<App />);", hidden: true }, '/index.html': { code: '<div id="root"></div>', hidden: true } }, dependencies: { react: '18.3.1', 'react-dom': '18.3.1' }, entry: '/index.js', template: 'create-react-app' as const } }
function run() { error.value = ''; status.value = '正在编译…'; try { client?.updateSandbox(setup()) } catch (e) { error.value = String(e) } }
function reset() { code.value = initial; run() }
onMounted(async () => { try { const { loadSandpackClient } = await import('@codesandbox/sandpack-client'); if (!frame.value) return; const loaded = await loadSandpackClient(frame.value, setup(), { showErrorScreen: true, showLoadingScreen: true }); client = loaded; unsubscribe = loaded.listen(message => { if (message.type === 'status') status.value = message.status === 'idle' ? '预览已更新' : '正在编译…'; if (message.type === 'action' && message.action === 'show-error') error.value = '代码执行出错，请查看预览区的错误信息。' }) } catch (e) { error.value = String(e) } })
onUnmounted(() => { unsubscribe?.(); client?.destroy() })
</script>
<template><DemoContainer title="React 在线练习" description="Sandpack 在隔离的预览框中真实编译运行 React；编译服务需要网络连接。" :source="code" :error="error" @reset="reset"><label for="react-code">编辑 App.js</label><textarea id="react-code" v-model="code" class="playground-code" spellcheck="false" /><div class="actions"><button type="button" @click="run">运行代码</button><span aria-live="polite">{{ status }}</span></div><iframe ref="frame" class="playground-preview" title="React 运行预览" sandbox="allow-scripts allow-same-origin allow-forms allow-modals" /></DemoContainer></template>
