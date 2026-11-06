<script setup lang="ts">
import { ref } from 'vue'
import { File, Repl, useStore } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

const props = defineProps<{ files: Record<string, string> }>()
const initialFiles = Object.fromEntries(
  Object.entries(props.files).map(([name, code]) => [name, new File(name, code)])
)
const store = useStore({
  files: ref(initialFiles),
  mainFile: ref('src/App.vue'),
  template: ref({ welcomeSFC: props.files['src/App.vue'], newSFC: '' }),
  showOutput: ref(true),
  locale: ref('zh-CN')
})
</script>

<template>
  <div class="vue-repl-editor">
    <Repl :store="store" :editor="CodeMirror" :show-compile-output="true" />
  </div>
</template>
