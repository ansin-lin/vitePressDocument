<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import type { Mermaid } from 'mermaid'
const props = defineProps<{ code: string }>()
const { isDark } = useData()
const svg = ref('')
const error = ref('')
let revision = 0
async function render() {
  const current = ++revision
  error.value = ''; svg.value = ''
  try {
    const url = withBase('/vendor/mermaid/mermaid.esm.min.mjs')
    const { default: mermaid }: { default: Mermaid } = await import(/* @vite-ignore */ url)
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: isDark.value ? 'dark' : 'default', suppressErrorRendering: true })
    const { svg: result } = await mermaid.render(`diagram-${crypto.randomUUID()}`, props.code)
    if (current === revision) svg.value = result
  } catch { if (current === revision) error.value = '图表无法渲染，请检查 Mermaid 语法。' }
}
onMounted(() => { render(); watch([() => props.code, isDark], render) })
</script>
<template><div class="mermaid-diagram"><p v-if="error" role="alert">{{ error }}</p><div v-else-if="svg" v-html="svg" /><p v-else>图表加载中…</p><details><summary>图表源码</summary><pre>{{ code }}</pre></details></div></template>

