const example = (title: string, description: string, task: string, code: string) => ({ title, description, task, code })

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
  crud: example('列表增删', '在本地 state 中添加和删除项目。', '尝试增加去重逻辑。', `import { useState } from 'react';
export default function App() { const [text, setText] = useState(''); const [items, setItems] = useState(['学习 React']); return <div><input value={text} onChange={e => setText(e.target.value)} /><button onClick={() => { if (text.trim()) { setItems([...items, text.trim()]); setText('') } }}>添加</button><ul>{items.map((item, i) => <li key={i}>{item} <button onClick={() => setItems(items.filter((_, n) => n !== i))}>删除</button></li>)}</ul></div> }`),
  refs: example('ref 操作 DOM', '点击按钮让输入框获得焦点。', '增加清空输入内容的操作。', `import { useRef } from 'react';
export default function App() { const input = useRef(null); return <div><input ref={input} placeholder="输入内容" /><button onClick={() => input.current.focus()}>聚焦</button></div> }`),
  context: example('跨层传值', '深层组件读取 Context。', '修改主题颜色。', `import { createContext, useContext } from 'react';
const Theme = createContext('blue');
function Button() { const color = useContext(Theme); return <button style={{ color }}>主题按钮</button> }
function Toolbar() { return <div><Button /></div> }
export default function App() { return <Theme.Provider value="tomato"><Toolbar /></Theme.Provider> }`),
  errorState: example('错误状态', '请求失败时展示可重试提示。', '把失败改成成功状态。', `import { useState } from 'react';
export default function App() { const [error, setError] = useState(''); return <div><button onClick={() => setError('加载失败，请重试')}>模拟失败</button>{error && <p role="alert">{error} <button onClick={() => setError('')}>重试</button></p>}</div> }`),
  search: example('搜索过滤', '输入关键字筛选列表。', '增加一门课程并搜索它。', `import { useState } from 'react';
const courses = ['Java', 'JavaScript', 'React', 'Vue'];
export default function App() { const [keyword, setKeyword] = useState(''); return <div><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="搜索课程" /><ul>{courses.filter(item => item.toLowerCase().includes(keyword.toLowerCase())).map(item => <li key={item}>{item}</li>)}</ul></div> }`)
} as const

export type ReactExampleKey = keyof typeof reactExamples
