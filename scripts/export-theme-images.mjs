import { spawnSync } from 'node:child_process'
import { access, cp, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const slidevCli = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')

const themes = [
  { name: 'classic-blue', entry: 'examples/example-classic-blue.md', outDir: 'images/themes/classic-blue' },
  { name: 'oxford', entry: 'examples/example-oxford.md', outDir: 'images/themes/oxford' },
  { name: 'cambridge', entry: 'examples/example-cambridge.md', outDir: 'images/themes/cambridge' },
  { name: 'yale', entry: 'examples/example-yale.md', outDir: 'images/themes/yale' },
  { name: 'princeton', entry: 'examples/example-princeton.md', outDir: 'images/themes/princeton' },
  { name: 'nordic', entry: 'examples/example-nordic.md', outDir: 'images/themes/nordic' },
  { name: 'monochrome', entry: 'examples/example-monochrome.md', outDir: 'images/themes/monochrome' },
  { name: 'sepia', entry: 'examples/example-sepia.md', outDir: 'images/themes/sepia' },
  { name: 'high-contrast', entry: 'examples/example-high-contrast.md', outDir: 'images/themes/high-contrast' },
]

const range = process.env.SLIDEV_EXPORT_RANGE || '1-4'
const extraArgs = process.argv.slice(2)

await access(slidevCli)

for (const theme of themes) {
  const entry = path.join(root, theme.entry)
  const outDir = path.join(root, theme.outDir)
  await access(entry)

  console.log(`\n[slidev-theme-scholarly] Exporting ${theme.name} (${range}) -> ${theme.outDir}\n`)

  const result = spawnSync(
    process.execPath,
    [
      slidevCli,
      'export',
      entry,
      '--format',
      'png',
      '--range',
      range,
      '--output',
      outDir,
      ...extraArgs,
    ],
    { stdio: 'inherit', cwd: root },
  )

  if (result.status !== 0)
    process.exit(result.status ?? 1)

  const docsOutDir = path.join(root, 'docs', 'public', theme.outDir)
  await mkdir(docsOutDir, { recursive: true })

  const exportedPngs = (await readdir(outDir)).filter(name => name.endsWith('.png'))
  const existingPngs = (await readdir(docsOutDir)).filter(name => name.endsWith('.png'))

  await Promise.all(exportedPngs.map(name => cp(
    path.join(outDir, name),
    path.join(docsOutDir, name),
    { force: true },
  )))

  await Promise.all(existingPngs
    .filter(name => !exportedPngs.includes(name))
    .map(name => rm(path.join(docsOutDir, name), { force: true })))
}
