import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import assert from 'node:assert/strict'
const server = spawn(process.execPath, ['node_modules/vitepress/bin/vitepress.js', 'preview', 'docs', '--port', '4173'], { stdio: 'pipe', env: { ...process.env, BASE_PATH: '/training/' } })
let browser
try {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch('http://localhost:4173/training/')).ok) break } catch {}
    await new Promise(r => setTimeout(r, 200))
  }
  browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => console.log('browser:', m.text())); page.on('requestfailed', r => console.log('failed:', r.url(), r.failure()))
  await page.goto('http://localhost:4173/training/examples/counter.html')
  await page.getByRole('button', { name: '增加 1', exact: true }).click({ clickCount: 11 })
  assert.match(await page.getByRole('alert').innerText(), /上限/)
  await page.getByRole('button', { name: '↺ 重置' }).click()
  assert.equal(await page.locator('output').innerText(), '0')
  await page.goto('http://localhost:4173/training/examples/spring-boot.html')
  await page.locator('.mermaid-diagram svg').nth(1).waitFor()
  assert.equal(await page.locator('.mermaid-diagram svg').count(), 2)
  assert.equal(await page.getByRole('button', { name: '上一步', exact: true }).isDisabled(), true)
  await page.getByRole('checkbox').check()
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: '下一步', exact: true }).click()
  assert.match(await page.locator('[aria-live="polite"]').innerText(), /500/)
  assert.equal(await page.getByRole('button', { name: '下一步', exact: true }).isDisabled(), true)
  await page.getByRole('button', { name: '↺ 重置' }).click()
  assert.equal(await page.getByRole('checkbox').isChecked(), false)
  await page.getByRole('switch').first().click()
  await page.waitForTimeout(500)
  assert.equal(await page.locator('.mermaid-diagram svg').count(), 2)
  await page.setViewportSize({ width: 390, height: 844 })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  assert.deepEqual(errors, [])
  console.log('PASS: subpath pages, counter limit/reset, flow exception/boundaries/reset, two Mermaid diagrams, theme, mobile overflow, no browser errors')
} finally { await browser?.close(); server.kill() }




