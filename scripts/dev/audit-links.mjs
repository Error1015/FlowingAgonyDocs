// Audits every built HTML file for internal links/assets that are missing the
// configured base prefix — the usual cause of a blank GitHub Pages deploy.
//
//   node scripts/dev/audit-links.mjs [distDir] [base]
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { join } from 'node:path'

const dist = process.argv[2] ?? 'docs/.vitepress/dist'
const base = process.argv[3] ?? '/FlowingAgonyDocs/'

const files = globSync('**/*.html', { cwd: dist }).map((f) => join(dist, f))
const bad = new Map()
let checked = 0

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const url = m[1]
    checked++
    if (url.startsWith('//') || url.startsWith(base)) continue
    if (!bad.has(url)) bad.set(url, [])
    bad.get(url).push(file.replace(dist, ''))
  }
}

console.log(`base    : ${base}`)
console.log(`files   : ${files.length}`)
console.log(`internal: ${checked}`)

if (!bad.size) {
  console.log('\nOK — every internal href/src carries the base prefix.')
  process.exit(0)
}

console.log(`\nMISSING BASE (${bad.size} distinct):`)
for (const [url, where] of [...bad.entries()].sort()) {
  console.log(`  ${url}`)
  console.log(`      in ${[...new Set(where)].slice(0, 4).join(', ')}${where.length > 4 ? ` (+${where.length - 4} more)` : ''}`)
}
process.exit(1)
