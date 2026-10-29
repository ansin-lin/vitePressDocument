<script setup lang="ts">
withDefaults(defineProps<{ title: string; description?: string; source?: string; error?: string }>(), { description: '', source: '', error: '' })
defineEmits<{ reset: [] }>()
</script>
<template>
  <section class="demo" :aria-label="title">
    <header><div><h3>{{ title }}</h3><p v-if="description">{{ description }}</p></div><button type="button" @click="$emit('reset')">重置</button></header>
    <div class="demo-body"><slot /></div>
    <p v-if="error" role="alert" class="demo-error">{{ error }}</p>
    <details v-if="source"><summary>查看源码</summary><pre><code>{{ source }}</code></pre></details>
  </section>
</template>
