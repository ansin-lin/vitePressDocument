import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: '阅读、动手、理解执行流程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [{ text: '学习指南', link: '/guide/' }, { text: '课程', link: '/courses/' }, { text: '交互实验', link: '/examples/' }],
    sidebar: [
      { text: '开始学习', items: [{ text: '学习指南', link: '/guide/' }, { text: '课程目录', link: '/courses/' }] },
      { text: '交互实验', items: [{ text: '实验概览', link: '/examples/' }, { text: 'Vue 基础', items: [{ text: '响应式计数器', link: '/examples/counter' }, { text: 'Vue 在线练习', link: '/examples/vue-playground' }] }, { text: 'React', items: [{ text: 'React 在线练习', link: '/examples/react-playground' }] }, { text: '数据库', items: [{ text: 'SQL 在线练习', link: '/examples/sql-playground' }] }, { text: 'Java / Spring Boot', items: [{ text: '请求生命周期', link: '/examples/spring-boot' }] }] },
      { text: '参与维护', items: [{ text: '开发与教材接入', link: '/guide/development' }] }
    ],
    search: { provider: 'local' }, outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' }
  },
  markdown: { config(md) {
    const original = md.renderer.rules.fence!
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      if (tokens[idx].info.trim() === 'mermaid') return `<MermaidDiagram :code="${md.utils.escapeHtml(JSON.stringify(tokens[idx].content))}" />`
      return original(tokens, idx, options, env, self)
    }
  } }
})
