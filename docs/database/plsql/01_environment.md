# PL/SQL 入门与环境配置

> 本章作为 **全书的第 1 章**，面向 **零基础或刚接触 Oracle / PL/SQL 的新人**，目标是：
>
> * 快速理解 **PL/SQL 是什么、解决什么问题**
> * 搭建一个 **能运行 PL/SQL 的最小环境**
> * 建立与 Java、Python 等语言的**正确对比认知**
>
> 本章不追求深入，只求 **“看懂 + 跑通 + 不迷糊”**。

---

## 1. 什么是 PL/SQL

**PL/SQL（Procedural Language / SQL）** 是 Oracle 提供的一种 **过程化数据库编程语言**。

一句话理解：

> **PL/SQL = SQL + 过程语言能力**

它在 SQL 的基础上，增加了：

* 变量
* 条件判断（IF / CASE）
* 循环（LOOP / FOR / WHILE）
* 异常处理
* 模块化（PROCEDURE / FUNCTION / PACKAGE）

---

## 2. 为什么需要 PL/SQL

仅使用 SQL，会遇到以下问题：

* 复杂业务需要多步处理
* 需要循环、判断
* 需要事务控制
* 需要批量处理

PL/SQL 解决的是：

> **“如何在数据库内部，把一组 SQL 组织成一段可靠的业务逻辑”**

---

## 3. PL/SQL 与其他语言的对比（非常重要）

### 3.1 与 SQL 的关系

| 项目 | SQL | PL/SQL |
| -------------- | ---- | ------ |
| 定位 | 数据操作 | 逻辑控制 |
| 是否支持 IF / LOOP | 否 | 是 |
| 是否支持事务 | 是 | 是 |
| 执行位置 | 数据库 | 数据库 |

📌 记住一句话：

> **SQL 负责“算数据”，PL/SQL 负责“管流程”**

---

### 3.2 与 Java / Python 的区别

| 项目 | Java / Python | PL/SQL |
| ------- | ------------- | ------- |
| 执行位置 | 应用服务器 | 数据库内部 |
| 擅长领域 | 接口、流程 | 数据密集型处理 |
| 是否直接操作表 | 通过 SQL | 直接 |
| 典型场景 | Web 服务 | 批处理、账务 |

📌 项目中真实分工：

* Java：对外接口、事务协调
* PL/SQL：核心数据处理

---

## 4. PL/SQL 的典型使用场景

* 银行 / 金融核心系统
* 批处理、夜间作业
* 对账、清算、帐票
* 数据校验与规则控制

---

## 5. 开发与运行环境介绍

### 5.1 必要组件

要运行 PL/SQL，至少需要：

| 组件 | 说明 |
| --------------- | ------------ |
| Oracle Database | 数据库本体 |
| 客户端工具 | 编写与执行 PL/SQL |

---

### 5.2 常见客户端工具

| 工具 | 说明 |
| ---------------- | ----------------- |
| SQL*Plus | 官方命令行工具 |
| SQL Developer | Oracle 官方 GUI（推荐） |
| DBeaver | 通用数据库工具 |
| PL/SQL Developer | 老牌专用工具 |

新人可先使用免费的 [Oracle SQL Developer](https://www.oracle.com/database/sqldeveloper/)；若使用其他客户端，先确认它支持执行 PL/SQL 匿名块并查看 `DBMS_OUTPUT`。

---

## 6. 本地练习环境推荐方案

### 6.1 学习 / 练习用途（推荐）

* 使用 Oracle 官方提供的 [Oracle Database Free](https://www.oracle.com/database/free/get-started/) 练习环境；安装方式按当前平台选择
* 已有经授权的个人或课堂 Oracle 练习库时，也可以直接连接，不必重复安装

### 6.2 公司 / 项目环境

* 直接连接测试库
* 通过 VPN / 内网访问

---

## 7. 第一个 PL/SQL 程序（跑通即可）

以下以 SQL*Plus / SQL Developer 的**脚本运行方式**为例。先开启输出，再执行匿名块；末尾的 `/` 用来提交前面的 PL/SQL 块。SQL Developer 中应选择“运行脚本”，不能把 `/` 当成 PL/SQL 语句的一部分。

```sql
set serveroutput on

begin
  dbms_output.put_line('Hello PL/SQL');
end;
/
```

看到输出：

```text
Hello PL/SQL
```

说明环境 OK。

---

## 8. 新人常见环境问题

* 忘记加 `/` 导致代码不执行
* 未开启 `serveroutput`
* 用户无执行权限

---

## 9. 本章小结

* PL/SQL 是数据库内的过程语言
* 用于组织和控制 SQL
* 与 Java / SQL 各司其职
* 先跑通环境，再学语法

---

👉 下一章：**PL/SQL 基本语法与程序结构**
