# PL/SQL 异常处理（Exception Handling）

> 本章系统讲解 **PL/SQL 的异常处理机制**。异常处理是保证数据库程序稳定性和数据一致性的关键内容，在**金融/账务/请求书系统**等项目以及面试中都属于**高频重点**。

---

## 1. 异常处理概述

异常（Exception）是指程序在运行过程中发生的错误或非正常情况。
PL/SQL 提供了完善的异常处理机制，用于：

* 捕获运行时错误
* 避免程序异常中断
* 记录错误信息
* 将错误转换为业务可识别的结果

PL/SQL 异常分为三类：

| 分类 | 说明 |
| ------- | ----------------- |
| 预定义异常 | Oracle 预先定义的常见异常 |
| 非预定义异常 | Oracle 错误码，但未定义名称 |
| 用户自定义异常 | 业务层自定义异常 |

---

## 2. 异常处理基本结构

异常处理块位于 PL/SQL 块的 **EXCEPTION 区域**。

```sql
begin
  -- 正常处理逻辑
exception
  when exception_name then
  -- 异常处理逻辑
end;
/
```

> ⚠️ 注意：
>
> * 异常一旦发生，**BEGIN 中剩余语句不会再执行**
> * 程序直接跳转到 EXCEPTION 区域

---

## 3. 常见预定义异常（面试必背）

| 异常名 | 触发场景 |
| ---------------- | ---------------------- |
| NO_DATA_FOUND | SELECT INTO 查询结果为 0 行 |
| TOO_MANY_ROWS | SELECT INTO 查询结果大于 1 行 |
| DUP_VAL_ON_INDEX | 唯一索引/主键冲突 |
| ZERO_DIVIDE | 除数为 0 |
| VALUE_ERROR | 类型转换或长度错误 |
| INVALID_NUMBER | 字符串转数字失败 |

### 示例：NO_DATA_FOUND

```sql
declare
  v_name emp.ename%type;
begin
  select ename into v_name
  from emp
 where empno = 9999;
exception
  when no_data_found then
  dbms_output.put_line('No data found');
end;
/
```

---

## 4. WHEN OTHERS（兜底异常）

`WHEN OTHERS` 用于捕获 **所有未被显式处理的异常**。

```sql
exception
  when others then
  dbms_output.put_line('Error occurred');
end;
```

### ❌ 错误示范（面试减分）

```sql
exception
  when others then
    null;
end;
```

> ⚠️ 问题：
>
> * 吞掉异常
> * 难以排查问题

### ✅ 正确示范（项目推荐）

```sql
exception
  when others then
    dbms_output.put_line('Error code=' || sqlcode);
    dbms_output.put_line('Error msg='  || sqlerrm);
    raise;
end;
```

---

## 5. 非预定义异常（使用 PRAGMA EXCEPTION_INIT）

当 Oracle 抛出的错误没有预定义异常名时，可以手动绑定错误码。

```sql
declare
  e_fk_violation exception;
  pragma exception_init(e_fk_violation, -2292);
begin
  delete from dept where deptno = 10;
exception
  when e_fk_violation then
  dbms_output.put_line('Cannot delete: child record exists');
end;
/
```

---

## 6. 用户自定义异常（业务异常）

用户自定义异常用于表示 **业务规则错误**。

### 定义并抛出异常

```sql
declare
  e_limit_exceeded exception;
  v_amount number := 20000;
begin
  if v_amount > 10000 then
  raise e_limit_exceeded;
  end if;
exception
  when e_limit_exceeded then
  dbms_output.put_line('Amount exceeds limit');
end;
/
```

---

## 7. RAISE_APPLICATION_ERROR（项目必用）

`RAISE_APPLICATION_ERROR` 用于向调用方返回 **明确的业务错误码和错误信息**。

```sql
raise_application_error(
  -20001,
  'Balance is not enough'
);
```

### 业务化示例

```sql
if v_balance < v_amount then
  raise_application_error(
  -20002,
  'Insufficient balance'
  );
end if;
```

> 📌 约定：
>
> * 错误码范围：**-20001 ~ -20999**
> * Java / Batch / 前端统一解析

---

## 8. 异常与事务的关系

* PL/SQL 中 **异常不会自动回滚事务**
* 是否回滚，取决于程序中是否显式 `ROLLBACK`

```sql
begin
  update account set balance = balance - 100 where id = 1;
  update account set balance = balance + 100 where id = 2;
exception
  when others then
  rollback;
  raise;
end;
/
```

---

## 9. 日志记录与自治事务

在项目中，**即使主事务失败，也需要记录日志**，可使用自治事务。

```sql
create or replace procedure p_log(p_msg varchar2) is
  pragma autonomous_transaction;
begin
  insert into t_error_log(msg, log_time)
  values(p_msg, systimestamp);
  commit;
end;
/
```

调用示例：

```sql
exception
  when others then
  p_log(sqlcode || ':' || sqlerrm);
  rollback;
  raise;
end;
```

---

## 10. 项目实践总结（非常重要）

* 精确捕获已知异常（NO_DATA_FOUND 等）
* WHEN OTHERS 必须记录日志并重新抛出
* 业务异常使用 RAISE_APPLICATION_ERROR
* 异常处理与事务控制必须配合设计

---

## 11. 本章小结

* PL/SQL 通过 EXCEPTION 区块处理异常
* SELECT INTO 常见异常：NO_DATA_FOUND / TOO_MANY_ROWS
* WHEN OTHERS 只能兜底，不能吞异常
* 使用 RAISE_APPLICATION_ERROR 返回业务错误
* 项目中通常配合日志与自治事务使用
