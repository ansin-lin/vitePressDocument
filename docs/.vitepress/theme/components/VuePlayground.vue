<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from './DemoContainer.vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
const initial = `<script setup>
import { ref } from 'vue'
const count = ref(0)
<\/script>

<template>
  <button @click="count++">点击 {{ count }} 次</button>
</template>`
const { importMap, vueVersion } = useVueImportMap()
const store = useStore({ builtinImportMap: importMap, vueVersion })
const error = ref('')
const ready = ref(false)
async function reset() { error.value = ''; try { await store.setFiles({ 'App.vue': initial }, 'App.vue'); ready.value = true } catch (e) { error.value = String(e) } }
reset()
</script>
<template><DemoContainer title="Vue 在线练习" description="真实运行的 Vue 单文件组件。编辑代码后在预览区观察结果；首次加载编译器需要网络。" :source="initial" :error="error" @reset="reset"><Repl v-if="ready" :store="store" :editor="CodeMirror" :showCompileOutput="true" class="repl-panel" /><p v-else>正在准备 Vue 编辑器…</p></DemoContainer></template>
