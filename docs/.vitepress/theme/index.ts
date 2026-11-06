import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MermaidDiagram from './MermaidDiagram.vue'
import WebPreview from './WebPreview.vue'
import WebPlayground from './WebPlayground.vue'
import JSRunDemo from './JSRunDemo.vue'
import AsyncExecutionTrace from './AsyncExecutionTrace.vue'
import VueLiveDemo from './VueLiveDemo.vue'
import ReactLiveDemo from './ReactLiveDemo.vue'
import BackendFlowDemo from './BackendFlowDemo.vue'
import './style.css'
export default { extends: DefaultTheme, enhanceApp({ app }) {
  app.component('MermaidDiagram', MermaidDiagram)
  app.component('WebPreview', WebPreview)
  app.component('WebPlayground', WebPlayground)
  app.component('JSRunDemo', JSRunDemo)
  app.component('AsyncExecutionTrace', AsyncExecutionTrace)
  app.component('VueLiveDemo', VueLiveDemo)
  app.component('ReactLiveDemo', ReactLiveDemo)
  app.component('BackendFlowDemo', BackendFlowDemo)
} } satisfies Theme
