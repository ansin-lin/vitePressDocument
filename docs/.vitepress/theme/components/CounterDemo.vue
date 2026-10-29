<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from './DemoContainer.vue'
const count = ref(0)
const error = ref('')
const source = "const count = ref(0)\nfunction increment() { count.value++ }"
function increment() {
  if (count.value >= 10) { error.value = '本示例上限为 10，请重置后继续。'; return }
  count.value++
}
function reset() { count.value = 0; error.value = '' }
</script>
<template><DemoContainer title="响应式计数器" description="真实运行的 Vue 交互：点击按钮观察状态与界面同步。" :source="source" :error="error" @reset="reset"><output aria-live="polite" class="counter">{{ count }}</output><button @click="increment">增加 1</button><p>上限为 10，可体验错误提示和重置。</p></DemoContainer></template>
