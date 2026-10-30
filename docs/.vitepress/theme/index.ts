import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MermaidDiagram from './MermaidDiagram.vue'
import WebPreview from './WebPreview.vue'
import WebPlayground from './WebPlayground.vue'
import './style.css'
export default { extends: DefaultTheme, enhanceApp({ app }) {
  app.component('MermaidDiagram', MermaidDiagram)
  app.component('WebPreview', WebPreview)
  app.component('WebPlayground', WebPlayground)
} } satisfies Theme
