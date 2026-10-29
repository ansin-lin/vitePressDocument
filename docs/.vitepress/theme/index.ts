import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoContainer from './components/DemoContainer.vue'
import CounterDemo from './components/CounterDemo.vue'
import SpringBootRequestFlow from './components/SpringBootRequestFlow.vue'
import MermaidDiagram from './components/MermaidDiagram.vue'
import './style.css'
export default { extends: DefaultTheme, enhanceApp({ app }) {
  app.component('DemoContainer', DemoContainer)
  app.component('CounterDemo', CounterDemo)
  app.component('SpringBootRequestFlow', SpringBootRequestFlow)
  app.component('MermaidDiagram', MermaidDiagram)
} } satisfies Theme
