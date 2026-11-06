# PL/SQL 动态 SQL（EXECUTE IMMEDIATE / DBMS_SQL）

> 本章系统讲解 **PL/SQL 动态 SQL**。这是从“会写固定 SQL”迈向“可应对复杂业务场景”的关键一步，也是**银行 / 批处理 / 通用框架类项目的高频考点**。

---

## 1. 什么是动态 SQL

**动态 SQL** 指的是：

> SQL 语句在**运行时才确定内容**，而不是在编译期写死。

典型特征：

* 表名不固定
* 字段名不固定
* WHERE 条件动态组合
* 动态执行 DDL

---

## 2. 什么时候考虑动态 SQL

以下场景可能需要动态 SQL；先判断固定语句能否满足需求：

| 场景 | 说明 |
| ------ | ----------------- |
| 动态表名 | 分表 / 月表 / 临时表 |
| 动态字段 | 运行时才确定查询列的报表 |
| 动态 DDL | CREATE / TRUNCATE |
| 通用框架 | 通用导入、导出、清理 |

📌 原则：

> 语句结构固定时优先使用静态 SQL；少量可选条件未必需要拼接 SQL。

---

## 3. EXECUTE IMMEDIATE（最常用）

### 3.1 基本语法

```plsql
execute immediate sql_string;
```

示例：

```plsql
execute immediate 'truncate table t_tmp';
```

`TRUNCATE` 是 DDL，会触发隐式提交。本行仅用于识读，不要对含业务数据的表直接运行；第 7 节再说明它与普通 DML 的事务差异。

---

### 3.2 动态 DML

```plsql
execute immediate
  'update emp set sal = sal * 1.1 where deptno = :1'
  using 10;
```

数据值应使用 **绑定变量**，不要把外部输入拼入 SQL 文本。

---

### 3.3 INTO（接收返回值）

```plsql
declare
  v_cnt number;
begin
  execute immediate
  'select count(*) from emp where deptno = :1'
  into v_cnt
  using 10;
end;
/
```

---

## 4. 动态 SQL 中的绑定变量（重点）

### 错误写法（高风险）

```plsql
-- 假设 v_name 来自外部输入，v_cnt 已声明为 NUMBER
execute immediate
  'select count(*) from emp where ename = ''' || v_name || ''''
  into v_cnt;
```

风险：

* SQL 注入
* 硬解析增多

---

### 正确写法

```plsql
execute immediate
  'select count(*) from emp where ename = :1'
  into v_cnt
  using v_name;
```

这里的 `v_name` 是数据值，可以绑定；表名、列名等 SQL 标识符不能用同样方式绑定，必须先用固定白名单选择，必要时再按项目规则验证。完整匿名块还需声明 `v_name`、`v_cnt` 并取得输入值。

---

## 5. EXECUTE IMMEDIATE 的局限

`EXECUTE IMMEDIATE` 并非只能处理一行：列结构已知时，多行查询可使用 `BULK COLLECT INTO`；也可使用 `OPEN FOR`、`FETCH`、`CLOSE` 逐步读取。需要在运行时才确定返回列数、列类型或绑定变量个数时，才考虑 `DBMS_SQL`。

例如固定读取员工编号时，可以使用已声明的集合接收多行；详细写法见[批量处理章节](13_bulk_processing_and_performance.md)。[Oracle 原生动态 SQL 文档](https://docs.oracle.com/en/database/oracle/oracle-database/26/lnpls/native-dynamic-sql.html)列出了上述三种多行读取方式。

---

## 6. DBMS_SQL（了解即可，新人不必精通）

### 6.1 使用场景

* 列结构完全动态
* 通用 SQL 执行引擎

### 6.2 基本流程（认知级）

```text
OPEN_CURSOR
→ PARSE
→ BIND_VARIABLE
→ DEFINE_COLUMN
→ EXECUTE
→ FETCH_ROWS
→ CLOSE_CURSOR
```

业务代码通常先考虑更易读的原生动态 SQL；`DBMS_SQL` 适合返回结构或绑定数量在编译时无法确定的通用处理。不要用固定百分比推断项目中的使用比例。

---

## 7. 动态 SQL 与事务

* 动态执行 `INSERT`、`UPDATE`、`DELETE` 时，提交与回滚仍按当前事务控制。
* 动态执行 `CREATE`、`ALTER`、`TRUNCATE` 等 DDL 时，Oracle 会发生隐式提交；之后的 `ROLLBACK` 不能撤销已提交的 DDL 效果。不要把 DDL 当作普通 DML 放进同一可回滚练习。

---

## 8. 项目实践注意点（非常重要）

* 数据值使用绑定变量；表名、列名等不能绑定的标识符使用固定白名单，并按项目规则验证。
* 复用的动态 SQL 可以封装在过程或 PACKAGE 中；只用一次的简单语句不必强制创建 PACKAGE。
* 控制动态范围，并记录实际 SQL 结构与必要参数用于调查，避免记录敏感值。

---

## 9. 面试高频对比

| 项目 | EXECUTE IMMEDIATE | DBMS_SQL |
| ---- | ----------------- | -------- |
| 易用性 | 高 | 低 |
| 选择依据 | 语句形状与输出结构已知 | 输出列或绑定数量运行时才确定 |
| 动态能力 | 一般 | 最强 |
| 多行查询 | 可用 `BULK COLLECT INTO` 或动态游标 | 也可逐列定义和读取 |

---

## 10. 本章小结

* 动态 SQL 用于运行期确定 SQL
* 首选 EXECUTE IMMEDIATE
* 数据值使用绑定变量；标识符使用白名单和验证
* 多行查询不自动意味着必须用 `DBMS_SQL`
* 动态 DDL 的隐式提交要与普通 DML 区分
