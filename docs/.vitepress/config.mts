import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: 'HTML、CSS、JavaScript、Java 与 SQL 技术课程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Web 开发基础', activeMatch: '/frontend/|/exercises/frontend/', items: [
        { text: 'HTML 教程', link: '/frontend/HTML/' },
        { text: 'CSS 教程', link: '/frontend/CSS/' },
        { text: 'JavaScript 教程', link: '/frontend/JavaScript/' },
        { text: '网页编辑室', link: '/frontend/playground' }
      ] },
      { text: '数据库', activeMatch: '/database/', items: [
        { text: 'SQL 课程', link: '/database/sql/' }
      ] },
      { text: 'Java', activeMatch: '/backend/java/|/exercises/backend/java/', items: [
        { text: 'Java 基础教程', link: '/backend/java/' },
        { text: 'Java 综合练习', link: '/backend/java/training' }
      ] }
    ],
    sidebar: {
      '/frontend/JavaScript/': [
        { text: 'JavaScript 章节目录', link: '/frontend/JavaScript/', items: [
          { text: '1. 认识 JavaScript 与运行方式', link: '/frontend/JavaScript/01_js_intro_runtime' },
          { text: '2. 变量、值与数据类型', link: '/frontend/JavaScript/02_values_variables_types' },
          { text: '3. 运算符、条件判断与真值', link: '/frontend/JavaScript/03_operators_conditions' },
          { text: '4. 循环与数组基础', link: '/frontend/JavaScript/04_loops_arrays' },
          { text: '5. 数组基本方法', link: '/frontend/JavaScript/05_array_methods' },
          { text: '6. 字符串常用方法', link: '/frontend/JavaScript/06_string_methods' },
          { text: '7. 函数、作用域与闭包', link: '/frontend/JavaScript/07_functions_scope_callbacks' },
          { text: '8. 数组回调方法', link: '/frontend/JavaScript/08_array_callback_methods' },
          { text: '9. 对象基础与业务数据', link: '/frontend/JavaScript/09_objects_basics' },
          { text: '10. 对象方法、this 与原型', link: '/frontend/JavaScript/10_object_methods_prototype' },
          { text: '11. ES6+ 常用现代语法', link: '/frontend/JavaScript/11_destructuring_spread_modern_syntax' },
          { text: '12. DOM 基础与节点操作', link: '/frontend/JavaScript/12_dom_query_content' },
          { text: '13. 事件传播与表单操作', link: '/frontend/JavaScript/13_events_forms' },
          { text: '14. 表单校验与错误提示', link: '/frontend/JavaScript/14_form_validation_errors' },
          { text: '15. 正则表达式与格式校验', link: '/frontend/JavaScript/15_regex_validation' },
          { text: '16. BOM、跳转与浏览器信息', link: '/frontend/JavaScript/16_bom_navigation_session' },
          { text: '17. 日期、数字与工具函数', link: '/frontend/JavaScript/17_date_number_utils' },
          { text: '18. 错误处理与浏览器调试', link: '/frontend/JavaScript/18_error_debugging' },
          { text: '19. JSON 与浏览器存储', link: '/frontend/JavaScript/19_json_browser_storage' },
          { text: '20. ES 模块与脚本组织', link: '/frontend/JavaScript/20_modules_script_organization' },
          { text: '21. Promise 与 async/await', link: '/frontend/JavaScript/21_async_promise_async_await' },
          { text: '22. HTTP 请求与 fetch', link: '/frontend/JavaScript/22_fetch_http_intro' },
          { text: '23. Set、Map 与现代对象', link: '/frontend/JavaScript/23_set_map_modern_objects' },
          { text: '综合练习', link: '/exercises/frontend/JavaScript/24_js_project' }
        ] }
      ],
      '/exercises/frontend/JavaScript/': [
        { text: 'JavaScript 课程', link: '/frontend/JavaScript/', items: [
          { text: '返回章节目录', link: '/frontend/JavaScript/' },
          { text: '综合练习', link: '/exercises/frontend/JavaScript/24_js_project' }
        ] }
      ],
      '/frontend/HTML/': [
        { text: 'HTML 章节目录', link: '/frontend/HTML/', items: [
          { text: '1. 认识 HTML 并创建第一个网页', link: '/frontend/HTML/01_html_intro' },
          { text: '2. HTML 文档结构', link: '/frontend/HTML/02_document_structure' },
          { text: '3. 元素、属性与嵌套', link: '/frontend/HTML/03_elements_attributes' },
          { text: '4. 文本内容标签', link: '/frontend/HTML/04_text_content' },
          { text: '5. 链接与文件路径', link: '/frontend/HTML/05_links_paths' },
          { text: '6. 图片标签', link: '/frontend/HTML/06_images' },
          { text: '7. 列表标签', link: '/frontend/HTML/07_lists' },
          { text: '8. 表格标签', link: '/frontend/HTML/08_tables' },
          { text: '9. 表单基础', link: '/frontend/HTML/09_form_basics' },
          { text: '10. 常用表单控件', link: '/frontend/HTML/10_form_controls' },
          { text: '11. HTML 表单验证属性', link: '/frontend/HTML/11_form_validation' },
          { text: '12. 语义化页面结构', link: '/frontend/HTML/12_semantic_structure' },
          { text: '13. 页面元数据与 HTML 检查', link: '/frontend/HTML/13_metadata_validation' },
          { text: '14. HTML 标签与属性速查表', link: '/frontend/HTML/14_tags_attributes_reference' },
          { text: '综合练习', link: '/exercises/frontend/HTML/14_html_project' }
        ] }
      ],
      '/exercises/frontend/HTML/': [
        { text: 'HTML 章节目录', link: '/frontend/HTML/', items: [
          { text: '1. 认识 HTML 并创建第一个网页', link: '/frontend/HTML/01_html_intro' },
          { text: '2. HTML 文档结构', link: '/frontend/HTML/02_document_structure' },
          { text: '3. 元素、属性与嵌套', link: '/frontend/HTML/03_elements_attributes' },
          { text: '4. 文本内容标签', link: '/frontend/HTML/04_text_content' },
          { text: '5. 链接与文件路径', link: '/frontend/HTML/05_links_paths' },
          { text: '6. 图片标签', link: '/frontend/HTML/06_images' },
          { text: '7. 列表标签', link: '/frontend/HTML/07_lists' },
          { text: '8. 表格标签', link: '/frontend/HTML/08_tables' },
          { text: '9. 表单基础', link: '/frontend/HTML/09_form_basics' },
          { text: '10. 常用表单控件', link: '/frontend/HTML/10_form_controls' },
          { text: '11. HTML 表单验证属性', link: '/frontend/HTML/11_form_validation' },
          { text: '12. 语义化页面结构', link: '/frontend/HTML/12_semantic_structure' },
          { text: '13. 页面元数据与 HTML 检查', link: '/frontend/HTML/13_metadata_validation' },
          { text: '14. HTML 标签与属性速查表', link: '/frontend/HTML/14_tags_attributes_reference' },
          { text: '综合练习', link: '/exercises/frontend/HTML/14_html_project' }
        ] }
      ],
      '/frontend/CSS/': [
        { text: 'CSS 章节目录', link: '/frontend/CSS/', items: [
          { text: '1. 认识 CSS 与引入样式', link: '/frontend/CSS/01_css_intro' },
          { text: '2. 选择器与 CSS 的三大特性', link: '/frontend/CSS/02_selectors_cascade' },
          { text: '3. 文字、颜色与背景', link: '/frontend/CSS/03_text_color_background' },
          { text: '4. 盒子模型、边框与间距', link: '/frontend/CSS/04_box_model_spacing' },
          { text: '5. 元素显示模式、普通流与溢出', link: '/frontend/CSS/05_display_flow_overflow' },
          { text: '6. 定位、层级与显示隐藏', link: '/frontend/CSS/06_position_zindex_visibility' },
          { text: '7. Flex 弹性布局', link: '/frontend/CSS/07_flexbox_layout' },
          { text: '8. Grid 网格布局', link: '/frontend/CSS/08_grid_layout' },
          { text: '9. 响应式布局与媒体查询', link: '/frontend/CSS/09_responsive_media' },
          { text: '10. CSS 变量、命名与样式组织', link: '/frontend/CSS/10_variables_naming_organization' },
          { text: '11. 过渡、动画与可访问性', link: '/frontend/CSS/11_transition_animation_accessibility' },
          { text: '12. CSS 属性速查表', link: '/frontend/CSS/12_css_properties_reference' },
          { text: '综合练习', link: '/exercises/frontend/CSS/12_css_project' }
        ] }
      ],
      '/exercises/frontend/CSS/': [
        { text: 'CSS 章节目录', link: '/frontend/CSS/', items: [
          { text: '1. 认识 CSS 与引入样式', link: '/frontend/CSS/01_css_intro' },
          { text: '2. 选择器与 CSS 的三大特性', link: '/frontend/CSS/02_selectors_cascade' },
          { text: '3. 文字、颜色与背景', link: '/frontend/CSS/03_text_color_background' },
          { text: '4. 盒子模型、边框与间距', link: '/frontend/CSS/04_box_model_spacing' },
          { text: '5. 元素显示模式、普通流与溢出', link: '/frontend/CSS/05_display_flow_overflow' },
          { text: '6. 定位、层级与显示隐藏', link: '/frontend/CSS/06_position_zindex_visibility' },
          { text: '7. Flex 弹性布局', link: '/frontend/CSS/07_flexbox_layout' },
          { text: '8. Grid 网格布局', link: '/frontend/CSS/08_grid_layout' },
          { text: '9. 响应式布局与媒体查询', link: '/frontend/CSS/09_responsive_media' },
          { text: '10. CSS 变量、命名与样式组织', link: '/frontend/CSS/10_variables_naming_organization' },
          { text: '11. 过渡、动画与可访问性', link: '/frontend/CSS/11_transition_animation_accessibility' },
          { text: '12. CSS 属性速查表', link: '/frontend/CSS/12_css_properties_reference' },
          { text: '综合练习', link: '/exercises/frontend/CSS/12_css_project' }
        ] }
      ],
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
