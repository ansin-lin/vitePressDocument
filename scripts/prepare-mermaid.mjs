import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

function copyModules(source, target) {
  mkdirSync(target, { recursive: true })
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const from = join(source, entry.name)
    const to = join(target, entry.name)
    if (entry.isDirectory()) copyModules(from, to)
    else if (entry.name.endsWith('.mjs')) copyFileSync(from, to)
  }
}

copyModules('node_modules/mermaid/dist', 'docs/public/vendor/mermaid')
copyFileSync('node_modules/mermaid/LICENSE', 'docs/public/vendor/mermaid/LICENSE')
