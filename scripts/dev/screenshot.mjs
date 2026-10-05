// Screenshot helper driven through the Chrome DevTools Protocol.
// Node 24 ships a global WebSocket, so no dependencies are needed.
//
//   node scripts/dev/screenshot.mjs <baseUrl> <outDir> [--dark] [url=name] ...
//
// Example:
//   node scripts/dev/screenshot.mjs http://127.0.0.1:4173 shots \
//     "/=home" "/enchantments/=enchantments"
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe',
]

const [baseUrl, outDir, ...rest] = process.argv.slice(2)
const dark = rest.includes('--dark')
// `--pre=<file>` runs a JS file in the page before capturing, so interactive
// states (an active filter, an open menu) can be photographed too.
const preArg = rest.find((a) => a.startsWith('--pre='))
const preScript = preArg ? readFileSync(preArg.slice('--pre='.length), 'utf8') : null
const pages = rest
  .filter((a) => a !== '--dark' && !a.startsWith('--pre='))
  .map((a) => {
    const [path, name] = a.split('=')
    return { path, name: name ?? (path.replace(/\W+/g, '_') || 'index') }
  })

if (!baseUrl || !outDir || !pages.length) {
  console.error(
    'usage: node screenshot.mjs <baseUrl> <outDir> [--dark] [--pre=file.js] "/path=name" ...',
  )
  process.exit(1)
}

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p))
if (!chrome) {
  console.error('no chrome/edge binary found')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

const PORT = 9333 + (dark ? 1 : 0)
const profile = join(process.env.TEMP ?? '.', `fa-shot-${PORT}`)

const child = spawn(
  chrome,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-extensions',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1440,1000',
    'about:blank',
  ],
  { stdio: 'ignore', detached: false },
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForDevtools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (r.ok) return await r.json()
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error('devtools endpoint never came up')
}

class CDP {
  constructor(ws) {
    this.ws = ws
    this.id = 0
    this.pending = new Map()
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      const p = this.pending.get(msg.id)
      if (p) {
        this.pending.delete(msg.id)
        msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result)
      }
    })
  }

  send(method, params = {}) {
    const id = ++this.id
    this.ws.send(JSON.stringify({ id, method, params }))
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }))
  }
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    ws.addEventListener('open', () => resolve(ws))
    ws.addEventListener('error', reject)
  })
}

async function capture(target, page) {
  const ws = await connect(target.webSocketDebuggerUrl)
  const cdp = new CDP(ws)

  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  await cdp.send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }],
  })
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  })

  const url = baseUrl.replace(/\/$/, '') + page.path
  await cdp.send('Page.navigate', { url })
  // wait for the app to hydrate and fonts to settle
  await sleep(3500)

  if (preScript) {
    const { exceptionDetails } = await cdp.send('Runtime.evaluate', {
      expression: preScript,
      returnByValue: true,
      awaitPromise: true,
    })
    if (exceptionDetails) throw new Error(`--pre script failed: ${exceptionDetails.text}`)
    await sleep(600)
  }

  // expand the viewport to the full document height for a complete capture
  const { result } = await cdp.send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollHeight',
    returnByValue: true,
  })
  const fullHeight = Math.min(Math.max(Number(result.value) || 1000, 800), 20000)
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: fullHeight,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await sleep(900)

  const shot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
  })
  const file = join(outDir, `${page.name}${dark ? '-dark' : '-light'}.png`)
  writeFileSync(file, Buffer.from(shot.data, 'base64'))
  console.log(`${file}  (1440x${fullHeight})`)
  ws.close()
}

try {
  await waitForDevtools()
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
  const page = list.find((t) => t.type === 'page')
  for (const p of pages) await capture(page, p)
} finally {
  child.kill()
}
