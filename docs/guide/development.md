# 开发与教材接入

## 目录与组件

- `docs/`：教材、课程入口和演示页面。
- `docs/.vitepress/config.mts`：导航、搜索、Markdown 和部署路径。
- `docs/.vitepress/theme/components/`：独立 Vue 演示组件。

## 编写一个实验

组件使用 Vue 3 与 TypeScript，并在主题入口注册。用统一容器包裹，状态由实验自身维护：

```vue
<DemoContainer
  title="示例名称"
  description="明确说明真实执行或教学模拟"
  :source="source"
  :error="error"
  @reset="reset"
>
  <!-- 交互内容及适合的运行、前后步骤按钮 -->
</DemoContainer>
```

`reset` 必须恢复所有交互状态与错误。错误应以可读文字显示。容器源码采用文本输出，不作为 HTML 执行。禁止把模拟输出描述为真实 Java、数据库或系统命令执行。

## 图表

Markdown 中使用 mermaid 代码围栏。支持流程图和时序图；图表随深浅主题重新渲染。使用 strict 安全模式，不允许图表中的任意 HTML。加载或语法错误会显示提示，源码可展开查看。

## 教材接入流程

参考目录保留原样。选择单篇教材，将内容和相关图片按原相对位置加入 docs，配置侧栏链接，运行类型检查和生产构建。先审查 MkDocs、Obsidian 专用语法；标准 Markdown 不要求重写。当前课程目录为规划，不冒充完整教材。

## 验收

- 计数器点击至 10，继续点击出现提示，重置恢复 0。
- 请求流程前后步边界按钮禁用，异常开关恢复第一步，重置恢复正常路径。
- Mermaid 流程图和时序图正确显示，切换主题后更新。
- 搜索“请求”可找到教材；窄屏可操作，键盘可以访问按钮。
- 构建 root 与 `/training/` 两种路径，检查导航和资源。

## 后续阶段

第一阶段完成验证后再开发 Vue REPL、React Sandpack、SQLite WASM，采用懒加载与隔离执行。SQLite 不执行 PL/SQL。Git、Linux、Shell 只提供明确标注的教学模拟。部署依照仓库 README 配置。
