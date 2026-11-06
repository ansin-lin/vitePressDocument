# MyBatis 教程

本课程使用 Java、Maven、MySQL 和 SQL，通过一个员工数据示例学习 Mapper、参数映射、结果映射、动态 SQL、关联查询与缓存。先完成 [Java 的 Maven 与 JDBC 章节](../java/20_maven_basics.md)及 [SQL 基础](../../database/sql/index.md)，再运行第 2 章的第一个 MyBatis 程序。Spring Boot 集成 MyBatis 的方式将在后续 [Spring Boot 第 9 章](../springboot/mainline/09_database_and_mybatis.md)学习。

## 学习顺序

1. [MyBatis 简介与使用场景](01_mybatis_overview.md)
2. [第一个 MyBatis 程序](02_mybatis_hello_world.md)
3. [MyBatis 配置文件](03_mybatis_config_file.md)
4. [Mapper 接口与 XML 映射](04_mapper_interface_xml.md)
5. [核心对象与执行流程](05_core_objects_execution_flow.md)
6. [查询与结果映射](06_select_result_mapping.md)
7. [INSERT、UPDATE、DELETE](07_insert_update_delete.md)
8. [参数映射](08_parameter_mapping.md)
9. [动态 SQL](09_dynamic_sql.md)
10. [关联查询与 ResultMap](10_association_resultmap.md)
11. [缓存机制](11_cache_mechanism.md)
12. [综合练习](12_comprehensive_practice.md)

## 运行方式

MyBatis 示例需要在本地 Java 项目中连接 MySQL，网页只展示教材和执行流程。图解属于教学示意，不会在浏览器里真实执行 Java、MyBatis 或数据库操作。每完成一章，先在本地运行对应代码，再对照控制台输出和数据库结果。
