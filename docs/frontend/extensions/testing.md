# 前端测试工具：与正课衔接

参考资料中的五份库教程多次解释 `describe`、`it`、`expect`、Mock、覆盖率和组件测试。本站把**测试观点与具体组件示例**留在正课：先读 [Vue 测试基础](../Vue/19_frontend_testing.md)，再按项目选择 [Vue + Vitest](../Vue/20_vue_unit_testing.md) 或 [React + Vitest](../React/21_testing.md)。本页只说明工具之间的关系，以及接手 Jest 项目时要多检查的配置。

| 工具 | 负责什么 | 从哪里学习 |
| --- | --- | --- |
| Vitest | 运行测试、断言和 Mock；可利用 Vite 配置 | Vue / React 正课中的自动测试章 |
| Vue Test Utils | 挂载 Vue 组件并触发事件 | Vue 自动测试章 |
| React Testing Library | 从用户可见行为查询和操作 React 页面 | React 测试章 |
| Jest | 另一套测试运行器，常见于既有项目 | 本页的 Jest 识读清单 |
| Playwright | 在真实浏览器中检查关键流程 | 在单元和组件测试之外按项目需要使用 |

## 接手 Jest 项目时的检查顺序

Jest 与 Vitest 都可运行普通函数测试，但**配置文件、模块转换、环境与 Mock API 不应直接复制替换**。先读项目的 `package.json`、锁定文件和测试命令，再按下面顺序调查。

1. **测试文件如何被找到**：查看 `testMatch` / `testRegex` 或默认规则；测试文件不用导入到 `main.tsx`。
2. **代码怎样被转换**：检查 `transform`、Babel 或 TypeScript 方案。出现 `Unexpected token` 时先看实际模块格式和转换配置，不是删掉 import。
3. **需要哪种环境**：纯函数可用 Node；组件 DOM 测试通常需要 jsdom。jsdom 仍不能代替真实浏览器的布局检查。
4. **公共准备放在哪里**：查看 `setupFilesAfterEnv`、自定义 Matcher、全局 Mock 和清理逻辑。每个测试应独立，不依赖上一个测试留下的数据。
5. **静态资源与别名**：只有项目真正导入 CSS、图片或路径别名且 Jest 无法识别时，再配置对应映射。

一个最小的纯函数测试可先验证运行器本身：

```js
// sum.js
function sum(a, b) {
  return a + b
}
module.exports = { sum }

// sum.test.js
const { sum } = require('./sum')

test('两个数字相加', () => {
  expect(sum(2, 3)).toBe(5)
})
```

上例用 CommonJS 只演示最基础的 Jest 测试。如果既有项目采用 ESM、TypeScript 或 React JSX，实际导入方式和转换配置应与项目一致，不能只复制上例。配置项以 [Jest 官方配置文档](https://jestjs.io/docs/configuration) 和项目当前版本为准；Vitest 与 Vite 的配置关系见 [Vitest 官方文档](https://vitest.dev/config/)。

## 不重复写测试的原则

- 单元测试验证确定的规则，组件测试验证用户能看到的输入、事件和提示。
- API Mock 要同时覆盖成功、失败与空数据；不要把 Mock 的成功当成后端已验证。
- 覆盖率指出尚未执行的代码，不能单独证明业务正确。
- 截图、真实浏览器行为和必要的手动打鍵仍按项目测试计划执行。

需要切换测试运行器时，先在独立分支迁移一份最小测试，确认配置、Mock、异步等待和 CI 命令，再分批迁移。仅为了跟随教程，不要替换已经稳定运行的项目测试链。
