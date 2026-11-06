# 第 10 章补充：课堂员工接口准备

本页配合[REST API 与异步 UI](10_api_async_ui.md)和[员工 CRUD](11_crud.md)使用。先学会请求与 Service 的分工，再运行这个课堂模拟接口。它只在内存保存数据，重启后恢复初始内容；不包含登录、权限或数据库。

在 React 练习项目根目录新建 `employee-api-mock.mjs`，复制以下代码：

```js
import { createServer } from 'node:http'

let employees = [
  { id: 1, employeeCode: 'EMP0001', name: '田中太郎', department: '开发部', email: 'tanaka@example.com', status: 'ACTIVE' },
  { id: 2, employeeCode: 'EMP0002', name: '山田花子', department: '营业部', email: 'yamada@example.com', status: 'ACTIVE' },
]
let nextId = 3

function send(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

async function readJson(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  return JSON.parse(body)
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, null)
  const url = new URL(req.url, 'http://localhost:8080')
  if (url.pathname === '/api/employees' && req.method === 'GET') {
    const keyword = (url.searchParams.get('keyword') || '').toLowerCase()
    const department = url.searchParams.get('department') || ''
    const status = url.searchParams.get('status') || ''
    let result = employees.filter(item =>
      (!keyword || `${item.employeeCode} ${item.name}`.toLowerCase().includes(keyword)) &&
      (!department || item.department === department) &&
      (!status || item.status === status))
    const [sortField, sortDirection] = (url.searchParams.get('sort') || 'employeeCode,asc').split(',')
    if (['employeeCode', 'name', 'department'].includes(sortField)) {
      result = [...result].sort((a, b) => String(a[sortField]).localeCompare(String(b[sortField])) * (sortDirection === 'desc' ? -1 : 1))
    }
    if (url.searchParams.has('page') || url.searchParams.has('size')) {
      const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
      const size = Math.max(1, Number(url.searchParams.get('size')) || 10)
      return send(res, 200, { items: result.slice((page - 1) * size, page * size), page, size, total: result.length })
    }
    return send(res, 200, result)
  }
  if (url.pathname === '/api/employees' && req.method === 'POST') {
    try {
      const input = await readJson(req)
      if (!input.name?.trim() || !input.department?.trim()) return send(res, 400, { message: '姓名和部门必填' })
      const employee = { id: nextId, employeeCode: `EMP${String(nextId).padStart(4, '0')}`, name: input.name.trim(), department: input.department.trim(), email: input.email || '', status: input.status || 'ACTIVE' }
      nextId += 1
      employees.push(employee)
      return send(res, 201, employee)
    } catch { return send(res, 400, { message: '请求 JSON 不正确' }) }
  }
  const match = /^\/api\/employees\/(\d+)$/.exec(url.pathname)
  if (!match) return send(res, 404, { message: '接口不存在' })
  const id = Number(match[1])
  const old = employees.find(item => item.id === id)
  if (!old) return send(res, 404, { message: '员工不存在' })
  if (req.method === 'GET') return send(res, 200, old)
  if (req.method === 'DELETE') {
    employees = employees.filter(item => item.id !== id)
    return send(res, 204, null)
  }
  if (req.method === 'PUT') {
    try {
      const input = await readJson(req)
      if (!input.name?.trim() || !input.department?.trim()) return send(res, 400, { message: '姓名和部门必填' })
      const updated = { ...old, name: input.name.trim(), department: input.department.trim(), email: input.email || '', status: input.status || old.status }
      employees = employees.map(item => item.id === id ? updated : item)
      return send(res, 200, updated)
    } catch { return send(res, 400, { message: '请求 JSON 不正确' }) }
  }
  return send(res, 405, { message: '不支持此操作' })
}).listen(8080, '127.0.0.1', () => console.log('Employee API: http://localhost:8080/api/employees'))
```

运行 `node employee-api-mock.mjs`，浏览器打开 `http://localhost:8080/api/employees`，应看到员工数组。第 10 章无分页请求返回数组；第 11 章传入 `page` 或 `size` 后返回 `{ items, page, size, total }`。结束后按 `Ctrl+C`。

本服务只供课堂练习。认证和权限章节需要符合其接口契约的独立后端。
