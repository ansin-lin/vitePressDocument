import { defineConfig } from 'vitepress'
export default defineConfig({
  lang: 'zh-CN', title: '技术研习室', description: 'HTML、CSS、JavaScript、TypeScript、Vue、React、Java 与 SQL 技术课程',
  base: process.env.BASE_PATH || '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Web 开发基础', activeMatch: '/frontend/|/exercises/frontend/', items: [
        { text: 'HTML 教程', link: '/frontend/HTML/' },
        { text: 'CSS 教程', link: '/frontend/CSS/' },
        { text: 'JavaScript 教程', link: '/frontend/JavaScript/' },
        { text: 'TypeScript 教程', link: '/frontend/TypeScript/' },
        { text: 'Vue 3 教程', link: '/frontend/Vue/' },
        { text: 'React 教程', link: '/frontend/React/' },
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
      '/frontend/Vue/': [
        { text: 'Vue 3 章节目录', link: '/frontend/Vue/', items: [
          { text: '1. 认识 Vue 与创建项目', link: '/frontend/Vue/01_intro_project_setup' },
          { text: '2. 单文件组件与模板语法', link: '/frontend/Vue/02_sfc_template_syntax' },
          { text: '3. ref 与 reactive', link: '/frontend/Vue/03_reactivity_ref_reactive' },
          { text: '4. 事件绑定', link: '/frontend/Vue/04_events' },
          { text: '5. 属性、样式与条件渲染', link: '/frontend/Vue/05_attribute_condition' },
          { text: '6. 列表渲染与 CRUD', link: '/frontend/Vue/06_list_crud' },
          { text: '7. computed 与派生状态', link: '/frontend/Vue/07_computed' },
          { text: '8. 表单绑定与校验', link: '/frontend/Vue/08_forms_validation' },
          { text: '9. watch 与副作用', link: '/frontend/Vue/09_watch_effects' },
          { text: '10. 组件基础', link: '/frontend/Vue/10_component_basics' },
          { text: '11. Props 与 Emits', link: '/frontend/Vue/11_props_emits' },
          { text: '12. 组件 v-model 与 Attributes', link: '/frontend/Vue/12_component_vmodel_attrs' },
          { text: '13. Slots 与 provide/inject', link: '/frontend/Vue/13_slots_provide_inject' },
          { text: '14. 生命周期与模板引用', link: '/frontend/Vue/14_lifecycle_template_refs' },
          { text: '15. Composables', link: '/frontend/Vue/15_composables' },
          { text: '16. Vue Router', link: '/frontend/Vue/16_vue_router' },
          { text: '17. API 层与异步处理', link: '/frontend/Vue/17_http_api' },
          { text: '18. Pinia 状态管理', link: '/frontend/Vue/18_pinia' },
          { text: '19. 前端测试基础', link: '/frontend/Vue/19_frontend_testing' },
          { text: '20. Vue 自动测试', link: '/frontend/Vue/20_vue_unit_testing' },
          { text: '21. TypeScript 与项目质量', link: '/frontend/Vue/21_build_quality_delivery' },
          { text: '附录：项目 API 规格', link: '/frontend/Vue/appendix_paid_leave_api' },
          { text: '附录：Options API', link: '/frontend/Vue/appendix_options_api' },
          { text: '22. 综合项目', link: '/exercises/frontend/Vue/22_vue_project' },
          { text: '23. SES 改修练习', link: '/exercises/frontend/Vue/23_ses_change_practice' }
        ] }
      ],
      '/exercises/frontend/Vue/': [
        { text: 'Vue 3 课程', link: '/frontend/Vue/', items: [
          { text: '返回章节目录', link: '/frontend/Vue/' },
          { text: '22. 综合项目', link: '/exercises/frontend/Vue/22_vue_project' },
          { text: '23. SES 改修练习', link: '/exercises/frontend/Vue/23_ses_change_practice' }
        ] }
      ],
      '/frontend/React/': [
        { text: 'React 章节目录', link: '/frontend/React/', items: [
          { text: '1. 定位与创建项目', link: '/frontend/React/01_intro_setup' },
          { text: '2. JSX 与组件', link: '/frontend/React/02_jsx_components' },
          { text: '3. Props 与组件拆分', link: '/frontend/React/03_props_components' },
          { text: '4. 条件渲染与列表', link: '/frontend/React/04_conditional_lists' },
          { text: '5. 事件与 useState', link: '/frontend/React/05_events_state' },
          { text: '6. 状态与重新渲染', link: '/frontend/React/06_state_render' },
          { text: '7. 组件通信', link: '/frontend/React/07_component_communication' },
          { text: '8. 表单与校验', link: '/frontend/React/08_forms_validation' },
          { text: '9. useEffect', link: '/frontend/React/09_effects' },
          { text: '10. REST API 与异步 UI', link: '/frontend/React/10_api_async_ui' },
          { text: '11. 员工 CRUD 数据流', link: '/frontend/React/11_crud' },
          { text: '12. Router 与导航', link: '/frontend/React/12_router_navigation' },
          { text: '13. useRef 与自定义 Hook', link: '/frontend/React/13_refs_custom_hooks' },
          { text: '14. Context 与状态分类', link: '/frontend/React/14_context_state_types' },
          { text: '15. 认证路由与权限', link: '/frontend/React/15_auth_routes' },
          { text: '16. 状态管理库', link: '/frontend/React/16_state_libraries' },
          { text: '17. 项目结构与 API Layer', link: '/frontend/React/17_project_structure' },
          { text: '18. 错误处理', link: '/frontend/React/18_error_handling' },
          { text: '19. 常见业务功能', link: '/frontend/React/19_common_features' },
          { text: '20. 文件、环境变量与安全', link: '/frontend/React/20_files_env_security' },
          { text: '21. React 测试', link: '/frontend/React/21_testing' },
          { text: '22. 调试与项目调查', link: '/frontend/React/22_debug_investigation' },
          { text: '附录：旧项目与进阶能力', link: '/frontend/React/appendix_legacy_advanced' },
          { text: '23. 项目规格与结构', link: '/exercises/frontend/React/23_project_spec' },
          { text: '24. 登录、注册与首页', link: '/exercises/frontend/React/24_project_login_list' },
          { text: '25. 申请与一览', link: '/exercises/frontend/React/25_project_crud' },
          { text: '26. 改修与交付', link: '/exercises/frontend/React/26_delivery_existing_project' }
        ] }
      ],
      '/exercises/frontend/React/': [
        { text: 'React 课程', link: '/frontend/React/', items: [
          { text: '返回章节目录', link: '/frontend/React/' },
          { text: '23. 项目规格与结构', link: '/exercises/frontend/React/23_project_spec' },
          { text: '24. 登录、注册与首页', link: '/exercises/frontend/React/24_project_login_list' },
          { text: '25. 申请与一览', link: '/exercises/frontend/React/25_project_crud' },
          { text: '26. 改修与交付', link: '/exercises/frontend/React/26_delivery_existing_project' }
        ] }
      ],
      '/frontend/TypeScript/': [
        { text: 'TypeScript 章节目录', link: '/frontend/TypeScript/', items: [
          { text: '1. 认识 TypeScript 与运行代码', link: '/frontend/TypeScript/01_intro_setup_compile' },
          { text: '2. 类型标注与基本类型', link: '/frontend/TypeScript/02_annotations_basic_types' },
          { text: '3. 数组与元组', link: '/frontend/TypeScript/03_arrays_tuples' },
          { text: '4. 对象类型与类型别名', link: '/frontend/TypeScript/04_object_types_aliases' },
          { text: '5. 联合类型与字面量类型', link: '/frontend/TypeScript/05_unions_literals' },
          { text: '6. 函数类型', link: '/frontend/TypeScript/06_function_types' },
          { text: '7. 类型收窄与类型断言', link: '/frontend/TypeScript/07_narrowing_assertions' },
          { text: '8. 接口与类型组合', link: '/frontend/TypeScript/08_interfaces_composition' },
          { text: '9. 类的类型语法', link: '/frontend/TypeScript/09_classes' },
          { text: '10. 泛型', link: '/frontend/TypeScript/10_generics' },
          { text: '11. 常量与固定值', link: '/frontend/TypeScript/11_constants_enum' },
          { text: '12. 模块与项目配置', link: '/frontend/TypeScript/12_modules_config_declarations' },
          { text: '13. 组件数据与界面状态', link: '/frontend/TypeScript/13_business_state_modeling' },
          { text: '14. 异步结果与外部数据', link: '/frontend/TypeScript/14_async_external_data' },
          { text: '15. TypeScript 基础速查表', link: '/frontend/TypeScript/15_quick_reference' },
          { text: '16. 综合练习', link: '/exercises/frontend/TypeScript/15_paid_leave_practice' },
          { text: '附录：高级类型', link: '/frontend/TypeScript/appendix_advanced_types' },
        ] }
      ],
      '/exercises/frontend/TypeScript/': [
        { text: 'TypeScript 课程', link: '/frontend/TypeScript/', items: [
          { text: '返回章节目录', link: '/frontend/TypeScript/' },
          { text: '15. TypeScript 基础速查表', link: '/frontend/TypeScript/15_quick_reference' },
          { text: '16. 综合练习', link: '/exercises/frontend/TypeScript/15_paid_leave_practice' }
        ] }
      ],
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
