# 第2章 Java 程序结构

> 本章讲解 Java 程序的组成、目录结构和最小可运行代码。配套示例可直接复制使用。

---

## 编写和运行 Java 需要什么

`.java` 源文件需要经过编译才能运行。手工使用 `javac` 编译时，需要 JDK；运行编译后的程序时，需要 Java 运行环境（JRE，其中包含 JVM）。JDK 包含开发工具和运行程序所需的组件。

使用带 Java 开发工具的 Eclipse 时，可以直接在 Eclipse 中编写和编译程序，不必为了使用 `javac` 再单独安装一套 JDK。Eclipse 运行程序仍需要可用的 Java 运行环境；如果当前安装包已经提供并配置好符合课程要求的 Java 17 运行环境，就不必重复下载。若创建项目或运行时提示找不到 Java 运行环境，再检查 Eclipse 的 Java 配置。

在 Eclipse 中新建 Java Project，创建 `com.example.app` 包及 `Main` 类，写好下面的 `main` 方法后选择 **Run As → Java Application**。控制台出现输出，就表示编译和运行成功。

## 项目目录结构

### 纯 JDK 手工项目

```java
hello-java/
├─ src/
│  └─ com/
│     └─ example/
│        └─ app/
│           └─ Main.java
├─ lib/                 # 依赖 jar（可选）
├─ out/                 # 编译输出目录（建议）
└─ README.md
```

## 源文件基本结构

一个最小可运行的 Java 程序：

```java
// 文件路径：src/com/example/app/Main.java
package com.example.app;        // ① 包声明（必须与目录匹配）

import java.time.LocalDate;     // ② import 语句（可选）

/**
 * 程序入口类
 */
public class Main {             // ③ 顶级 public 类名与文件名一致
    public static void main(String[] args) { // ④ 程序入口
        System.out.println("Hello, Java! " + LocalDate.now());
    }
}
```

**要点**  

- **编码统一用 UTF‑8**（JDK 18+ 默认 UTF‑8；旧版本建议 `javac -encoding UTF-8`）。  
- 每个 `.java` 文件**至多一个** `public` 顶级类，且文件名必须与该类同名。  
- `package` 必须与 **物理目录**一致（例如 `com.example.app` → `com/example/app`）。

---

## 最小可运行项目

### 纯 JDK 目录示例

```java
mini/
├─ src/
│  └─ com/example/app/Main.java
└─ out/
```

`Main.java`：

```java
package com.example.app;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Mini Java!");
    }
}
```

## 常见错误排查

| 现象 | 可能原因 | 解决方案 |
|---|---|---|
| `Error: Could not find or load main class ...` | 类路径错误；包名与目录不一致；缺少 `Main` | 检查 `-cp` 与目录结构；确认 `package` 与路径一致 |
| `package xxx does not exist` | 依赖未加入类路径；导入包名写错 | 添加 jar 到 `-cp` 或构建依赖；检查 `import` |
| `NoSuchMethodError: main` | `main` 签名不对 | 必须是 `public static void main(String[] args)` |
| 中文输出乱码 | 编码不一致 | 统一 UTF‑8；编译时 `-encoding UTF-8`；IDE 配置 |
| 运行 jar 找不到依赖 | 类路径缺少依赖 | 检查 `-cp` 参数或依赖位置 |

---
