# 第 15 章 TypeScript 结课练习：为有給休暇申请数据增加类型

## 1. 完成目标

在已经完成的[JavaScript 有給休暇申请练习](../training/03_javascript_task.md)基础上，为申请记录和相关业务处理增加 TypeScript 类型。完成后，能够从未知的 JSON 数据中识别有效申请、按员工和状态筛选、统计申请数量，并只允许取消申请中的记录。

本章只迁移数据处理，不重写七个 HTML 页面，也不引入 Vue、React 或新的后台。原来的 JavaScript 页面必须继续可以打开和操作。

## 2. 开始状态与目录

先复制一份已完成的 `paid-leave-system/`，在副本中确认登录、申请、查询和取消仍可用。不要在唯一的一份成果上直接实验。

在副本下新增 `ts-practice/`：

```text
paid-leave-system/
├─ login.html ... applications.html
├─ css/
├─ js/                         # 原有七个页面脚本，保持不变
└─ ts-practice/
   ├─ package.json
   ├─ package-lock.json
   ├─ tsconfig.json
   └─ src/
      ├─ leave-types.ts         # 业务类型与固定值
      ├─ parse-applications.ts  # 外部数据检查
      ├─ application-service.ts # 筛选、统计与取消规则
      └─ verify.ts              # 运行检查入口
```

`ts-practice/`是同一业务的类型练习，不是第二套项目。编译后的 `dist/` 由工具生成，不手工修改，也不必让现有 HTML 页面加载这些文件。

## 3. 准备 TypeScript 环境

在终端进入副本的 `ts-practice/` 目录，执行：

```bash
npm init -y
npm pkg set type=module
npm install --save-dev typescript@5.9.3
```

`npm init -y`建立练习目录的 `package.json`；`npm pkg set type=module`让 Node.js 把编译后的 `.js` 文件作为 ES 模块运行；安装命令把课程使用的 TypeScript 编译器加入开发依赖。

