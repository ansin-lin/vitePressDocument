import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: 'Java 与 SQL 技术课程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '数据库', activeMatch: '/database/', items: [
        { text: 'SQL 课程', link: '/database/sql/' }
      ] },
      { text: 'Java', activeMatch: '/backend/java/|/exercises/backend/java/', items: [
        { text: 'Java 基础教程', link: '/backend/java/' },
        { text: 'Java 综合练习', link: '/backend/java/training' }
      ] }
    ],
    sidebar: {
      '/backend/java/': [
        { text: 'Java 基础教程', link: '/backend/java/', items: [
          { text: '第1章 Java 入门简介', link: '/backend/java/01_intro' },
          { text: '第2章 Java 程序结构', link: '/backend/java/02_structure' },
          { text: '第3章 Java 变量与常量', link: '/backend/java/03_data_types_variables' },
          { text: '第4章 Java 运算符', link: '/backend/java/04_operators' },
          { text: '第5章 Java 流程控制', link: '/backend/java/05_controls' },
          { text: '第6章 Java 数组', link: '/backend/java/06_arrays' },
          { text: '第7章 Java 字符串基础', link: '/backend/java/07_strings' },
          { text: '第8章 Java 类与对象基础', link: '/backend/java/08_class_object_basics' },
          { text: '第9章 Java 方法基础', link: '/backend/java/09_methods' },
          { text: '第10章 构造方法与封装', link: '/backend/java/10_constructor_encapsulation_javabean' },
          { text: '第11章 继承与多态', link: '/backend/java/11_inheritance_override_polymorphism' },
          { text: '第12章 static 与接口', link: '/backend/java/12_static_final_abstract_interface' },
          { text: '第13章 包与 JAR', link: '/backend/java/13_package_import_jar' },
          { text: '第14章 Java 异常处理', link: '/backend/java/14_exception_handling' },
          { text: '第15章 集合框架', link: '/backend/java/15_collections' },
          { text: '第16章 Java 泛型', link: '/backend/java/16_generics' },
          { text: '第17章 字符串与枚举', link: '/backend/java/17_strings_and_enum' },
          { text: '第18章 常用类', link: '/backend/java/18_common_classes' },
          { text: '第19章 Java I/O 与文件处理', link: '/backend/java/19_io_file' },
          { text: '第20章 Maven 基础', link: '/backend/java/20_maven_basics' },
          { text: '第21章 Java JDBC 数据库连接', link: '/backend/java/21_jdbc' },
          { text: '第22章 JUnit 测试', link: '/backend/java/22_junit_basics' },
          { text: '综合练习', link: '/backend/java/training' }
        ] }
      ],
      '/exercises/backend/java/': [
        { text: 'Java 基础教程', link: '/backend/java/', items: [
          { text: '第1章 Java 入门简介', link: '/backend/java/01_intro' },
          { text: '第2章 Java 程序结构', link: '/backend/java/02_structure' },
          { text: '第3章 Java 变量与常量', link: '/backend/java/03_data_types_variables' },
          { text: '第4章 Java 运算符', link: '/backend/java/04_operators' },
          { text: '第5章 Java 流程控制', link: '/backend/java/05_controls' },
          { text: '第6章 Java 数组', link: '/backend/java/06_arrays' },
          { text: '第7章 Java 字符串基础', link: '/backend/java/07_strings' },
          { text: '第8章 Java 类与对象基础', link: '/backend/java/08_class_object_basics' },
          { text: '第9章 Java 方法基础', link: '/backend/java/09_methods' },
          { text: '第10章 构造方法与封装', link: '/backend/java/10_constructor_encapsulation_javabean' },
          { text: '第11章 继承与多态', link: '/backend/java/11_inheritance_override_polymorphism' },
          { text: '第12章 static 与接口', link: '/backend/java/12_static_final_abstract_interface' },
          { text: '第13章 包与 JAR', link: '/backend/java/13_package_import_jar' },
          { text: '第14章 Java 异常处理', link: '/backend/java/14_exception_handling' },
          { text: '第15章 集合框架', link: '/backend/java/15_collections' },
          { text: '第16章 Java 泛型', link: '/backend/java/16_generics' },
          { text: '第17章 字符串与枚举', link: '/backend/java/17_strings_and_enum' },
          { text: '第18章 常用类', link: '/backend/java/18_common_classes' },
          { text: '第19章 Java I/O 与文件处理', link: '/backend/java/19_io_file' },
          { text: '第20章 Maven 基础', link: '/backend/java/20_maven_basics' },
          { text: '第21章 Java JDBC 数据库连接', link: '/backend/java/21_jdbc' },
          { text: '第22章 JUnit 测试', link: '/backend/java/22_junit_basics' },
          { text: '综合练习', link: '/backend/java/training' }
        ] }
      ],
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
