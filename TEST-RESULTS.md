# SQL 教材接入验证

验证日期：2026-10-30。

- 从 LearnDocument 复制 SQL 知识章节 16 篇及综合练习 1 篇；逐文件哈希确认内容与参考原件一致，参考目录未修改。
- 参考课程审计：16 个 Markdown 文件，P0=0、P1=0、P2=0。
- Vue/TypeScript 检查、GitHub Pages 子路径生产构建：通过。
- Chromium 预览：0 章正文、课程入口、10 章的 3 个 Mermaid 图、15 章到综合练习的链接均正常；未捕获页面脚本错误。
- 布局：1440px 屏幕侧栏 181px、正文约 1215px；390px 手机宽度无横向溢出。
- 旧在线练习、计数器和 Spring Boot 模拟页面已移除，页面导航无相关入口。

GitHub Pages 部署结果见 GitHub Actions。教材为从参考文档复制的阅读内容，尚未按 VitePress 对所有章节逐页做视觉复核。
