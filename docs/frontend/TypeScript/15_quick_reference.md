# 第 15 章 TypeScript 基础速查表

> 本章把第 1～14 章学过的常用写法集中在一起，方便写练习时回查。表中的代码是独立片段，不能全部直接粘到同一个文件运行；需要完整解释时点击对应章节。

## 一、先分清编译检查和实际运行

| 要确认的事 | 速记 | 回看 |
| --- | --- | --- |
| TypeScript 文件怎样运行 | `.ts` 经类型检查和编译生成 `.js`，再由 Node.js 或浏览器运行 JavaScript | [第 1 章](01_intro_setup_compile.md) |
| 类型什么时候存在 | `type`、`interface`、类型标注主要用于编译检查，运行时不会自动验证数据 | [第 1 章](01_intro_setup_compile.md)、[第 8 章](08_interfaces_composition.md) |
| 如何观察类型错误 | 修改源文件后重新运行 `npx tsc`；旧的 `.js` 文件还能运行，不代表这次编译成功 | [第 1 章](01_intro_setup_compile.md) |
| 外部数据如何处理 | 接收为 `unknown`，运行时检查结构后再使用；`as` 不能替代校验 | [第 7 章](07_narrowing_assertions.md)、[第 14 章](14_async_external_data.md) |

## 二、变量、基本类型与集合

| 需求 | 常用写法 | 注意 | 回看 |
| --- | --- | --- | --- |
| 明确变量类型 | `let count: number = 1` | 值与标注的类型必须匹配 | [第 2 章](02_annotations_basic_types.md) |
| 让编译器推断 | `const name = "Tanaka"` | 赋值已明确时通常不必重复标注 | [第 2 章](02_annotations_basic_types.md) |
| 字符串、数字、布尔值 | `string`、`number`、`boolean` | `"10"` 是字符串，不会因标注自动变成数字 | [第 2 章](02_annotations_basic_types.md) |
| 允许缺失值 | `string \| null`、`number \| undefined` | 使用前先判断是否缺失 | [第 2 章](02_annotations_basic_types.md) |
| 暂不确定类型 | `unknown` | 先检查再调用属性或方法；避免用 `any` 绕过检查 | [第 2 章](02_annotations_basic_types.md) |
| 转换运行时值 | `Number(text)`、`String(value)`、`Boolean(value)` | `Number()` 可能得到 `NaN`；`Boolean("false")` 是 `true` | [第 2 章](02_annotations_basic_types.md) |
| 同类型元素数组 | `string[]` 或 `Array<string>` | `items[0]` 在数组为空时可能是 `undefined` | [第 3 章](03_arrays_tuples.md) |
| 固定位置与类型 | `type Pair = [string, number]` | 元组适合位置含义固定的数据 | [第 3 章](03_arrays_tuples.md) |
| 只读数组 | `readonly string[]` | 禁止通过该类型的引用调用 `push()` 等修改方法 | [第 3 章](03_arrays_tuples.md) |

## 三、对象、联合类型与函数

| 需求 | 常用写法 | 注意 | 回看 |
| --- | --- | --- | --- |
| 描述对象结构 | `type User = { id: number; name: string }` | 类型只描述字段，不会创建对象 | [第 4 章](04_object_types_aliases.md) |
| 可选属性 | `name?: string` | 读取时可能得到 `undefined` | [第 4 章](04_object_types_aliases.md) |
| 只读属性 | `readonly id: number` | 约束 TypeScript 中的赋值，不是运行时冻结对象 | [第 4 章](04_object_types_aliases.md) |
| 多种合法类型 | `string \| number` | `\|` 是类型联合；不能直接调用某个成员独有的方法 | [第 5 章](05_unions_literals.md) |
| 固定选项 | `type Status = "pending" \| "done"` | 比宽泛的 `string` 更能限制非法状态 | [第 5 章](05_unions_literals.md) |
| 参数和返回值 | `function add(a: number, b: number): number` | 参数类型写在参数名后，返回类型写在括号后 | [第 6 章](06_function_types.md) |
| 没有返回结果 | `function log(text: string): void` | `void` 表示调用者不使用业务返回值 | [第 6 章](06_function_types.md) |
| 可选参数 | `function find(id?: string): void` | 可选参数在函数内可能为 `undefined` | [第 6 章](06_function_types.md) |
| 回调函数类型 | `(value: number) => boolean` | 说明回调接收数字、返回布尔值 | [第 6 章](06_function_types.md) |

## 四、判断、断言与接口

