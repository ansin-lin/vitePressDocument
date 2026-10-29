<script setup lang="ts">
import { computed, ref } from 'vue'
import DemoContainer from './DemoContainer.vue'
const index = ref(0)
const fail = ref(false)
const steps = computed(() => [
  ['浏览器', '发起 GET /api/users/1 请求'],
  ['DispatcherServlet', '接收请求，通过 HandlerMapping 寻找处理方法'],
  ['Controller', '读取路径参数，调用 UserService'],
  ['Service', '执行业务规则，调用 Repository'],
  ['Repository', fail.value ? '模拟数据访问失败，抛出异常' : '模拟读取用户数据（未连接数据库）'],
  [fail.value ? '异常处理器' : 'Controller → 消息转换器', fail.value ? '模拟 @ExceptionHandler 将异常转换为 HTTP 500' : '模拟将用户对象序列化为 JSON'],
  ['浏览器', fail.value ? '收到模拟 HTTP 500 响应' : '收到模拟 HTTP 200 响应：{"id":1,"name":"小林"}']
])
const source = `@GetMapping("/api/users/{id}")
public User find(@PathVariable Long id) {
    return userService.findById(id);
}`
function reset() { index.value = 0; fail.value = false }
</script>
<template><DemoContainer title="Spring Boot 请求生命周期" description="教学模拟：不运行 Java、Spring Boot 或数据库，不发出真实 API 请求。" :source="source" :error="fail && index >= 4 ? '模拟异常：数据访问失败。继续下一步查看异常响应。' : ''" @reset="reset">
<label><input v-model="fail" type="checkbox" @change="index = 0"> 模拟数据库异常</label>
<ol class="flow"><li v-for="(step, i) in steps" :key="i" :class="{ active: i === index, done: i < index }" :aria-current="i === index ? 'step' : undefined"><strong>{{ step[0] }}</strong><span v-if="i === index">{{ step[1] }}</span></li></ol>
<p aria-live="polite">步骤 {{ index + 1 }} / {{ steps.length }}：{{ steps[index][1] }}</p>
<div class="actions"><button :disabled="index === 0" @click="index--">上一步</button><button :disabled="index === steps.length - 1" @click="index++">下一步</button></div>
</DemoContainer></template>
