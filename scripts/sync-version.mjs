#!/usr/bin/env node

/**
 * Synchronise the root package.json (theme) version into:
 *   - docs/package.json
 *
 * Usage:
 *   node scripts/sync-version.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'))
const version = rootPkg.version

const targets = [
    { file: path.join(rootDir, 'docs', 'package.json'), indent: 4 },
]

for (const { file, indent } of targets) {
    if (!fs.existsSync(file)) {
        console.warn(`⚠  Skipped (not found): ${path.relative(rootDir, file)}`)
        continue
    }

    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    const oldVersion = pkg.version
    pkg.version = version
    fs.writeFileSync(file, JSON.stringify(pkg, null, indent) + '\n')
    console.log(`✓  ${path.relative(rootDir, file)}: ${oldVersion} → ${version}`)
}
