<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { isWebExampleKey, previewDocument, webExamples } from './webExamples'
const props = defineProps<{ example: string }>()
const open = ref(false)
const sample = computed(() => isWebExampleKey(props.example) ? webExamples[props.example] : null)
const content = computed(() => sample.value ? previewDocument(sample.value.html, sample.value.css) : '')
const editLink = computed(() => withBase(`/frontend/playground?example=${encodeURIComponent(props.example)}`))
</script>
<template>
  <div v-if="sample" class="web-inline-preview">
    <button type="button" :aria-expanded="open" @click="open = !open">{{ open ? '收起效果' : '查看效果' }} · {{ sample.title }}</button>
    <div v-if="open" class="web-inline-body">
      <iframe :srcdoc="content" :title="`${sample.title}效果预览`" sandbox="" loading="lazy" />
      <a :href="editLink">在网页编辑室修改此示例 →</a>
    </div>
  </div>
</template>
