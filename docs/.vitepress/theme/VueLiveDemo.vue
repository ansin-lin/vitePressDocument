<script setup lang="ts">
import { shallowRef, ref, type Component } from 'vue'
import DemoContainer from './DemoContainer.vue'
import { vueExamples, type VueExampleKey } from './vueLiveExamples'

const props = defineProps<{ example: VueExampleKey }>()
const sample = vueExamples[props.example]
const active = ref(false)
const loading = ref(false)
const error = ref('')
const editorKey = ref(0)
const editor = shallowRef<Component | null>(null)

async function open() {
  loading.value = true
  error.value = ''
  try {
    editor.value = (await import('./VueReplEditor.vue')).default
    active.value = true
  } catch (cause) {
    error.value = `编辑器加载失败：${String(cause)}`
  } finally {
    loading.value = false
  }
}

function reset() {
  editorKey.value += 1
  error.value = ''
}
</script>

<template>
  <DemoContainer :title="sample.title" :description="sample.description" :active="active" :loading="loading" :error="error" @open="open" @reset="reset">
    <p class="live-demo-task">动手试试：{{ sample.task }}</p>
    <component :is="editor" v-if="editor" :key="editorKey" :files="sample.files" />
    <p class="live-demo-footnote">这里运行的是浏览器中的 Vue 单文件组件。预览需要从公共 CDN 加载 Vue 运行时；重置会恢复本节初始代码。</p>
  </DemoContainer>
</template>
