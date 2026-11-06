<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoContainer from './DemoContainer.vue'

type Kind = 'git' | 'linux' | 'shell'
const props = defineProps<{ kind: Kind }>()
const scenarios = {
  git: {
    title: 'Git 文件状态演示',
    description: '观察工作区、暂存区、本地仓库与远程仓库的先后关系。',
    steps: [
      { command: '编辑 lesson.txt', output: '工作区：lesson.txt 已修改\n暂存区：仍是旧版本', meaning: '编辑文件只改变工作区。' },
      { command: 'git add lesson.txt', output: '暂存区：记录这次准备提交的内容\n本地仓库：尚无新提交', meaning: 'add 把当时的文件内容放入暂存区。' },
      { command: 'git commit -m "Update lesson"', output: '本地仓库：产生新提交\n远程仓库：仍未更新', meaning: 'commit 只写入本地仓库。' },
      { command: 'git push origin main', output: '远程仓库：收到新提交', meaning: 'push 才把已有本地提交发送到远程；真实项目还要先确认分支与权限。' },
    ],
  },
  linux: {
    title: 'Linux 文件权限演示',
    description: '观察给文件所有者添加执行权限前后的权限字符串。',
    steps: [
      { command: 'ls -l run.sh', output: '-rw-r--r--  run.sh', meaning: '所有者可读写，但还不能直接执行这个文件。' },
      { command: 'chmod u+x run.sh', output: '权限修改完成', meaning: 'u 表示所有者，+x 表示添加执行权限。' },
      { command: 'ls -l run.sh', output: '-rwxr--r--  run.sh', meaning: '所有者位置多了 x；组和其他人的权限没有变化。' },
    ],
  },
  shell: {
    title: 'Shell 返回码演示',
    description: '观察子程序失败后，脚本如何立即保存返回码并决定后续处理。',
    steps: [
      { command: 'java -jar MockSalesImport.jar ...', output: 'ERROR invalid CSV\n退出状态：1', meaning: '这里的 Java 程序故意模拟失败，不会访问数据库。' },
      { command: 'status=$?', output: 'status=1', meaning: '$? 是刚结束的命令状态；应在运行其他命令前保存。' },
      { command: 'if (( status != 0 )); then ... fi', output: '记录错误；保留原始输入；退出状态：1', meaning: '失败时不归档输入文件，也不报告成功。' },
    ],
  },
} as const

const active = ref(false)
const step = ref(0)
const scenario = computed(() => scenarios[props.kind])
function reset() { step.value = 0 }
</script>

<template>
  <DemoContainer :title="scenario.title" :description="scenario.description" :active="active" @open="active = true" @reset="reset">
    <p class="trace-note">教学模拟：下列命令不会在本站执行，也不会修改你的电脑、Git 仓库或服务器。</p>
    <div class="trace-console" aria-live="polite">
      <p><strong>步骤 {{ step + 1 }} / {{ scenario.steps.length }}</strong></p>
      <pre><code>$ {{ scenario.steps[step].command }}
{{ scenario.steps[step].output }}</code></pre>
    </div>
    <p>{{ scenario.steps[step].meaning }}</p>
    <div class="trace-actions">
      <button type="button" :disabled="step === 0" @click="step--">上一步</button>
      <button type="button" :disabled="step === scenario.steps.length - 1" @click="step++">下一步</button>
    </div>
    <details><summary>查看完整演示命令</summary><pre><code>{{ scenario.steps.map(item => item.command).join('\n') }}</code></pre></details>
  </DemoContainer>
</template>

<style scoped>
.trace-note { color: var(--vp-c-text-2); }
.trace-console { padding: 1rem; border-radius: 8px; background: var(--vp-c-bg-soft); }
.trace-console pre, details pre { overflow-x: auto; white-space: pre-wrap; }
.trace-actions { display: flex; gap: .75rem; margin: 1rem 0; }
.trace-actions button { padding: .4rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.trace-actions button:disabled { opacity: .45; cursor: not-allowed; }
</style>
