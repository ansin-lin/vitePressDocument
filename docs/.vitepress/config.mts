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
        { text: 'Node.js 与 npm 基础', link: '/frontend/NodeJS/' },
        { text: 'TypeScript 教程', link: '/frontend/TypeScript/' },
        { text: 'Vue 3 教程', link: '/frontend/Vue/' },
        { text: 'React 教程', link: '/frontend/React/' },
        { text: '网页编辑室', link: '/frontend/playground' }
      ] },
      { text: '数据库', activeMatch: '/database/', items: [
        { text: 'SQL 课程', link: '/database/sql/' }
      ] },
      { text: '后端开发', activeMatch: '/backend/|/exercises/backend/', items: [
        { text: 'Java 基础教程', link: '/backend/java/' },
        { text: 'MyBatis 教程', link: '/backend/mybatis/' },
        { text: 'Spring Boot 教程', link: '/backend/springboot/' },
        { text: 'Java 综合练习', link: '/backend/java/training' }
      ] }
    ],
    sidebar: {
      '/frontend/NodeJS/': [
        { text: 'Node.js 与 npm 基础', link: '/frontend/NodeJS/', items: [
          { text: '1. Node.js 与运行环境', link: '/frontend/NodeJS/01_nodejs_runtime_basics' },
          { text: '2. npm 与项目依赖', link: '/frontend/NodeJS/02_npm_package_dependencies' },
          { text: '3. scripts、npx 与团队工作流', link: '/frontend/NodeJS/03_npm_scripts_npx_workflow' }
        ] }
      ],
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
          { text: '17A. 课堂任务接口准备', link: '/frontend/Vue/17_task_api_mock' },
          { text: '18. Pinia 状态管理', link: '/frontend/Vue/18_pinia' },
          { text: '19. 前端测试基础', link: '/frontend/Vue/19_frontend_testing' },
          { text: '20. Vue 自动测试', link: '/frontend/Vue/20_vue_unit_testing' },
          { text: '21. TypeScript 与项目质量', link: '/frontend/Vue/21_build_quality_delivery' },
          { text: '附录：项目 API 规格', link: '/frontend/Vue/appendix_paid_leave_api' },
          { text: '附录：Options API', link: '/frontend/Vue/appendix_options_api' },
          { text: '附录：Vue 2 写法与差异', link: '/frontend/Vue/appendix_vue2' },
          { text: '附录：常见内置能力', link: '/frontend/Vue/appendix_common_patterns' },
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
          { text: '10A. 课堂员工接口准备', link: '/frontend/React/10_employee_api_mock' },
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
      '/backend/mybatis/': [
        { text: 'MyBatis 章节目录', link: '/backend/mybatis/', items: [
          { text: '1. MyBatis 简介与使用场景', link: '/backend/mybatis/01_mybatis_overview' },
          { text: '2. 第一个 MyBatis 程序', link: '/backend/mybatis/02_mybatis_hello_world' },
          { text: '3. MyBatis 配置文件', link: '/backend/mybatis/03_mybatis_config_file' },
          { text: '4. Mapper 接口与 XML 映射', link: '/backend/mybatis/04_mapper_interface_xml' },
          { text: '5. 核心对象与执行流程', link: '/backend/mybatis/05_core_objects_execution_flow' },
          { text: '6. 查询与结果映射', link: '/backend/mybatis/06_select_result_mapping' },
          { text: '7. INSERT、UPDATE、DELETE', link: '/backend/mybatis/07_insert_update_delete' },
          { text: '8. 参数映射', link: '/backend/mybatis/08_parameter_mapping' },
          { text: '9. 动态 SQL', link: '/backend/mybatis/09_dynamic_sql' },
          { text: '10. 关联查询与 ResultMap', link: '/backend/mybatis/10_association_resultmap' },
          { text: '11. 缓存机制', link: '/backend/mybatis/11_cache_mechanism' },
          { text: '12. MyBatis 综合练习', link: '/backend/mybatis/12_comprehensive_practice' },
          { text: '附录：项目中的 SQL 调用与排错', link: '/backend/mybatis/appendix/A01_project_sql_call_pitfalls' },
        ] }
      ],
      '/backend/springboot/': [
        { text: 'Spring Boot 主线', link: '/backend/springboot/', items: [
          { text: '1. 一个后端系统需要完成什么', link: '/backend/springboot/mainline/01_springboot_overview' },
          { text: '2. 为什么需要三层架构', link: '/backend/springboot/mainline/02_three_layer_architecture' },
          { text: '3. 创建并运行一个Spring Boot工程', link: '/backend/springboot/mainline/03_create_project_and_first_api' },
          { text: '4. Spring怎样创建并连接各层对象', link: '/backend/springboot/mainline/04_spring_objects_dependency_injection' },
          { text: '5. 接口规格与数据对象为什么要分开', link: '/backend/springboot/mainline/05_api_spec_and_data_objects' },
          { text: '6. 把HTTP请求连接到Java方法', link: '/backend/springboot/mainline/06_http_request_to_java_method' },
          { text: '7. 成功与失败怎样返回', link: '/backend/springboot/mainline/07_success_and_failure_response' },
          { text: '8. 输入校验与业务规则', link: '/backend/springboot/mainline/08_validation_and_business_rules' },
          { text: '9. 数据库记录怎样成为接口响应', link: '/backend/springboot/mainline/09_database_and_mybatis' },
          { text: '10. 完成员工增删改查', link: '/backend/springboot/mainline/10_employee_crud' },
          { text: '11. 用日志定位接口故障', link: '/backend/springboot/mainline/11_logging_and_diagnosis' },
          { text: '12. 员工CRUD的分层测试与接口验证', link: '/backend/springboot/mainline/12_automated_testing_and_regression' },
          { text: '13. 用事务保证多步写入一致', link: '/backend/springboot/mainline/13_transaction_and_consistency' },
          { text: '14. 前后端分离项目中的REST列表查询、筛选、排序与分页', link: '/backend/springboot/mainline/14_search_sort_pagination' },
          { text: '15. Spring Security：数据库注册与JWT Bearer认证', link: '/backend/springboot/mainline/15_session_login' },
          { text: '16. JWT角色授权与本人数据范围', link: '/backend/springboot/mainline/16_authorization_and_data_scope' },
          { text: '17. 多环境配置与打包', link: '/backend/springboot/mainline/17_profiles_configuration_packaging' },
          { text: '18. 部署与运行检查', link: '/backend/springboot/mainline/18_deployment_operations_check' },
          { text: '19. 前后端综合练习', link: '/exercises/backend/springboot/mainline/19_paid_leave_vue_backend_practice' }
        ] },
        { text: '附录与扩展', collapsed: true, items: [
          { text: '附录学习入口', link: '/backend/springboot/appendix/' },
          { text: 'A03-1 使用@Controller返回HTML页面', link: '/backend/springboot/appendix/A03_01_spring_mvc_html_views' },
          { text: 'A03-2 使用DevTools加快本地开发', link: '/backend/springboot/appendix/A03_02_devtools_local_development' },
          { text: 'A04 多个Bean候选的选择与排错', link: '/backend/springboot/appendix/A04_multiple_bean_candidates' },
          { text: 'A05 Jackson字段映射与输出规则', link: '/backend/springboot/appendix/A05_jackson_json_mapping' },
          { text: 'A06 Header、Cookie与文件上传', link: '/backend/springboot/appendix/A06_http_headers_cookies_file_upload' },
          { text: 'A08 使用@Validated选择校验分组', link: '/backend/springboot/appendix/A08_validated_validation_groups' },
          { text: 'A09-1 Java Web项目中的日期时间与时区', link: '/backend/springboot/appendix/A09_01_java_web_datetime' },
          { text: 'A09-2 Spring Boot怎样读取独立MyBatis配置', link: '/backend/springboot/appendix/A09_02_springboot_mybatis_config' },
          { text: 'A11-2 Filter 执行时机', link: '/backend/springboot/appendix/A11_2_filter_execution_timing' },
          { text: 'A11-3 使用AOP统一记录方法日志', link: '/backend/springboot/appendix/A11_3_aop_method_logging' },
          { text: 'A11-1 Spring Boot日志配置进阶', link: '/backend/springboot/appendix/A11_logging_configuration_advanced' },
          { text: 'A12-1 常用测试断言库与断言方法', link: '/backend/springboot/appendix/A12_01_testing_assertions_reference' },
          { text: 'A12-2 使用H2完成独立数据库测试实验', link: '/backend/springboot/appendix/A12_02_h2_test_database' },
          { text: 'A12-3 JUnit Jupiter常用注解与方法', link: '/backend/springboot/appendix/A12_03_junit_jupiter_annotations_methods' },
          { text: 'A13-1 从旧页面覆盖认识事务与Spring事务机制', link: '/backend/springboot/appendix/A13_01_transaction_spring_mechanisms' },
          { text: 'A13-2 从旧页面覆盖到悲观锁、乐观锁与双请求验证', link: '/backend/springboot/appendix/A13_02_concurrent_updates_locks' },
          { text: 'A13-3 用MVCC解释读写并发：隔离级别与快照', link: '/backend/springboot/appendix/A13_03_isolation_mvcc' },
          { text: 'A17 配置、构建与交付进阶', link: '/backend/springboot/appendix/A17_configuration_build_delivery_advanced' },
          { text: 'A18-1 Linux部署与运维手顺参考', link: '/backend/springboot/appendix/A18_01_linux_deployment_operations_reference' },
          { text: 'A18-2 常见运行与数据库迁移组件识读', link: '/backend/springboot/appendix/A18_02_operations_components_reading' },
          { text: 'Spring项目常见注解速查手册', link: '/backend/springboot/appendix/Appendix_spring_annotation_reference' },
          { text: 'B01 Spring 共通处理机制', link: '/backend/springboot/appendix/B01_spring_common_processing_mechanisms' },
          { text: 'B02 如何阅读一个陌生的Spring项目', link: '/backend/springboot/appendix/B02_existing_project_reading' },
          { text: 'B03 Lombok与Spring Data JPA识读', link: '/backend/springboot/appendix/B03_lombok_jpa_reading' },
          { text: 'B04 日本既存Spring项目的新旧结构识读', link: '/backend/springboot/appendix/B04_legacy_spring_project_reading' },
          { text: 'B05 Spring Boot调用外部REST API', link: '/backend/springboot/appendix/B05_external_api_restclient' },
          { text: 'B06 Spring Boot常见问题与排查索引', link: '/backend/springboot/appendix/B06_troubleshooting_review_index' },
          { text: 'B07 Spring Boot 跨域问题与解决方案', link: '/backend/springboot/appendix/B07_spring_boot_cors_basics' },
          { text: '企业扩展入口', link: '/backend/springboot/extensions/' },
          { text: 'Redis 扩展', link: '/backend/springboot/extensions/redis' },
          { text: 'Spring Batch 专题', link: '/backend/springboot/extensions/spring-batch-training/README' },
          { text: '账票专题', link: '/backend/springboot/extensions/01_report_overview' }
        ] }
      ],
      '/exercises/backend/mybatis/': [
        { text: 'MyBatis 课程', link: '/backend/mybatis/', items: [
          { text: '返回章节目录', link: '/backend/mybatis/' },
          { text: '12. 综合练习', link: '/exercises/backend/mybatis/12_comprehensive_practice' }
        ] }
      ],
      '/exercises/backend/springboot/': [
        { text: 'Spring Boot 课程', link: '/backend/springboot/', items: [
          { text: '返回主线目录', link: '/backend/springboot/' },
          { text: '19. 前后端综合练习', link: '/exercises/backend/springboot/mainline/19_paid_leave_vue_backend_practice' },
          { text: '企业扩展', link: '/backend/springboot/extensions/' }
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
