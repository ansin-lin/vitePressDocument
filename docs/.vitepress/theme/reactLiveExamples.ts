const example = (title: string, description: string, task: string, code: string, dependencies: Record<string, string> = {}) => ({ title, description, task, code, dependencies })

export const reactExamples = {
  intro: example('第一个 React 组件', '修改 JSX，观察页面如何更新。', '修改欢迎语。', `export default function App() { return <h1>你好，React！</h1> }`),
  jsx: example('JSX 表达式', '在 JSX 中使用 JavaScript 表达式。', '修改 name 或课程数量。', `export default function App() { const name = '小林'; const count = 3; return <p>{name} 正在学习 {count} 门课程</p> }`),
  props: example('组件与 props', '父组件传入属性，子组件负责展示。', '增加一张课程卡片。', `function Course({ name, hours }) { return <li>{name}：{hours} 小时</li> }
export default function App() { return <ul><Course name="React" hours={8} /><Course name="Vue" hours={6} /></ul> }`),
  conditionList: example('条件与列表', '根据数据渲染列表，并显示空状态。', '清空 courses 看看结果。', `const courses = ['React', 'Vue', 'TypeScript'];
export default function App() { return courses.length ? <ul>{courses.map(item => <li key={item}>{item}</li>)}</ul> : <p>暂无课程</p> }`),
  state: example('事件与状态', '点击按钮会更新 state 并重新渲染。', '增加一个减少按钮。', `import { useState } from 'react';
export default function App() { const [count, setCount] = useState(0); return <div><p>计数：{count}</p><button onClick={() => setCount(count + 1)}>加一</button></div> }`),
  immutable: example('更新数组状态', '用新数组替换旧状态，列表随之更新。', '增加删除最后一项的按钮。', `import { useState } from 'react';
export default function App() { const [items, setItems] = useState(['Java']); return <div><button onClick={() => setItems([...items, 'React'])}>添加</button><ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul></div> }`),
  communication: example('父子组件通信', '子组件通过回调通知父组件。', '添加第二个按钮。', `import { useState } from 'react';
function Action({ onAdd }) { return <button onClick={onAdd}>加一</button> }
export default function App() { const [count, setCount] = useState(0); return <div>计数：{count} <Action onAdd={() => setCount(count + 1)} /></div> }`),
  form: example('受控表单', '输入框的值由 state 管理。', '输入名字观察问候语。', `import { useState } from 'react';
export default function App() { const [name, setName] = useState(''); return <div><input value={name} onChange={e => setName(e.target.value)} placeholder="输入名字" /><p>你好，{name || '同学'}</p></div> }`),
  effect: example('副作用与清理', '观察定时器启动与停止。', '修改计时间隔。', `import { useEffect, useState } from 'react';
function Clock() { const [seconds, setSeconds] = useState(0); useEffect(() => { const id = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(id) }, []); return <p>运行 {seconds} 秒</p> }
export default function App() { const [show, setShow] = useState(true); return <div><button onClick={() => setShow(!show)}>{show ? '停止' : '启动'}</button>{show && <Clock />}</div> }`),
  asyncState: example('异步请求状态', '模拟本地异步数据，观察加载和结果状态。', '修改延迟时间或返回的数据。', `import { useState } from 'react';
export default function App() { const [status, setStatus] = useState('待加载'); async function load() { setStatus('加载中…'); await new Promise(resolve => setTimeout(resolve, 800)); setStatus('已加载：React 课程') } return <div><button onClick={load}>加载</button><p>{status}</p></div> }`),
  crud: example('员工列表本地增删', '先用本地 State 理解列表变化；本练习没有调用员工 API。', '新增一名员工，再删除一名员工。', `import { useState } from 'react';
export default function App() { const [name, setName] = useState(''); const [items, setItems] = useState([{ id: 1, name: '田中太郎', department: '开发部' }]); return <div><input value={name} onChange={e => setName(e.target.value)} placeholder="员工姓名" /><button onClick={() => { if (name.trim()) { setItems([...items, { id: Date.now(), name: name.trim(), department: '未分配' }]); setName('') } }}>添加</button><ul>{items.map(item => <li key={item.id}>{item.name}（{item.department}）<button onClick={() => setItems(items.filter(row => row.id !== item.id))}>删除</button></li>)}</ul></div> }`),
  refs: example('ref 操作 DOM', '点击按钮让输入框获得焦点。', '增加清空输入内容的操作。', `import { useRef } from 'react';
export default function App() { const input = useRef(null); return <div><input ref={input} placeholder="输入内容" /><button onClick={() => input.current.focus()}>聚焦</button></div> }`),
  context: example('跨层传值', '深层组件读取 Context。', '修改主题颜色。', `import { createContext, useContext } from 'react';
const Theme = createContext('blue');
function Button() { const color = useContext(Theme); return <button style={{ color }}>主题按钮</button> }
function Toolbar() { return <div><Button /></div> }
export default function App() { return <Theme.Provider value="tomato"><Toolbar /></Theme.Provider> }`),
  errorState: example('失败后重新请求', '本练习模拟异步请求；重试会重新执行请求，首次失败、第二次成功。', '点击读取，再点击重试；修改 attempts 的判断观察连续失败。', `import { useRef, useState } from 'react';
export default function App() { const attempts = useRef(0); const [status, setStatus] = useState('idle'); async function load() { setStatus('loading'); await new Promise(resolve => setTimeout(resolve, 500)); attempts.current += 1; setStatus(attempts.current === 1 ? 'error' : 'success') } return <div><button onClick={load} disabled={status === 'loading'}>读取员工</button>{status === 'loading' && <p role="status">正在读取…</p>}{status === 'error' && <p role="alert">读取失败 <button onClick={load}>重试</button></p>}{status === 'success' && <p>已读取：田中太郎</p>}</div> }`),
  search: example('员工本地搜索过滤', '用本地员工数组观察关键字过滤；正式页面还要与 Service 和分页条件连接。', '输入姓名或部门，观察列表变化。', `import { useState } from 'react';
const employees = [{ id: 1, name: '田中太郎', department: '开发部' }, { id: 2, name: '山田花子', department: '营业部' }];
export default function App() { const [keyword, setKeyword] = useState(''); const visible = employees.filter(item => (item.name + item.department).includes(keyword.trim())); return <div><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索姓名或部门" /><ul>{visible.map(item => <li key={item.id}>{item.name}（{item.department}）</li>)}</ul></div> }`),
  portal: example('Portal 弹窗位置', '弹窗由 App 控制，但 DOM 放在预览文档的 body 下。', '打开弹窗并查看 DOM 父元素；再修改弹窗内容。', `import { useState } from 'react';
import { createPortal } from 'react-dom';
export default function App() { const [open, setOpen] = useState(false); return <div><button onClick={() => setOpen(true)}>打开弹窗</button>{open && createPortal(<div role="dialog" aria-modal="true" style={{ position: 'fixed', top: '20%', left: '20%', background: 'white', color: 'black', border: '2px solid teal', padding: 20 }}>员工详情弹窗<p>DOM 父元素：BODY</p><button onClick={() => setOpen(false)}>关闭</button></div>, document.body)}</div> }`),
  router: example('React Router 页面导航', '真实运行 React Router；预览使用内存路由，站点地址不会改变。', '添加 /about 页面，或修改员工详情编号。', `import { MemoryRouter, Link, Routes, Route, useParams, useLocation } from 'react-router-dom';
function Location() { const location = useLocation(); return <p>当前路径：{location.pathname}</p> }
function Detail() { const { id } = useParams(); return <h2>员工详情：{id}</h2> }
export default function App() { return <MemoryRouter initialEntries={['/']}><nav><Link to="/">首页</Link> | <Link to="/employees">员工列表</Link> | <Link to="/employees/101">员工 101</Link></nav><Location /><Routes><Route path="/" element={<h2>首页</h2>} /><Route path="/employees" element={<h2>员工列表</h2>} /><Route path="/employees/:id" element={<Detail />} /><Route path="*" element={<h2>页面不存在</h2>} /></Routes></MemoryRouter> }`, { 'react-router-dom': '7.18.4' }),
  zustand: example('Zustand 共享状态', '两个无直接父子关系的组件读写同一个真实 Zustand Store。', '增加减少按钮，观察两处数字同步。', `import { create } from 'zustand';
const useCounter = create(set => ({ count: 0, increase: () => set(state => ({ count: state.count + 1 })), reset: () => set({ count: 0 }) }));
function Header() { const count = useCounter(state => state.count); return <h2>顶部计数：{count}</h2> }
function Controls() { const count = useCounter(state => state.count); const increase = useCounter(state => state.increase); const reset = useCounter(state => state.reset); return <div>操作区计数：{count} <button onClick={increase}>+1</button> <button onClick={reset}>重置</button></div> }
export default function App() { return <><Header /><Controls /></> }`, { zustand: '5.0.15' }),
  redux: example('Redux Toolkit 数据流', 'Slice 定义操作，Provider 提供 Store，组件通过 dispatch 更新共享状态。', '增加 decrease reducer 和按钮。', `import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
const counterSlice = createSlice({ name: 'counter', initialState: { count: 0 }, reducers: { increase: state => { state.count += 1 }, reset: state => { state.count = 0 } } });
const store = configureStore({ reducer: { counter: counterSlice.reducer } });
function Counter() { const count = useSelector(state => state.counter.count); const dispatch = useDispatch(); return <div><p>当前数值：{count}</p><button onClick={() => dispatch(counterSlice.actions.increase())}>+1</button><button onClick={() => dispatch(counterSlice.actions.reset())}>重置</button></div> }
export default function App() { return <Provider store={store}><Counter /></Provider> }`, { '@reduxjs/toolkit': '2.12.0', 'react-redux': '9.3.0' })
} as const

export type ReactExampleKey = keyof typeof reactExamples