| 需求 | 常用写法 | 注意 | 回看 |
| --- | --- | --- | --- |
| 收窄基本类型 | `typeof value === "string"` | 判断成立的分支内才能按 `string` 使用 | [第 7 章](07_narrowing_assertions.md) |
| 排除空值 | `value !== null && value !== undefined` | 真值判断还会排除合法的 `0`、`""`、`false` | [第 7 章](07_narrowing_assertions.md) |
| 判断数组 | `Array.isArray(value)` | 只确认外层是数组，元素类型仍需检查 | [第 7 章](07_narrowing_assertions.md) |
| 自定义类型守卫 | `function isUser(v: unknown): v is User` | 函数体必须真实检查所承诺的字段 | [第 7 章](07_narrowing_assertions.md) |
| 类型断言 | `value as User` | 只改变编译器的看法，不转换或校验值 | [第 7 章](07_narrowing_assertions.md) |
| 定义接口 | `interface User { id: number }` | 适合描述对象契约；接口声明本身没有运行时值 | [第 8 章](08_interfaces_composition.md) |
| 扩展接口 | `interface Employee extends User { name: string }` | 新接口同时要求原接口和新增字段 | [第 8 章](08_interfaces_composition.md) |
| 组合类型 | `type RecordWithTime = User & { createdAt: string }` | `&` 要求同时满足两边的结构 | [第 8 章](08_interfaces_composition.md) |
| 类的成员可见性 | `public`、`private`、`protected` | TypeScript 的 `private` 主要是编译阶段限制；细节见原章 | [第 9 章](09_classes.md) |

## 五、泛型、固定值与模块

| 需求 | 常用写法 | 注意 | 回看 |
| --- | --- | --- | --- |
| 保留输入与输出类型关系 | `function identity<T>(value: T): T` | 同一个 `T` 把参数和返回值联系起来 | [第 10 章](10_generics.md) |
| 泛型集合 | `type Page<T> = { items: T[]; total: number }` | 使用时再确定 `T`，例如 `Page<User>` | [第 10 章](10_generics.md) |
| 限制类型参数 | `<T extends { id: number }>` | 只接受具有 `id: number` 的类型 | [第 10 章](10_generics.md) |
| 保留字面量与只读信息 | `const STATUS = { pending: "pending" } as const` | `as const` 不会在运行时冻结对象 | [第 11 章](11_constants_enum.md) |
| 固定值的另一种表达 | `enum Status { Pending = "pending" }` | 枚举会生成运行时代码，按项目约定选择 | [第 11 章](11_constants_enum.md) |
| 导出类型 | `export interface User { id: number }` | 供其他模块引用 | [第 12 章](12_modules_config_declarations.md) |
| 只导入类型 | `import type { User } from "./types"` | 编译后该导入不会成为运行时代码 | [第 12 章](12_modules_config_declarations.md) |
| 严格检查 | `"strict": true` | 在 `tsconfig.json` 中设置，帮助发现更多类型问题 | [第 12 章](12_modules_config_declarations.md) |

## 六、状态与外部数据

| 需求 | 常用写法 | 注意 | 回看 |
| --- | --- | --- | --- |
| 区分界面状态 | `type State = { kind: "loading" } \| { kind: "success"; data: User[] } \| { kind: "error"; message: string }` | 用 `kind` 判断后，再使用该分支特有的字段 | [第 13 章](13_business_state_modeling.md) |
| 表示异步成功值 | `Promise<User[]>` | `User[]` 表示成功结果的类型，不表示失败原因 | [第 14 章](14_async_external_data.md) |
| 检查接口响应 | `const raw: unknown = await response.json()` | 先检查响应状态，再核对 `raw` 的实际结构 | [第 14 章](14_async_external_data.md) |
| 校验数组元素 | `Array.isArray(raw) && raw.every(isUser)` | 需要让 `isUser` 逐项核对必要字段 | [第 14 章](14_async_external_data.md) |

## 七、遇到问题先查哪里

| 现象 | 先检查 |
| --- | --- |
| 类型检查通过，运行结果仍不对 | 业务规则、外部数据、是否运行了旧的编译结果 |
| 联合类型的方法不能调用 | 是否先用 `typeof`、判别字段等方式收窄 |
| 属性可能是 `undefined` | 可选属性、空数组下标、异步数据尚未到达 |
| `as` 后运行时报错 | 断言没有校验数据，改用运行时判断 |
| 模块找不到 | 文件路径、扩展名规则、当前项目的模块配置 |

速查表用于回忆写法。需要看完整的输入、输出与错误分析时，返回对应章节；准备综合应用时进入[第 16 章结课练习](../../exercises/frontend/TypeScript/15_paid_leave_practice.md)。
