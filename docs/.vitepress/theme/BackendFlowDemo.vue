<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoContainer from './DemoContainer.vue'

type FlowKind = 'mybatis' | 'springboot'
const props = defineProps<{ kind: FlowKind }>()
const flows = {
  mybatis: {
    title: 'MyBatis 查询路径',
    description: '逐步观察一次 Mapper 查询从 Java 方法到数据库、再返回对象的路径。',
    code: 'try (SqlSession session = factory.openSession()) {\n  EmployeeMapper mapper = session.getMapper(EmployeeMapper.class);\n  Employee employee = mapper.selectById(1001L);\n}',
    steps: [
      ['准备工厂', '读取配置和映射文件，创建 SqlSessionFactory；通常在应用启动阶段完成。'],
      ['打开会话', '一次数据库操作取得 SqlSession，并在结束时关闭。'],
      ['取得 Mapper', 'MyBatis 为 Mapper 接口创建代理对象。'],
      ['定位 SQL', '方法名与 XML 中的 namespace、id 对应，找到待执行语句。'],
      ['执行与映射', '数据库返回记录，MyBatis 将列值映射为 Java 对象。'],
      ['返回与关闭', '调用方拿到结果；try-with-resources 负责关闭 SqlSession。'],
    ],
  },
  springboot: {
    title: 'Spring Boot 员工查询路径',
    description: '逐步观察请求进入 Controller、经过 Service 和 Mapper、返回 HTTP 响应。',
    code: 'GET /employees/1001\nController → Service → Mapper → MySQL\nMySQL → Mapper → Service → Controller → JSON',
    steps: [
      ['接收请求', '浏览器发送 GET /employees/1001；Spring MVC 将请求路由到 Controller。'],
      ['解析输入', 'Controller 取得员工编号，并调用 Service。'],
      ['执行业务', 'Service 检查规则，向 Mapper 提出查询要求。'],
      ['查询数据库', 'Mapper 执行 SQL，取得员工记录并映射为 Java 对象。'],
      ['组织响应', 'Service 返回业务结果，Controller 确定响应状态与数据。'],
      ['返回页面', 'Spring Boot 将对象转换为 JSON，浏览器根据响应更新画面。'],
    ],
  },
} as const

const active = ref(false)
const index = ref(0)
const flow = computed(() => flows[props.kind])
function reset() { index.value = 0 }
</script>

<template>
  <DemoContainer :title="flow.title" :description="flow.description" :active="active" @open="active = true" @reset="reset">
    <p class="flow-note">教学流程模拟：按钮只切换说明，不会执行 Java、MyBatis、Spring Boot 或 SQL。</p>
    <ol class="flow-steps">
      <li v-for="(step, stepIndex) in flow.steps" :key="step[0]" :class="{ current: stepIndex === index, passed: stepIndex < index }">
        <span>{{ stepIndex + 1 }}</span>{{ step[0] }}
      </li>
    </ol>
    <p class="flow-description" aria-live="polite"><strong>{{ flow.steps[index][0] }}</strong>：{{ flow.steps[index][1] }}</p>
    <div class="flow-actions">
      <button type="button" :disabled="index === 0" @click="index--">上一步</button>
      <span>第 {{ index + 1 }} / {{ flow.steps.length }} 步</span>
      <button type="button" :disabled="index === flow.steps.length - 1" @click="index++">下一步</button>
    </div>
    <details class="flow-source"><summary>查看对应代码与调用片段</summary><pre><code>{{ flow.code }}</code></pre></details>
  </DemoContainer>
</template>

<style scoped>
.flow-note { margin: 0 0 1rem; color: var(--vp-c-text-2); }
.flow-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: .65rem; padding: 0; list-style: none; }
.flow-steps li { padding: .75rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; color: var(--vp-c-text-2); }
.flow-steps li.current { border-color: var(--vp-c-brand-1); color: var(--vp-c-text-1); background: var(--vp-c-brand-soft); }
.flow-steps li.passed { color: var(--vp-c-brand-1); }
.flow-steps li span { display: inline-grid; place-items: center; width: 1.4rem; height: 1.4rem; margin-right: .4rem; border-radius: 50%; background: var(--vp-c-default-soft); }
.flow-description { min-height: 3rem; margin: 1rem 0; }
.flow-actions { display: flex; align-items: center; gap: 1rem; }
.flow-actions button { padding: .4rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.flow-actions button:disabled { opacity: .45; cursor: not-allowed; }
.flow-source { margin-top: 1rem; }
.flow-source pre { overflow: auto; padding: .8rem; background: var(--vp-c-bg-soft); border-radius: 6px; }
</style>
