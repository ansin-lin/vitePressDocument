import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MermaidDiagram from './MermaidDiagram.vue'
import WebPreview from './WebPreview.vue'
import WebPlayground from './WebPlayground.vue'
import JSRunDemo from './JSRunDemo.vue'
import AsyncExecutionTrace from './AsyncExecutionTrace.vue'
import './style.css'
export default { extends: DefaultTheme, enhanceApp({ app }) {
  app.component('MermaidDiagram', MermaidDiagram)
  app.component('WebPreview', WebPreview)
  app.component('WebPlayground', WebPlayground)
  app.component('JSRunDemo', JSRunDemo)
  app.component('AsyncExecutionTrace', AsyncExecutionTrace)
} } satisfies Theme
