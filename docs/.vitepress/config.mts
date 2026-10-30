import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: 'SQL 知识课程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [{ text: '首页', link: '/' }, { text: '课程目录', link: '/courses/' }],
    sidebar: [
      { text: '课程入口', items: [{ text: 'SQL 目录', link: '/courses/' }] },
      { text: '数据库与表结构', items: [
        { text: '数据库与 SQL 入门', link: '/database/sql/00_database_introduction' },
        { text: '数据库工具与连接', link: '/database/sql/01_sql_intro' },
        { text: '建库与建表', link: '/database/sql/02_create_table_basic' },
        { text: '约束基础', link: '/database/sql/03_constraints' },
        { text: '修改与删除表', link: '/database/sql/04_alter_table' },
        { text: '自增列与主键', link: '/database/sql/05_auto_increment' },
        { text: '索引基础', link: '/database/sql/06_index' }
      ] },
      { text: '数据操作与查询', items: [
        { text: 'INSERT 新增', link: '/database/sql/07_insert' },
        { text: 'UPDATE 与 DELETE', link: '/database/sql/08_update_delete' },
        { text: 'SELECT 基础', link: '/database/sql/09_select_basic' },
        { text: '多表、子查询与集合操作', link: '/database/sql/10_join_subquery_union' },
        { text: '分组与聚合', link: '/database/sql/11_groupby_aggregate' },
        { text: '窗口函数与条件表达式', link: '/database/sql/12_window_condition' },
        { text: '常用函数', link: '/database/sql/13_common_functions' },
        { text: '视图', link: '/database/sql/14_view' },
        { text: 'SQL 综合练习', link: '/database/sql/15_sql_comprehensive_practice' }
      ] }
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
