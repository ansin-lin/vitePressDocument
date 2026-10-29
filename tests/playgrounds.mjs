import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
const server = spawn(process.execPath, ['node_modules/vitepress/bin/vitepress.js', 'preview', 'docs', '--port', '4174'], { env: { ...process.env, BASE_PATH: '/vitePressDocument/' }, stdio: 'pipe' })
let browser
try {
  for (let i = 0; i < 100; i++) { try { if ((await fetch('http://localhost:4174/vitePressDocument/')).ok) break } catch {} await new Promise(r => setTimeout(r, 200)) }
  browser = await chromium.launch()
  const page = await browser.newPage()
  page.on('console', m => { if (m.type() === 'error') console.log('console:', m.text()) })
  page.on('pageerror', e => console.log('pageerror:', e.message))
  await page.goto('http://localhost:4174/vitePressDocument/examples/sql-playground.html')
  await page.getByText('返回 3 行。').waitFor({ timeout: 30000 })
  assert.equal(await page.locator('tbody tr').count(), 3)
  await page.locator('#sql-code').fill('SELECT name FROM students WHERE score > 90;')
  await page.getByRole('button', { name: '运行 SQL' }).click()
  assert.equal(await page.locator('tbody tr').count(), 1)
  await page.locator('#sql-code').fill('not sql')
  await page.getByRole('button', { name: '运行 SQL' }).click()
  assert.equal(await page.getByRole('alert').count(), 1)
  await page.getByRole('button', { name: '重置' }).click()
  assert.equal(await page.locator('#sql-code').inputValue(), 'SELECT id, name, score FROM students ORDER BY score DESC;')
  console.log('PASS SQL execution, result, error, reset')
  await page.goto('http://localhost:4174/vitePressDocument/examples/vue-playground.html')
  await page.getByText('Vue 在线练习', { exact: true }).first().waitFor()
  await page.waitForTimeout(8000)
  await page.frameLocator('.repl-panel iframe').getByRole('button', { name: '点击 0 次' }).click(); assert.match(await page.frameLocator('.repl-panel iframe').locator('body').innerText(), /点击 1 次/); console.log('PASS Vue preview interaction')
  await page.goto('http://localhost:4174/vitePressDocument/examples/react-playground.html')
  await page.locator('#react-code').waitFor()
  await page.waitForTimeout(10000)
  await page.frameLocator('.playground-preview').getByRole('button', { name: '点击 0 次' }).click(); assert.match(await page.frameLocator('.playground-preview').locator('body').innerText(), /点击 1 次/); console.log('PASS React preview interaction')
} finally { await browser?.close(); server.kill() }

