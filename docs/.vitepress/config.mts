import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: 'SQL 知识课程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '数据库', activeMatch: '/database/', items: [
        { text: 'SQL 课程', link: '/database/sql/' }
      ] }
    ],
    sidebar: {
      '/database/sql/': [
        { text: 'SQL 章节目录', link: '/database/sql/', items: [
          { text: '0. 数据库与 SQL 入门', link: '/database/sql/00_database_introduction' },
          { text: '1. 数据库工具与连接', link: '/database/sql/01_sql_intro' },
          { text: '2. 建库与建表', link: '/database/sql/02_create_table_basic' },
          { text: '3. 约束基础', link: '/database/sql/03_constraints' },
          { text: '4. 修改与删除表', link: '/database/sql/04_alter_table' },
          { text: '5. 自增列与主键', link: '/database/sql/05_auto_increment' },
          { text: '6. 索引基础', link: '/database/sql/06_index' },
          { text: '7. INSERT 新增', link: '/database/sql/07_insert' },
          { text: '8. UPDATE 与 DELETE', link: '/database/sql/08_update_delete' },
          { text: '9. SELECT 基础', link: '/database/sql/09_select_basic' },
          { text: '10. 多表与子查询', link: '/database/sql/10_join_subquery_union' },
          { text: '11. 分组与聚合', link: '/database/sql/11_groupby_aggregate' },
          { text: '12. 窗口与条件表达式', link: '/database/sql/12_window_condition' },
          { text: '13. 常用函数', link: '/database/sql/13_common_functions' },
          { text: '14. 视图', link: '/database/sql/14_view' },
          { text: '15. SQL 综合练习', link: '/database/sql/15_sql_comprehensive_practice' }
        ] }
      ],
      '/exercises/database/sql/': [
        { text: 'SQL 章节目录', link: '/database/sql/', items: [
          { text: '0. 数据库与 SQL 入门', link: '/database/sql/00_database_introduction' },
          { text: '1. 数据库工具与连接', link: '/database/sql/01_sql_intro' },
          { text: '2. 建库与建表', link: '/database/sql/02_create_table_basic' },
          { text: '3. 约束基础', link: '/database/sql/03_constraints' },
          { text: '4. 修改与删除表', link: '/database/sql/04_alter_table' },
          { text: '5. 自增列与主键', link: '/database/sql/05_auto_increment' },
          { text: '6. 索引基础', link: '/database/sql/06_index' },
          { text: '7. INSERT 新增', link: '/database/sql/07_insert' },
          { text: '8. UPDATE 与 DELETE', link: '/database/sql/08_update_delete' },
          { text: '9. SELECT 基础', link: '/database/sql/09_select_basic' },
          { text: '10. 多表与子查询', link: '/database/sql/10_join_subquery_union' },
          { text: '11. 分组与聚合', link: '/database/sql/11_groupby_aggregate' },
          { text: '12. 窗口与条件表达式', link: '/database/sql/12_window_condition' },
          { text: '13. 常用函数', link: '/database/sql/13_common_functions' },
          { text: '14. 视图', link: '/database/sql/14_view' },
          { text: '15. SQL 综合练习', link: '/database/sql/15_sql_comprehensive_practice' }
        ] }
      ]
    },
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
