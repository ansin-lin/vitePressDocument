export type WebExample = { title: string; html: string; css: string }

export const webExamples = {
  'html-intro': {
    title: '第一个完整网页',
    html: `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>公司技术交流会</title>
</head>
<body>
  <h1>公司技术交流会</h1>
  <p>欢迎参加本月的技术交流会。</p>
</body>
</html>`,
    css: ''
  },
  'html-table': {
    title: '最小表格',
    html: `<table>
  <tr><th>时间</th><th>主题</th><th>讲师</th></tr>
  <tr><td>14:00</td><td>项目开发流程</td><td>田中</td></tr>
</table>`,
    css: ''
  },
  'css-intro': {
    title: '文字颜色与字号',
    html: `<h1>CSS 初体验</h1>
<p>CSS 可以控制网页中文字的颜色和大小。</p>`,
    css: `h1 {
  color: red;
  font-size: 25px;
}`
  },
  'css-flex': {
    title: 'Flex 横向排列',
    html: `<div class="box">
  <div>大毛</div>
  <div>二毛</div>
  <div>三毛</div>
</div>`,
    css: `.box {
  display: flex;
  width: 600px;
  height: 200px;
  background-color: #eee;
}
.box div {
  width: 100px;
  height: 100px;
  background-color: pink;
}`
  }
} satisfies Record<string, WebExample>

export type WebExampleKey = keyof typeof webExamples

export function isWebExampleKey(value: string): value is WebExampleKey {
  return Object.prototype.hasOwnProperty.call(webExamples, value)
}

export function previewDocument(html: string, css: string): string {
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:">`
  const style = `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`
  if (/<html(?:\s|>)/i.test(html)) {
    if (/<head(?:\s|>)/i.test(html)) return html.replace(/<head([^>]*)>/i, `<head$1>${policy}${style}`)
    return html.replace(/<html([^>]*)>/i, `<html$1><head>${policy}${style}</head>`)
  }
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8">${policy}${style}</head><body>${html}</body></html>`
}
