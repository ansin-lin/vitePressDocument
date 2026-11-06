# Employee Management API（第1～16章完成版）

本工程是Spring Boot主线的可运行参考实现：Java 17、Spring Boot 4.1.1、MyBatis Starter 4.1.0、MySQL 8。第15章以数据库账号完成公开注册、BCrypt验证及JWT Bearer登录；第16章用JWT角色和数据库员工关联控制权限。它是完成版，不应在前14章练习时整份覆盖学员逐章搭建的工程。

## 已实现的主线

- 第3～10章：健康检查、分层、DTO、统一响应、校验、MyBatis员工CRUD。
- 第11～14章：日志、测试、事务及履历、搜索排序分页。
- 第15章：`POST /auth/register`注册USER；`POST /auth/login`返回15分钟HS256 JWT；`GET /auth/me`要求Bearer。
- 第16章：`roles`声明转换成`ROLE_USER/ROLE_ADMIN`；ADMIN可列表与写入，USER仅能读绑定的本人记录。

不提供`/auth/csrf`或服务器端`/auth/logout`。登录不创建用于身份认证的Session；每次受保护请求都要显式提交`Authorization: Bearer <accessToken>`。客户端退出只删除本地Token，已签发Token仍可能有效至过期。

## 数据库与启动

1. 仅在个人练习MySQL执行`database/schema-mysql.sql`及`database/sample-data-mysql.sql`。先检查目标库；这些脚本不应用于共享或生产库。
2. 在Eclipse的启动配置中设置`DB_USERNAME`、`DB_PASSWORD`；数据库地址不同则设置`DB_URL`。
3. 生成32字节安全随机密钥，再进行Base64编码，把结果设置为`EMPLOYEE_JWT_SECRET_BASE64`环境变量。可在本地临时Java程序运行：

```java
byte[] key = new byte[32];
new java.security.SecureRandom().nextBytes(key);
System.out.println(java.util.Base64.getEncoder().encodeToString(key));
```

不要把真实密钥写入源码、配置文件、日志或提交材料。`application.yml`只引用环境变量。Eclipse运行`EmployeeManagementApiApplication`；`GET http://localhost:8080/health`预期200、`OK`。API实际部署需HTTPS。

## Postman验证

请求JSON时设置`Content-Type: application/json`。受保护请求在Postman的Authorization选项选择Bearer Token，填入登录响应的`data.accessToken`；不使用Cookie Jar或CSRF Header。

| 方法与URL | 请求体/身份 | 预期 |
| --- | --- | --- |
| POST `http://localhost:8080/auth/register` | `{"username":"learner15","password":"TrainingPass123!"}`，匿名 | 201，数据库只新增USER，密码为BCrypt哈希 |
| POST `http://localhost:8080/auth/register` | 重复用户名 | 409 |
| POST `http://localhost:8080/auth/register` | 用户名空、短密码 | 400 |
| POST `http://localhost:8080/auth/login` | `{"username":"tanaka","password":"TrainingPass123!"}`，匿名 | 200，`data.accessToken`、`tokenType=Bearer`、`expiresIn=900` |
| GET `http://localhost:8080/auth/me` | tanaka Bearer | 200，用户名tanaka |
| GET `http://localhost:8080/auth/me` | 无Token或非法/过期Token | 401 JSON |
| GET `http://localhost:8080/employees/1001` | tanaka Bearer | 200，本人 |
| GET `http://localhost:8080/employees/1002` | tanaka Bearer | 403，他人 |
| GET `http://localhost:8080/employees` | admin Bearer | 200，分页列表 |
| GET `http://localhost:8080/employees` | tanaka Bearer | 403 |
| POST `http://localhost:8080/employees` | admin Bearer＋合法员工JSON | 201，数据库新增 |
| PUT `http://localhost:8080/employees/1001` | admin Bearer＋合法员工JSON | 200，员工及履历同事务 |
| DELETE `http://localhost:8080/employees/1002` | admin Bearer，最后执行 | 204，数据库记录删除 |

表中GET和DELETE没有请求体或查询参数；POST/PUT员工JSON字段沿用第10章。执行删除前先完成所有依赖1002的验证。`sample-data-mysql.sql`中的固定账号密码仅用于本地练习。

## 自动化测试与安全边界

测试使用`src/test/resources/application-test.yml`中的**专用测试密钥**，绝不可用于部署。集成测试会重建表；只有确认`TEST_DB_URL`指向名称以`_test`或`_test_db`结尾的个人专用MySQL库，且`DB_PASSWORD`已设置，才运行全部测试。`MySqlTestGuard`会再次检查产品和库名。不要把测试库连接改为开发或共享库。无数据库时可运行不触碰数据库的`EmployeeResponseTest`与`EmployeeServiceImplTest`。

Token的Payload可读而非加密，不能存密码或个人秘密。角色是登录时快照；账号停用或角色更改不会立即撤销旧Token。当前没有Refresh Token或撤销表，过期后重新登录。
