import { spawn } from 'node:child_process'

const DEFAULT_ENTRY = 'examples/example.md'

const [, , mode, ...args] = process.argv

if (!mode) {
  console.error('Usage: node scripts/slidev.mjs <dev|build|export> [args] [entry.md]')
  process.exit(1)
}

const entryIndex = args.findIndex(arg => arg.endsWith('.md'))
const entry = entryIndex >= 0 ? args[entryIndex] : DEFAULT_ENTRY
const passthroughArgs = entryIndex >= 0 ? args.filter((_, i) => i !== entryIndex) : args

const slidevArgs = mode === 'dev'
  ? [entry, ...passthroughArgs]
  : [mode, entry, ...passthroughArgs]

const child = spawn('slidev', slidevArgs, { stdio: 'inherit', shell: true })
child.on('exit', code => process.exit(code ?? 0))
child.on('error', () => process.exit(1))

