import { cpSync, mkdirSync, statSync } from 'node:fs'
mkdirSync('docs/public/vendor/mermaid', { recursive: true })
cpSync('node_modules/mermaid/dist', 'docs/public/vendor/mermaid', { recursive: true, filter: p => statSync(p).isDirectory() || p.endsWith('.mjs') })
cpSync('node_modules/mermaid/LICENSE', 'docs/public/vendor/mermaid/LICENSE')

mkdirSync('docs/public/vendor/sql', { recursive: true })
cpSync('node_modules/sql.js/dist/sql-wasm.wasm', 'docs/public/vendor/sql/sql-wasm.wasm')
