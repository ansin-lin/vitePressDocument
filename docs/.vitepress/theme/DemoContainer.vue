<script setup lang="ts">
defineProps<{
  title: string
  description: string
  active: boolean
  loading?: boolean
  error?: string
  canRun?: boolean
  runLabel?: string
}>()
defineEmits<{
  open: []
  run: []
  reset: []
}>()
</script>

<template>
  <section class="live-demo" :aria-label="title">
    <header class="live-demo-header">
      <div>
        <span class="demo-kicker">在线练习</span>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="live-demo-actions">
        <button v-if="!active" type="button" @click="$emit('open')">打开练习</button>
        <template v-else>
          <button v-if="canRun" type="button" :disabled="loading" @click="$emit('run')">{{ runLabel || '运行' }}</button>
          <button type="button" :disabled="loading" @click="$emit('reset')">重置</button>
        </template>
      </div>
    </header>
    <p v-if="error" class="live-demo-error" role="alert">{{ error }}</p>
    <p v-if="loading" class="live-demo-loading" aria-live="polite">正在加载编辑器与预览…</p>
    <div v-if="active" class="live-demo-content"><slot /></div>
  </section>
</template>
