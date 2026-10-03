// Minimal static file server for the built site.
// Used for local verification only; `npm run preview` is the normal route.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = process.argv[2] ?? 'docs/.vitepress/dist'
const port = Number(process.argv[3] ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

async function resolve(pathname) {
  let file = join(root, normalize(pathname).replace(/^(\.\.[/\\])+/, ''))
  let s = await stat(file).catch(() => null)
  if (s?.isDirectory()) {
    file = join(file, 'index.html')
    s = await stat(file).catch(() => null)
  }
  if (!s && !extname(file)) {
    const alt = `${file}.html`
    const s2 = await stat(alt).catch(() => null)
    if (s2) return { file: alt, s: s2 }
  }
  return { file, s }
}

createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url ?? '/', 'http://localhost')
    const { file, s } = await resolve(decodeURIComponent(pathname))
    if (!s) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end(`404 ${pathname}`)
      return
    }
    res.writeHead(200, {
      'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    })
    res.end(await readFile(file))
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(String(error))
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`serving ${root} at http://127.0.0.1:${port}/`)
})