新建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "noEmitOnError": true
  },
  "include": ["src/**/*.ts"]
}
```

从 `src/` 中的一个文件导入另一个文件时，导入路径写编译后使用的 `.js` 后缀，例如 `import type { LeaveApplication } from './leave-types.js'`。第 12 章已经介绍了模块和配置；这里使用 Node.js 直接运行编译结果，不需要新建 Vite 或前端框架工程。

## 4. 待实现任务

### 4.1 表达已有业务数据

在 `leave-types.ts` 中，根据[JavaScript 练习的正式申请记录](../training/03_javascript_task.md)定义 `LeaveApplication`，至少包含 `id`、`ownerEmployeeNumber`、`leaveType`、`startDate`、`endDate`、`leaveDays`、`reason`、`handoverStatus`、`note`、`status` 和 `submittedAt`。字段名与原 JavaScript 记录保持一致。

- `status` 只允许 `pending`、`approved`、`returned`、`cancelled`。
- `leaveType` 只允许 `paid`、`half-am`、`half-pm`、`special`。
- `handoverStatus` 只允许 `done`、`not-required`。
- 查询条件单独定义，不要把全部申请字段都设成可选来充当查询条件。
- 可以用 `readonly` 防止在函数外直接改写申请编号和所属员工编号，但它不能替代运行时检查。

### 4.2 检查从存储取得的数据

`localStorage` 中的 `paidLeaveApplications` 是 JSON 字符串。Node.js 检查入口不直接访问浏览器的 `localStorage`；把练习数据作为字符串交给解析函数，模拟从存储中读取后的处理过程。

在 `parse-applications.ts` 中实现：

```ts
export function parseApplications(text: string): LeaveApplication[]
```

先把 `JSON.parse()` 的结果视为 `unknown`，再检查它是数组，逐条核对上述必需字段和固定值。编号、员工编号、日期及时间先检查是否为字符串；还应拒绝空编号、负的申请日数，以及早于开始日的结束日期。合法时返回申请数组；JSON 损坏、字段缺失或类型错误时抛出能够定位原因的错误，不把错误输入伪装成空数组。

TypeScript 类型在编译后会消失，`as LeaveApplication[]` 不能代替这里的运行时检查。

### 4.3 实现业务处理

在 `application-service.ts` 中实现以下函数。方法名可以调整，但参数、返回值和行为应保持清楚：

```ts
getApplicationsForEmployee(applications, employeeNumber, status)
getApplicationSummary(applications, employeeNumber)
cancelPendingApplication(applications, applicationId, employeeNumber)
```

- 筛选函数只能返回指定员工自己的记录；`status` 可为某个申请状态或 `all`。
- 汇总函数至少返回该员工的申请总数、`pending` 件数和 `approved` 件数；不把其他员工的记录计入。
- 取消函数只允许所属员工取消 `pending` 记录，返回更新后的数组；找不到记录、员工不符或状态不允许时给出明确失败结果或抛出错误。
- 不直接修改传入的数组和申请对象。不要用 `any` 或未经校验的类型断言绕过检查。

这部分是类型与业务规则练习，不实现真正的登录鉴权；“所属员工”只作为函数输入进行检查。

## 5. 检查数据与预期结果

在 `verify.ts` 中准备下面这组 JSON 字符串，传给 `parseApplications()`，再调用第 4 节的函数。可以增加数据，但不要改变这三条记录的预期结果：

```json
[
  {"id":"REQ-20260901-001","ownerEmployeeNumber":"EMP-00001","leaveType":"paid","startDate":"2026-09-10","endDate":"2026-09-11","leaveDays":2,"reason":"私用","handoverStatus":"done","note":"","status":"pending","submittedAt":"2026-09-01T02:00:00.000Z"},
  {"id":"REQ-20260902-001","ownerEmployeeNumber":"EMP-00001","leaveType":"half-am","startDate":"2026-09-15","endDate":"2026-09-15","leaveDays":0.5,"reason":"通院","handoverStatus":"not-required","note":"","status":"approved","submittedAt":"2026-09-02T02:00:00.000Z"},
  {"id":"REQ-20260903-001","ownerEmployeeNumber":"EMP-00002","leaveType":"paid","startDate":"2026-09-20","endDate":"2026-09-20","leaveDays":1,"reason":"私用","handoverStatus":"done","note":"","status":"pending","submittedAt":"2026-09-03T02:00:00.000Z"}
]
```

至少检查以下情况，并在 `verify.ts` 输出可读结果：

| 操作 | 预期结果 |
| --- | --- |
| 查询 `EMP-00001` 的全部记录 | 2 件 |
| 查询 `EMP-00001` 的 `pending` 记录 | 1 件 |
| 汇总 `EMP-00001` | 总数 2、申请中 1、已批准 1 |
| `EMP-00001` 取消第一条申请 | 返回的新数组中该记录为 `cancelled`；原数组仍为 `pending` |
| `EMP-00002` 取消第一条申请 | 拒绝，不能修改别人的申请 |
| 取消第二条已批准申请 | 拒绝，不能取消已批准申请 |
| 输入损坏的 JSON、错误状态值或缺少 `id` | 解析失败并显示原因 |

验证负例时用 `try...catch` 捕获预期错误，避免第一条错误让后续检查无法执行。`catch` 的值按 `unknown` 处理，先判断是否为 `Error` 再读取 `message`。

## 6. 编译、运行和验收

在 `ts-practice/` 目录执行：

```bash
npx tsc --noEmit
npx tsc
node dist/verify.js
```

第一条命令只检查类型，第二条生成 JavaScript，第三条运行检查入口。观察 `dist/` 中的 `.js` 文件，确认类型声明已经消失。然后故意把一个 `status` 写成 `"waiting"`，确认编译器能报告错误；恢复后重新编译和运行。另将一条 JSON 记录中的 `status` 改为 `"waiting"`，确认运行时校验也能拒绝它。这两次失败分别验证**静态检查**和**外部数据校验**，不能互相代替。

验收时检查：

1. 原有七个页面的 JavaScript 练习仍可运行，页面脚本没有被大规模重写。
2. 类型检查、编译和检查入口均成功；错误输入会被拒绝。
3. 筛选、汇总与取消满足表格中的所有预期结果，且不修改原始数组。
4. 没有使用 `any` 掩盖业务字段问题，也没有把 `JSON.parse()` 结果直接断言成申请数组。
5. 提交 `ts-practice/src/`、`tsconfig.json`、`package.json`、`package-lock.json` 和自测记录；不提交生成的 `dist/` 或 `node_modules/`。

提交记录中说明：哪部分仍是 JavaScript，哪部分已用 TypeScript 练习；本次没有把类型检查误当成登录权限或后端校验。进入 Vue 或 React 课程时，再按框架工程的实际配置迁移需要复用的类型与业务规则。
