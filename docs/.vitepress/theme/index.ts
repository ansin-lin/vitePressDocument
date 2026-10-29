import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoContainer from './components/DemoContainer.vue'
import CounterDemo from './components/CounterDemo.vue'
import SpringBootRequestFlow from './components/SpringBootRequestFlow.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import { defineAsyncComponent } from 'vue'
const VuePlayground = defineAsyncComponent(() => import('./components/VuePlayground.vue'))
const ReactPlayground = defineAsyncComponent(() => import('./components/ReactPlayground.vue'))
const SqlPlayground = defineAsyncComponent(() => import('./components/SqlPlayground.vue'))
import './style.css'
export default { extends: DefaultTheme, enhanceApp({ app }) {
  app.component('DemoContainer', DemoContainer)
  app.component('CounterDemo', CounterDemo)
  app.component('SpringBootRequestFlow', SpringBootRequestFlow)
  app.component('MermaidDiagram', MermaidDiagram)
  app.component('VuePlayground', VuePlayground)
  app.component('ReactPlayground', ReactPlayground)
  app.component('SqlPlayground', SqlPlayground)
} } satisfies Theme
