import path from 'node:path'

const packageRoot = path.resolve(process.cwd())
const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : ''
const isDependencyInstall = Boolean(initCwd) && initCwd !== packageRoot

if (!isDependencyInstall) {
  process.exit(0)
}

console.log('')
console.log('[slidev-theme-scholarly] Installed successfully.')
console.log('[slidev-theme-scholarly] If this is an existing Slidev project, run:')
console.log('[slidev-theme-scholarly]   npx sch setup vite')
console.log('[slidev-theme-scholarly] This adds the Scholarly Vite citation bridge without modifying files automatically during install.')
console.log('')
