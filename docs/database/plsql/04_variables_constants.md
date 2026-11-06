# PL/SQL 变量、常量与文字

> 本章系统讲解 **PL/SQL 中的变量、常量以及文字（Literal）**，这是编写任何 PL/SQL 程序的基础内容，也是面试与项目中最常被问到的知识点之一。

---

## 1. PL/SQL 变量概述

变量是程序中 **用于存储和操作数据的命名存储区域**。
PL/SQL 中的每个变量都必须有明确的数据类型，该数据类型决定了：

* 变量在内存中的大小和布局
* 可存储的值范围
* 可对变量执行的操作

### 变量命名规则

* 由字母开头
* 可包含：字母、数字、`$`、`_`、`#`
* 长度 **不超过 30 个字符**
* **不区分大小写**
* 不能使用 PL/SQL 保留关键字

---

## 2. PL/SQL 变量声明

PL/SQL 变量必须在 **声明区（DECLARE）或包中** 声明。

### 基本语法

```sql
variable_name [CONSTANT] datatype [NOT NULL] [:= | DEFAULT initial_value]
```

### 示例

```sql
sales   number(10, 2);
name    varchar2(25);
address varchar2(100);
```

> 📌 **建议**：
>
> * 尽量使用 **有约束的声明**（指定长度、精度），可以减少内存消耗

---

## 3. 变量初始化

### 默认值

* 所有变量在声明时，默认值均为 **NULL**

### 初始化方式

* 使用 `:=` 赋值
* 使用 `DEFAULT` 关键字

```sql
counter   binary_integer := 0;
greetings varchar2(20) DEFAULT 'Have a Good Day';
```

### NOT NULL 约束

* 使用 `NOT NULL` 时，**必须显式初始化变量**

```sql
v_id number NOT NULL := 100;
```

> 📌 初始化变量是良好的编程习惯，可避免不可预期的结果。

---

## 4. 变量使用示例

```sql
declare
  a integer := 10;
  b integer := 20;
  c integer;
  f real;
begin
  c := a + b;
  dbms_output.put_line('Value of c: ' || c);

  f := 70.0 / 3.0;
  dbms_output.put_line('Value of f: ' || f);
end;
/
```

执行结果：

```text
Value of c: 30
Value of f: 23.333333333333333333
```

---

## 5. 变量作用域（Scope）

PL/SQL 支持 **块嵌套**，变量的可见范围取决于声明位置。

### 变量分类

| 类型 | 说明 |
| ---- | ---------------- |
| 局部变量 | 在内部块中声明，仅内部可访问 |
| 全局变量 | 在外部块或包中声明，内部块可访问 |

### 作用域示例

```sql
declare
  -- 全局变量
  num1 number := 95;
  num2 number := 85;
begin
  dbms_output.put_line('Outer Variable num1: ' || num1);
  dbms_output.put_line('Outer Variable num2: ' || num2);

  declare
    -- 局部变量
    num1 number := 195;
    num2 number := 185;
  begin
    dbms_output.put_line('Inner Variable num1: ' || num1);
    dbms_output.put_line('Inner Variable num2: ' || num2);
  end;
end;
/
```

---

## 6. 将 SQL 查询结果赋值给变量（SELECT INTO）

可以使用 `SELECT ... INTO` 将 SQL 查询结果赋值给 PL/SQL 变量。

### 基本规则

* SELECT 列数 **必须与 INTO 变量数量一致**
* 查询结果 **必须且只能返回一行**

### 示例

```sql
declare
  c_id   customers.id%type := 1;
  c_name customers.name%type;
  c_addr customers.address%type;
  c_sal  customers.salary%type;
begin
  select name, address, salary
    into c_name, c_addr, c_sal
    from customers
   where id = c_id;

  dbms_output.put_line(
    'Customer ' || c_name || ' from ' || c_addr || ' earns ' || c_sal
  );
end;
/
```

> ⚠️ 注意：
>
> * 0 行 → `NO_DATA_FOUND`
> * 多行 → `TOO_MANY_ROWS`

---

## 7. PL/SQL 常量（CONSTANT）

常量是在声明时赋值，**程序运行过程中不可修改的值**。

### 常量声明

```sql
pi constant number := 3.141592654;
```

### 示例：圆形计算

```sql
declare
  pi constant number := 3.141592654;
  radius number(5,2);
  dia number(5,2);
  circumference number(7,2);
  area number(10,2);
begin
  radius := 9.5;
  dia := radius * 2;
  circumference := 2 * pi * radius;
  area := pi * radius * radius;

  dbms_output.put_line('半径: ' || radius);
  dbms_output.put_line('直径: ' || dia);
  dbms_output.put_line('圆周: ' || circumference);
  dbms_output.put_line('面积: ' || area);
end;
/
```

---

## 8. PL/SQL 文字（Literal）

文字是 **直接写在代码中的固定值**，不依赖任何变量名。

### 常见文字类型

| 类型 | 示例 |
| ------ | ----------------------------------- |
| 数字文字 | 2346, -14, 3.14159, 1.0E-8 |
| 字符文字 | 'A', '%', '9' |
| 字符串文字 | 'Hello', '易百教程网' |
| 布尔文字 | TRUE, FALSE, NULL |
| 日期时间文字 | '1998-08-25', '2017-10-02 12:01:01' |

---

## 9. 字符串中使用单引号

在字符串中嵌入单引号，需要使用 **两个单引号表示一个单引号**。

```sql
declare
  message varchar2(30) := 'What''s yiibai.com!';
begin
  dbms_output.put_line(message);
end;
/
```

输出结果：

```text
What's yiibai.com!
```

---

## 10. 本章小结

* PL/SQL 变量必须声明数据类型
* 变量默认值为 NULL，应显式初始化
* 支持局部变量与全局变量（作用域）
* 使用 SELECT INTO 将查询结果赋值给变量
* CONSTANT 声明常量，不可修改
* 文字是直接使用的固定值
