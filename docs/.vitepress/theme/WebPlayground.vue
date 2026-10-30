<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { isWebExampleKey, previewDocument, webExamples } from './webExamples'
const defaultExample = webExamples['html-intro']
const html = ref(defaultExample.html)
const css = ref(defaultExample.css)
const initialHtml = ref(defaultExample.html)
const initialCss = ref(defaultExample.css)
const selected = ref<'html' | 'css'>('html')
const preview = computed(() => previewDocument(html.value, css.value))
function load(example: keyof typeof webExamples) {
  const value = webExamples[example]
  initialHtml.value = value.html
  initialCss.value = value.css
  reset()
}
function reset() {
  html.value = initialHtml.value
  css.value = initialCss.value
  selected.value = 'html'
}
onMounted(() => {
  const key = new URLSearchParams(location.search).get('example')
  if (key && isWebExampleKey(key)) load(key)
})
</script>
<template>
  <section class="web-playground" aria-label="HTML 与 CSS 网页编辑室">
    <header class="web-playground-header">
      <div><span class="demo-kicker">WEB PLAYGROUND</span><h2>边修改，边看结果</h2><p>编辑 HTML 和 CSS，预览会实时更新。代码仅在你的浏览器中处理。</p></div>
      <button type="button" class="web-reset" @click="reset">↺ 重置代码</button>
    </header>
    <div class="web-playground-grid">
      <div class="web-editor-pane">
        <div class="web-editor-tabs" aria-label="选择编辑文件">
          <button type="button" :class="{ active: selected === 'html' }" :aria-pressed="selected === 'html'" @click="selected = 'html'">HTML</button>
          <button type="button" :class="{ active: selected === 'css' }" :aria-pressed="selected === 'css'" @click="selected = 'css'">CSS</button>
        </div>
        <label v-show="selected === 'html'" for="web-html">HTML 源码</label>
        <textarea v-show="selected === 'html'" id="web-html" v-model="html" spellcheck="false" />
        <label v-show="selected === 'css'" for="web-css">CSS 源码</label>
        <textarea v-show="selected === 'css'" id="web-css" v-model="css" spellcheck="false" />
      </div>
      <div class="web-preview-pane"><div class="web-preview-label">页面预览 <span>实时更新</span></div><iframe :srcdoc="preview" title="网页编辑室页面预览" sandbox="" /></div>
    </div>
    <p class="web-playground-note">预览只渲染 HTML 与 CSS，不执行 JavaScript，也不会保存编辑内容。刷新页面后可重新开始。</p>
  </section>
</template>
