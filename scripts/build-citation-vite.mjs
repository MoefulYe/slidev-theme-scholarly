import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname)
const setupDir = path.join(repoRoot, 'setup')
const sourceFile = path.join(setupDir, 'citation-vite.ts')
const esmOutputFile = path.join(setupDir, 'citation-vite.js')
const cjsOutputFile = path.join(setupDir, 'citation-vite.cjs')
const dtsOutputFile = path.join(setupDir, 'citation-vite.d.ts')
const tscBin = path.join(repoRoot, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc')
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

const tscCommand = fs.existsSync(tscBin) ? tscBin : pnpmBin
const tscCommandPrefix = fs.existsSync(tscBin) ? [] : ['exec', 'tsc']

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'scholarly-citation-vite-'))
const tempEsmDir = path.join(tempRoot, 'esm')
const tempCjsDir = path.join(tempRoot, 'cjs')

fs.mkdirSync(tempEsmDir, { recursive: true })
fs.mkdirSync(tempCjsDir, { recursive: true })

try {
  runTsc([
    sourceFile,
    '--target', 'ES2020',
    '--module', 'ESNext',
    '--moduleResolution', 'node',
    '--rootDir', setupDir,
    '--outDir', tempEsmDir,
    '--declaration',
    '--esModuleInterop',
    '--allowSyntheticDefaultImports',
    '--skipLibCheck',
    '--pretty', 'false',
  ])

  runTsc([
    sourceFile,
    '--target', 'ES2020',
    '--module', 'CommonJS',
    '--moduleResolution', 'node',
    '--rootDir', setupDir,
    '--outDir', tempCjsDir,
    '--esModuleInterop',
    '--allowSyntheticDefaultImports',
    '--skipLibCheck',
    '--pretty', 'false',
  ])

  fs.copyFileSync(path.join(tempEsmDir, 'citation-vite.js'), esmOutputFile)
  fs.copyFileSync(path.join(tempEsmDir, 'citation-vite.d.ts'), dtsOutputFile)
  fs.copyFileSync(path.join(tempCjsDir, 'citation-vite.js'), cjsOutputFile)

  console.log('Generated setup/citation-vite.{js,cjs,d.ts} from setup/citation-vite.ts')
}
finally {
  fs.rmSync(tempRoot, { recursive: true, force: true })
}

function runTsc(args) {
  execFileSync(tscCommand, [...tscCommandPrefix, ...args], {
    cwd: repoRoot,
    stdio: 'inherit',
  })
}
