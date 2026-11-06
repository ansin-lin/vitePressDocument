# 第 17 章补充：课堂任务接口准备

本页配合[API 层与异步处理](17_http_api.md)使用。先读懂正文中的请求分层和 `getTasks()`，再运行这里的接口。此程序是课堂用的 Node.js 模拟服务；Vue 学员只需复制、运行并观察响应，不要求现在掌握服务端实现。

## 1. 运行课堂演示接口

这里的任务接口只用于练习 Axios、Pinia 和测试。在 Vue 练习工程根目录新建 `task-api-mock.mjs`，写入下面的完整程序。它只把数据保存在内存中，重启后恢复初始数据。

```js
import { createServer } from 'node:http'

const tasks = [
  { id: 1, title: '确认申请画面', assignee: '山田', priority: 'normal', status: 'todo', dueDate: '2026-10-30' },
]

function send(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  response.end(JSON.stringify(data))
}

createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname

  if (request.method === 'GET' && path === '/api/tasks') {
    send(response, 200, tasks)
    return
  }

  const detailId = /^\/api\/tasks\/(\d+)$/.exec(path)?.[1]
  if (request.method === 'GET' && detailId) {
    const task = tasks.find((item) => item.id === Number(detailId))
    send(response, task ? 200 : 404, task ?? { message: '任务不存在' })
    return
  }

  if (request.method !== 'POST' || path !== '/api/tasks') {
    send(response, 404, { message: '接口不存在' })
    return
  }

  let body = ''
  request.on('data', (chunk) => { body += chunk })
  request.on('end', () => {
    try {
      const input = JSON.parse(body)
      if (typeof input.title !== 'string' || !input.title.trim()
          || !['low', 'normal', 'high'].includes(input.priority)) {
        send(response, 400, { message: '标题或优先级不正确' })
        return
      }
      const task = {
        id: tasks.at(-1).id + 1,
        title: input.title.trim(),
        assignee: '未分配',
        priority: input.priority,
        status: 'todo',
        dueDate: '',
      }
      tasks.push(task)
      send(response, 201, task)
    } catch {
      send(response, 400, { message: 'JSON格式不正确' })
    }
  })
}).listen(8080, '127.0.0.1', () => {
  console.log('Task mock API: http://127.0.0.1:8080/api/tasks')
})
```

在一个终端运行 `node task-api-mock.mjs`，保留终端窗口；浏览器打开 `http://127.0.0.1:8080/api/tasks`，应看到一条初始任务。另一个终端启动 Vue 开发服务器，并按[API 章节的第 10 节](17_http_api.md#_10-vite-proxy与cors)配置 Vite Proxy。请求 `/api/tasks` 成功时会返回数组；提交空标题会得到 400，可用于练习错误显示。结束后按 `Ctrl+C` 停止模拟接口。


## 2. 与正式项目的区别

这里的数据只在内存中保存，重启服务会恢复初始内容。它用于验证前端请求、错误和状态处理，不代表正式业务后端，也不提供登录与持久化能力。完成本章后可回到[API 章节](17_http_api.md)继续练习。
